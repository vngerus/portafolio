'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Armchair, ArrowUp, Eye, Footprints, Hand, MessageSquare, MessageSquareOff, X, Zap, type LucideIcon } from 'lucide-react';
import type { ActionName } from '@/components/model/BananaCat';

const CatCanvas = dynamic(() => import('@/components/CatCanvas'), { ssr: false });

type Cta = { label: string; href: string; focus?: string };
type Phrase = { e: string; t: string; cta?: Cta };

const IDLE: ActionName = 'bananaBones|idle';
const WALK: ActionName = 'bananaBones|walk';
const LOOK: ActionName = 'bananaBones|lookAround';

// ms = how long to hold the clip before going back to idle (clip lengths from the GLB).
const ACTIONS: { label: string; say: Phrase[]; icon: LucideIcon; clip: ActionName; ms: number }[] = [
  { label: 'Saludar', say: [{ e: '👋', t: '¡Hola! Soy Banana Cat' }, { e: '🍌', t: '¡Bienvenido al portafolio!' }], icon: Hand, clip: 'bananaBones|hiiiiiiiii', ms: 2000 },
  { label: 'Saltar', say: [{ e: '🦘', t: '¡Hop!' }, { e: '🚀', t: '¡Más alto!' }], icon: ArrowUp, clip: 'bananaBones|jump', ms: 1800 },
  { label: 'Caminar', say: [{ e: '🚶', t: 'Voy a dar una vuelta…' }, { e: '👣', t: 'Paso a paso' }], icon: Footprints, clip: WALK, ms: 3000 },
  { label: 'Mirar', say: [{ e: '👀', t: '¿Qué hay por aquí?' }, { e: '🤔', t: 'Mmm… interesante' }], icon: Eye, clip: LOOK, ms: 4100 },
  { label: 'Sentarse', say: [{ e: '😌', t: 'Un descansito' }, { e: '☕', t: 'Zzz… ¿me traes un café?' }], icon: Armchair, clip: 'bananaBones|sit', ms: 3000 },
  { label: 'Golpe', say: [{ e: '😵', t: '¡Auch!' }, { e: '💥', t: '¡Eso dolió!' }], icon: Zap, clip: 'bananaBones|damaged', ms: 700 },
];

// Said once, the first time each section scrolls into view.
const SECTION_LINES: Record<string, Phrase> = {
  experiencia: { e: '👨‍💻', t: 'Este es el camino recorrido' },
  proyectos: { e: '🚀', t: 'Lo bueno: pasa el mouse por las tarjetas', cta: { label: 'Ver todos', href: '/proyectos' } },
  'sobre-mi': { e: '🙋', t: 'Un poco sobre quién escribe el código' },
  contacto: { e: '✉️', t: '¿Hablamos? Escríbele a Angel', cta: { label: 'Escribir mensaje', href: '/#contacto', focus: 'input[name="name"]' } },
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
  const [action, setAction] = useState<ActionName>(IDLE);
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState<{ emoji: string; text: string; cta?: Cta; show: boolean }>({ emoji: '', text: '', show: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const sleeping = useRef(false);
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
    setBubble({ emoji: line.e, text: line.t, cta: line.cta, show: true });
    hideIn(line.cta ? Math.max(ms, 7000) : ms);
  };

  const dismiss = () => {
    clearTimeout(bubbleTimer.current);
    setBubble(b => ({ ...b, show: false }));
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
    if (next) dismiss();
    else say({ e: '🎤', t: '¡Vuelvo a hablar!' }, 2200, true);
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
        say({ e: '😴', t: 'Zzz…' }, 2500);
      }, 30000);
    };
    const wake = () => {
      if (sleeping.current) {
        sleeping.current = false;
        setAction(IDLE);
        say({ e: '👀', t: '¡Ah, sigues ahí!' }, 2000);
      }
      arm();
    };

    // reacts to anything in the page tagged data-cat="text" (data-cat-e="emoji")
    const seenAt = new Map<Element, number>();
    const react = (target: EventTarget | null) => {
      const el = (target as Element | null)?.closest?.<HTMLElement>('[data-cat]');
      if (!el || lock.current) return;
      const now = Date.now();
      if (now - (seenAt.get(el) ?? 0) < 10000) return;
      seenAt.set(el, now);
      auto(LOOK);
      say({ e: el.dataset.catE ?? '👀', t: el.dataset.cat ?? '' }, 2600);
    };
    const onOver = (e: Event) => react(e.target);

    const onCat = (e: Event) => {
      const { kind, text } = (e as CustomEvent<{ kind: string; text?: string }>).detail;
      if (kind === 'celebrate') play('bananaBones|jump', 1800, [{ e: '🎉', t: text ?? '¡Genial!' }]);
      if (kind === 'oops') play('bananaBones|damaged', 700, [{ e: '😬', t: text ?? 'Ups…' }]);
    };

    const tire = () => {
      lock.current = true;
      walked = 0;
      setAction('bananaBones|sitDown');
      say({ e: '😮‍💨', t: 'Estoy cansado, jefe…' }, REST_MS);
      later(() => setAction('bananaBones|sit'), 500);
      later(() => {
        setAction('bananaBones|standUp');
        say({ e: '💪', t: '¡Here we go again!' });
      }, REST_MS);
      later(() => {
        lock.current = false;
        setAction(IDLE);
      }, REST_MS + 500);
    };

    const onScroll = () => {
      wake();
      if (lock.current) return;
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
      rotRef.current = -((e.clientX / window.innerWidth) * 2 - 1) * 0.5;
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
    say({ e: '👋', t: '¡Hola! Soy Banana Cat' }, 3000);
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
            say(SECTION_LINES[id], 3000);
          }
        }),
      { threshold: 0.35 }
    );
    Object.keys(SECTION_LINES).forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('keydown', wake);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('focusin', onOver);
    window.addEventListener('cat', onCat);
    arm();
    const pending = timers.current;
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', wake);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('focusin', onOver);
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
          aria-label="Banana Cat: mostrar acciones"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="absolute inset-0 cursor-pointer rounded-full"
        />

        {ACTIONS.map(({ label, icon: Icon, clip, ms, say: lines }, i) => (
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
        ))}

        <button
          type="button"
          title={muted ? 'Activar mensajes' : 'Silenciar mensajes'}
          aria-label={muted ? 'Activar mensajes' : 'Silenciar mensajes'}
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
          className={`absolute right-3 bottom-full mb-1 w-max max-w-[min(280px,calc(100vw-1.5rem))] origin-bottom-right transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${
            bubble.show ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
          }`}
        >
          <div className="relative flex items-center gap-3 rounded-2xl border border-accent/40 bg-background/90 py-2.5 pr-8 pl-2.5 shadow-[0_8px_30px_-8px_rgba(210,143,255,0.45)] backdrop-blur-md">
            <button
              type="button"
              aria-label="Cerrar mensaje"
              onClick={dismiss}
              className="absolute top-1.5 right-1.5 flex size-5 cursor-pointer items-center justify-center rounded-full text-dim transition-colors hover:bg-edge hover:text-bone"
            >
              <X className="size-3" />
            </button>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xl leading-none">
              {bubble.emoji}
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
              <button
                type="button"
                onClick={toggleMute}
                className="mt-0.5 cursor-pointer self-start text-[10px] text-dim transition-colors hover:text-bone"
              >
                No mostrar más
              </button>
            </div>
            <span className="absolute -bottom-1.25 right-8 size-2.5 rotate-45 border-r border-b border-accent/40 bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
}
