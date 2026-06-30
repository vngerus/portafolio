'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { CompanyStatus, WorkCompany, WorkProject } from '@/data';

export const DevPlaceholder: React.FC<{ label?: string; compact?: boolean }> = ({
  label = 'in-dev',
  compact = false,
}) => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #050315 0%, #0a0825 60%, #0d0b2e 100%)' }}
  >
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(210,143,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(210,143,255,0.8) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div
      className="absolute flex items-center"
      style={{ top: compact ? 8 : 18, left: compact ? 10 : 22, gap: compact ? 4 : 8 }}
    >
      <span
        className="rounded-full bg-[#ff4060]"
        style={{
          width: compact ? 5 : 8,
          height: compact ? 5 : 8,
          boxShadow: '0 0 10px #ff4060',
          animation: 'op-rec-blink 1.1s ease-in-out infinite',
        }}
      />
      <span
        className="font-mono tracking-[0.15em] uppercase text-[#ff8090]"
        style={{ fontSize: compact ? 6 : 8 }}
      >
        REC · DEV_STREAM
      </span>
    </div>
    <span
      className="absolute font-mono tracking-[0.15em] uppercase text-textPrimary/40"
      style={{ top: compact ? 8 : 18, right: compact ? 10 : 22, fontSize: compact ? 6 : 8 }}
    >
      {compact ? 'BUILD' : '00:00:42 / LIVE'}
    </span>

    {!compact && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%]">
        <span className="block font-mono text-[9px] text-textPrimary/55 mb-2.5">
          $ pnpm dev · {label}
        </span>
        {[
          { l: 'next build', w: '85%', d: 0 },
          { l: 'compiling routes', w: '68%', d: 0.25 },
          { l: 'optimizing assets', w: '42%', d: 0.5 },
        ].map((b) => (
          <div key={b.l} className="mb-2">
            <div className="flex justify-between mb-0.5">
              <span className="font-mono text-[7px] text-textPrimary/55">▸ {b.l}</span>
              <span className="font-mono text-[7px] text-textPrimary/35">{b.w}</span>
            </div>
            <div className="h-[3px] bg-textPrimary/10 relative overflow-hidden">
              <div
                className="h-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(210,143,255,0.4), rgba(210,143,255,0.85))',
                  width: b.w,
                  ['--bar-w' as unknown as string]: b.w,
                  animation: `op-bar-grow 1.4s cubic-bezier(.2,.7,.3,1) ${b.d}s both`,
                  boxShadow: '0 0 6px rgba(210,143,255,0.6)',
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center mt-3.5 gap-1">
          <span className="font-mono text-[8px] text-textPrimary/60">✱ sin deploy en prod</span>
          <span
            className="inline-block w-[5px] h-[9px] bg-textPrimary ml-1"
            style={{ animation: 'op-blink 0.9s linear infinite' }}
          />
        </div>
      </div>
    )}

    {compact && (
      <div className="absolute bottom-2 left-2.5 right-2.5 h-0.5 bg-textPrimary/10 overflow-hidden">
        <div
          className="h-full w-[60%] bg-textPrimary/75"
          style={{ animation: 'op-bar-grow 1.4s cubic-bezier(.2,.7,.3,1) infinite' }}
        />
      </div>
    )}
  </div>
);

export const MediaSlot: React.FC<{
  project: WorkProject;
  mode?: 'full' | 'thumb';
}> = ({ project, mode = 'full' }) => {
  if (project.videoback) {
    return (
      <video
        src={project.videoback}
        poster={project.imgback ?? undefined}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  if (project.imgback) {
    const isGif = project.imgback.toLowerCase().endsWith('.gif');
    if (isGif) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={project.imgback} alt="" className="absolute inset-0 w-full h-full object-cover" />;
    }
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${project.imgback})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }
  if (project.dev) {
    return <DevPlaceholder label={project.kind} compact={mode === 'thumb'} />;
  }
  return <ProjectPlaceholder label={project.kind} />;
};

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
