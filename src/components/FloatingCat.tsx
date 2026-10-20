'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Armchair, ArrowUp, Eye, Footprints, Hand, MessageSquare, MessageSquareOff, X, Zap, type LucideIcon } from 'lucide-react';
import { emoteSrc } from '@/lib/emotes';
import { ui } from '@/data';
import { useLang } from '@/components/LangProvider';
import type { ActionName } from '@/components/model/BananaCat';

const CatCanvas = dynamic(() => import('@/components/CatCanvas'), { ssr: false });

type Cta = { label: string; href: string; focus?: string };
type Phrase = { e: string; t: string; cta?: Cta };

const IDLE: ActionName = 'bananaBones|idle';
const WALK: ActionName = 'bananaBones|walk';
const LOOK: ActionName = 'bananaBones|lookAround';

// ms = how long to hold the clip before going back to idle (clip lengths from the GLB).
const ACTIONS: { icon: LucideIcon; clip: ActionName; ms: number }[] = [
  { icon: Hand, clip: 'bananaBones|hiiiiiiiii', ms: 2000 },
  { icon: ArrowUp, clip: 'bananaBones|jump', ms: 1800 },
  { icon: Footprints, clip: WALK, ms: 3000 },
  { icon: Eye, clip: LOOK, ms: 4100 },
  { icon: Armchair, clip: 'bananaBones|sit', ms: 3000 },
  { icon: Zap, clip: 'bananaBones|damaged', ms: 700 },
];

// Button targets for the section lines (texts live in the ui dictionary).
const SECTION_CTA: Record<string, { href: string; focus?: string }> = {
  proyectos: { href: '/proyectos' },
  contacto: { href: '/#contacto', focus: 'input[name="name"]' },
};

const WALK_BUDGET_MS = 20000; // scrolling this long tires the cat out
const REST_MS = 5000;

// Icons fan out on a quarter circle: left of the cat (180°) up to above it (270°).
// +1 slot for the mute toggle
const FAN = Array.from({ length: ACTIONS.length + 1 }, (_, i) => {
  const a = (Math.PI * (180 + (90 / ACTIONS.length) * i)) / 180;
  return { x: Math.cos(a), y: Math.sin(a) };
});


