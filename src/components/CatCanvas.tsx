'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Armchair, ArrowUp, Eye, Footprints, Hand, Zap, type LucideIcon } from 'lucide-react';
import BananaCat, { type ActionName } from '@/components/model/BananaCat';

type Phrase = { e: string; t: string };

const IDLE: ActionName = 'bananaBones|idle';

// ms = how long to hold the clip before going back to idle (clip lengths from the GLB).
const ACTIONS: { label: string; say: Phrase[]; icon: LucideIcon; clip: ActionName; ms: number; pos: string }[] = [
  { label: 'Saludar', say: [{ e: '👋', t: '¡Hola! Soy Banana Cat' }, { e: '🍌', t: '¡Bienvenido al portafolio!' }], icon: Hand, clip: 'bananaBones|hiiiiiiiii', ms: 2000, pos: 'left-[6%] top-[18%]' },
  { label: 'Saltar', say: [{ e: '🦘', t: '¡Hop!' }, { e: '🚀', t: '¡Más alto!' }], icon: ArrowUp, clip: 'bananaBones|jump', ms: 1800, pos: 'left-[2%] top-[45%]' },
  { label: 'Caminar', say: [{ e: '🚶', t: 'Voy a dar una vuelta…' }, { e: '👣', t: 'Paso a paso' }], icon: Footprints, clip: 'bananaBones|walk', ms: 3000, pos: 'left-[6%] top-[72%]' },
  { label: 'Mirar', say: [{ e: '👀', t: '¿Qué hay por aquí?' }, { e: '🤔', t: 'Mmm… interesante' }], icon: Eye, clip: 'bananaBones|lookAround', ms: 4100, pos: 'right-[6%] top-[18%]' },
  { label: 'Sentarse', say: [{ e: '😌', t: 'Un descansito' }, { e: '☕', t: 'Zzz… ¿me traes un café?' }], icon: Armchair, clip: 'bananaBones|sit', ms: 3000, pos: 'right-[2%] top-[45%]' },
  { label: 'Golpe', say: [{ e: '😵', t: '¡Auch!' }, { e: '💥', t: '¡Eso dolió!' }], icon: Zap, clip: 'bananaBones|damaged', ms: 700, pos: 'right-[6%] top-[72%]' },
];

// The GLB is ~248 units tall (feet at y=0, centered on x/z), so scale 0.01 -> ~2.5 tall.
export default function CatCanvas() {
  const [action, setAction] = useState<ActionName>(IDLE);
  const [bubble, setBubble] = useState({ emoji: '', text: '', show: false });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const clicks = useRef(0);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      clearTimeout(bubbleTimer.current);
    },
    []
  );

  const play = (clip: ActionName, ms: number, say: Phrase[]) => {
    clearTimeout(timer.current);
    clearTimeout(bubbleTimer.current);
    setAction(clip);
    const line = say[clicks.current++ % say.length];
    setBubble({ emoji: line.e, text: line.t, show: true });
    timer.current = setTimeout(() => setAction(IDLE), ms);
    // keep the bubble readable even for very short clips
    bubbleTimer.current = setTimeout(() => setBubble(b => ({ ...b, show: false })), Math.max(ms, 2200));
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 6.3], fov: 40 }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} />
        <pointLight position={[-3, 1, 2]} intensity={0.8} color="#d28fff" />
        <Suspense fallback={null}>
          <BananaCat actionName={action} scale={[0.01, 0.01, 0.01]} position={[0, -1.4, 0.15]} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div
        aria-live="polite"
        className={`pointer-events-none absolute top-4 left-1/2 w-max max-w-[70%] origin-bottom -translate-x-1/2 transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${
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
          <span className="absolute -bottom-1.25 left-1/2 size-2.5 -translate-x-1/2 rotate-45 border-r border-b border-accent/40 bg-background" />
        </div>
      </div>
      {ACTIONS.map(({ label, icon: Icon, clip, ms, pos, say }) => (
        <button
          key={clip}
          type="button"
          aria-label={label}
          onClick={() => play(clip, ms, say)}
          className={`group absolute ${pos} flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors ${
            action === clip
              ? 'border-accent bg-accent text-background'
              : 'border-edge bg-background/70 text-muted hover:border-accent hover:text-accent'
          }`}
        >
          <Icon className="size-5" />
          <span className="font-jetbrains pointer-events-none absolute top-full mt-1.5 text-[10px] tracking-[0.08em] whitespace-nowrap text-dim opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
    </>
  );
}
