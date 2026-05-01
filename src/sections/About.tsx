"use client";

import React, { useState } from "react";
import { FaSteam, FaDiscord } from "react-icons/fa";
import { FiCopy, FiCheck } from "react-icons/fi";
import { tags } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const CopyButton: React.FC<{ value: string; label: string; icon: React.ReactNode; copied: string | null; onCopy: (v: string) => void }> = ({
    value, label, icon, copied, onCopy,
}) => (
    <button
        onClick={() => onCopy(value)}
        className="flex items-center justify-between gap-3 px-3 py-2.5 rounded border border-white/5 hover:border-textPrimary/40 hover:bg-textPrimary/5 transition-all group/btn"
    >
        <div className="flex items-center gap-3">
            <span className="text-gray-500 group-hover/btn:text-textPrimary transition-colors">{icon}</span>
            <div className="text-left">
                <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">{label}</p>
                <p className="font-mono text-xs text-gray-300 mt-0.5">{value}</p>
            </div>
        </div>
        {copied === value
            ? <FiCheck size={12} className="text-textPrimary shrink-0" />
            : <FiCopy size={12} className="text-gray-700 group-hover/btn:text-gray-400 shrink-0" />
        }
    </button>
);

const About: React.FC = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section
            id="about"
            className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12"
        >
            {/* Section header */}
            <div className="flex items-center w-full mb-10">
                <span className="text-textPrimary font-mono text-lg mr-4">03.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Sobre mí</h2>
                <div className="flex-1 h-px bg-gray-700 ml-4" />
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
            >
                {/* ── CARRERA (2 cols) ─────────────────────────────────── */}
                <motion.div
                    variants={cardVariants}
                    className="md:col-span-2 relative border border-white/8 rounded-lg bg-white/[0.02] p-5 hover:border-textPrimary/30 hover:bg-white/[0.035] transition-all duration-300 overflow-hidden"
                >
                    {/* Eva stripe */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-textPrimary/50 to-transparent" />

                    <p className="font-mono text-[9px] text-textPrimary tracking-[0.3em] uppercase mb-4">
                        // Carrera
                    </p>
                    <div className="space-y-2.5 text-gray-400 text-sm leading-relaxed">
                        <p>
                            Soy <span className="text-white">Desarrollador Front-End</span> con 1 año de experiencia en web
                            y 3 como <span className="text-white">Ingeniero en Marketing</span>.
                            No me limito a un solo stack.
                        </p>
                        <p>
                            Estudio <span className="text-textPrimary">Flutter</span> en Desafío Latam
                            con una beca de <span className="text-textPrimary">Globant</span>.
                        </p>
                    </div>

                    {/* Status — sin verde, Eva style */}
                    <div className="mt-5 flex items-center gap-2">
                        <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
                        />
                        <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                            OPEN TO WORK · <span className="text-textPrimary">BOOKS&BITS</span>
                        </span>
                    </div>
                </motion.div>

                {/* ── CONECTEMOS (1 col) ────────────────────────────── */}
                <motion.div
                    variants={cardVariants}
                    className="relative border border-white/8 rounded-lg bg-white/[0.02] p-5 hover:border-textPrimary/30 hover:bg-white/[0.035] transition-all duration-300 flex flex-col gap-3 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-textPrimary/50 to-transparent" />

                    <p className="font-mono text-[9px] text-textPrimary tracking-[0.3em] uppercase">
                        // Conectemos
                    </p>

                    <CopyButton value="79456154" label="Steam ID" icon={<FaSteam size={15} />} copied={copied} onCopy={copy} />
                    <CopyButton value="vngerus" label="Discord" icon={<FaDiscord size={15} />} copied={copied} onCopy={copy} />

                    <p className="font-mono text-[9px] text-gray-700 mt-auto border-t border-white/5 pt-3 tracking-wide">
                        🐱 Luna · ☕ ex-barista · 🏋️ gym AM
                    </p>
                </motion.div>

                {/* ── STACK (full width) ───────────────────────────── */}
                <motion.div
                    variants={cardVariants}
                    className="md:col-span-3 relative border border-white/8 rounded-lg bg-white/[0.02] p-5 hover:border-textPrimary/30 hover:bg-white/[0.035] transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-textPrimary/50 to-transparent" />

                    <p className="font-mono text-[9px] text-textPrimary tracking-[0.3em] uppercase mb-5">
                        // Stack
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                        {tags.map((tag) => (
                            <motion.div
                                key={tag.id}
                                whileHover={{ y: -3, scale: 1.08 }}
                                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                                className="flex flex-col items-center gap-2 py-3 px-2 rounded-md cursor-default
                                    border border-white/5
                                    hover:border-textPrimary/40
                                    hover:bg-textPrimary/5
                                    hover:shadow-[0_0_14px_#d28fff20]
                                    transition-all duration-150"
                            >
                                <Image
                                    src={tag.icon}
                                    alt={tag.name}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="font-mono text-[9px] text-gray-500 text-center leading-tight">
                                    {tag.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
