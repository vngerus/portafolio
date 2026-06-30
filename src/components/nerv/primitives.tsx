'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const WARN_COLOR = '#ff5b3a';

export function useWarnHover() {
  const [warn, setWarn] = useState(false);
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const warnProps = {
    onMouseEnter: () => {
      setWarn(true);
      setFlash(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setFlash(false), 350);
    },
    onMouseLeave: () => {
      setWarn(false);
      setFlash(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    },
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { warn, flash, warnProps };
}

export const WarnOverlay: React.FC<{ warn: boolean; flash: boolean; offset?: number }> = ({
  warn,
  flash,
  offset = 3,
}) => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,91,58,0.1) 0%, transparent 70%)',
        opacity: warn ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1,
      }}
    />
    {flash && (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(255,91,58,0.14)', animation: 'op-warn-flash 0.35s ease-out forwards', zIndex: 2 }}
      />
    )}
    {warn && [
      { top: offset, left: offset, borderTop: true, borderLeft: true },
      { top: offset, right: offset, borderTop: true, borderRight: true },
      { bottom: offset, left: offset, borderBottom: true, borderLeft: true },
      { bottom: offset, right: offset, borderBottom: true, borderRight: true },
    ].map((pos, i) => (
      <span
        key={i}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: pos.top,
          right: (pos as { right?: number }).right,
          bottom: (pos as { bottom?: number }).bottom,
          left: pos.left,
          width: 8,
          height: 8,
          borderTop: pos.borderTop ? `1.5px solid ${WARN_COLOR}` : undefined,
          borderBottom: (pos as { borderBottom?: boolean }).borderBottom ? `1.5px solid ${WARN_COLOR}` : undefined,
          borderLeft: pos.borderLeft ? `1.5px solid ${WARN_COLOR}` : undefined,
          borderRight: (pos as { borderRight?: boolean }).borderRight ? `1.5px solid ${WARN_COLOR}` : undefined,
          animation: 'op-blink 0.8s ease-in-out infinite',
          boxShadow: `0 0 4px ${WARN_COLOR}`,
          zIndex: 3,
        }}
      />
    ))}
  </>
);

export const Mono: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => (
  <span
    className={`font-mono uppercase ${className}`}
    style={{ letterSpacing: '0.15em', ...style }}
  >
    {children}
  </span>
);

export const Cursor: React.FC<{ tone?: string }> = ({ tone = '#d28fff' }) => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    className="inline-block w-[6px] h-[10px] ml-1.5 align-middle"
    style={{ background: tone, opacity: 0.7 }}
  />
);

export const CornerFrame: React.FC<{
  tone?: string;
  size?: number;
  offset?: number;
  lineWidth?: number;
}> = ({ tone = 'rgba(210,143,255,0.4)', size = 14, offset = 8, lineWidth = 1 }) => {
  const common: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
  };
  return (
    <>
      <span style={{ ...common, top: offset, left: offset, borderTop: `${lineWidth}px solid ${tone}`, borderLeft: `${lineWidth}px solid ${tone}` }} />
      <span style={{ ...common, top: offset, right: offset, borderTop: `${lineWidth}px solid ${tone}`, borderRight: `${lineWidth}px solid ${tone}` }} />
      <span style={{ ...common, bottom: offset, left: offset, borderBottom: `${lineWidth}px solid ${tone}`, borderLeft: `${lineWidth}px solid ${tone}` }} />
      <span style={{ ...common, bottom: offset, right: offset, borderBottom: `${lineWidth}px solid ${tone}`, borderRight: `${lineWidth}px solid ${tone}` }} />
    </>
  );
};

export const DiamondGrid: React.FC<{
  opacity?: number;
  size?: number;
  tone?: string;
  variant?: 'thin' | 'doubled' | 'crosshatch';
}> = ({ opacity = 0.04, size = 80, tone = '#d28fff', variant = 'thin' }) => {
  const svgMap: Record<string, string> = {
    thin: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'>
      <polygon points='${size/2},4 ${size-4},${size/2} ${size/2},${size-4} 4,${size/2}' fill='none' stroke='${tone}' stroke-width='0.5'/>
      <circle cx='${size/2}' cy='${size/2}' r='1' fill='${tone}' opacity='0.6'/>
    </svg>`,
    doubled: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'>
      <polygon points='${size/2},4 ${size-4},${size/2} ${size/2},${size-4} 4,${size/2}' fill='none' stroke='${tone}' stroke-width='0.5'/>
      <polygon points='${size/2},${size*0.2} ${size*0.8},${size/2} ${size/2},${size*0.8} ${size*0.2},${size/2}' fill='none' stroke='${tone}' stroke-width='0.4' opacity='0.6'/>
      <line x1='${size/2}' y1='4' x2='${size/2}' y2='${size-4}' stroke='${tone}' stroke-width='0.2' opacity='0.3'/>
      <line x1='4' y1='${size/2}' x2='${size-4}' y2='${size/2}' stroke='${tone}' stroke-width='0.2' opacity='0.3'/>
      <circle cx='${size/2}' cy='${size/2}' r='1.2' fill='${tone}' opacity='0.7'/>
    </svg>`,
    crosshatch: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'>
      <polygon points='${size/2},2 ${size-2},${size/2} ${size/2},${size-2} 2,${size/2}' fill='none' stroke='${tone}' stroke-width='0.4'/>
      <line x1='0' y1='${size/2}' x2='${size/2}' y2='0' stroke='${tone}' stroke-width='0.2' opacity='0.25'/>
      <line x1='${size/2}' y1='0' x2='${size}' y2='${size/2}' stroke='${tone}' stroke-width='0.2' opacity='0.25'/>
      <line x1='0' y1='${size/2}' x2='${size/2}' y2='${size}' stroke='${tone}' stroke-width='0.2' opacity='0.25'/>
      <line x1='${size/2}' y1='${size}' x2='${size}' y2='${size/2}' stroke='${tone}' stroke-width='0.2' opacity='0.25'/>
      <circle cx='${size/2}' cy='${size/2}' r='0.8' fill='${tone}' opacity='0.5'/>
      <circle cx='0' cy='${size/2}' r='0.8' fill='${tone}' opacity='0.3'/>
      <circle cx='${size}' cy='${size/2}' r='0.8' fill='${tone}' opacity='0.3'/>
      <circle cx='${size/2}' cy='0' r='0.8' fill='${tone}' opacity='0.3'/>
      <circle cx='${size/2}' cy='${size}' r='0.8' fill='${tone}' opacity='0.3'/>
    </svg>`,
  };
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgMap[variant])}")`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: 'center',
      }}
    />
  );
};

