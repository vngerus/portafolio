'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';

const NAV_LINKS = [
    { label: '01. Experiencia', href: 'experiences' },
    { label: '02. Proyectos', href: 'projects' },
    { label: '03. Sobre mí', href: 'about' },
    { label: '04. Contacto', href: 'contact' },
];

const Header: React.FC = () => {
    const headerRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState(false);
    const logoText = useTextScramble('vngerus', 1400, 500);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { y: -70, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        NAV_LINKS.forEach(({ href }) => {
            const el = document.getElementById(href);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(href); },
                { threshold: 0.3 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-purple-900/30"
        >
            <nav className="flex items-center justify-between max-w-[1200px] mx-auto px-6 py-4">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-jetbrains text-textPrimary font-bold text-xl tracking-[0.2em] hover:text-accentWhite transition-colors select-none"
                    aria-label="Ir al inicio"
                >
                    {logoText}
                </button>

                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={href} className="relative">
                            <button
                                onClick={() => scrollTo(href)}
                                className={`font-mono text-sm transition-colors pb-1 ${
                                    activeSection === href
                                        ? 'text-textPrimary'
                                        : 'text-gray-400 hover:text-textPrimary'
                                }`}
                            >
                                {label}
                            </button>
                            {activeSection === href && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-px bg-textPrimary"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>

                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menú"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            animate={
                                menuOpen
                                    ? i === 0
                                        ? { rotate: 45, y: 8 }
                                        : i === 1
                                        ? { opacity: 0 }
                                        : { rotate: -45, y: -8 }
                                    : { rotate: 0, y: 0, opacity: 1 }
                            }
                            className="block w-6 h-0.5 bg-textPrimary"
                            transition={{ duration: 0.2 }}
                        />
                    ))}
                </button>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden overflow-hidden flex flex-col gap-4 px-6 py-4 border-t border-purple-900/30 bg-background"
                    >
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <button
                                    onClick={() => scrollTo(href)}
                                    className="font-mono text-sm text-gray-300 hover:text-textPrimary transition-colors w-full text-left"
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
