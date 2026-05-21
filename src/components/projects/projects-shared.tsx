'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { CompanyStatus, WorkCompany, WorkProject } from '@/data';

// ─── HOLO OVERLAYS ───────────────────────────────────────────────────────────
export const HoloOverlays: React.FC<{ intense?: boolean }> = ({ intense = true }) => (
  <>
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.07]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(210,143,255,0.8) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(210,143,255,0.8) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />
    <motion.div
      className="absolute inset-0 pointer-events-none z-10 bg-linear-to-b from-textPrimary/0 via-buttonSelected/15 to-textPrimary/8"
      animate={intense ? { opacity: [0.5, 1, 0.6, 1, 0.5] } : { opacity: 0.6 }}
      transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
    />
    {intense && (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div className="animate-nerv-scan opacity-50" />
      </div>
    )}
    <div className="absolute inset-0 pointer-events-none z-20 p-2.5">
      <div className="absolute top-2.5 left-2.5">
        <div className="w-3 h-3 border-t border-l border-textPrimary/60" />
        <p className="font-mono text-[6px] text-textPrimary/40 tracking-wider mt-0.5 uppercase">SYS_LINK</p>
      </div>
      <div className="absolute top-2.5 right-2.5 text-right">
        <div className="w-3 h-3 border-t border-r border-textPrimary/60 ml-auto" />
        <p className="font-mono text-[6px] text-textPrimary/40 tracking-wider mt-0.5 uppercase">ACTIVO</p>
      </div>
      <div className="absolute bottom-2.5 left-2.5">
        <p className="font-mono text-[6px] text-textPrimary/30 tracking-wider mb-0.5 uppercase">OP_REC</p>
        <div className="w-3 h-3 border-b border-l border-textPrimary/60" />
      </div>
      <div className="absolute bottom-2.5 right-2.5 text-right">
        <p className="font-mono text-[6px] text-textPrimary/30 tracking-wider mb-0.5 uppercase">NERV</p>
        <div className="w-3 h-3 border-b border-r border-textPrimary/60 ml-auto" />
      </div>
    </div>
  </>
);

// ─── PROJECT PLACEHOLDER (rayado estándar) ────────────────────────────────────
export const ProjectPlaceholder: React.FC<{ label?: string }> = ({ label = 'preview' }) => (
  <div
    className="absolute inset-0 flex items-center justify-center"
    style={{
      backgroundImage:
        'repeating-linear-gradient(135deg, rgba(210,143,255,0.06) 0 8px, rgba(0,0,0,0) 8px 18px), linear-gradient(180deg, #0a0825 0%, #0d0b2e 100%)',
    }}
  >
    <div className="text-center">
      <div
        className="w-9 h-9 mx-auto mb-2.5 border border-dashed border-textPrimary/30"
        style={{ transform: 'rotate(45deg)' }}
      />
      <p className="font-mono text-[9px] text-textPrimary/40 tracking-[0.15em] uppercase">
        {'// '}{label}
      </p>
      <p className="font-mono text-[8px] text-textPrimary/20 tracking-[0.15em] uppercase mt-1">
        SCREENSHOT_PENDING
      </p>
    </div>
  </div>
);

