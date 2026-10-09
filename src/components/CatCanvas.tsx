'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Armchair, ArrowUp, Eye, Footprints, Hand, Zap, type LucideIcon } from 'lucide-react';
import BananaCat, { type ActionName } from '@/components/model/BananaCat';

const IDLE: ActionName = 'bananaBones|idle';

// ms = how long to hold the clip before going back to idle (clip lengths from the GLB).
const ACTIONS: { label: string; icon: LucideIcon; clip: ActionName; ms: number; pos: string }[] = [
  { label: 'Saludar', icon: Hand, clip: 'bananaBones|hiiiiiiiii', ms: 2000, pos: 'left-[6%] top-[18%]' },
  { label: 'Saltar', icon: ArrowUp, clip: 'bananaBones|jump', ms: 1800, pos: 'left-[2%] top-[45%]' },
  { label: 'Caminar', icon: Footprints, clip: 'bananaBones|walk', ms: 3000, pos: 'left-[6%] top-[72%]' },
  { label: 'Mirar', icon: Eye, clip: 'bananaBones|lookAround', ms: 4100, pos: 'right-[6%] top-[18%]' },
  { label: 'Sentarse', icon: Armchair, clip: 'bananaBones|sit', ms: 3000, pos: 'right-[2%] top-[45%]' },
  { label: 'Golpe', icon: Zap, clip: 'bananaBones|damaged', ms: 700, pos: 'right-[6%] top-[72%]' },
];

// The GLB is ~248 units tall (feet at y=0, centered on x/z), so scale 0.01 -> ~2.5 tall.
export default function CatCanvas() {
  const [action, setAction] = useState<ActionName>(IDLE);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const play = (clip: ActionName, ms: number) => {
    clearTimeout(timer.current);
    setAction(clip);
    timer.current = setTimeout(() => setAction(IDLE), ms);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 3]} intensity={1.6} />
        <pointLight position={[-3, 1, 2]} intensity={0.8} color="#d28fff" />
        <Suspense fallback={null}>
          <BananaCat actionName={action} scale={[0.01, 0.01, 0.01]} position={[0, -1.25, 0.15]} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
      {ACTIONS.map(({ label, icon: Icon, clip, ms, pos }) => (
        <button
          key={clip}
          type="button"
          aria-label={label}
          onClick={() => play(clip, ms)}
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