export default function FloatingCat() {
  const { lang } = useLang();
  const t = ui[lang].cat;
  const tRef = useRef(t); // read by the long-lived effect below, so a language switch applies without re-running it
  tRef.current = t;

  const sectionLine = (id: string): Phrase => {
    const sec = tRef.current.sections[id];
    const target = SECTION_CTA[id];
    return { e: sec.e, t: sec.t, cta: sec.cta && target ? { label: sec.cta, ...target } : undefined };
  };
  const [action, setAction] = useState<ActionName>(IDLE);
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState<{ emoji: string; text: string; cta?: Cta; show: boolean }>({ emoji: '', text: '', show: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const sleeping = useRef(false);
  const ctaUntil = useRef(0); // a bubble with a button is protected from hover comments until then
  const quietUntil = useRef(0); // system lines (greeting, sleep, section...) are not pre-empted by hover comments
  const rotRef = useRef(0); // target Y rotation, follows the cursor
  const lock = useRef(false); // true while a manual action or a rest is running
  const clicks = useRef(0);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mouseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
    return t;
  };

  const hideIn = (ms: number) => {
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(b => ({ ...b, show: false })), ms);
  };

  // bubbles with a button stay longer so there is time to click it
  const say = (line: Phrase, ms = 2200, force = false) => {
    if (mutedRef.current && !force) return;
    // small screens: bubbles only when the user asked for them (tapping an action), never on their own
    if (!force && window.matchMedia('(max-width: 767px)').matches) return;
    setBubble({ emoji: line.e, text: line.t, cta: line.cta, show: true });
    hideIn(line.cta ? Math.max(ms, 7000) : ms);
    ctaUntil.current = line.cta ? Date.now() + 7000 : 0;
  };

  const dismiss = () => {
    ctaUntil.current = 0;
    clearTimeout(bubbleTimer.current);
    setBubble(b => ({ ...b, show: false }));
  };

  const sys = (line: Phrase, ms: number) => {
    quietUntil.current = Date.now() + Math.min(ms, 3000);
    say(line, ms);
  };

  const auto = (clip: ActionName) => {
    if (!lock.current) setAction(clip);
  };

  const play = (clip: ActionName, ms: number, lines: Phrase[]) => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    setOpen(false);
    sleeping.current = false;
    lock.current = true;
    setAction(clip);
    say(lines[clicks.current++ % lines.length], Math.max(ms, 2200), true);
    later(() => {
      lock.current = false;
      setAction(IDLE);
    }, ms);
  };

  // mute lasts for this visit only (in memory): nothing is stored in the browser
  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    if (next) say(t.sad[Math.floor(Math.random() * t.sad.length)], 2800, true);
    else say(t.back, 2200, true);
  };

  // Reacts to the page: greeting, scroll, cursor, hovered controls, tiredness, sections.
  useEffect(() => {
    let walked = 0;
    let last = 0;
    let idleT: ReturnType<typeof setTimeout> | undefined;

    // falls asleep after a while without activity
    const arm = () => {
      clearTimeout(idleT);
      idleT = setTimeout(() => {
        if (lock.current) return arm();
        sleeping.current = true;
        setAction('bananaBones|sit');
        sys(tRef.current.sleep, 2500);
      }, 30000);
    };
    const wake = () => {
      if (sleeping.current) {
        sleeping.current = false;
        setAction(IDLE);
        sys(tRef.current.wake, 1500);
      }
      arm();
    };

    // reacts to anything in the page tagged data-cat="text" (data-cat-e="emoji")
    const seenAt = new Map<Element, number>();
    const groupAt = new Map<string, number>();
    const tagged = (t: EventTarget | null) => (t as Element | null)?.closest?.<HTMLElement>('[data-cat]') ?? null;
    const react = (el: HTMLElement | null) => {
      if (!el) return;
      const now = Date.now();
      if (now < ctaUntil.current || now < quietUntil.current) return;
      if (now - (seenAt.get(el) ?? 0) < 1500) return;
      // data-cat-once: comment on this element only the first time
      if (el.dataset.catOnce !== undefined && seenAt.has(el)) return;
      // data-cat-group: items of a group (e.g. tech chips) share a cooldown, so sweeping over them doesn't chatter
      const g = el.dataset.catGroup;
      if (g && now - (groupAt.get(g) ?? 0) < 8000) return;
      if (g) groupAt.set(g, now);
      seenAt.set(el, now);
      auto(LOOK); // no-op while a manual action runs, but the comment still shows
      say({ e: el.dataset.catE ?? '👀', t: el.dataset.cat ?? '' }, 2200);
    };
    // pointer detection polls the element under the cursor on every move (robust to overlays/tilt)
    let hovered: HTMLElement | null = null;
    let pt: [number, number] | null = null;
    const track = (x: number, y: number) => {
      const el = tagged(document.elementFromPoint(x, y));
      if (el === hovered) return;
      hovered = el;
      react(el);
    };
    const onFocus = (e: Event) => react(tagged(e.target));
    // no hover on touch screens: comment on tap
    const onTap = (e: Event) => matchMedia('(hover: none)').matches && react(tagged(e.target));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onCat = (e: Event) => {
      const { kind, text } = (e as CustomEvent<{ kind: string; text?: string }>).detail;
      if (kind === 'celebrate') play('bananaBones|jump', 1800, [{ e: '🎉', t: text ?? tRef.current.celebrate }]);
      if (kind === 'oops') play('bananaBones|damaged', 700, [{ e: '😬', t: text ?? tRef.current.oops }]);
    };

    const tire = () => {
      lock.current = true;
      walked = 0;
      setAction('bananaBones|sitDown');
      sys(tRef.current.tired, REST_MS);
      later(() => setAction('bananaBones|sit'), 500);
      later(() => {
        setAction('bananaBones|standUp');
        sys(tRef.current.again, 2200);
      }, REST_MS);
      later(() => {
        lock.current = false;
        setAction(IDLE);
      }, REST_MS + 500);
    };

    const onScroll = () => {
      wake();
      if (pt) track(...pt); // cards move under a still cursor
      if (lock.current || reduced) return;
      const now = performance.now();
      if (last && now - last < 200) walked += now - last;
      last = now;
      if (walked > WALK_BUDGET_MS) return tire();
      setAction(WALK);
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        auto(LOOK);
        scrollTimer.current = setTimeout(() => auto(IDLE), 1500);
      }, 350);
    };

    const onMove = (e: MouseEvent) => {
      wake();
      if (!reduced) rotRef.current = -((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
      pt = [e.clientX, e.clientY];
      track(...pt);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.closest('a, button')) auto(LOOK);
      clearTimeout(mouseTimer.current);
      mouseTimer.current = setTimeout(() => {
        rotRef.current = 0;
        auto(IDLE);
      }, 2000);
    };

    // greeting
    lock.current = true;
    setAction('bananaBones|hiiiiiiiii');
    sys(tRef.current.greet, 3000);
    later(() => {
      lock.current = false;
      setAction(IDLE);
    }, 2000);

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(en => {
          const id = en.target.id;
          if (en.isIntersecting && !seen.has(id) && !lock.current) {
            seen.add(id);
            sys(sectionLine(id), 3000);
          }
        }),
      { threshold: 0.35 }
    );
    Object.keys(SECTION_CTA).concat(['experiencia', 'sobre-mi']).forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('keydown', wake);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('click', onTap);
    window.addEventListener('cat', onCat);
    arm();
    const pending = timers.current;
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', wake);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('click', onTap);
      window.removeEventListener('cat', onCat);
      clearTimeout(idleT);
      io.disconnect();
      pending.forEach(clearTimeout);
      pending.clear();
      clearTimeout(scrollTimer.current);
      clearTimeout(mouseTimer.current);
      clearTimeout(bubbleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clicking anywhere outside closes the bubble and the icon menu
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!bubbleRef.current?.contains(t)) dismiss();
      if (!rootRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-0 bottom-3 z-30 [--r:80px] md:-right-2 md:bottom-6 md:[--r:122px]">
      <div className="relative h-[106px] w-[84px] md:h-[213px] md:w-[167px]">
        <CatCanvas action={action} rotRef={rotRef} />
        <button
          type="button"
          aria-label={t.fanToggle}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="absolute inset-0 cursor-pointer rounded-full"
        />

        {ACTIONS.map(({ icon: Icon, clip, ms }, i) => {
          const { label, say: lines } = t.actions[i];
          return (
          <button
            key={clip}
            type="button"
            title={label}
            aria-label={label}
            tabIndex={open ? 0 : -1}
            onClick={() => play(clip, ms, lines)}
            style={{
              transform: open
                ? `translate(calc(${FAN[i].x} * var(--r)), calc(${FAN[i].y} * var(--r)))`
                : 'translate(0, 0) scale(0.4)',
              transitionDelay: open ? `${i * 30}ms` : '0ms',
            }}
            className={`absolute top-1/2 left-1/2 -mt-4 -ml-4 flex size-8 items-center justify-center rounded-full border border-edge bg-background/90 text-muted backdrop-blur-sm transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:border-accent hover:text-accent md:-mt-4.5 md:-ml-4.5 md:size-9 ${
              open ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Icon className="size-4 md:size-[18px]" />
          </button>
          );
        })}

        <button
          type="button"
          title={muted ? t.unmute : t.mute}
          aria-label={muted ? t.unmute : t.mute}
          aria-pressed={muted}
          tabIndex={open ? 0 : -1}
          onClick={toggleMute}
          style={{
            transform: open
              ? `translate(calc(${FAN[ACTIONS.length].x} * var(--r)), calc(${FAN[ACTIONS.length].y} * var(--r)))`
              : 'translate(0, 0) scale(0.4)',
            transitionDelay: open ? `${ACTIONS.length * 30}ms` : '0ms',
          }}
          className={`absolute top-1/2 left-1/2 -mt-4 -ml-4 flex size-8 items-center justify-center rounded-full border bg-background/90 backdrop-blur-sm transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:border-accent hover:text-accent md:-mt-4.5 md:-ml-4.5 md:size-9 ${
            muted ? 'border-accent text-accent' : 'border-edge text-muted'
          } ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {muted ? <MessageSquareOff className="size-4 md:size-[18px]" /> : <MessageSquare className="size-4 md:size-[18px]" />}
        </button>

        <div
          ref={bubbleRef}
          aria-live="polite"
          onPointerEnter={() => clearTimeout(bubbleTimer.current)}
          onPointerLeave={() => bubble.show && hideIn(2000)}
          className={`absolute right-3 bottom-full mb-1 w-max max-w-[min(280px,calc(100vw-1.5rem))] origin-bottom-right transition duration-300 motion-reduce:transition-none ease-[cubic-bezier(.2,.7,.2,1)] ${
            bubble.show ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
          }`}
        >
          <div className="relative flex items-center gap-3 rounded-2xl border border-accent/40 bg-background/90 py-2.5 pr-8 pl-2.5 shadow-[0_8px_30px_-8px_rgba(210,143,255,0.45)] backdrop-blur-md">
            <button
              type="button"
              aria-label={t.close}
              onClick={dismiss}
              className="absolute top-1.5 right-1.5 flex size-5 cursor-pointer items-center justify-center rounded-full text-dim transition-colors hover:bg-edge hover:text-bone"
            >
              <X className="size-3" />
            </button>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xl leading-none">
              {emoteSrc(bubble.emoji) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={emoteSrc(bubble.emoji)!} alt="" width={30} height={30} className="size-[30px]" />
              ) : (
                bubble.emoji
              )}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-jetbrains text-[9px] tracking-[0.14em] text-accent">BANANA CAT</span>
              <span className="text-sm leading-tight text-bone">{bubble.text}</span>
              {bubble.cta && (
                <Link
                  href={bubble.cta.href}
                  onClick={() => {
                    dismiss();
                    const sel = bubble.cta?.focus;
                    if (sel) setTimeout(() => document.querySelector<HTMLElement>(sel)?.focus(), 500);
                  }}
                  className="mt-1 self-start text-xs font-medium text-accent hover:underline"
                >
                  {bubble.cta.label} →
                </Link>
              )}
              {!muted && (
                <button
                  type="button"
                  onClick={toggleMute}
                  className="mt-0.5 cursor-pointer self-end text-[10px] text-dim transition-colors hover:text-bone"
                >
                  {t.noMore}
                </button>
              )}
            </div>
            <span className="absolute -bottom-1.25 right-8 size-2.5 rotate-45 border-r border-b border-accent/40 bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
}
