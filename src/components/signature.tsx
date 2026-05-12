'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import BananaCat, { ActionName } from './model/BananaCat';

const DRAIN_PER_TICK   = 3;
const DRAIN_INTERVAL   = 80;
const RECOVER_PER_TICK = 1;
const RECOVER_INTERVAL = 200;
const SIT_ANIM_MS      = 1500;
const STAND_ANIM_MS    = 1500;

type Phase = 'active' | 'glitching' | 'sitting-down' | 'resting' | 'standing-up';
type DialogVariant = 'greeting' | 'curious' | 'tired' | 'glitch' | 'ready';

const CLIP = 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)';

const GLITCH_SEQUENCE: ActionName[] = [
    'bananaBones|walk', 'bananaBones|lookAround',
    'bananaBones|idle', 'bananaBones|walk',
    'bananaBones|lookAround', 'bananaBones|idle',
];

// ── FollowGroup — wrapper que lerp la rotación Y hacia el cursor ──────────
// Definido fuera del componente para tener acceso al contexto R3F (useFrame).
const FollowGroup: React.FC<{
    targetRef: React.MutableRefObject<number>;
    enabled:   boolean;
    children:  React.ReactNode;
}> = ({ targetRef, enabled, children }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        const target = enabled ? targetRef.current : 0.05;
        // Lerp suave hacia el objetivo (factor 0.06 = ~60ms de respuesta)
        groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * 0.06;
    });

    return <group ref={groupRef}>{children}</group>;
};

// ── Dialog ─────────────────────────────────────────────────────────────────
const WavingHand: React.FC = () => (
    <motion.span
        className="inline-block origin-bottom-right ml-1"
        animate={{ rotate: [0, 22, -8, 22, 0] }}
        transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', repeatDelay: 0.4 }}
    >
        👋
    </motion.span>
);

const Dialog: React.FC<{ msg: string; variant: DialogVariant }> = ({ msg, variant }) => {
    const pulseProps =
        variant === 'glitch'   ? { animate: { opacity: [1, 0, 1, 0, 1, 0.3, 1] }, transition: { repeat: Infinity, duration: 0.3,  ease: 'linear'    as const, times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1] } } :
        variant === 'tired'    ? { animate: { opacity: [1, 0.5, 1] },              transition: { repeat: Infinity, duration: 2.4,  ease: 'easeInOut' as const } } :
        variant === 'greeting' ? { animate: { opacity: [1, 0.7, 1] },              transition: { repeat: Infinity, duration: 0.9,  ease: 'easeInOut' as const } } :
        variant === 'curious'  ? { animate: { opacity: [1, 0.6, 1] },              transition: { repeat: Infinity, duration: 0.6,  ease: 'easeInOut' as const } } :
                                 { animate: { opacity: [1, 0.6, 1] },              transition: { repeat: Infinity, duration: 1.4,  ease: 'easeInOut' as const } };

    return (
        <div
            className="relative border border-textPrimary/40 bg-[#0a0825]/95 px-3 py-2.5 backdrop-blur-sm"
            style={{ clipPath: CLIP }}
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-textPrimary/50 to-transparent" />
            <p className="font-mono text-[7px] text-textPrimary/40 tracking-[0.2em] uppercase mb-1">
                {variant === 'glitch' ? '// ERR_MSG' : '// SYS_MSG'}
            </p>
            <motion.p
                className={`font-mono text-[10px] leading-relaxed ${
                    variant === 'glitch' ? 'text-red-400' : 'text-gray-300'
                }`}
                {...pulseProps}
            >
                {msg}
                {variant === 'greeting' && <WavingHand />}
            </motion.p>
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-textPrimary/40" />
        </div>
    );
};

