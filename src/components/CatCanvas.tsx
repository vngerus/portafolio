'use client';

import { Suspense, useRef, type MutableRefObject, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import BananaCat, { type ActionName } from '@/components/model/BananaCat';

// Turns the cat toward the cursor: eases group.rotation.y to rotRef.current.
function Follow({ rotRef, children }: { rotRef: MutableRefObject<number>; children: ReactNode }) {
  const group = useRef<Group>(null);
  useFrame(() => {
    if (group.current) group.current.rotation.y += (rotRef.current - group.current.rotation.y) * 0.08;
  });
  return <group ref={group}>{children}</group>;
}

// The GLB is ~248 units tall (feet at y=0, centered on x/z), so scale 0.01 -> ~2.5 tall.
export default function CatCanvas({
  action,
  rotRef,
}: {
  action: ActionName;
  rotRef: MutableRefObject<number>;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 40 }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <pointLight position={[-3, 1, 2]} intensity={0.8} color="#d28fff" />
      <Suspense fallback={null}>
        <Follow rotRef={rotRef}>
          <BananaCat actionName={action} scale={[0.01, 0.01, 0.01]} position={[0, -1.3, 0.15]} />
        </Follow>
      </Suspense>
    </Canvas>
  );
}
