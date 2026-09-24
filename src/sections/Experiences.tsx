'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experiences, type Experience } from '@/data';
import SysLabel from '@/components/SysLabel';

// ── Dossier constants ────────────────────────────────────────────────────────
const BARCODE_PATTERN = [2, 1, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1];
const DOSSIER_CLIP =
  'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)';

// ── ExperienceDossier (Opción 3: Hiper-Interactiva con 3D Tilt y Emil Craft) ───
const ExperienceDossier: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const isActive = exp.status === 'ACTIVE';
  const [tilt, setTilt] = React.useState({ x: 0, y: 0, hover: false });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y, hover: true });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0, hover: false });
  };

  const transition = tilt.hover
    ? 'transform 0.16s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.2s ease'
    : 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease';

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        flex: 1,
        minWidth: 0,
        perspective: '1200px',
      }}
    >
      <div
        style={{
          background: 'rgba(15, 12, 22, 0.88)',
          backdropFilter: 'blur(16px)',
          border: isActive ? '1px solid rgba(168, 85, 247, 0.45)' : '1px solid rgba(168, 85, 247, 0.22)',
          clipPath: DOSSIER_CLIP,
          boxShadow: tilt.hover
            ? '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 28px rgba(168, 85, 247, 0.28)'
            : '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 14px rgba(168, 85, 247, 0.12)',
          transform: `rotateY(${tilt.x * 4}deg) rotateX(${-tilt.y * 3.5}deg) translateZ(${tilt.hover ? 12 : 0}px)`,
          transition,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="transition-transform active:scale-[0.98]"
      >
        {/* Cursor spotlight glare */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${50 + tilt.x * 35}% ${50 + tilt.y * 35}%, rgba(168, 85, 247, 0.18) 0%, transparent 60%)`,
            opacity: tilt.hover ? 1 : 0,
            transition: 'opacity 0.3s ease',
            mixBlendMode: 'screen',
          }}
        />

        {/* Scanline pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(168, 85, 247, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.6,
          }}
        />

        {/* Top Telemetry Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 18px',
            background: 'rgba(26, 18, 42, 0.65)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
            position: 'relative',
            zIndex: 5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: isActive ? '#a855f7' : '#6b7280',
                boxShadow: isActive ? '0 0 10px #a855f7' : 'none',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(168, 85, 247, 0.85)',
                textTransform: 'uppercase',
              }}
            >
              [ SEC_0{index + 1} {'// DOSSIER_EXP ]'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 8,
                color: 'rgba(234, 230, 218, 0.5)',
                letterSpacing: '0.15em',
              }}
            >
              SYNC: {exp.syncRate}%
            </span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 8,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? '#a855f7' : '#9ca3af',
                border: `1px solid ${isActive ? 'rgba(168, 85, 247, 0.6)' : 'rgba(156, 163, 175, 0.3)'}`,
                background: isActive ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
                padding: '2px 8px',
              }}
            >
              {exp.status}
            </span>
          </div>
        </div>

        {/* Main Dossier Content */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: 18,
            padding: '18px 20px 14px',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Sigil Box */}
          <div
            style={{
              width: 88,
              height: 88,
              flexShrink: 0,
              border: '1px solid rgba(168, 85, 247, 0.4)',
              background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(11, 10, 16, 0.9) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              boxShadow: '0 0 16px rgba(168, 85, 247, 0.25)',
            }}
          >
            <span
              className="font-akira"
              style={{
                fontSize: 24,
                color: '#eae6da',
                textShadow: `0 0 12px ${exp.sigilTone || '#a855f7'}`,
              }}
            >
              {exp.sigilLabel}
            </span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 7,
                letterSpacing: '0.25em',
                color: 'rgba(168, 85, 247, 0.75)',
                marginTop: 4,
              }}
            >
              {exp.missionCode}
            </span>
          </div>

          {/* Info Block */}
          <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                }}
              >
                {exp.company}
              </h3>
              <div style={{ display: 'flex', alignItems: 'stretch', gap: 2, height: 22, opacity: 0.55 }}>
                {BARCODE_PATTERN.map((w, i) => (
                  <div key={i} style={{ width: w * 1.4, background: '#a855f7' }} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 2 }}>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(234, 230, 218, 0.9)',
                }}
              >
                {exp.role}
              </span>
              <span style={{ color: 'rgba(168, 85, 247, 0.4)' }}>·</span>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  color: 'rgba(168, 85, 247, 0.75)',
                }}
              >
                ROL {exp.rolAbbr}
              </span>
              <span style={{ color: 'rgba(168, 85, 247, 0.4)' }}>·</span>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  color: '#9ca3af',
                }}
              >
                {exp.duration} ({exp.durationMonths}M)
              </span>
            </div>

            <p
              style={{
                margin: '8px 0 0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                color: 'rgba(234, 230, 218, 0.7)',
                lineHeight: 1.65,
              }}
            >
              {exp.brief}
            </p>
          </div>
        </div>

        {/* Projects Sub-table */}
        <div
          style={{
            borderTop: '1px solid rgba(168, 85, 247, 0.2)',
            background: 'rgba(11, 10, 16, 0.5)',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {exp.projects.map((name, i) => (
            <div
              key={name}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px minmax(0, 1fr)',
                borderBottom: i < exp.projects.length - 1 ? '1px solid rgba(168, 85, 247, 0.12)' : 'none',
                transition: 'background 0.2s ease',
              }}
              className="hover:bg-accentPrimary/5"
            >
              <div
                style={{
                  padding: '8px 14px',
                  borderRight: '1px solid rgba(168, 85, 247, 0.15)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9,
                  color: 'rgba(168, 85, 247, 0.65)',
                  letterSpacing: '0.15em',
                }}
              >
                OP_{String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  padding: '8px 14px',
                  fontSize: 12,
                  color: '#eae6da',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ color: '#a855f7', fontSize: 10 }}>›</span>
                {name}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid rgba(168, 85, 247, 0.25)',
            background: 'rgba(17, 13, 24, 0.7)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            position: 'relative',
            zIndex: 5,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {exp.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9,
                  color: 'rgba(234, 230, 218, 0.85)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  background: 'rgba(168, 85, 247, 0.08)',
                  padding: '3px 9px',
                  clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 8,
              letterSpacing: '0.2em',
              color: 'rgba(168, 85, 247, 0.45)',
              textTransform: 'uppercase',
            }}
          >
            NERV_SPEC_OK
          </span>
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
          <span className="text-accentPrimary font-mono text-lg mr-4">01.</span>
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Donde he trabajado</h2>
          <div className="flex-1 h-px bg-gray-700 ml-4" />
        </div>
      </div>

      <div ref={containerRef} className="relative w-full">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700/40" />
        <motion.div
          className="absolute left-5 top-0 w-px bg-accentPrimary/80 origin-top"
          style={{ scaleY, height: '100%' }}
        />

        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative', alignItems: 'stretch' }}
          >
            <div style={{ flexShrink: 0, width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, position: 'relative', zIndex: 2 }}>
              <div style={{ position: 'relative', width: 14, height: 14, borderRadius: '50%', border: '2px solid #a855f7', background: '#010103', boxShadow: exp.status === 'ACTIVE' ? '0 0 14px #a855f7, 0 0 22px rgba(168,85,247,0.5)' : '0 0 8px rgba(168,85,247,0.5)' }}>
                {exp.status === 'ACTIVE' && (
                  <span style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '1px solid #a855f7', animation: 'op-pin-ripple 2s ease-out infinite' }} />
                )}
              </div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(168,85,247,0.55)', marginTop: 8, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                {exp.missionCode}
              </span>
            </div>

            <div style={{ position: 'absolute', left: 44, top: 27, width: 22, height: 1, background: 'linear-gradient(90deg, #a855f7 0%, rgba(168,85,247,0.3) 100%)', zIndex: 1, animation: `op-trace-grow 0.6s ease-out ${index * 0.08 + 0.2}s both`, transformOrigin: 'left' }} />
            <div style={{ position: 'absolute', left: 62, top: 24, width: 6, height: 6, background: '#a855f7', transform: 'rotate(45deg)', zIndex: 1, animation: `op-fade 0.4s ease ${index * 0.08 + 0.5}s both`, boxShadow: '0 0 8px #a855f7' }} />

            <ExperienceDossier exp={exp} index={index} />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2.5 border-t border-dashed border-accentPrimary/15 flex justify-between w-full">
        <span className="font-mono text-[8px] text-accentPrimary/30 tracking-[0.2em] uppercase">
          {'// SYNC PROMEDIO · '}{avgSync}{'% · CLEARANCE PROM · LV.2'}
        </span>
        <span className="font-mono text-[8px] text-accentPrimary/30 tracking-[0.2em] uppercase">
          {'// EOF · '}{experiences.length}{' EXPEDIENTES'}
        </span>
      </div>
    </section>
  );
};

export default Experiences;
