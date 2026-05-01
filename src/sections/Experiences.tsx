'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experiences } from '@/data';

const Experiences: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 20%'],
    });
    const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

    return (
        <section
            id="experiences"
            className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12"
        >
            <div className="flex items-center w-full mb-12">
                <span className="text-textPrimary font-mono text-lg mr-4">01.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Donde he trabajado</h2>
                <div className="flex-1 h-px bg-gray-700 ml-4" />
            </div>

            <div ref={containerRef} className="relative w-full pl-10 md:pl-16">
                {/* Track background */}
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gray-700" />

                {/* Animated beam */}
                <motion.div
                    className="absolute left-4 md:left-6 top-0 w-px bg-textPrimary origin-top shadow-[0_0_8px_#d28fff]"
                    style={{ scaleY, height: '100%' }}
                />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="relative mb-12 last:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                    >
                        {/* Dot */}
                        <div className="absolute -left-[2.15rem] md:-left-[2.6rem] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-textPrimary shadow-[0_0_8px_#d28fff]" />

                        {/* Card */}
                        <div className="group border border-gray-700 hover:border-textPrimary/50 rounded-lg p-6 bg-background-secondary transition-all duration-300 hover:shadow-[0_0_20px_#d28fff15]">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-lg md:text-xl font-semibold text-white">
                                    {exp.role}{' '}
                                    <span className="text-textPrimary">@ {exp.company}</span>
                                </h3>
                                <span className="font-mono text-xs text-gray-500 mt-1 sm:mt-0">
                                    {exp.duration}
                                </span>
                            </div>
                            <ul className="space-y-1.5 mt-3">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                                        <span className="text-textPrimary mt-1 shrink-0">▸</span>
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
