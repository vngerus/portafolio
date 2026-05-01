"use client";

import React, { useState } from "react";
import { FaSteam, FaDiscord, FaCopy } from "react-icons/fa";
import { tags } from "@/data";
import Image from "next/image";
import { useGsapStagger } from "@/hooks/useGsapReveal";

const About: React.FC = () => {
    const [copied, setCopied] = useState<string | null>(null);
    const gridRef = useGsapStagger<HTMLDivElement>('.about-card', {
        y: 40,
        stagger: 0.15,
        start: 'top 80%',
    });

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section
            id="about"
            className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12"
        >
            <div className="flex items-center w-full mb-8">
                <span className="text-textPrimary font-mono text-lg mr-4">03.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Sobre mí</h2>
                <div className="flex-1 h-px bg-gray-700 ml-4" />
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto">
                <div className="about-card border border-textSecondary p-6 rounded-lg bg-background-secondary flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-textPrimary mb-4">💻 Carrera</h3>
                    <p className="text-light leading-relaxed">
                        Actualmente soy{' '}
                        <span className="text-textPrimary font-medium">Desarrollador Front-End</span>,
                        aunque también disfruto trabajar y seguir aprendiendo un poco más sobre el{' '}
                        <span className="text-textPrimary font-medium">Back-End</span>. Tengo 1 año
                        de experiencia en el desarrollo web, y cuento con 3 años como{' '}
                        <span className="text-textPrimary font-medium">Ingeniero en Marketing</span>.
                    </p>
                    <p className="mt-4 text-light leading-relaxed">
                        Trabajé en una{' '}
                        <span className="text-textPrimary font-medium">StartUp</span>, donde participé
                        en múltiples proyectos que me permitieron adquirir{' '}
                        <span className="text-textPrimary font-medium">habilidades versátiles</span> y
                        experiencia práctica en el desarrollo de aplicaciones.
                    </p>
                    <p className="mt-4 text-light leading-relaxed">
                        Actualmente, estoy estudiando{' '}
                        <span className="text-textPrimary font-medium">Flutter</span> en Desafío Latam
                        gracias a una{' '}
                        <span className="text-textPrimary font-medium">beca otorgada por Globant</span>
                        , con el objetivo de seguir creciendo profesionalmente.
                    </p>
                </div>

                <div className="about-card border border-textSecondary p-6 rounded-lg bg-background-secondary flex flex-col justify-between h-full">
                    <h3 className="text-xl font-bold text-textPrimary mb-4">👋 Mi lado personal</h3>
                    <p className="text-light leading-relaxed">
                        Me llamo <span className="text-textPrimary font-medium">Angel Smith</span>,
                        tengo una gata que se llama{' '}
                        <span className="text-textPrimary font-medium">Luna</span>, me gusta el{' '}
                        <span className="text-textPrimary font-medium">café</span>, de hecho fui{' '}
                        <span className="text-textPrimary font-medium">barista</span> en una cafetería
                        de especialidad durante casi 4 años. Suelo ir al{' '}
                        <span className="text-textPrimary font-medium">gym</span> por las mañanas, me
                        volví fan de la{' '}
                        <span className="text-textPrimary font-medium">comida kpop</span> y me gusta
                        hacer cursitos para seguir fomentando mi{' '}
                        <span className="text-textPrimary font-medium">aprendizaje</span>.
                    </p>
                    <p className="mt-4 text-light leading-relaxed">
                        A veces juego jueguitos, si quieres jugar, siéntete libre de añadirme.ヾ(•ω•`)o
                    </p>
                    <div className="flex flex-col gap-4 mt-4 text-textPrimary">
                        <div className="flex items-center gap-4">
                            <FaSteam size={24} aria-label="Steam" />
                            <button
                                onClick={() => handleCopy("79456154")}
                                className="hover:text-accentWhite transition-colors flex items-center gap-2 text-sm font-mono"
                            >
                                <FaCopy size={14} />
                                <span>79456154</span>
                            </button>
                            {copied === "79456154" && (
                                <span className="text-xs text-green-400">¡Copiado!</span>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <FaDiscord size={24} aria-label="Discord" />
                            <button
                                onClick={() => handleCopy("vngerus")}
                                className="hover:text-accentWhite transition-colors flex items-center gap-2 text-sm font-mono"
                            >
                                <FaCopy size={14} />
                                <span>vngerus</span>
                            </button>
                            {copied === "vngerus" && (
                                <span className="text-xs text-green-400">¡Copiado!</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="about-card border border-textSecondary p-6 rounded-lg bg-background-secondary md:col-span-2 flex flex-col">
                    <h3 className="text-xl font-bold text-textPrimary mb-4">🛠 Tecnologías con las que trabajo</h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {tags.map((tag) => (
                            <li key={tag.id} className="flex items-center space-x-2">
                                <Image
                                    width={20}
                                    height={20}
                                    src={tag.icon}
                                    alt={tag.name}
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-light text-sm">{tag.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
