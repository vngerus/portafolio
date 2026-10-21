'use client';

import { useEffect } from 'react';
import { cleanHash, clearPending, peekPending, scrollToSection } from '@/lib/section-nav';

// Home page only: lands on the section asked for from another page, or opened via /#section, then drops the hash.
export default function ScrollToPending() {
  useEffect(() => {
    const id = peekPending() ?? (window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : null);
    if (!id) return;
    // Next scrolls to the top right after a client-side navigation commits, so scroll again a moment later.
    const go = () => scrollToSection(id, false);
    const timers = [0, 80, 250].map(ms => setTimeout(go, ms));
    const done = setTimeout(() => {
      cleanHash();
      clearPending();
    }, 300);
    return () => [...timers, done].forEach(clearTimeout);
  }, []);
  return null;
}
