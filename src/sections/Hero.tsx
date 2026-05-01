'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface TextGenerateProps {
    text: string;
    className?: string;
    delay?: number;
}

const TextGenerate: React.FC<TextGenerateProps> = ({ text, className = '', delay = 0 }) => {
    const words = text.split(' ');
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{
                        delay: delay + i * 0.06,
                        duration: 0.45,
                        ease: 'easeOut',
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const Hero: React.FC = () => {
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ctaRef.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.8 }
        );
    }, []);

    return (
        <section className="relative flex flex-col items-start justify-center min-h-[calc(100vh-4rem)] px-8 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
            {/* Aurora background */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-30"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% -20%, #6d448a55, transparent), radial-gradient(ellipse 60% 40% at 80% 80%, #d28fff22, transparent)',
                    animation: 'aurora 20s ease-in-out infinite alternate',
                }}
            />

            <div className="space-y-5 max-w-2xl">
                <motion.p
                    className="font-mono text-textPrimary text-base sm:text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Hola, mi nombre es
                </motion.p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                    <TextGenerate text="Angel Smith" delay={0.4} />
                </h1>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300">
                    <TextGenerate text="Desarrollador Front-End" delay={0.7} />
                </h2>

                <div className="relative max-w-xl">
                    <TextGenerate
                        text="Si bien me especializo en el Front, también me gusta el desarrollo Back-End. Actualmente trabajando en"
                        className="text-base sm:text-lg text-gray-400 leading-relaxed"
                        delay={1.0}
                    />
                    <motion.a
                        href="https://www.booksandbits.cl"
                        target="_blank"
                        rel="noreferrer"
                        className="text-textPrimary underline hover:text-accentWhite transition-colors ml-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.4 }}
                    >
                        Books&Bits
                    </motion.a>
                    <motion.span
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.75, duration: 0.3 }}
                    >
                        .
                    </motion.span>
                </div>

                <div ref={ctaRef} className="opacity-0 flex gap-4 pt-4">
                    <button
                        onClick={() => {
                            document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3 border border-textPrimary text-textPrimary font-mono text-sm rounded hover:bg-textPrimary/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Ver mi trabajo
                    </button>
                    <button
                        onClick={() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3 bg-textPrimary/10 text-textPrimary font-mono text-sm rounded hover:bg-textPrimary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 border border-textPrimary/30"
                    >
                        Contacto
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
