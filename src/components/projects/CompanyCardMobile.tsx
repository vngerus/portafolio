'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { WorkCompany } from '@/data';
import TechTags from '@/components/tech_button';
import { HoloOverlays, MediaSlot, AnimatedPin, SweepBar } from './projects-shared';

const CARD_CLIP =
  'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)';

const CompanyCardMobile: React.FC<{ company: WorkCompany }> = ({ company }) => {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);
  const current = company.projects[active];
  if (!current) return null;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setActive((active + 1) % company.projects.length);
    else setActive((active - 1 + company.projects.length) % company.projects.length);
  };

  const bgImage =
    current.imgback && !current.imgback.match(/\.gif$/i) && !current.videoback
      ? `url(${current.imgback})`
      : undefined;

  return (
    <div className="mb-6">
      {/* Compact company banner */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-buttonUnselected/25 border border-gray-700/40 mb-2.5"
        style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[8px] text-textPrimary/55 tracking-[0.2em] uppercase">
            {company.opCode}
          </span>
          <span className="w-px h-2.5 bg-gray-700" />
          <span
            className={`w-1.5 h-1.5 rounded-full ${company.status === 'ACTIVE' ? 'bg-textPrimary animate-pulse' : 'bg-gray-600'}`}
            style={{ boxShadow: company.status === 'ACTIVE' ? '0 0 6px #d28fff' : 'none' }}
          />
          <span className={`font-mono text-[7px] tracking-[0.2em] uppercase ${company.status === 'ACTIVE' ? 'text-textPrimary/70' : 'text-gray-600'}`}>
            {company.status}
          </span>
        </div>
        <span className="font-mono text-[8px] text-textPrimary/35 tracking-wider">{company.period}</span>
      </div>

      {/* PREVIEW · swipe */}
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="relative h-[200px] mb-3">
        <div className="absolute inset-0 border border-textPrimary/10 bg-background/35" style={{ transform: 'translate(6px, 6px)', clipPath: CARD_CLIP }} />
        <div className="absolute inset-0 border border-textPrimary/15 bg-background-secondary/55" style={{ transform: 'translate(3px, 3px)', clipPath: CARD_CLIP }} />

        <div
          key={current.title}
          className="absolute inset-0 overflow-hidden border border-textPrimary/45 animate-card-swap"
          style={{
            backgroundImage: bgImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0a0825',
            boxShadow: '0 0 28px rgba(210,143,255,0.22), 0 12px 24px rgba(0,0,0,0.55)',
            clipPath: CARD_CLIP,
          }}
        >
          <MediaSlot project={current} />
          <HoloOverlays intense />

          {/* HUD chips */}
          <div className="absolute top-2.5 left-5 right-5 flex justify-between items-center z-[25]">
            <div
              className="flex items-center gap-1.5 bg-background/70 border border-textPrimary/25 px-2 py-1 backdrop-blur"
              style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
            >
              {current.imglogo ? (
                <Image src={current.imglogo} alt="" width={11} height={11} className="object-contain" />
              ) : (
                <span className="w-1.5 h-1.5 bg-textPrimary" style={{ transform: 'rotate(45deg)' }} />
              )}
              <span className="font-mono text-[7px] text-textPrimary/75 tracking-[0.15em] uppercase">
                {company.opCode}·{String(active + 1).padStart(2, '0')}
              </span>
            </div>
            <span
              className="font-mono text-[7px] text-textPrimary/55 tracking-[0.15em] uppercase bg-background/70 border border-textPrimary/25 px-2 py-1 backdrop-blur"
              style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
            >
              {String(active + 1).padStart(2, '0')}/{String(company.projects.length).padStart(2, '0')}
            </span>
          </div>

          <SweepBar key={`sweep-${active}`} />
          <AnimatedPin key={`pin-${active}`} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mb-2.5">
        {company.projects.map((p, i) => (
          <button key={p.title} onClick={() => setActive(i)} className="bg-transparent border-0 p-1 cursor-pointer" aria-label={`Ir al proyecto ${i + 1}`}>
            <span
              className={`block h-[3px] transition-all ${i === active ? 'w-4 bg-textPrimary' : 'w-1.5 bg-textPrimary/25'}`}
              style={{ clipPath: 'polygon(1px 0, 100% 0, calc(100% - 1px) 100%, 0 100%)' }}
            />
          </button>
        ))}
      </div>

      {/* Thumb strip */}
      <div
        className="project-thumbs-strip flex gap-2 overflow-x-auto pb-2 mb-3"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {company.projects.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className="shrink-0 p-0 border-0 bg-transparent cursor-pointer text-left"
              style={{ flex: '0 0 130px', scrollSnapAlign: 'start' }}
            >
              <div
                className={`relative h-[70px] overflow-hidden border transition-all ${isActive ? 'border-textPrimary/55' : 'border-textPrimary/15'}`}
                style={{
                  backgroundImage: p.imgback && !p.imgback.match(/\.gif$/i) ? `url(${p.imgback})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#0a0825',
                  boxShadow: isActive ? '0 0 16px rgba(210,143,255,0.25)' : 'none',
                  clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
                }}
              >
                {p.imgback?.match(/\.gif$/i) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imgback} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                {!p.imgback && (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(210,143,255,0.05) 0 6px, transparent 6px 12px), linear-gradient(180deg, #0a0825 0%, #0d0b2e 100%)' }}
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(10,8,37,0.3) 0%, rgba(10,8,37,0.9) 100%)'
                      : 'linear-gradient(180deg, rgba(10,8,37,0.6) 0%, rgba(10,8,37,0.95) 100%)',
                  }}
                />
                {isActive && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-textPrimary animate-pulse" style={{ boxShadow: '0 0 6px #d28fff' }} />
                )}
                <div className="absolute inset-0 p-1.5 flex flex-col justify-between">
                  <span className={`font-mono text-[6px] tracking-[0.15em] uppercase ${isActive ? 'text-textPrimary/85' : 'text-textPrimary/40'}`}>
                    {'#'}{String(i + 1).padStart(2, '0')}
                  </span>
                  <div className={`text-[10px] font-semibold tracking-tight leading-tight ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {p.title}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info card */}
      <div
        key={`m-info-${current.title}`}
        className="relative border border-textPrimary/20 bg-background-secondary/55 px-3.5 py-3 animate-fade-in"
        style={{ clipPath: CARD_CLIP }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/45 to-transparent" />
        <p className="font-mono text-[8px] text-textPrimary/40 tracking-[0.15em] uppercase mb-1">
          {'// '}{company.opCode}.{String(active + 1).padStart(2, '0')}{' · '}{current.kind}
        </p>
        <h3 className="text-[17px] font-bold text-white tracking-tight">{current.title}</h3>
        <p className="font-mono text-[9px] text-textPrimary/55 italic mt-0.5">{current.subtitle}</p>
        <p className="text-[11.5px] text-gray-400 leading-relaxed my-2.5 mb-3">{current.description}</p>
        <TechTags techStack={current.techStack} />
        <div className="flex gap-1.5 mt-3">
          <a
            href={current.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[8px] text-textPrimary/85 tracking-[0.15em] uppercase border border-textPrimary/40 px-2.5 py-1.5 bg-textPrimary/5"
            style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
          >
            <FiExternalLink size={10} />
            Ver despliegue
          </a>
          <a
            href={current.github ?? 'https://github.com/vngerus'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 font-mono text-[8px] text-gray-400 tracking-[0.15em] uppercase border border-gray-700/60 px-2.5 py-1.5"
            style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
          >
            <FiGithub size={10} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyCardMobile;