// ── Signature ──────────────────────────────────────────────────────────────
const Signature: React.FC = () => {
    const [actionName, setActionName]       = useState<ActionName>('bananaBones|hiiiiiiiii');
    const [energy, setEnergy]               = useState(100);
    const [phase, setPhase]                 = useState<Phase>('active');
    const [isGlitching, setIsGlitching]     = useState(false);
    const [dialogMsg, setDialogMsg]         = useState('');
    const [dialogVariant, setDialogVariant] = useState<DialogVariant>('greeting');
    const [dialogVisible, setDialogVisible] = useState(false);

    const phaseRef        = useRef<Phase>('active');
    phaseRef.current      = phase;
    const hasRestedRef    = useRef(false);
    const scrollTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mouseTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dialogTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Rotación Y objetivo para el seguimiento del cursor (-0.35 a 0.35 rad)
    const targetRotYRef   = useRef(0.05);

    useEffect(() => {
        setDialogMsg("yooo'");
        setDialogVariant('greeting');
        setDialogVisible(true);
        const hideGreeting = setTimeout(() => setDialogVisible(false), 3200);
        const goIdle       = setTimeout(() => {
            if (phaseRef.current === 'active') setActionName('bananaBones|idle');
        }, 2200);
        return () => { clearTimeout(hideGreeting); clearTimeout(goIdle); };
    }, []);

    const handleScroll = useCallback(() => {
        if (phaseRef.current !== 'active') return;
        setActionName('bananaBones|walk');
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => {
            if (phaseRef.current === 'active') setActionName('bananaBones|lookAround');
        }, 350);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (phaseRef.current !== 'active') return;

        // Mapear cursor X a rotación Y: izquierda = +0.35, derecha = -0.35
        const normalized = (e.clientX / window.innerWidth) * 2 - 1;
        targetRotYRef.current = -normalized * 0.35 + 0.05;

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const isInteractive = el && (
            el.tagName === 'A' || el.tagName === 'BUTTON' || el.hasAttribute('data-interactive')
        );
        if (isInteractive) setActionName('bananaBones|lookAround');
        if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
        mouseTimerRef.current = setTimeout(() => {
            if (phaseRef.current === 'active') {
                targetRotYRef.current = 0.05; // vuelve al centro
                setActionName('bananaBones|idle');
            }
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

    useEffect(() => {
        if (phase !== 'active' || actionName !== 'bananaBones|walk') return;
        const interval = setInterval(() => {
            setEnergy(prev => {
                const next = prev - DRAIN_PER_TICK;
                if (next <= 0) {
                    clearInterval(interval);
                    phaseRef.current = 'glitching';
                    setPhase('glitching');
                    return 0;
                }
                return next;
            });
        }, DRAIN_INTERVAL);
        return () => clearInterval(interval);
    }, [phase, actionName]);

    useEffect(() => {
        if (phase !== 'glitching') return;
        setIsGlitching(true);
        setDialogMsg('// ERR · SOBRECARGA');
        setDialogVariant('glitch');
        setDialogVisible(true);
        let i = 0;
        const interval = setInterval(() => {
            setActionName(GLITCH_SEQUENCE[i % GLITCH_SEQUENCE.length]);
            i++;
            if (i >= GLITCH_SEQUENCE.length) {
                clearInterval(interval);
                setIsGlitching(false);
                phaseRef.current = 'sitting-down';
                setPhase('sitting-down');
                setActionName('bananaBones|sitDown');
                setTimeout(() => {
                    phaseRef.current = 'resting';
                    setPhase('resting');
                    setActionName('bananaBones|sit');
                }, SIT_ANIM_MS);
            }
        }, 110);
        return () => clearInterval(interval);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'resting') return;
        const interval = setInterval(() => {
            setEnergy(prev => {
                const next = Math.min(prev + RECOVER_PER_TICK, 100);
                if (next >= 100) {
                    clearInterval(interval);
                    phaseRef.current = 'standing-up';
                    setPhase('standing-up');
                    setActionName('bananaBones|standUp');
                    setTimeout(() => {
                        phaseRef.current = 'active';
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

    useEffect(() => {
        if (phase === 'resting') {
            hasRestedRef.current = true;
            if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
            setDialogMsg('Estoy cansado, jefe...');
            setDialogVariant('tired');
            setDialogVisible(true);
        } else if (phase === 'active' && hasRestedRef.current) {
            hasRestedRef.current = false;
            setDialogMsg('¡Here we go again!');
            setDialogVariant('ready');
            setDialogVisible(true);
            dialogTimerRef.current = setTimeout(() => setDialogVisible(false), 3000);
        }
        return () => { if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current); };
    }, [phase]);

    useEffect(() => {
        if (actionName !== 'bananaBones|lookAround' || phase !== 'active') return;
        if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
        setDialogMsg('eh eh ¿viste eso??');
        setDialogVariant('curious');
        setDialogVisible(true);
        dialogTimerRef.current = setTimeout(() => setDialogVisible(false), 2200);
        return () => { if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current); };
    }, [actionName, phase]);

    const barColor =
        energy > 60 ? 'from-green-400 to-emerald-300' :
        energy > 25 ? 'from-yellow-400 to-amber-300'  :
                      'from-red-500 to-rose-400';

    return (
        <>
            <AnimatePresence>
                {dialogVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed right-[58px] bottom-[110px] w-[160px] z-50"
                    >
                        <Dialog msg={dialogMsg} variant={dialogVariant} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end z-50">
                <div
                    style={{ height: '100px', width: '50px' }}
                    className={isGlitching ? 'animate-nerv-glitch' : ''}
                >
                    <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                        <ambientLight intensity={1.4} />
                        {/* FollowGroup intercepta el useFrame del Canvas
                            y lerp la rotación Y del gato hacia el cursor */}
                        <FollowGroup
                            targetRef={targetRotYRef}
                            enabled={phase === 'active'}
                        >
                            <BananaCat
                                actionName={actionName}
                                position={[-0.2, -7.6, -10]}
                                scale={[0.07, 0.07, 0.07]}
                                rotation={[0.19, 0, 0]}
                            />
                        </FollowGroup>
                    </Canvas>
                </div>

                <div className="w-full px-1 mt-1" title={`Energía: ${energy}%`}>
                    <div className={`relative h-1.5 bg-gray-800 rounded-full overflow-hidden ${isGlitching ? 'animate-nerv-glitch' : ''}`}>
                        <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
                            animate={{ width: `${energy}%` }}
                            transition={{ duration: 0.25, ease: 'linear' }}
                        />
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
        </>
    );
};

export default Signature;
