import React from 'react';
import { useGLTF } from '@react-three/drei';

interface NeoTokyoDioramaProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

const NeoTokyoDiorama: React.FC<NeoTokyoDioramaProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) => {
  const { scene } = useGLTF('/models/neo-tokyo-diorama.glb');
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />;
};

useGLTF.preload('/models/neo-tokyo-diorama.glb');

export default NeoTokyoDiorama;
