'use client';
import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import BananaCat, { ActionName } from "./model/BananaCat";

const Signature: React.FC = () => {
    const [actionName, setActionName] = useState<ActionName>("bananaBones|hiiiiiiiii");
    const [energy, setEnergy] = useState<number>(100);
    const [isResting, setIsResting] = useState<boolean>(false);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const mouseMoveTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = () => {
        if (isResting) return;

        if (!isScrolling) {
            setIsScrolling(true);
            setActionName("bananaBones|walk");
        }

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
            setActionName("bananaBones|lookAround");
        }, 300);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResting || isScrolling) return;

        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element && (element.tagName === "A" || element.tagName === "BUTTON" || element.hasAttribute("data-interactive"))) {
            setActionName("bananaBones|lookAround");
        }

        if (mouseMoveTimeout.current) {
            clearTimeout(mouseMoveTimeout.current);
        }

        mouseMoveTimeout.current = setTimeout(() => {
            setActionName("bananaBones|idle");
        }, 2000);
    };

    useEffect(() => {
        setActionName("bananaBones|hiiiiiiiii");

        const greetTimeout = setTimeout(() => {
            setActionName("bananaBones|idle");
        }, 2000);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(greetTimeout);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            if (mouseMoveTimeout.current) clearTimeout(mouseMoveTimeout.current);
        };
    }, []);

    useEffect(() => {
        let energyInterval: NodeJS.Timeout | null = null;
        let restInterval: NodeJS.Timeout | null = null;

        if (isScrolling && !isResting) {
            energyInterval = setInterval(() => {
                setEnergy((prevEnergy) => {
                    const newEnergy = prevEnergy > 0 ? prevEnergy - 1 : 0;
                    if (newEnergy === 0) {
                        setIsResting(true);
                        setActionName("bananaBones|sitDown");
                        setTimeout(() => setActionName("bananaBones|sit"), 1000);
                    }
                    return newEnergy;
                });
            }, 100);
        }

        if (isResting) {
            restInterval = setInterval(() => {
                setEnergy((prevEnergy) => {
                    const newEnergy = prevEnergy < 100 ? prevEnergy + 2 : 100;
                    if (newEnergy === 100) {
                        setIsResting(false);
                        setActionName("bananaBones|idle");
                        clearInterval(restInterval!);
                    }
                    return newEnergy;
                });
            }, 100);
        }

        return () => {
            if (energyInterval) clearInterval(energyInterval);
            if (restInterval) clearInterval(restInterval);
        };
    }, [isScrolling, isResting]);

    return (
        <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end z-100">
            <div style={{ height: "100px", width: "50px" }}>
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <ambientLight intensity={1.4} />
                    <BananaCat
                        actionName={actionName}
                        position={[-0.2, -7.6, -10]}
                        scale={[0.07, 0.07, 0.07]}
                        rotation={[0.19, 0.05, 0]}
                    />
                </Canvas>
            </div>
            <div className="w-full h-2 bg-gray-300 mt-4">
                <div
                    className="h-full bg-green-500"
                    style={{ width: `${energy}%` }}
                ></div>
            </div>
            <div className="w-[2px] h-32 bg-white mt-6"></div>
        </div>
    );
};

export default Signature;
