'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import BananaCat, { ActionName } from './model/BananaCat';

// Energy drains fast, recovers slowly — cat must earn its rest.
const DRAIN_PER_TICK = 3;        // % por tick mientras camina
const DRAIN_INTERVAL = 80;       // ms por tick → ~37.5% por segundo
const RECOVER_PER_TICK = 1;      // % por tick en descanso
const RECOVER_INTERVAL = 200;    // ms por tick → 5% por segundo (20s para llegar a 100)

const SIT_ANIM_MS = 1500;        // duración de sitDown
const STAND_ANIM_MS = 1500;      // duración de standUp

type Phase = 'active' | 'sitting-down' | 'resting' | 'standing-up';

const Signature: React.FC = () => {
    const [actionName, setActionName] = useState<ActionName>('bananaBones|hiiiiiiiii');
    const [energy, setEnergy] = useState(100);
    const [phase, setPhase] = useState<Phase>('active');

    const phaseRef = useRef<Phase>('active');
    phaseRef.current = phase;

    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Greeting on load
    useEffect(() => {
        const t = setTimeout(() => {
            if (phaseRef.current === 'active') setActionName('bananaBones|idle');
        }, 2200);
        return () => clearTimeout(t);
    }, []);

    // ── Scroll handler ──────────────────────────────────────────────────────
    const handleScroll = useCallback(() => {
        if (phaseRef.current !== 'active') return;

        setActionName('bananaBones|walk');

        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => {
            if (phaseRef.current === 'active') setActionName('bananaBones|lookAround');
        }, 350);
    }, []);

    // ── Mouse handler ───────────────────────────────────────────────────────
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (phaseRef.current !== 'active') return;

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const isInteractive =
            el && (el.tagName === 'A' || el.tagName === 'BUTTON' || el.hasAttribute('data-interactive'));
        if (isInteractive) setActionName('bananaBones|lookAround');

        if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
        mouseTimerRef.current = setTimeout(() => {
            if (phaseRef.current === 'active') setActionName('bananaBones|idle');
        }, 2000);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
            if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
        };
    }, [handleScroll, handleMouseMove]);

    // ── Energy drain while walking ──────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'active' || actionName !== 'bananaBones|walk') return;

        const interval = setInterval(() => {
            setEnergy((prev) => {
                const next = prev - DRAIN_PER_TICK;
                if (next <= 0) {
                    clearInterval(interval);
                    // Transition to resting — all orders blocked from here
                    setPhase('sitting-down');
                    setActionName('bananaBones|sitDown');
                    setTimeout(() => {
                        setPhase('resting');
                        setActionName('bananaBones|sit');
                    }, SIT_ANIM_MS);
                    return 0;
                }
                return next;
            });
        }, DRAIN_INTERVAL);

        return () => clearInterval(interval);
    }, [phase, actionName]);

    // ── Energy recovery while resting (only stand up at 100%) ───────────────
    useEffect(() => {
        if (phase !== 'resting') return;

        const interval = setInterval(() => {
            setEnergy((prev) => {
                const next = Math.min(prev + RECOVER_PER_TICK, 100);
                if (next >= 100) {
                    clearInterval(interval);
                    // Stand up only when fully recovered
                    setPhase('standing-up');
                    setActionName('bananaBones|standUp');
                    setTimeout(() => {
                        setPhase('active');
                        setActionName('bananaBones|idle');
                    }, STAND_ANIM_MS);
                    return 100;
                }
                return next;
            });
        }, RECOVER_INTERVAL);

        return () => clearInterval(interval);
    }, [phase]);

    // ── Derived styles ──────────────────────────────────────────────────────
    const barColor =
        energy > 60
            ? 'from-green-400 to-emerald-300'
            : energy > 25
            ? 'from-yellow-400 to-amber-300'
            : 'from-red-500 to-rose-400';

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
            <div className="w-full px-1 mt-1" title={`Energía: ${energy}%`}>
                <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
                        animate={{ width: `${energy}%` }}
                        transition={{ duration: 0.25, ease: 'linear' }}
                    />
                    {/* Resting pulse */}
                    {phase === 'resting' && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/15"
                            animate={{ opacity: [0, 0.6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                        />
                    )}
                </div>
            </div>

            <div className="w-px h-20 bg-white/20 mt-3" />
        </div>
    );
};

export default Signature;
