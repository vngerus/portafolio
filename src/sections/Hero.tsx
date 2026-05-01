'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useTextScramble } from '@/hooks/useTextScramble';

// Word-by-word blur reveal
const TextGenerate: React.FC<{ text: string; className?: string; delay?: number }> = ({
    text, className = '', delay = 0,
}) => (
    <span className={className}>
        {text.split(' ').map((word, i) => (
            <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ delay: delay + i * 0.06, duration: 0.45, ease: 'easeOut' }}
            >
                {word}
            </motion.span>
        ))}
    </span>
);

// "Angel Smith" starts INVISIBLE → resolves from Japanese → English.
const ScrambleName: React.FC = () => {
    const display = useTextScramble('Angel Smith', 1100, 80);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <span
            className="font-jetbrains tracking-wide"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.05s' }}
            suppressHydrationWarning
        >
            {display}
        </span>
    );
};

// Blinking cursor for the system label
const Cursor: React.FC = () => (
    <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1, ease: 'steps(1)' }}
        className="inline-block w-[7px] h-[11px] bg-textPrimary/70 ml-1 align-middle"
    />
);

const Hero: React.FC = () => {
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ctaRef.current;
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.2,
        });
    }, []);

    return (
        <section className="relative flex flex-col items-start justify-center min-h-[calc(100vh-4rem)] px-8 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
            {/* Aurora */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-25"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% -20%, #6d448a55, transparent),' +
                        'radial-gradient(ellipse 60% 40% at 80% 80%, #d28fff22, transparent)',
                    animation: 'aurora 20s ease-in-out infinite alternate',
                }}
            />

            <div className="space-y-5 max-w-2xl">

                {/* System status label */}
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                >
                    <span className="font-mono text-[9px] text-textPrimary/50 tracking-[0.3em] uppercase">
                        // SYS_INIT
                    </span>
                    <span className="w-8 h-px bg-textPrimary/20" />
                    <span className="font-mono text-[9px] text-textPrimary/30 tracking-[0.2em] uppercase">
                        PILOT_TERMINAL
                    </span>
                    <Cursor />
                </motion.div>

                {/* Greeting */}
                <motion.p
                    className="font-mono text-textPrimary/80 text-sm sm:text-base"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span className="text-textPrimary/40 mr-2 select-none">&gt;</span>
                    Hola, mi nombre es
                </motion.p>

                {/* Name resolves from Japanese on load */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                    <ScrambleName />
                </h1>

                {/* Role */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300">
                    <TextGenerate text="[ Desarrollador Front-End ]" delay={0.9} />
                </h2>

                {/* Description */}
                <div className="max-w-xl">
                    <TextGenerate
                        text="Especializado en Front, con gusto por el Back-End. Actualmente trabajando en"
                        className="text-sm sm:text-base text-gray-400 leading-relaxed"
                        delay={1.2}
                    />
                    <motion.a
                        href="https://www.booksandbits.cl"
                        target="_blank"
                        rel="noreferrer"
                        className="text-textPrimary underline hover:text-accentWhite transition-colors ml-1 text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.0, duration: 0.4 }}
                    >
                        Books&Bits
                    </motion.a>
                    <motion.span
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.05, duration: 0.3 }}
                    >
                        .
                    </motion.span>
                </div>

                {/* CTAs */}
                <div ref={ctaRef} className="opacity-0 flex gap-4 pt-4">
                    <button
                        onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-6 py-2.5 border border-textPrimary text-textPrimary font-mono text-sm rounded hover:bg-textPrimary/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        [ Iniciar Secuencia ]
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-6 py-2.5 bg-textPrimary/10 text-textPrimary font-mono text-sm rounded hover:bg-textPrimary/20 transition-all hover:-translate-y-0.5 border border-textPrimary/30"
                    >
                        Contacto
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