// ─── DEV PLACEHOLDER (proyectos en construcción) ──────────────────────────────
export const DevPlaceholder: React.FC = () => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center"
    style={{ background: 'linear-gradient(180deg, #0a0825 0%, #0d0b2e 100%)' }}
  >
    <div className="w-full max-w-[190px] font-mono px-2">
      <div className="flex items-center gap-2 mb-3">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
        <span className="text-[8px] text-textPrimary/55 tracking-widest uppercase">DEV_STREAM</span>
        <span className="ml-auto text-[7px] text-textPrimary/30 tracking-wider">REC</span>
      </div>

      <div className="space-y-1.5 mb-4">
        {[
          { label: 'COMPILE', w: 88 },
          { label: 'BUNDLE ', w: 62 },
          { label: 'TYPES  ', w: 41 },
        ].map(({ label, w }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[6px] text-textPrimary/30 w-13 shrink-0">{label}</span>
            <div className="flex-1 h-px bg-textPrimary/10 overflow-hidden">
              <motion.div
                className="h-full bg-textPrimary/50"
                animate={{ width: [`${w - 8}%`, `${w}%`, `${w - 8}%`] }}
                transition={{ repeat: Infinity, duration: 2.4 + w * 0.01, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[6px] text-textPrimary/25">{w}%</span>
          </div>
        ))}
      </div>

      <div className="border-t border-textPrimary/10 pt-2.5">
        <p className="text-[9px] text-textPrimary/50">
          <span className="text-textPrimary/30">$ </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            pnpm dev
          </motion.span>
        </p>
        <p className="text-[7px] text-textPrimary/25 mt-1 tracking-wide">
          READY IN 1.4s · PORT 3000
        </p>
      </div>
    </div>
  </div>
);

// ─── MEDIA SLOT ───────────────────────────────────────────────────────────────
// Prioridad: videoback → GIF → webp/png/jpg (bg del padre) → dev → placeholder
export const MediaSlot: React.FC<{ project: WorkProject }> = ({ project }) => {
  if (project.videoback) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={project.videoback}
      />
    );
  }
  if (project.imgback?.match(/\.gif$/i)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={project.imgback} alt="" className="absolute inset-0 w-full h-full object-cover" />
    );
  }
  if (!project.imgback && project.dev) {
    return <DevPlaceholder />;
  }
  if (!project.imgback) {
    return <ProjectPlaceholder label={project.kind} />;
  }
  return null; // webp/png/jpg → backgroundImage en el padre
};

// ─── SWEEP BAR (barre top→bottom al cambiar proyecto) ────────────────────────
export const SweepBar: React.FC = () => (
  <div
    className="absolute left-0 right-0 h-0.5 pointer-events-none z-[28]"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, rgba(210,143,255,0.7) 40%, rgba(210,143,255,0.9) 50%, rgba(210,143,255,0.7) 60%, transparent 100%)',
      animation: 'op-sweep-bar 0.55s ease-in both',
    }}
  />
);

// ─── ANIMATED PIN ─────────────────────────────────────────────────────────────
export const AnimatedPin: React.FC = () => (
  <div
    className="absolute left-1/2 top-0 pointer-events-none z-30 -translate-x-1/2"
    style={{ animation: 'op-pin-drop 0.7s cubic-bezier(.2,.6,.3,1.25) both' }}
  >
    <div
      className="absolute left-1/2 -translate-x-1/2 w-0.5 h-[60px]"
      style={{ top: -56, background: 'linear-gradient(180deg, transparent 0%, #d28fff 100%)', filter: 'blur(2.5px)' }}
    />
    <div
      className="absolute left-1/2 -translate-x-1/2 w-px h-[60px]"
      style={{ top: -56, background: 'linear-gradient(180deg, transparent 0%, #d28fff 100%)' }}
    />
    <div
      className="absolute left-1/2 top-0 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-textPrimary"
      style={{ filter: 'blur(4px)' }}
    />
    <div
      className="absolute left-1/2 top-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-textPrimary"
      style={{ boxShadow: '0 0 12px #d28fff' }}
    />
    <div className="absolute left-1/2 top-0 w-0.5 h-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    <div
      className="absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-textPrimary"
      style={{ animation: 'op-pin-ripple 0.8s ease-out 0.4s both' }}
    />
  </div>
);

// ─── COMPANY BANNER ───────────────────────────────────────────────────────────
export const CompanyBanner: React.FC<{ company: WorkCompany }> = ({ company }) => {
  const isActive = company.status === 'ACTIVE';
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 bg-buttonUnselected/25 border-b border-gray-700/50"
      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[9px] text-textPrimary/55 tracking-[0.2em] uppercase">
          {company.opCode}
        </span>
        <span className="w-px h-3 bg-gray-700" />
        <span className="flex items-center gap-1.5">
          {isActive ? (
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
              style={{ boxShadow: '0 0 8px #d28fff' }}
            />
          ) : (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600" />
          )}
          <span className={`font-mono text-[8px] tracking-[0.2em] uppercase ${isActive ? 'text-textPrimary/70' : 'text-gray-600'}`}>
            {company.status}
          </span>
        </span>
        <span className="w-px h-3 bg-gray-700" />
        <span className="font-mono text-[9px] text-gray-500 tracking-[0.15em] uppercase">
          {company.location}
        </span>
      </div>
      <span className="font-mono text-[10px] text-textPrimary/35 tracking-wider">
        [ {company.period} ]
      </span>
    </div>
  );
};

export const isActiveStatus = (s: CompanyStatus): boolean => s === 'ACTIVE';
