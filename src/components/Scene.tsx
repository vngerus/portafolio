"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Scene = () => (
    <Canvas>
        <ambientLight />
        <OrbitControls />
    </Canvas>
);

export default Scene;
