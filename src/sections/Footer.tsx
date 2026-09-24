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
    <footer className="w-full py-12 pb-24 relative overflow-hidden">
      {/* Top telemetry divider */}
      <div className="relative w-full max-w-220 mx-auto mb-8">
        <div
          ref={lineRef}
          className="w-full h-px origin-center"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.4) 30%, rgba(168,85,247,0.7) 50%, rgba(168,85,247,0.4) 70%, transparent 100%)',
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#0b0a08] flex items-center gap-2 border border-accentPrimary/30">
          <span className="w-1.5 h-1.5 bg-accentPrimary rotate-45 shadow-[0_0_6px_#a855f7]" />
          <span className="font-mono text-[8px] text-accentPrimary tracking-[0.25em] uppercase">
            SYS_EOF // NERV_STBY
          </span>
          <span className="w-1.5 h-1.5 bg-accentPrimary rotate-45 shadow-[0_0_6px_#a855f7]" />
        </div>
      </div>

      <div ref={contentRef} className="flex flex-col items-center gap-4 mt-4">
        {/* Enhanced 'powered by cats' badge */}
        <div
          onClick={() => {
            window.dispatchEvent(new CustomEvent('banana-cat-menu'));
          }}
          title="¡Haz clic para interactuar con Banana Cat!"
          className="footer-item group relative flex items-center gap-2.5 px-4 py-1.5 bg-[#0f0c18] border border-accentPrimary/40 text-accentPrimary font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:border-accentPrimary hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-pointer select-none active:scale-95"
          style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accentPrimary animate-pulse shadow-[0_0_8px_#a855f7]" />
          <span className="font-semibold">POWERED BY CATS</span>
          <span className="text-[12px] group-hover:scale-125 transition-transform duration-200">
            ᓚᘏᗢ
          </span>
          <span className="text-accentPrimary/60 group-hover:text-accentPrimary transition-colors">
            🐾
          </span>
        </div>

        {/* System telemetries */}
        <div className="footer-item flex flex-wrap justify-center items-center gap-2.5 font-mono text-[8px] text-gray-500 tracking-[0.18em] uppercase mt-2">
          <span>LOC: SANTIAGO, CL</span>
          <span className="text-accentPrimary/40">·</span>
          <span>STATUS: ALL SYSTEMS NOMINAL</span>
          <span className="text-accentPrimary/40">·</span>
          <span>SYS_VER: 2.6.4</span>
        </div>

        {/* Copyright */}
        <p className="footer-item font-mono text-[10px] text-gray-400">
          © {new Date().getFullYear()} · ÁNGEL &ldquo;
          <a
            href="https://www.linkedin.com/in/angelsmithl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accentPrimary hover:text-white transition-colors font-semibold"
          >
            vngerus
          </a>
          &rdquo; SMITH · FRONT-END & BACK-END DEVELOPER
        </p>
      </div>
    </footer>
  );
};

export default Footer;
