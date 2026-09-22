'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { useTextScramble } from '@/hooks/useTextScramble';
import SysLabel from '@/components/SysLabel';
import NeoTokyoCanvas from '@/components/NeoTokyoCanvas';

const TextGenerate: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className = '',
  delay = 0,
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
  const display = useTextScramble('Ángel Smith', 1100, 80);
  const [visible, setVisible] = useState(false);
  const words = display.split(' ');

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span
      className="font-jetbrains tracking-wide flex flex-col items-center gap-1"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.05s' }}
      suppressHydrationWarning
    >
      {words.map((word, wi) => (
        <span key={wi} className="relative inline-block px-2 py-1">
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
          <span className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-bone leading-[0.92] font-akira uppercase block">
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
          background: 'radial-gradient(ellipse 60% 45% at 50% 0%, #e8332e29, transparent)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 flex items-center justify-center"
      >
        <svg width="640" height="640" viewBox="0 0 640 640" className="opacity-40 max-w-[92vw] max-h-[92vw]" style={{ animation: 'ringPulse 6s ease-in-out infinite' }}>
          <circle cx="320" cy="320" r="300" fill="none" stroke="#e8332e" strokeWidth="1.5" opacity="0.3" />
          <circle cx="320" cy="320" r="230" fill="none" stroke="#e8332e" strokeWidth="1.5" opacity="0.45" />
          <circle cx="320" cy="320" r="160" fill="none" stroke="#e8332e" strokeWidth="2" opacity="0.65" />
          <circle cx="320" cy="320" r="90" fill="#0b0a08" stroke="#e8332e" strokeWidth="2" />
        </svg>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="w-[860px] h-[640px] max-w-[96vw] max-h-[85vh]">
          <NeoTokyoCanvas />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <SysLabel left="// SYS_INIT" right="PILOT_TERMINAL" />
        </motion.div>

        <motion.p
          className="font-mono text-textPrimary/80 text-sm sm:text-base text-center"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-textPrimary/40 mr-2 select-none">&gt;</span>
          Hola, mi nombre es
        </motion.p>

        <h1 className="relative">
          <ScrambleName />
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-accentPrimary font-akira">
          <TextGenerate text="[ Desarrollador Front-End ]" delay={0.9} />
        </h2>

        <div className="max-w-xl text-center">
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

        <div ref={ctaRef} className="opacity-0 flex gap-4 pt-4">
          <button
            onClick={() =>
              document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-6 py-2.5 border border-accentPrimary text-accentPrimary font-mono text-sm hover:bg-accentPrimary/10 transition-all active:scale-97"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            [ Iniciar Secuencia ]
          </button>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-6 py-2.5 bg-accentPrimary/10 text-accentPrimary font-mono text-sm hover:bg-accentPrimary/20 transition-all border border-accentPrimary/30 active:scale-97"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            Contacto
          </button>
        </div>

        <div className="flex flex-col items-center gap-1 mt-4 w-56">
          <div className="h-px w-full bg-accentPrimary opacity-85" />
          <div className="h-px w-[55%] bg-accentPrimary opacity-85" />
          <div className="h-px w-[30%] bg-accentPrimary opacity-85" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
