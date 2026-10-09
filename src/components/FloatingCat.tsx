'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Armchair, ArrowUp, Eye, Footprints, Hand, Zap, type LucideIcon } from 'lucide-react';
import type { ActionName } from '@/components/model/BananaCat';

const CatCanvas = dynamic(() => import('@/components/CatCanvas'), { ssr: false });

type Phrase = { e: string; t: string };

const IDLE: ActionName = 'bananaBones|idle';

// ms = how long to hold the clip before going back to idle (clip lengths from the GLB).
const ACTIONS: { label: string; say: Phrase[]; icon: LucideIcon; clip: ActionName; ms: number }[] = [
  { label: 'Saludar', say: [{ e: '👋', t: '¡Hola! Soy Banana Cat' }, { e: '🍌', t: '¡Bienvenido al portafolio!' }], icon: Hand, clip: 'bananaBones|hiiiiiiiii', ms: 2000 },
  { label: 'Saltar', say: [{ e: '🦘', t: '¡Hop!' }, { e: '🚀', t: '¡Más alto!' }], icon: ArrowUp, clip: 'bananaBones|jump', ms: 1800 },
  { label: 'Caminar', say: [{ e: '🚶', t: 'Voy a dar una vuelta…' }, { e: '👣', t: 'Paso a paso' }], icon: Footprints, clip: 'bananaBones|walk', ms: 3000 },
  { label: 'Mirar', say: [{ e: '👀', t: '¿Qué hay por aquí?' }, { e: '🤔', t: 'Mmm… interesante' }], icon: Eye, clip: 'bananaBones|lookAround', ms: 4100 },
  { label: 'Sentarse', say: [{ e: '😌', t: 'Un descansito' }, { e: '☕', t: 'Zzz… ¿me traes un café?' }], icon: Armchair, clip: 'bananaBones|sit', ms: 3000 },
  { label: 'Golpe', say: [{ e: '😵', t: '¡Auch!' }, { e: '💥', t: '¡Eso dolió!' }], icon: Zap, clip: 'bananaBones|damaged', ms: 700 },
];

// Icons fan out on a quarter circle: left of the cat (180°) up to above it (270°).
const FAN = ACTIONS.map((_, i) => {
  const a = (Math.PI * (180 + (90 / (ACTIONS.length - 1)) * i)) / 180;
  return { x: Math.cos(a), y: Math.sin(a) };
});

export default function FloatingCat() {
  const [action, setAction] = useState<ActionName>(IDLE);
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState({ emoji: '', text: '', show: false });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const clicks = useRef(0);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      clearTimeout(bubbleTimer.current);
    },
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const play = (clip: ActionName, ms: number, say: Phrase[]) => {
    clearTimeout(timer.current);
    clearTimeout(bubbleTimer.current);
    setOpen(false);
    setAction(clip);
    const line = say[clicks.current++ % say.length];
    setBubble({ emoji: line.e, text: line.t, show: true });
    timer.current = setTimeout(() => setAction(IDLE), ms);
    // keep the bubble readable even for very short clips
    bubbleTimer.current = setTimeout(() => setBubble(b => ({ ...b, show: false })), Math.max(ms, 2200));
  };

  return (
    <div className="fixed right-3 bottom-3 z-30 [--r:84px] md:right-6 md:bottom-6 md:[--r:128px]">
      <div className="relative h-28 w-22 md:h-56 md:w-44">
        <CatCanvas action={action} />
        <button
          type="button"
          aria-label="Banana Cat: mostrar acciones"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="absolute inset-0 cursor-pointer rounded-full"
        />

        {ACTIONS.map(({ label, icon: Icon, clip, ms, say }, i) => (
          <button
            key={clip}
            type="button"
            title={label}
            aria-label={label}
            tabIndex={open ? 0 : -1}
            onClick={() => play(clip, ms, say)}
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

        <div
          aria-live="polite"
          className={`pointer-events-none absolute right-0 bottom-full mb-1 w-max max-w-[min(260px,calc(100vw-1.5rem))] origin-bottom-right transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${
            bubble.show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <div className="relative flex items-center gap-3 rounded-2xl border border-accent/40 bg-background/90 py-2.5 pr-4 pl-2.5 shadow-[0_8px_30px_-8px_rgba(210,143,255,0.45)] backdrop-blur-md">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xl leading-none">
              {bubble.emoji}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-jetbrains text-[9px] tracking-[0.14em] text-accent">BANANA CAT</span>
              <span className="text-sm leading-tight text-bone">{bubble.text}</span>
            </div>
            <span className="absolute -bottom-1.25 right-8 size-2.5 rotate-45 border-r border-b border-accent/40 bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
}
