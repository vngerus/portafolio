'use client';
import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import BananaCat from "./model/BananaCat";

type ActionName =
    | "bananaBones|hiiiiiiiii"
    | "bananaBones|idle"
    | "bananaBones|walk"
    | "bananaBones|jump"
    | "bananaBones|lookAround"
    | "bananaBones|sitDown"
    | "bananaBones|sit"
    | "bananaBones|standUp"
    | "bananaBones|damaged";

const Signature: React.FC = () => {
    const [actionName, setActionName] = useState<ActionName>("bananaBones|idle");

    const scale = 0.07;
    const positionX = -0.2;
    const positionY = -7.6;
    const positionZ = -10;
    const rotationX = 0.19;
    const rotationY = 0.05;
    const rotationZ = 0;

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        if (scrollPercentage > 50) {
            setActionName("bananaBones|walk");
        } else {
            setActionName("bananaBones|idle");
        }

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            setActionName("bananaBones|idle");
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end z-100">
            <div style={{ height: "100px", width: "50px" }}>
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <ambientLight intensity={1.4} />
                    <BananaCat
                        position={[positionX, positionY, positionZ]}
                        scale={[scale, scale, scale]}
                        rotation={[rotationX, rotationY, rotationZ]}
                        actionName={actionName}
                    />
                </Canvas>
            </div>
            <div className="w-[2px] h-32 bg-white mt-6"></div>
        </div>
    );
};

export default Signature;
