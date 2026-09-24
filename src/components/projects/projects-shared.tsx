'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import type { CompanyStatus, WorkCompany, WorkProject } from '@/data';

export const DUOTONE_FILTER =
  'sepia(1) saturate(2.6) hue-rotate(220deg) contrast(1.18) brightness(0.88)';

export const HoloOverlays: React.FC<{ intense?: boolean }> = ({ intense = true }) => (
  <>
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.08]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(168,85,247,0.7) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(168,85,247,0.7) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />
    <motion.div
      className="absolute inset-0 pointer-events-none z-10 bg-linear-to-b from-accentPrimary/0 via-buttonSelected/15 to-accentPrimary/8"
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
        <div className="w-3 h-3 border-t border-l border-accentPrimary/60" />
        <p className="font-mono text-[6px] text-accentPrimary/40 tracking-wider mt-0.5 uppercase">
          SYS_LINK
        </p>
      </div>
      <div className="absolute top-2.5 right-2.5 text-right">
        <div className="w-3 h-3 border-t border-r border-accentPrimary/60 ml-auto" />
        <p className="font-mono text-[6px] text-accentPrimary/40 tracking-wider mt-0.5 uppercase">
          ACTIVO
        </p>
      </div>
      <div className="absolute bottom-2.5 left-2.5">
        <p className="font-mono text-[6px] text-accentPrimary/30 tracking-wider mb-0.5 uppercase">
          OP_REC
        </p>
        <div className="w-3 h-3 border-b border-l border-accentPrimary/60" />
      </div>
      <div className="absolute bottom-2.5 right-2.5 text-right">
        <p className="font-mono text-[6px] text-accentPrimary/30 tracking-wider mb-0.5 uppercase">
          NERV
        </p>
        <div className="w-3 h-3 border-b border-r border-accentPrimary/60 ml-auto" />
      </div>
    </div>
  </>
);

export const ProjectPlaceholder: React.FC<{ label?: string }> = ({ label = 'preview' }) => (
  <div
    className="absolute inset-0 flex items-center justify-center"
    style={{
      backgroundImage:
        'repeating-linear-gradient(135deg, rgba(168,85,247,0.08) 0 8px, rgba(0,0,0,0) 8px 18px), linear-gradient(180deg, #0b0a08 0%, #141210 100%)',
    }}
  >
    <div className="text-center">
      <div
        className="w-9 h-9 mx-auto mb-2.5 border border-dashed border-accentPrimary/30"
        style={{ transform: 'rotate(45deg)' }}
      />
      <p className="font-mono text-[9px] text-accentPrimary/40 tracking-[0.15em] uppercase">
        {'// '}
        {label}
      </p>
      <p className="font-mono text-[8px] text-accentPrimary/20 tracking-[0.15em] uppercase mt-1">
        SCREENSHOT_PENDING
      </p>
    </div>
  </div>
);

export const DevPlaceholder: React.FC = () => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center"
    style={{ background: 'linear-gradient(180deg, #0b0a08 0%, #141210 100%)' }}
  >
    <div className="w-full max-w-47.5 font-mono px-2">
      <div className="flex items-center gap-2 mb-3">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
        <span className="text-[8px] text-accentPrimary/55 tracking-widest uppercase">DEV_STREAM</span>
        <span className="ml-auto text-[7px] text-accentPrimary/30 tracking-wider">REC</span>
      </div>

      <div className="space-y-1.5 mb-4">
        {[
          { label: 'COMPILE', w: 88 },
          { label: 'BUNDLE ', w: 62 },
          { label: 'TYPES  ', w: 41 },
        ].map(({ label, w }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[6px] text-accentPrimary/30 w-13 shrink-0">{label}</span>
            <div className="flex-1 h-px bg-accentPrimary/10 overflow-hidden">
              <motion.div
                className="h-full bg-accentPrimary/50"
                animate={{ width: [`${w - 8}%`, `${w}%`, `${w - 8}%`] }}
                transition={{ repeat: Infinity, duration: 2.4 + w * 0.01, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[6px] text-accentPrimary/25">{w}%</span>
          </div>
        ))}
      </div>

      <div className="border-t border-accentPrimary/10 pt-2.5">
        <p className="text-[9px] text-accentPrimary/50">
          <span className="text-accentPrimary/30">$ </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            pnpm dev
          </motion.span>
        </p>
        <p className="text-[7px] text-accentPrimary/25 mt-1 tracking-wide">
          READY IN 1.4s · PORT 3000
        </p>
      </div>
    </div>
  </div>
);

export const MediaSlot: React.FC<{ project: WorkProject }> = ({ project }) => {
  if (project.videoback) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: DUOTONE_FILTER }}
        src={project.videoback}
      />
    );
  }
  if (project.imgback?.match(/\.gif$/i)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.imgback}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: DUOTONE_FILTER }}
      />
    );
  }
  if (!project.imgback && project.dev) {
    return <DevPlaceholder />;
  }
  if (!project.imgback) {
    return <ProjectPlaceholder label={project.kind} />;
  }
  return null;
};

