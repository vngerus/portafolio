'use client';
import React from "react";
import { Canvas } from "@react-three/fiber";
import BananaCat from "./model/BananaCat";

const Signature: React.FC = () => {

    const scale = 0.07;
    const positionX = -0.2;
    const positionY = -7.6;
    const positionZ = -10;
    const rotationX = 0.19;
    const rotationY = 0.05;
    const rotationZ = 0;

    return (
        <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end z-100">
            <div style={{ height: "100px", width: "50px" }}>
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <ambientLight intensity={1.4} />
                    <BananaCat
                        position={[positionX, positionY, positionZ]}
                        scale={[scale, scale, scale]}
                        rotation={[rotationX, rotationY, rotationZ]}
                        actionName="bananaBones|idle"
                    />
                </Canvas>
            </div>
            <div className="w-[2px] h-32 bg-white mt-6"></div>
        </div>
    );
};

export default Signature;
