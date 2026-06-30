'use client';

import React, { useState } from 'react';

const GOLD = '#ffc864';
import { Mono, CornerFrame } from './primitives';

const NervEmblem: React.FC<{ size?: number }> = ({ size = 200 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 200 200" width={size} height={size} className="absolute inset-0"
        style={{ transition: 'filter 0.4s ease', filter: hovered ? `drop-shadow(0 0 12px ${GOLD}88)` : 'none' }}
      >
        <polygon points="100,8 178,52 178,148 100,192 22,148 22,52" fill="none"
          stroke={hovered ? GOLD : '#d28fff'} strokeWidth="1.5" opacity="0.7"
          style={{ transition: 'stroke 0.4s ease' }} />
        <polygon points="100,22 162,58 162,142 100,178 38,142 38,58" fill="none"
          stroke={hovered ? GOLD : '#d28fff'} strokeWidth="0.8" opacity="0.5"
          style={{ transition: 'stroke 0.4s ease' }} />
        <polygon points="100,48 142,72 142,128 100,152 58,128 58,72"
          fill={hovered ? `${GOLD}12` : 'rgba(210,143,255,0.06)'}
          stroke={hovered ? GOLD : '#d28fff'} strokeWidth="0.5" opacity="0.6"
          style={{ transition: 'all 0.4s ease' }} />
        <path d="M 70 100 Q 100 60 130 100 Q 100 140 70 100 Z"
          fill={hovered ? `${GOLD}1a` : 'rgba(210,143,255,0.12)'}
          stroke={hovered ? GOLD : '#d28fff'} strokeWidth="0.6"
          style={{ transition: 'all 0.4s ease' }} />
        <line x1="100" y1="60" x2="100" y2="140"
          stroke={hovered ? GOLD : '#d28fff'} strokeWidth="0.5" opacity="0.6"
          style={{ transition: 'stroke 0.4s ease' }} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r1 = 88;
          const r2 = i % 3 === 0 ? 80 : 84;
          const x1 = +(100 + Math.cos(a) * r1).toFixed(4);
          const y1 = +(100 + Math.sin(a) * r1).toFixed(4);
          const x2 = +(100 + Math.cos(a) * r2).toFixed(4);
          const y2 = +(100 + Math.sin(a) * r2).toFixed(4);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={hovered ? GOLD : '#d28fff'}
              strokeWidth={i % 3 === 0 ? 1 : 0.5} opacity="0.6"
              style={{ transition: 'stroke 0.4s ease' }} />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="font-jetbrains font-bold leading-none"
          style={{
            fontSize: 38,
            color: hovered ? GOLD : '#fff',
            textShadow: hovered
              ? `0 0 20px ${GOLD}, 0 0 10px ${GOLD}99`
              : '0 0 20px #d28fff, 0 0 10px rgba(210,143,255,0.7)',
            transition: 'color 0.4s ease, text-shadow 0.4s ease',
          }}
        >
          V
        </span>
      </div>

      {hovered && [0, 0.38, 0.76].map((delay, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', width: 56, height: 56, transform: 'translate(-50%, -50%)', animation: `at-ring 1.4s ease-out ${delay}s infinite` }}
        >
          <svg viewBox="0 0 56 56" width="56" height="56">
            <polygon
              points="28,2 52,15 52,41 28,54 4,41 4,15"
              fill="none"
              stroke={GOLD}
              strokeWidth="1.5"
              opacity="0.85"
            />
          </svg>
        </div>
      ))}

      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-px h-2"
        style={{ background: hovered ? GOLD : '#d28fff', transition: 'background 0.4s ease' }} />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-px h-2"
        style={{ background: hovered ? GOLD : '#d28fff', transition: 'background 0.4s ease' }} />
      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-px"
        style={{ background: hovered ? GOLD : '#d28fff', transition: 'background 0.4s ease' }} />
      <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-px"
        style={{ background: hovered ? GOLD : '#d28fff', transition: 'background 0.4s ease' }} />
    </div>
  );
};