export const AtFieldBackdrop: React.FC<{ opacity?: number; size?: number }> = ({
  opacity = 0.06,
  size = 64,
}) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 70'>
          <polygon points='30,2 56,17 56,52 30,67 4,52 4,17' fill='none' stroke='%23d28fff' stroke-width='0.8'/>
          <polygon points='30,11 48,21 48,48 30,58 12,48 12,21' fill='none' stroke='%23d28fff' stroke-width='0.4'/>
        </svg>`,
      )}")`,
      backgroundSize: `${size}px ${(size * 70) / 60}px`,
      backgroundPosition: 'center',
    }}
  />
);

export const DotGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: 'radial-gradient(circle, rgba(210,143,255,0.6) 1px, transparent 1px)',
      backgroundSize: '18px 18px',
    }}
  />
);

export const HexSigil: React.FC<{
  size?: number;
  tone?: string;
  label: string;
  sublabel?: string;
  glow?: boolean;
}> = ({ size = 100, tone = '#d28fff', label, sublabel, glow = true }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size * 1.08 }}>
    <div
      className="absolute inset-0"
      style={{
        border: `1.5px solid ${tone}66`,
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
      }}
    />
    <div
      className="absolute"
      style={{
        inset: size * 0.08,
        border: `1px solid ${tone}99`,
        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
        background: `linear-gradient(180deg, ${tone}1a 0%, transparent 100%)`,
      }}
    />
    <div className="relative text-center z-[2]">
      <span
        className="font-jetbrains font-bold text-white block leading-none"
        style={{ fontSize: size * 0.15, letterSpacing: '0.1em', textShadow: glow ? `0 0 12px ${tone}` : undefined }}
      >
        {label}
      </span>
      {sublabel && (
        <Mono className="block mt-1" style={{ fontSize: size * 0.07, color: `${tone}aa` }}>
          {sublabel}
        </Mono>
      )}
    </div>
    <span style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 1, height: 5, background: tone }} />
    <span style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)', width: 1, height: 5, background: tone }} />
  </div>
);

export const SyncGauge: React.FC<{
  value?: number;
  size?: number;
  tone?: string;
  label?: string;
}> = ({ value = 75, size = 50, tone = '#d28fff', label }) => {
  const r = (size - 6) / 2;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - value / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={`${tone}26`} strokeWidth="2" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={tone}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            filter: `drop-shadow(0 0 4px ${tone})`,
            transition: 'stroke-dashoffset 0.8s ease',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-jetbrains font-bold text-white leading-none"
          style={{ fontSize: size * 0.3, letterSpacing: '-0.02em' }}
        >
          {value}
        </span>
        {label && (
          <Mono className="mt-0.5" style={{ fontSize: size * 0.1, color: `${tone}88` }}>
            {label}
          </Mono>
        )}
      </div>
    </div>
  );
};

export const StatChip: React.FC<{ k: string; v: string | number; tone?: string }> = ({
  k,
  v,
  tone = '#d28fff',
}) => (
  <div
    className="bg-background/55 px-2.5 py-1.5"
    style={{
      border: `1px solid ${tone}29`,
      clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
    }}
  >
    <Mono className="block" style={{ fontSize: 6.5, color: `${tone}73`, letterSpacing: '0.25em' }}>
      {k}
    </Mono>
    <div className="font-jetbrains text-xs text-white font-semibold mt-0.5">{v}</div>
  </div>
);

export const LiveClock: React.FC<{ tz?: string }> = ({ tz = 'UTC-3' }) => {
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="font-jetbrains text-[10px] text-gray-500"
      style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.1em' }}
      suppressHydrationWarning
    >
      {time || '--:--'}{' '}
      <span className="opacity-60 ml-0.5">{tz}</span>
    </span>
  );
};

export const SignalBars: React.FC<{ level?: number }> = ({ level = 4 }) => (
  <div className="flex items-end gap-0.5">
    {[1, 2, 3, 4].map((i) => (
      <span
        key={i}
        style={{
          width: 3,
          height: i * 3 + 2,
          background: i <= level ? '#3ec9d8' : 'rgba(62,201,216,0.15)',
          boxShadow: i <= level ? '0 0 4px #3ec9d8' : 'none',
        }}
      />
    ))}
  </div>
);
