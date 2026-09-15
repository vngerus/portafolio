'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experiences, type Experience } from '@/data';
import SysLabel from '@/components/SysLabel';

// ── Ticket constants ─────────────────────────────────────────────────────────
const BARCODE_PATTERN = [2, 1, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1];
const BAND_COLORS = ['#e8332e', '#8a97a6', '#ffcc00'];

// ── TicketCard ───────────────────────────────────────────────────────────────
const TicketCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const isActive = exp.status === 'ACTIVE';
  const bandColor = BAND_COLORS[index % BAND_COLORS.length];

  return (
    <div
      style={{
        flex: 1, minWidth: 0, background: '#eae6da', color: '#141210',
        border: '2px solid #0b0a08', overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '16px 20px 12px' }}>
        <div style={{ width: 100, height: 100, flexShrink: 0, border: '2px solid #0b0a08', background: '#141210', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-akira" style={{ fontSize: 26, color: exp.sigilTone, textShadow: `0 0 10px ${exp.sigilTone}` }}>
            {exp.sigilLabel}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 2, height: 64 }}>
            {BARCODE_PATTERN.map((w, i) => (
              <div key={i} style={{ width: w * 1.8, background: '#0b0a08' }} />
            ))}
          </div>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700, letterSpacing: '0.4em', color: '#141210', textAlign: 'center' }}>
            {exp.company}
          </span>
        </div>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: isActive ? '#e8332e' : '#5a554c', border: `1px solid ${isActive ? '#e8332e' : '#5a554c'}`, padding: '3px 9px', flexShrink: 0 }}>
          {exp.status}
        </span>
      </div>

      <p style={{ margin: 0, padding: '0 20px 12px', fontSize: 15, letterSpacing: '0.02em', textAlign: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#3a352c' }}>
          {exp.role} · ROL {exp.rolAbbr} · {exp.durationMonths}M
        </span>
      </p>

      <div style={{ background: bandColor, padding: '8px 20px', textAlign: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: '#0b0a08' }}>
          {exp.duration}
        </span>
      </div>

      <div>
        {exp.projects.map((name, i) => (
          <div key={name} style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr)', borderBottom: '1px solid rgba(11,10,8,0.15)' }}>
            <div style={{ padding: '8px 12px', borderRight: '1px solid rgba(11,10,8,0.15)', fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#6b6558' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ padding: '8px 12px', fontSize: 12.5 }}>{name}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 20px', borderTop: '2px solid #0b0a08', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
        <p style={{ margin: 0, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#3a352c', lineHeight: 1.6, maxWidth: 520 }}>
          {exp.brief}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5 }}>
          {exp.tech.map((t) => (
            <span key={t} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#141210', border: '1px solid rgba(11,10,8,0.4)', padding: '3px 8px' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Experiences section ───────────────────────────────────────────────────────
const Experiences: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 75%', 'end 30%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const avgSync = Math.round(experiences.reduce((s, e) => s + e.syncRate, 0) / experiences.length);

  return (
    <section id="experiences" className="flex flex-col items-center mx-auto max-w-250 px-4 py-12 min-h-screen mt-12">
      <div className="flex flex-col w-full mb-12">
        <SysLabel left="// EXP_LOG" right="HISTORIAL DE DESPLIEGUES" />
        <div className="flex items-center w-full">
          <span className="text-textPrimary font-mono text-lg mr-4">01.</span>
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Donde he trabajado</h2>
          <div className="flex-1 h-px bg-gray-700 ml-4" />
        </div>
      </div>

      <div ref={containerRef} className="relative w-full">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700/40" />
        <motion.div
          className="absolute left-5 top-0 w-px bg-textPrimary/80 origin-top"
          style={{ scaleY, height: '100%' }}
        />

        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative', alignItems: 'stretch' }}
          >
            <div style={{ flexShrink: 0, width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, position: 'relative', zIndex: 2 }}>
              <div style={{ position: 'relative', width: 14, height: 14, borderRadius: '50%', border: '2px solid #e8332e', background: '#010103', boxShadow: exp.status === 'ACTIVE' ? '0 0 14px #e8332e, 0 0 22px rgba(232,51,46,0.5)' : '0 0 8px rgba(232,51,46,0.5)' }}>
                {exp.status === 'ACTIVE' && (
                  <span style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '1px solid #e8332e', animation: 'op-pin-ripple 2s ease-out infinite' }} />
                )}
              </div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.55)', marginTop: 8, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                {exp.missionCode}
              </span>
            </div>

            <div style={{ position: 'absolute', left: 44, top: 27, width: 22, height: 1, background: 'linear-gradient(90deg, #e8332e 0%, rgba(232,51,46,0.3) 100%)', zIndex: 1, animation: `op-trace-grow 0.6s ease-out ${index * 0.08 + 0.2}s both`, transformOrigin: 'left' }} />
            <div style={{ position: 'absolute', left: 62, top: 24, width: 6, height: 6, background: '#e8332e', transform: 'rotate(45deg)', zIndex: 1, animation: `op-fade 0.4s ease ${index * 0.08 + 0.5}s both`, boxShadow: '0 0 6px #e8332e' }} />

            <TicketCard exp={exp} index={index} />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2.5 border-t border-dashed border-textPrimary/15 flex justify-between w-full">
        <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">
          {'// SYNC PROMEDIO · '}{avgSync}{'% · CLEARANCE PROM · LV.2'}
        </span>
        <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">
          {'// EOF · '}{experiences.length}{' EXPEDIENTES'}
        </span>
      </div>
    </section>
  );
};

export default Experiences;
