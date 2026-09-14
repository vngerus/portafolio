'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import NeoTokyoDiorama from './model/NeoTokyoDiorama';

const RotatingGroup: React.FC<{
  scrollProgressRef: React.MutableRefObject<number>;
  children: React.ReactNode;
}> = ({ scrollProgressRef, children }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = scrollProgressRef.current * Math.PI * 2;
    groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (target * 0.4 - groupRef.current.rotation.x) * 0.06;
  });

  return <group ref={groupRef}>{children}</group>;
};

interface SceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

export default function Scene({ scrollProgressRef }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#e8332e" />
      <pointLight position={[-3, -1, 2]} intensity={0.35} color="#8a97a6" />
      <RotatingGroup scrollProgressRef={scrollProgressRef}>
        <NeoTokyoDiorama scale={[0.9, 0.9, 0.9]} />
      </RotatingGroup>
    </Canvas>
  );
}
