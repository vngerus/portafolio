'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE_SELECTOR = 'a, button, [data-interactive]';

const MagneticCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const hasMoved = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ringRef.current;
    if (!el) return;

    quickX.current = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    quickY.current = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        gsap.set(el, { autoAlpha: 1 });
      }
      quickX.current?.(e.clientX);
      quickY.current?.(e.clientY);
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: hovering ? 52 : 28,
        height: hovering ? 52 : 28,
        marginLeft: hovering ? -26 : -14,
        marginTop: hovering ? -26 : -14,
        borderRadius: '9999px',
        border: '1.5px solid rgba(210,143,255,0.9)',
        boxShadow: '0 0 8px rgba(210,143,255,0.6)',
        pointerEvents: 'none',
        zIndex: 100,
        opacity: 0,
        transition: 'width 0.25s cubic-bezier(.2,.7,.3,1), height 0.25s cubic-bezier(.2,.7,.3,1), margin 0.25s cubic-bezier(.2,.7,.3,1)',
      }}
    />
  );
};

export default MagneticCursor;
