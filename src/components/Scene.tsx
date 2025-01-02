import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BananaCat from "./model/BananaCat";

export default function Scene() {
    return (
        <Canvas>
            <ambientLight />
            <OrbitControls />
            <BananaCat position={[0, 0, 0]} scale={[1, 1, 1]} />
        </Canvas>
    );
}
