'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BananaCat from '@/components/model/BananaCat';

// The GLB is ~248 units tall (feet at y=0, centered on x/z), so scale 0.01 -> ~2.5 tall.
export default function CatCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <pointLight position={[-3, 1, 2]} intensity={0.8} color="#d28fff" />
      <Suspense fallback={null}>
        <BananaCat
          actionName="bananaBones|idle"
          scale={[0.01, 0.01, 0.01]}
          position={[0, -1.25, 0.15]}
        />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}