const TabrisSymbol: React.FC<{ tone: string }> = ({ tone }) => (
  <svg viewBox="0 0 32 32" width="26" height="26" className="block mx-auto mb-1.5">
    <ellipse cx="10.5" cy="16" rx="7" ry="4.5" fill="none" stroke={tone} strokeWidth="1.1" />
    <ellipse cx="21.5" cy="16" rx="7" ry="4.5" fill="none" stroke={tone} strokeWidth="1.1" />
    <ellipse cx="10.5" cy="16" rx="7" ry="4.5" fill={`${tone}12`} stroke="none" />
    <ellipse cx="21.5" cy="16" rx="7" ry="4.5" fill={`${tone}12`} stroke="none" />
    <circle cx="16" cy="16" r="2.2" fill={tone} style={{ filter: `drop-shadow(0 0 3px ${tone})` }} />
  </svg>
);

const RamielSymbol: React.FC<{ tone: string }> = ({ tone }) => (
  <svg viewBox="0 0 32 32" width="26" height="26" className="block mx-auto mb-1.5">
    <rect x="7" y="7" width="18" height="18" fill={`${tone}10`} stroke={tone} strokeWidth="1.1"
      transform="rotate(45 16 16)" />
    <rect x="10.5" y="10.5" width="11" height="11" fill="none" stroke={tone} strokeWidth="0.7"
      transform="rotate(45 16 16)" />
    <line x1="16" y1="3" x2="16" y2="29" stroke={tone} strokeWidth="0.5" opacity="0.4" />
    <line x1="3" y1="16" x2="29" y2="16" stroke={tone} strokeWidth="0.5" opacity="0.4" />
    <circle cx="16" cy="16" r="1.8" fill={tone} style={{ filter: `drop-shadow(0 0 3px ${tone})` }} />
  </svg>
);

const SachielSymbol: React.FC<{ tone: string }> = ({ tone }) => (
  <svg viewBox="0 0 32 32" width="26" height="26" className="block mx-auto mb-1.5">
    <line x1="16" y1="3" x2="16" y2="29" stroke={tone} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="3" y1="16" x2="29" y2="16" stroke={tone} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="3" x2="16" y2="29" stroke={tone} strokeWidth="4" strokeLinecap="round" opacity="0.15" />
    <line x1="3" y1="16" x2="29" y2="16" stroke={tone} strokeWidth="4" strokeLinecap="round" opacity="0.15" />
    <circle cx="16" cy="16" r="4.5" fill={`${tone}18`} stroke={tone} strokeWidth="0.9" />
    <circle cx="16" cy="16" r="1.5" fill={tone} style={{ filter: `drop-shadow(0 0 3px ${tone})` }} />
  </svg>
);

const MAGI_CONFIG = [
  { name: 'TABRIS',  role: 'ANALYZE', tone: '#d28fff', Symbol: TabrisSymbol },
  { name: 'RAMIEL',  role: 'DECIDE',  tone: '#3ec9d8', Symbol: RamielSymbol },
  { name: 'SACHIEL', role: 'EXECUTE', tone: '#ffc864', Symbol: SachielSymbol },
];

const MagiCube: React.FC<{ name: string; role: string; tone: string; Symbol: React.FC<{ tone: string }> }> = ({
  name, role, tone, Symbol,
}) => (
  <div
    className="relative flex-1 bg-background/60 text-center"
    style={{
      padding: '10px 8px',
      border: `1px solid ${tone}44`,
      clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
    }}
  >
    <Symbol tone={tone} />
    <Mono className="block" style={{ fontSize: 8, color: '#fff', fontWeight: 700, letterSpacing: '0.12em' }}>
      {name}
    </Mono>
    <Mono className="block mt-0.5" style={{ fontSize: 6.5, color: `${tone}aa`, letterSpacing: '0.18em' }}>
      {role}
    </Mono>
    <span
      className="absolute top-1 right-1.5 w-1 h-1 rounded-full"
      style={{ background: tone, boxShadow: `0 0 4px ${tone}`, animation: 'op-blink 1.6s ease-in-out infinite' }}
    />
  </div>
);

