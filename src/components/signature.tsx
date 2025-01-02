"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BananaCat from "./model/BananaCat";

const Signature: React.FC = () => {
    return (
        <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end">

            <div style={{ height: "100px", width: "50px" }}>
                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={0.7} />
                    <BananaCat scale={[1.5, 0.5, 0.5]} position={[0, -1, 0]} />
                    <OrbitControls enablePan={false} enableZoom={false} />
                </Canvas>
            </div>

            <div className="w-[2px] h-32 bg-white mt-6"></div>
        </div>
    );
};

export default Signature;
