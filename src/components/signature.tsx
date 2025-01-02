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
    const [actionName, setActionName] = useState<ActionName>("bananaBones|hiiiiiiiii");
    const [energy, setEnergy] = useState<number>(100);
    const [isEnergyFull, setIsEnergyFull] = useState<boolean>(true);
    const scale = 0.07;
    const positionX = -0.2;
    const positionY = -7.6;
    const positionZ = -10;
    const rotationX = 0.19;
    const rotationY = 0.05;
    const rotationZ = 0;

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const mouseMoveTimeout = useRef<NodeJS.Timeout | null>(null);

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

    const handleMouseMove = () => {
        setActionName("bananaBones|lookAround");

        if (mouseMoveTimeout.current) {
            clearTimeout(mouseMoveTimeout.current);
        }

        mouseMoveTimeout.current = setTimeout(() => {
            setActionName("bananaBones|idle");
        }, 2000);
    };

    useEffect(() => {
        let energyInterval: NodeJS.Timeout;
        let restInterval: NodeJS.Timeout;

        if (actionName === "bananaBones|walk" && energy > 0) {
            energyInterval = setInterval(() => {
                setEnergy(prevEnergy => (prevEnergy > 0 ? prevEnergy - 2 : 0));
            }, 50);
        } else if (energy <= 0) {
            setActionName("bananaBones|sit");
            setIsEnergyFull(false);
            restInterval = setInterval(() => {
                setEnergy(prevEnergy => (prevEnergy < 100 ? prevEnergy + 1 : 100));
            }, 100);
        } else if (actionName === "bananaBones|idle" && energy < 100) {
            const recoveryInterval = setInterval(() => {
                setEnergy(prevEnergy => (prevEnergy < 100 ? prevEnergy + 0.5 : 100));
            }, 100);

            return () => clearInterval(recoveryInterval);
        }

        if (energy === 100 && !isEnergyFull) {
            setActionName("bananaBones|walk");
            setIsEnergyFull(true);
        }

        return () => {
            clearInterval(energyInterval);
            clearInterval(restInterval);
        };
    }, [actionName, energy, isEnergyFull]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            if (mouseMoveTimeout.current) {
                clearTimeout(mouseMoveTimeout.current);
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