export const SweepBar: React.FC = () => (
  <div
    className="absolute left-0 right-0 h-0.5 pointer-events-none z-28"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.7) 40%, rgba(168,85,247,0.9) 50%, rgba(168,85,247,0.7) 60%, transparent 100%)',
      animation: 'op-sweep-bar 0.55s ease-in both',
    }}
  />
);

export const AnimatedPin: React.FC<{ logo: string | null; accent?: string }> = ({
  logo,
  accent = '#a855f7',
}) => (
  <div
    className="absolute left-1/2 top-0 pointer-events-none z-30 -translate-x-1/2"
    style={{ animation: 'op-pin-drop 0.7s cubic-bezier(.2,.6,.3,1.25) both' }}
  >
    <div
      className="absolute left-1/2 -translate-x-1/2 w-0.5 h-15"
      style={{
        top: -56,
        background: `linear-gradient(180deg, transparent 0%, ${accent} 100%)`,
        filter: 'blur(2.5px)',
      }}
    />
    <div
      className="absolute left-1/2 -translate-x-1/2 w-px h-15"
      style={{ top: -56, background: `linear-gradient(180deg, transparent 0%, ${accent} 100%)` }}
    />

    {/* logo flotando, animación de entrada suave */}
    <div
      className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full border border-accentPrimary/70 bg-background/90 overflow-hidden"
      style={{
        top: -84,
        width: 26,
        height: 26,
        boxShadow: `0 0 14px ${accent}a6`,
        animation: 'op-pin-drop 0.7s cubic-bezier(.2,.6,.3,1.25) both',
      }}
    >
      {logo ? (
        <Image src={logo} alt="" width={18} height={18} className="w-4.5 h-4.5 object-contain" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-accentPrimary" />
      )}
    </div>

    {/* anillo elíptico en perspectiva, técnica de 3d-pin.tsx */}
    <div style={{ perspective: '400px' }} className="absolute left-1/2 -translate-x-1/2 w-14 h-5">
      <div
        className="absolute left-1/2 top-1/2 w-14 h-5"
        style={{ transform: 'translate(-50%, -50%) rotateX(70deg)' }}
      >
        <div
          className="absolute inset-0 rounded-[50%] border border-accentPrimary"
          style={{ animation: 'op-pin-ripple 0.8s ease-out 0.4s both' }}
        />
      </div>
    </div>
  </div>
);

export const CompanyBanner: React.FC<{ company: WorkCompany }> = ({ company }) => {
  const isActive = company.status === 'ACTIVE';
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 bg-buttonUnselected/25 border-b border-gray-700/50"
      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[9px] text-accentPrimary/55 tracking-[0.2em] uppercase">
          {company.opCode}
        </span>
        <span className="w-px h-3 bg-gray-700" />
        <span className="flex items-center gap-1.5">
          {isActive ? (
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="inline-block w-1.5 h-1.5 rounded-full bg-accentPrimary"
              style={{ boxShadow: '0 0 10px #a855f7' }}
            />
          ) : (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600" />
          )}
          <span
            className={`font-mono text-[8px] tracking-[0.2em] uppercase ${isActive ? 'text-accentPrimary/70' : 'text-gray-600'}`}
          >
            {company.status}
          </span>
        </span>
        <span className="w-px h-3 bg-gray-700" />
        <span className="font-mono text-[9px] text-gray-500 tracking-[0.15em] uppercase">
          {company.location}
        </span>
      </div>
      <span className="font-mono text-[10px] text-accentPrimary/35 tracking-wider">
        [ {company.period} ]
      </span>
    </div>
  );
};

export const isActiveStatus = (s: CompanyStatus): boolean => s === 'ACTIVE';
