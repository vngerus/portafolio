'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextScramble } from '@/hooks/useTextScramble';
import SysLabel from '@/components/SysLabel';
import Scene from '@/components/Scene';

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

const ScrambleName: React.FC = () => {
  const display = useTextScramble('Ángel Smith', 1100, 80);
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

const Hero: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = heroSectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative flex flex-col items-start justify-center min-h-[calc(100vh-4rem)] px-8 sm:px-12 md:px-16 lg:px-24 overflow-hidden"
    >
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 flex items-center justify-center"
      >
        <svg width="640" height="640" viewBox="0 0 640 640" className="opacity-40 max-w-[92vw] max-h-[92vw]" style={{ animation: 'ringPulse 6s ease-in-out infinite' }}>
          <circle cx="320" cy="320" r="300" fill="none" stroke="#e8332e" strokeWidth="1.5" opacity="0.3" />
          <circle cx="320" cy="320" r="230" fill="none" stroke="#e8332e" strokeWidth="1.5" opacity="0.45" />
          <circle cx="320" cy="320" r="160" fill="none" stroke="#e8332e" strokeWidth="2" opacity="0.65" />
        </svg>
      </div>

      <div className="space-y-5 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <SysLabel left="// SYS_INIT" right="PILOT_TERMINAL" />
        </motion.div>

        <motion.p
          className="font-mono text-textPrimary/80 text-sm sm:text-base"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-textPrimary/40 mr-2 select-none">&gt;</span>
          Hola, mi nombre es
        </motion.p>

        <div className="relative inline-block px-2 py-1">
          <div
            aria-hidden
            className="absolute -z-10 opacity-90"
            style={{
              top: '4%', left: '-8%', width: '46%', height: '62%',
              background: '#e8332e',
              clipPath: 'polygon(12% 0%, 55% 8%, 100% 0%, 88% 42%, 100% 78%, 55% 62%, 42% 100%, 18% 70%, 0% 90%, 10% 38%)',
              transform: 'rotate(-9deg)',
            }}
          />
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-bone leading-tight font-akira uppercase">
            <ScrambleName />
          </h1>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-accentPrimary font-akira">
          <TextGenerate text="[ Desarrollador Front-End ]" delay={0.9} />
        </h2>

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
      </div>

      <div className="hidden lg:block absolute right-8 xl:right-24 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
        <Scene scrollProgressRef={scrollProgressRef} />
      </div>
    </section>
  );
};

export default Hero;
