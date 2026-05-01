'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '@/data';
import SysLabel from '@/components/SysLabel';

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

            {/*
                Layout: dos columnas flex.
                Columna izquierda = w-10 (40px) → centro en 20px = left-5 de la línea.
                Esto garantiza que el dot quede exactamente sobre la línea.
            */}
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
                        {/* Dot column — w-10 centrado = 20px desde la izq = sobre la línea */}
                        <div className="flex-shrink-0 w-10 flex justify-center">
                            <div className="mt-[22px] w-3 h-3 rounded-full border-2 border-textPrimary bg-background shadow-[0_0_10px_#d28fff88] z-10" />
                        </div>

                        {/* Card */}
                        <div className="flex-1 group border border-gray-700/60 hover:border-textPrimary/40 rounded-xl p-5 md:p-6 bg-background-secondary transition-all duration-300 hover:shadow-[0_4px_24px_#d28fff12]">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                                <div>
                                    <p className="font-mono text-[9px] text-textPrimary/40 tracking-[0.2em] uppercase mb-1">
                                        OP_{String(index + 1).padStart(2, '0')}
                                    </p>
                                    <h3 className="text-base md:text-lg font-semibold text-white leading-tight">
                                        {exp.role}
                                    </h3>
                                    <p className="text-textPrimary font-mono text-sm mt-0.5">
                                        @ {exp.company}
                                    </p>
                                </div>
                                <span className="font-mono text-[11px] text-textPrimary/40 tracking-wider whitespace-nowrap mt-1 sm:mt-0.5">
                                    [ {exp.duration} ]
                                </span>
                            </div>

                            <ul className="space-y-2 mt-3 border-t border-gray-700/40 pt-3">
                                {exp.description.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed"
                                    >
                                        <span className="text-textPrimary/70 shrink-0 mt-[3px] text-xs">▸</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experiences;
