'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { useTextScramble } from '@/hooks/useTextScramble';
import { Mono, Cursor, AtFieldBackdrop, DotGrid, CornerFrame } from '@/components/nerv/primitives';
import SymbolPanel from '@/components/nerv/SymbolPanel';

const BOOT_LINES = [
  '[OK] kernel · v6.4.21',
  '[OK] graphics · webgl2 ready',
  '[OK] magi · 3/3 systems online',
  '[OK] sync · acquiring pilot trace',
  '[OK] auth · clearance lv.3 verified',
  '[--] field expansion · standby',
  '[OK] terminal ready · awaiting input',
];

const BootLog: React.FC = () => {
  const [count, setCount] = useState(0);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    if (count >= BOOT_LINES.length) return;
    const t = setTimeout(() => setCount(c => c + 1), 180 + Math.random() * 140);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (count < BOOT_LINES.length) return;
    const t = setTimeout(() => setFaded(true), 8000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div
      className="absolute bottom-6 left-7 w-64 font-mono text-[9px] text-textPrimary/55 leading-relaxed pointer-events-none z-[4]"
      style={{ letterSpacing: '0.05em', opacity: faded ? 0 : 0.7, transition: 'opacity 2s ease' }}
    >
      {BOOT_LINES.slice(0, count).map((l, i) => (
        <div
          key={i}
          className="animate-fade-in"
          style={{ opacity: i === count - 1 ? 1 : 0.5 + (i / count) * 0.5 }}
        >
          {l}
        </div>
      ))}
      {count >= BOOT_LINES.length && (
        <div className="mt-1">
          $ <Cursor />
        </div>
      )}
    </div>
  );
};

const Hero: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const name = useTextScramble('Ángel Smith', 1300, 300);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.2 },
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
    >
      <AtFieldBackdrop opacity={0.02} size={72} />
      <DotGrid opacity={0.04} />
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(109,68,138,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(210,143,255,0.1) 0%, transparent 60%)',
        }}
      />

      <CornerFrame tone="rgba(210,143,255,0.4)" size={20} offset={20} lineWidth={1.5} />

      <div className="relative z-[2] w-full max-w-300 mx-auto px-8 sm:px-12 md:px-16 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 items-center">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <Mono className="text-textPrimary/55" style={{ fontSize: 9, letterSpacing: '0.3em' }}>
                {'// SYS_INIT'}
              </Mono>
              <span className="w-7 h-px bg-textPrimary/20" />
              <Mono className="text-textPrimary/35" style={{ fontSize: 9, letterSpacing: '0.2em' }}>
                PILOT_TERMINAL · NERV
              </Mono>
              <Cursor />
            </div>

            <div className="flex items-center gap-2.5 font-jetbrains text-[13px] text-textPrimary/85 mb-3.5 mt-1">
              <span className="text-textPrimary/40">$</span>
              <span>whoami --verbose</span>
            </div>

            <h1
              className="font-jetbrains font-bold text-white leading-none mb-2.5"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.02em' }}
              suppressHydrationWarning
            >
              {name}
            </h1>

            <div
              className="inline-flex items-center gap-2.5 border border-textPrimary/30 bg-textPrimary/[0.06] px-3.5 py-1.5 mb-6"
              style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
            >
              <span className="w-1.5 h-1.5 bg-textPrimary" style={{ transform: 'rotate(45deg)' }} />
              <Mono className="text-textPrimary font-medium" style={{ fontSize: 12, letterSpacing: '0.18em' }}>
                Desarrollador Front-End
              </Mono>
            </div>

            <p className="font-jetbrains text-[13px] leading-relaxed text-light/85 max-w-[460px] mb-7">
              Sincronización al 87% con interfaces. Especialista en Front-End, con misiones secundarias en Back.{' '}
              <span className="text-gray-400">Desplegado en</span>{' '}
              <motion.a
                href="https://www.booksandbits.cl"
                target="_blank"
                rel="noreferrer"
                className="text-textPrimary underline decoration-textPrimary/40 underline-offset-[3px] hover:text-accentWhite transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.4 }}
              >
                Books&Bits
              </motion.a>
              <span className="text-gray-400">.</span>
            </p>

            <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-jetbrains text-xs cursor-pointer uppercase font-semibold px-5 py-2.5 transition-all"
                style={{
                  letterSpacing: '0.15em',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  color: '#fff',
                  background: 'rgba(210,143,255,0.14)',
                  border: '1px solid rgba(210,143,255,0.65)',
                  boxShadow: '0 0 0 rgba(210,143,255,0)',
                  transition: 'box-shadow 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 22px rgba(210,143,255,0.35)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(210,143,255,0.22)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 rgba(210,143,255,0)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(210,143,255,0.14)'; }}
              >
                <span style={{ color: '#d28fff', marginRight: 6 }}>▸</span>
                Iniciar Secuencia
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-jetbrains text-xs cursor-pointer uppercase px-5 py-2.5 transition-all"
                style={{
                  letterSpacing: '0.15em',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  color: 'rgba(226,232,240,0.85)',
                  background: 'transparent',
                  border: '1px solid rgba(75,85,99,0.6)',
                  transition: 'border-color 0.25s ease, color 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(210,143,255,0.55)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(75,85,99,0.6)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(226,232,240,0.85)'; }}
              >
                ◆ Establecer Canal
              </button>
            </div>
          </div>

          <div className="hidden md:block animate-fade-in">
            <SymbolPanel />
          </div>
        </div>
      </div>

      <BootLog />

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-[4] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.6 }}
      >
        <Mono className="text-textPrimary/30" style={{ fontSize: 7, letterSpacing: '0.35em' }}>DESCENDER</Mono>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="text-textPrimary/35 text-sm"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Hero;
