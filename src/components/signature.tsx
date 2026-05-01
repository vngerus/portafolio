'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import BananaCat, { ActionName } from './model/BananaCat';

const ENERGY_DRAIN_RATE = 100; // ms por tick
const ENERGY_RECOVER_RATE = 100; // ms por tick
const SIT_DOWN_DURATION = 1500; // ms que dura la animación sitDown
const STAND_UP_DURATION = 1500; // ms que dura la animación standUp

const Signature: React.FC = () => {
    const [actionName, setActionName] = useState<ActionName>('bananaBones|hiiiiiiiii');
    const [energy, setEnergy] = useState(100);
    const [phase, setPhase] = useState<'active' | 'sitting-down' | 'resting' | 'standing-up'>('active');

    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mouseMoveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const phaseRef = useRef(phase);
    phaseRef.current = phase;

    // Greeting on mount
    useEffect(() => {
        setActionName('bananaBones|hiiiiiiiii');
        const t = setTimeout(() => setActionName('bananaBones|idle'), 2000);
        return () => clearTimeout(t);
    }, []);

    // Scroll handler
    const handleScroll = useCallback(() => {
        if (phaseRef.current !== 'active') return;

        setActionName('bananaBones|walk');

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            if (phaseRef.current === 'active') {
                setActionName('bananaBones|lookAround');
            }
        }, 300);
    }, []);

    // Mouse handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (phaseRef.current !== 'active') return;

        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && (el.tagName === 'A' || el.tagName === 'BUTTON' || el.hasAttribute('data-interactive'))) {
            setActionName('bananaBones|lookAround');
        }

        if (mouseMoveTimeout.current) clearTimeout(mouseMoveTimeout.current);
        mouseMoveTimeout.current = setTimeout(() => {
            if (phaseRef.current === 'active') setActionName('bananaBones|idle');
        }, 2000);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            if (mouseMoveTimeout.current) clearTimeout(mouseMoveTimeout.current);
        };
    }, [handleScroll, handleMouseMove]);

    // Energy drain while walking
    useEffect(() => {
        if (phase !== 'active') return;

        const isWalking = actionName === 'bananaBones|walk';
        if (!isWalking) return;

        const interval = setInterval(() => {
            setEnergy((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    clearInterval(interval);
                    startResting();
                    return 0;
                }
                return next;
            });
        }, ENERGY_DRAIN_RATE);

        return () => clearInterval(interval);
    }, [phase, actionName]);

    // Energy recover while resting
    useEffect(() => {
        if (phase !== 'resting') return;

        const interval = setInterval(() => {
            setEnergy((prev) => {
                const next = Math.min(prev + 2, 100);
                if (next >= 100) {
                    clearInterval(interval);
                    startRecovering();
                    return 100;
                }
                return next;
            });
        }, ENERGY_RECOVER_RATE);

        return () => clearInterval(interval);
    }, [phase]);

    const startResting = () => {
        setPhase('sitting-down');
        setActionName('bananaBones|sitDown');
        setTimeout(() => {
            setPhase('resting');
            setActionName('bananaBones|sit');
        }, SIT_DOWN_DURATION);
    };

    const startRecovering = () => {
        setPhase('standing-up');
        setActionName('bananaBones|standUp');
        setTimeout(() => {
            setPhase('active');
            setActionName('bananaBones|idle');
        }, STAND_UP_DURATION);
    };

    const energyColor =
        energy > 50
            ? 'from-green-400 to-green-300'
            : energy > 20
            ? 'from-yellow-400 to-amber-300'
            : 'from-red-500 to-red-400';

    return (
        <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end z-50">
            <div style={{ height: '100px', width: '50px' }}>
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

            {/* Energy bar */}
            <div className="w-full px-1 mt-1">
                <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${energyColor}`}
                        animate={{ width: `${energy}%` }}
                        transition={{ duration: 0.3, ease: 'linear' }}
                        style={{ width: `${energy}%` }}
                    />
                    {phase === 'resting' && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/20"
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                        />
                    )}
                </div>
            </div>

            <div className="w-[1px] h-20 bg-white/30 mt-3" />
        </div>
    );
};

export default Signature;