const AtFieldExpansion: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <div
    className="relative w-full overflow-hidden bg-background/50"
    style={{
      height: expanded ? 80 : 60,
      border: `1px solid ${expanded ? 'rgba(210,143,255,0.55)' : 'rgba(210,143,255,0.18)'}`,
      boxShadow: expanded ? '0 0 20px rgba(210,143,255,0.22)' : 'none',
      clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
      transition: 'all 0.4s cubic-bezier(.2,.7,.3,1)',
    }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 240 80" width="100%" height="100%">
        {(expanded ? [0, 1, 2, 3] : [0, 1, 2]).map((i) => (
          <polygon
            key={i}
            points="120,18 162,40 120,62 78,40"
            fill="none"
            stroke="#d28fff"
            strokeWidth={expanded ? 0.8 : 0.6}
            opacity={(expanded ? 0.75 : 0.6) - i * 0.15}
            style={{
              transformOrigin: '120px 40px',
              transform: `scale(${1 + i * (expanded ? 0.65 : 0.5)})`,
              animation: `op-hex-pulse ${expanded ? 1.2 : 3}s ease-in-out ${i * (expanded ? 0.2 : 0.6)}s infinite`,
            }}
          />
        ))}
        <polygon
          points="120,18 162,40 120,62 78,40"
          fill={expanded ? 'rgba(210,143,255,0.22)' : 'rgba(210,143,255,0.15)'}
          stroke="#d28fff"
          strokeWidth={expanded ? 1.2 : 0.8}
          style={{ transition: 'all 0.4s ease' }}
        />
        {expanded && (
          <>
            <line x1="120" y1="4" x2="120" y2="76" stroke="#d28fff" strokeWidth="0.4" opacity="0.3" />
            <line x1="30" y1="40" x2="210" y2="40" stroke="#d28fff" strokeWidth="0.4" opacity="0.3" />
          </>
        )}
      </svg>
    </div>
    <div className="absolute top-1.5 left-2">
      <Mono style={{ fontSize: 6.5, color: expanded ? 'rgba(210,143,255,0.85)' : 'rgba(210,143,255,0.55)', transition: 'color 0.3s ease' }}>
        AT_FIELD
      </Mono>
    </div>
    <div className="absolute bottom-1.5 right-2">
      <Mono style={{ fontSize: 6.5, color: expanded ? 'rgba(210,143,255,0.9)' : 'rgba(62,201,216,0.7)', transition: 'color 0.3s ease' }}>
        {expanded ? 'ENGAGED' : 'EXPANDING'}
      </Mono>
    </div>
    {expanded && (
      <div className="absolute top-1.5 right-2">
        <Mono style={{ fontSize: 6.5, color: 'rgba(210,143,255,0.55)', animation: 'op-blink 0.8s steps(1) infinite' }}>
          ◆ ACTIVE
        </Mono>
      </div>
    )}
  </div>
);

const SymbolPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative w-80 px-5 py-5 flex flex-col items-center gap-4"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <CornerFrame tone="rgba(210,143,255,0.35)" size={14} offset={0} lineWidth={1.5} />

      <div className="w-full flex gap-1.5 animate-fade-in">
        {MAGI_CONFIG.map(m => <MagiCube key={m.name} {...m} />)}
      </div>

      <div className="w-full flex items-center justify-between -mt-2">
        <Mono style={{ fontSize: 7, color: 'rgba(210,143,255,0.45)' }}>// MAGI_SYSTEM</Mono>
        <Mono style={{ fontSize: 7, color: 'rgba(62,201,216,0.7)' }}>3/3 ONLINE</Mono>
      </div>

      <div style={{ marginTop: 8 }}>
        <NervEmblem size={200} />
      </div>

      <div className="w-full">
        <AtFieldExpansion expanded={expanded} />
      </div>

      <Mono
        className="self-end"
        style={{ fontSize: 6.5, color: 'rgba(210,143,255,0.3)', letterSpacing: '0.3em' }}
      >
        SECTOR · 7G · STGO
      </Mono>
    </div>
  );
};

export default SymbolPanel;
