'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BananaCat from '@/components/model/BananaCat';

export default function CatCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.6, 4], fov: 40 }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <pointLight position={[-3, 1, 2]} intensity={0.8} color="#d28fff" />
      <BananaCat />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}
