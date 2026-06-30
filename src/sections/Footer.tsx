'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mono, Cursor } from '@/components/nerv/primitives';

const WARN_TONE = '#ff5b3a';
const WARN_TONE_SOFT = 'rgba(255,91,58,0.7)';

const Footer: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [warning, setWarning] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    }

    const items = contentRef.current?.querySelectorAll('.footer-item');
    if (items?.length) {
      gsap.fromTo(
        items,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  }, []);

  const onMouseEnter = () => {
    setWarning(true);
    setFlash(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlash(false), 350);
  };
  const onMouseLeave = () => {
    setWarning(false);
    setFlash(false);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
  };

  useEffect(() => () => { if (flashTimerRef.current) clearTimeout(flashTimerRef.current); }, []);

  return (
    <footer
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative w-full pt-10 pb-24 text-light"
      style={{ transition: 'background 0.4s ease' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: warning
            ? 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,91,58,0.08) 0%, transparent 70%)'
            : 'transparent',
          opacity: warning ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {flash && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(255,91,58,0.12)',
            animation: 'op-warn-flash 0.35s ease-out forwards',
          }}
        />
      )}

      {warning && (
        <>
          {[
            { top: 12, left: 12, borderTop: true, borderLeft: true },
            { top: 12, right: 12, borderTop: true, borderRight: true },
            { bottom: 12, left: 12, borderBottom: true, borderLeft: true },
            { bottom: 12, right: 12, borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <span
              key={i}
              className="absolute"
              style={{
                ...pos,
                width: 14,
                height: 14,
                borderTop: pos.borderTop ? `1.5px solid ${WARN_TONE}` : undefined,
                borderBottom: pos.borderBottom ? `1.5px solid ${WARN_TONE}` : undefined,
                borderLeft: pos.borderLeft ? `1.5px solid ${WARN_TONE}` : undefined,
                borderRight: pos.borderRight ? `1.5px solid ${WARN_TONE}` : undefined,
                animation: 'op-blink 0.8s ease-in-out infinite',
                boxShadow: `0 0 6px ${WARN_TONE}`,
              }}
            />
          ))}
        </>
      )}

      <div className="relative w-full max-w-220 mx-auto px-5 z-[1]">
        <div
          ref={lineRef}
          className="relative w-full rounded-sm origin-center overflow-hidden"
          style={{
            height: warning ? 10 : 6,
            opacity: warning ? 0.7 : 0.3,
            backgroundImage: warning
              ? `repeating-linear-gradient(45deg, ${WARN_TONE}, ${WARN_TONE} 10px, #1a0a06 10px, #1a0a06 20px)`
              : 'repeating-linear-gradient(45deg, #6d448a, #6d448a 10px, #0d0b2e 10px, #0d0b2e 20px)',
            transition: 'all 0.35s ease',
          }}
        >
          {warning && (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${WARN_TONE}55, transparent)`,
                animation: 'op-hazard-sweep 1.2s linear infinite',
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-3.5 mt-5 mb-4">
          <Mono
            className="transition-colors"
            style={{
              fontSize: 8,
              color: warning ? WARN_TONE_SOFT : 'rgba(210,143,255,0.5)',
              letterSpacing: '0.3em',
              animation: warning ? 'op-blink 0.9s ease-in-out infinite' : 'none',
            }}
          >
            {warning ? '⚠ WARN' : '// EOF'}
          </Mono>
          <span className="flex-1 h-px transition-colors" style={{ background: warning ? `${WARN_TONE}80` : 'rgba(55,65,81,0.5)' }} />
          <Mono
            className="transition-colors"
            style={{ fontSize: 8, color: warning ? WARN_TONE_SOFT : 'rgba(210,143,255,0.35)', letterSpacing: '0.2em' }}
          >
            {warning ? 'POINTER · DETECTED' : 'END_OF_TRANSMISSION'}
          </Mono>
          <span className="w-7 h-px transition-colors" style={{ background: warning ? `${WARN_TONE}80` : 'rgba(210,143,255,0.2)' }} />
          <span className="flex items-center gap-1">
            <span
              className="w-[5px] h-[5px] rounded-full transition-colors"
              style={{
                background: warning ? WARN_TONE : '#3ec9d8',
                boxShadow: warning ? `0 0 8px ${WARN_TONE}` : '0 0 6px #3ec9d8',
                animation: warning ? 'op-blink 0.55s ease-in-out infinite' : 'op-blink 2s ease-in-out infinite',
              }}
            />
            <Mono className="transition-colors" style={{ fontSize: 8, color: warning ? WARN_TONE_SOFT : 'rgba(62,201,216,0.7)' }}>
              {warning ? 'ALERT' : 'RX OPEN'}
            </Mono>
          </span>
        </div>

        <div ref={contentRef} className="flex flex-col items-center gap-2 pt-2">
          <div
            className="footer-item mb-1.5"
            style={{ animation: flash ? 'op-warn-shake 0.3s ease-out' : 'none' }}
          >
            <svg viewBox="0 0 40 40" width="32" height="32" className="block">
              <polygon
                points="20,3 35,11 35,29 20,37 5,29 5,11"
                fill="none"
                stroke={warning ? WARN_TONE : '#d28fff'}
                strokeWidth="1"
                opacity={warning ? 0.9 : 0.55}
                style={{ transition: 'all 0.3s ease' }}
              />
              <polygon
                points="20,9 30,15 30,25 20,31 10,25 10,15"
                fill={warning ? 'rgba(255,91,58,0.12)' : 'rgba(210,143,255,0.08)'}
                stroke={warning ? WARN_TONE : '#d28fff'}
                strokeWidth="0.7"
                opacity="0.7"
                style={{ transition: 'all 0.3s ease' }}
              />
              <text
                x="20"
                y="23"
                textAnchor="middle"
                fill="#fff"
                style={{ fontSize: 10, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, letterSpacing: '0.05em' }}
              >
                {warning ? '!' : 'V'}
              </text>
            </svg>
          </div>

          <Mono className="footer-item text-gray-500" style={{ fontSize: 11, letterSpacing: '0.3em' }}>
            powered by cats
          </Mono>

          <p className="footer-item font-mono text-[10px] text-gray-700 m-0">
            © {new Date().getFullYear()} · Ángel &ldquo;
            <a
              href="https://www.linkedin.com/in/angelsmithl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-textPrimary transition-colors"
            >
              vngerus
            </a>
            &rdquo; Smith
          </p>

          <div className="footer-item flex items-center gap-3 mt-2.5">
            <Mono className="text-gray-600" style={{ fontSize: 7, letterSpacing: '0.3em' }}>v2.0.0</Mono>
            <span className="w-px h-2 bg-gray-700/60" />
            <Mono className="text-gray-600" style={{ fontSize: 7, letterSpacing: '0.3em' }}>BUILD · STABLE</Mono>
            <span className="w-px h-2 bg-gray-700/60" />
            <Mono className="text-gray-600" style={{ fontSize: 7, letterSpacing: '0.3em' }}>F-NERV-0925</Mono>
          </div>

          <div
            className="footer-item flex items-center gap-1.5 mt-3 font-mono text-[10px] transition-colors"
            style={{ color: warning ? WARN_TONE_SOFT : 'rgba(210,143,255,0.4)' }}
          >
            <span style={{ color: warning ? WARN_TONE_SOFT : 'rgba(210,143,255,0.3)' }}>$</span>
            <span>{warning ? 'pointer.trace(...)' : 'session.close()'}</span>
            <Cursor tone={warning ? WARN_TONE : '#d28fff'} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
