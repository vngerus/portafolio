'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import BananaCat, { type ActionName } from '@/components/model/BananaCat';

// The GLB is ~248 units tall (feet at y=0, centered on x/z), so scale 0.01 -> ~2.5 tall.
export default function CatCanvas({ action }: { action: ActionName }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 40 }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <pointLight position={[-3, 1, 2]} intensity={0.8} color="#d28fff" />
      <Suspense fallback={null}>
        <BananaCat actionName={action} scale={[0.01, 0.01, 0.01]} position={[0, -1.3, 0.15]} />
      </Suspense>
    </Canvas>
  );
}
