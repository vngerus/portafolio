'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';

const NAV_LINKS = [
  { label: 'Exp', num: '01', href: 'experiences' },
  { label: 'Proyectos', num: '02', href: 'projects' },
  { label: 'Sobre mí', num: '03', href: 'about' },
  { label: 'Contacto', num: '04', href: 'contact' },
];

const DIGITS = '0123456789';

const NavLink: React.FC<{
  label: string;
  num: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, num, href, isActive, onClick }) => {
  const [numDisplay, setNumDisplay] = useState(num);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(0);

  const onMouseEnter = () => {
    countRef.current = 0;
    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = setInterval(() => {
      setNumDisplay(
        num
          .split('')
          .map(c => (/[0-9]/.test(c) ? DIGITS[Math.floor(Math.random() * DIGITS.length)] : c))
          .join(''),
      );
      countRef.current++;
      if (countRef.current >= 10) {
        clearInterval(loopRef.current!);
        setNumDisplay(num);
      }
    }, 45);
  };

  const onMouseLeave = () => {
    if (loopRef.current) clearInterval(loopRef.current);
    setNumDisplay(num);
  };

  useEffect(
    () => () => {
      if (loopRef.current) clearInterval(loopRef.current);
    },
    [],
  );

  return (
    <li className="relative">
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`flex items-baseline gap-1.5 pb-1 transition-colors ${
          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        <span className="font-jetbrains text-sm tracking-wide">{label}</span>
        <span
          className="font-mono text-[10px] text-textPrimary leading-none tabular-nums"
          suppressHydrationWarning
        >
          {numDisplay}
        </span>
      </button>

      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-px bg-textPrimary shadow-[0_0_6px_#d28fff]"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </li>
  );
};

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const logoText = useTextScramble('vngerus', 1400, 600);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 },
    );
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(href);
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
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
      <nav className="flex items-center justify-between max-w-300 mx-auto px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-jetbrains text-textPrimary font-bold text-xl tracking-[0.25em] hover:text-accentWhite transition-colors select-none"
          aria-label="Inicio"
          suppressHydrationWarning
        >
          {logoText}
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.href}
              {...link}
              isActive={activeSection === link.href}
              onClick={() => scrollTo(link.href)}
            />
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {[0, 1, 2].map(i => (
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
            {NAV_LINKS.map(({ label, num, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className="flex items-baseline gap-2 text-gray-300 hover:text-textPrimary transition-colors w-full text-left"
                >
                  <span className="font-jetbrains text-sm">{label}</span>
                  <span className="font-mono text-[10px] text-textPrimary">{num}</span>
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
