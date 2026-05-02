'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '@/data';
import SysLabel from '@/components/SysLabel';

const CLIP = 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)';
const DOT_BG = {
    backgroundImage: 'radial-gradient(circle, rgba(110,68,138,0.07) 1px, transparent 1px)',
    backgroundSize: '18px 18px',
};

type Exp = (typeof experiences)[number];

const CardHeader: React.FC<{ exp: Exp; index: number }> = ({ exp, index }) => {
    const isActive = exp.duration.includes('Presente');
    return (
        <div className="flex items-center justify-between px-5 py-2.5 bg-buttonUnselected/20 border-b border-gray-700/40 shrink-0">
            <div className="flex items-center gap-2.5">
                <span className="font-mono text-[9px] text-textPrimary/50 tracking-[0.2em] uppercase">
                    OP_{String(index + 1).padStart(2, '0')}
                </span>
                <span className="w-px h-3 bg-gray-700" />
                {isActive ? (
                    <span className="flex items-center gap-1.5">
                        <motion.span
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                            className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
                        />
                        <span className="font-mono text-[8px] text-textPrimary/60 tracking-[0.2em] uppercase">ACTIVE</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600" />
                        <span className="font-mono text-[8px] text-gray-600 tracking-[0.2em] uppercase">ARCHIVED</span>
                    </span>
                )}
            </div>
            <span className="font-mono text-[10px] text-textPrimary/30 tracking-wider">
                [ {exp.duration} ]
            </span>
        </div>
    );
};

const ExperienceCard: React.FC<{ exp: Exp; index: number }> = ({ exp, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flipSource = useRef<'click' | 'hover' | null>(null);
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (isFlipped) return;
        hoverTimer.current = setTimeout(() => {
            flipSource.current = 'hover';
            setIsFlipped(true);
        }, 1600);
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (flipSource.current === 'hover') {
            flipSource.current = null;
            setIsFlipped(false);
        }
    };

    const handleClick = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (flipSource.current === 'click') {
            flipSource.current = null;
            setIsFlipped(false);
        } else {
            flipSource.current = 'click';
            setIsFlipped(true);
        }
    };

    useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

    return (
        <div
            style={{ perspective: '1200px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="flex-1 cursor-pointer select-none"
        >
            {/* Flip inner — grid stacks both faces so height = tallest face */}
            <div
                className="grid transition-[transform] duration-700 ease-in-out"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* ── FRONT ─────────────────────────────────────────── */}
                <div
                    className="[grid-area:1/1] group relative overflow-hidden border border-gray-700/60 hover:border-textPrimary/50 bg-background-secondary transition-colors duration-300 hover:shadow-[0_4px_32px_#d28fff18] flex flex-col"
                    style={{ clipPath: CLIP, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-textPrimary/40 to-transparent" />

                    <CardHeader exp={exp} index={index} />

                    <div className="relative p-5 md:p-6 flex-1" style={DOT_BG}>
                        {/* Corner brackets */}
                        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
                        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
                        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
                        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />

                        {/* Scan line */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="animate-nerv-scan" />
                        </div>

                        <div className="mb-4">
                            <p className="font-mono text-[8px] text-textPrimary/30 tracking-[0.25em] uppercase mb-1">CARGO</p>
                            <h3 className="text-base md:text-lg font-semibold text-white leading-tight">{exp.role}</h3>
                            <p className="text-textPrimary font-mono text-sm mt-0.5">@ {exp.company}</p>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">// INFORME</span>
                            <div className="flex-1 h-px bg-gray-700/40" />
                        </div>

                        <ul className="space-y-2.5">
                            {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="text-textPrimary/50 shrink-0 mt-[3px] text-xs">▸</span>
                                    <span className="text-gray-400 leading-relaxed font-mono text-[12px] tracking-wide">{h.text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Flip hint */}
                        <p className="mt-4 font-mono text-[8px] text-textPrimary/20 group-hover:text-textPrimary/40 transition-colors tracking-[0.2em] uppercase text-right">
                            CLIC · MANTENER PARA EXPANDIR →
                        </p>
                    </div>
                </div>

                {/* ── BACK ──────────────────────────────────────────── */}
                <div
                    className="[grid-area:1/1] relative overflow-hidden border border-textPrimary/25 bg-background-secondary flex flex-col"
                    style={{
                        clipPath: CLIP,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {/* Top accent — brighter on back */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-textPrimary/70 to-transparent" />

                    <CardHeader exp={exp} index={index} />

                    <div className="relative p-5 md:p-6 flex-1" style={DOT_BG}>
                        {/* Tech stack */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-[8px] text-textPrimary/50 tracking-[0.2em] uppercase">// TECH_STACK</span>
                            <div className="flex-1 h-px bg-textPrimary/20" />
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            {exp.tech.map((t) => (
                                <span
                                    key={t}
                                    className="font-mono text-[8px] text-textPrimary/60 tracking-[0.15em] uppercase border border-textPrimary/25 bg-textPrimary/5 px-2 py-0.5"
                                    style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Programs */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-[8px] text-textPrimary/50 tracking-[0.2em] uppercase">// PROGRAMAS</span>
                            <div className="flex-1 h-px bg-textPrimary/20" />
                        </div>
                        {exp.projects.length > 0 ? (
                            <ul className="space-y-1.5">
                                {exp.projects.map((p, i) => (
                                    <li key={i} className="flex items-center gap-2 font-mono text-xs text-gray-400">
                                        <span className="text-textPrimary/40">[ {String(i + 1).padStart(2, '0')} ]</span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="py-2 px-3 border border-dashed border-textPrimary/15">
                                <span className="font-mono text-[8px] text-textPrimary/25 tracking-[0.2em] uppercase animate-pulse">
                                    [ INSERTAR DATA ]
                                </span>
                            </div>
                        )}

                        {/* Back hint */}
                        <p className="mt-5 font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase text-right">
                            ← CLIC PARA VOLVER
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Experiences: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 75%', 'end 30%'],
    });
    const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    return (
        <section
            id="experiences"
            className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12"
        >
            <div className="flex flex-col w-full mb-12">
                <SysLabel left="// EXP_LOG" right="HISTORIAL DE DESPLIEGUES" />
                <div className="flex items-center w-full">
                    <span className="text-textPrimary font-mono text-lg mr-4">01.</span>
                    <h2 className="text-3xl font-bold text-white whitespace-nowrap">Donde he trabajado</h2>
                    <div className="flex-1 h-px bg-gray-700 ml-4" />
                </div>
            </div>

            <div ref={containerRef} className="relative w-full">
                {/* Track */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700/40" />
                {/* Animated beam */}
                <motion.div
                    className="absolute left-5 top-0 w-px bg-textPrimary/80 origin-top"
                    style={{ scaleY, height: '100%' }}
                />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="flex gap-6 mb-12 last:mb-0"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                    >
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 w-10 flex justify-center">
                            <div className="mt-[22px] w-3 h-3 rounded-full border-2 border-textPrimary bg-background shadow-[0_0_10px_#d28fff88] z-10" />
                        </div>

                        <ExperienceCard exp={exp} index={index} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experiences;
