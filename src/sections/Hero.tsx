'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { useTextScramble } from '@/hooks/useTextScramble';
import NeoTokyoCanvas from '@/components/NeoTokyoCanvas';



const NAME_SHARDS = [
  [
    { top: '4%', left: '-8%', width: '46%', height: '62%', rotate: '-9deg', clip: 'polygon(12% 0%, 55% 8%, 100% 0%, 88% 42%, 100% 78%, 55% 62%, 42% 100%, 18% 70%, 0% 90%, 10% 38%)' },
    { bottom: '-6%', right: '-10%', width: '48%', height: '65%', rotate: '7deg', clip: 'polygon(18% 0%, 60% 10%, 100% 0%, 82% 48%, 100% 85%, 48% 62%, 40% 100%, 12% 66%, 0% 92%, 14% 40%)' },
  ],
  [
    { top: '-8%', left: '-6%', width: '44%', height: '60%', rotate: '6deg', clip: 'polygon(15% 0%, 58% 6%, 100% 0%, 85% 45%, 100% 82%, 50% 60%, 38% 100%, 14% 68%, 0% 88%, 12% 36%)' },
    { bottom: '2%', right: '-8%', width: '46%', height: '58%', rotate: '-7deg', clip: 'polygon(10% 0%, 55% 10%, 100% 0%, 90% 40%, 100% 80%, 52% 60%, 44% 100%, 16% 70%, 0% 92%, 8% 38%)' },
  ],
];

const ScrambleName: React.FC = () => {
  const display = useTextScramble('ANGEL SMITH', 1100, 80);
  const [visible, setVisible] = useState(false);
  const words = display.split(' ');

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span
      className="flex flex-col items-center gap-1.5"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.05s' }}
      suppressHydrationWarning
    >
      {words.map((word, wi) => (
        <span key={wi} className="relative inline-block px-2 py-0.5">
          {NAME_SHARDS[wi % NAME_SHARDS.length].map((shard, si) => (
            <span
              key={si}
              aria-hidden
              className="absolute -z-10 opacity-90 bg-accentPrimary"
              style={{
                top: shard.top,
                left: shard.left,
                bottom: shard.bottom,
                right: shard.right,
                width: shard.width,
                height: shard.height,
                clipPath: shard.clip,
                transform: `rotate(${shard.rotate})`,
              }}
            />
          ))}
          <span className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black text-bone leading-[0.88] font-akira uppercase block italic tracking-[0.02em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] [text-shadow:_0_3px_18px_rgba(0,0,0,1),_0_0_16px_rgba(168,85,247,0.75),_0_0_5px_rgba(0,0,0,1)]">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 2.2,
      },
    );
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative isolate flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-8 sm:px-12 md:px-16 lg:px-24 overflow-hidden text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-25"
        style={{
          background: 'radial-gradient(ellipse 60% 45% at 50% 0%, #a855f725, transparent)',
        }}
      />

      {/* Immersive Full-Bleed 3D Diorama Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full overflow-hidden flex items-center justify-center"
      >
        <NeoTokyoCanvas className="w-full h-full" />
        {/* Soft radial and horizontal vignette so the circular diorama fades smoothly into the background on all sides */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 58% 52% at 50% 48%, transparent 46%, #0b0a08 84%), ' +
              'linear-gradient(to right, #0b0a08 0%, transparent 12%, transparent 88%, #0b0a08 100%)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl mx-auto">
        <h1 className="relative">
          <ScrambleName />
        </h1>

        {/* Sleek Cyberpunk Status Pill for Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b0a08]/85 backdrop-blur-md border border-accentPrimary/40 shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accentPrimary animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
          <h2 className="font-akira text-xs sm:text-sm tracking-[0.2em] text-bone uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            Desarrollador <span className="text-accentPrimary">Front-End</span>
          </h2>
        </motion.div>

        {/* Frosted Glass Bio Card: 100% Readable over the 3D diorama */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-lg mx-auto px-6 py-3 rounded-xl bg-[#0b0a08]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
        >
          <p className="text-center text-xs sm:text-sm md:text-[15px] text-bone/90 font-mono tracking-wide leading-relaxed">
            Especializado en <span className="text-white font-medium">Front-End</span> con gusto por el{' '}
            <span className="text-white font-medium">Back-End</span>. Actualmente creando en{' '}
            <a
              href="https://www.booksandbits.cl"
              target="_blank"
              rel="noreferrer"
              className="text-accentPrimary font-bold hover:text-bone underline decoration-accentPrimary/60 underline-offset-4 transition-colors"
            >
              Books&Bits
            </a>
            .
          </p>
        </motion.div>

        {/* High-Impact Cyberpunk Action Buttons */}
        <div ref={ctaRef} className="opacity-0 flex gap-3.5 pt-2">
          <button
            onClick={() =>
              document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-5 py-2.5 sm:px-6 bg-accentPrimary text-bone font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-accentPrimary/85 transition-all shadow-[0_0_24px_rgba(168,85,247,0.6)] active:scale-95 cursor-pointer"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            [ Iniciar Secuencia ]
          </button>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-5 py-2.5 sm:px-6 bg-[#0b0a08]/80 hover:bg-[#0b0a08] text-bone hover:text-accentPrimary font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all border border-bone/25 hover:border-accentPrimary active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.8)] backdrop-blur-sm cursor-pointer"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            Contacto
          </button>
        </div>

        {/* Minimalist Telemetry Deco Lines */}
        <div className="flex flex-col items-center gap-1 mt-2 w-40 opacity-70">
          <div className="h-px w-full bg-accentPrimary shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
          <div className="h-px w-1/2 bg-accentPrimary shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
