'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

  return (
    <footer className="w-full py-10 pb-24">
      <div
        ref={lineRef}
        className="w-full max-w-220 mx-auto h-px origin-center opacity-100"
        style={{ borderTop: '1px dashed rgba(234,230,218,0.15)' }}
      />

      <div ref={contentRef} className="flex flex-col items-center gap-2 mt-6">
        <p className="footer-item font-mono text-[11px] text-gray-700 tracking-[0.3em] uppercase">
          powered by cats
        </p>
        <p className="footer-item font-mono text-[10px] text-gray-700">
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
      </div>
    </footer>
  );
};

export default Footer;
