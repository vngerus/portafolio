'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { WorkCompany, WorkProject } from '@/data';
import TechTags from '@/components/tech_button';
import { HoloOverlays, MediaSlot, AnimatedPin, SweepBar, CompanyBanner } from './projects-shared';

const CARD_CLIP =
  'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)';
const TILT_DEG = 5;
const DEFAULT_ACCENT = '#e8332e';
const DUOTONE_FILTER = 'sepia(1) saturate(3.2) hue-rotate(-42deg) contrast(1.15) brightness(0.85)';

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface Tilt {
  x: number;
  y: number;
  hover: boolean;
}

const CompanyCard: React.FC<{ company: WorkCompany }> = ({ company }) => {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0, hover: false });

  const current = company.projects[active];
  if (!current) return null;
  const accent = current?.accentColor ?? DEFAULT_ACCENT;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y, hover: true });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0, hover: false });

  const transition = tilt.hover
    ? 'transform 0.12s ease-out'
    : 'transform 0.6s cubic-bezier(.2,.7,.3,1)';

  const bgImage =
    current.imgback && !current.imgback.match(/\.gif$/i) && !current.videoback
      ? `url(${current.imgback})`
      : undefined;

  return (
    <div className="relative mb-10">
      <div className="mb-3.5">
        <CompanyBanner company={company} />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_210px] gap-4 items-start">
        <div className="flex flex-col gap-3.5">
          <div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative h-90"
            style={{ perspective: '1400px', perspectiveOrigin: 'center center' }}
          >
            <div
              className="absolute inset-0 border border-accentPrimary/10 bg-background/40"
              style={{
                transform: `translate3d(${10 + tilt.x * 4}px, ${10 - tilt.y * 4}px, -80px) rotateY(${tilt.x * TILT_DEG * 0.4}deg) rotateX(${-tilt.y * TILT_DEG * 0.3}deg)`,
                transition,
                clipPath: CARD_CLIP,
              }}
            />
            <div
              className="absolute inset-0 border border-accentPrimary/15 bg-background-secondary/60"
              style={{
                transform: `translate3d(${5 + tilt.x * 6}px, ${5 - tilt.y * 6}px, -40px) rotateY(${tilt.x * TILT_DEG * 0.6}deg) rotateX(${-tilt.y * TILT_DEG * 0.5}deg)`,
                transition,
                clipPath: CARD_CLIP,
              }}
            />
            <div
              key={current.title}
              className="absolute inset-0 animate-card-swap"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${tilt.x * TILT_DEG}deg) rotateX(${-tilt.y * TILT_DEG}deg) translateZ(20px)`,
                transition,
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden border border-accentPrimary/45"
                style={{
                  backgroundImage: bgImage,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#0a0825',
                  filter: current.imgback ? DUOTONE_FILTER : undefined,
                  boxShadow: '0 0 36px rgba(232,51,46,0.22), 0 18px 40px rgba(0,0,0,0.55)',
                  clipPath: CARD_CLIP,
                }}
              >
                <MediaSlot project={current} />
                <HoloOverlays intense />

                <div
                  className="absolute inset-0 pointer-events-none z-22"
                  style={{
                    background: `radial-gradient(circle at ${50 + tilt.x * 30}% ${50 + tilt.y * 30}%, ${hexToRgba(accent, 0.18)} 0%, transparent 45%)`,
                    opacity: tilt.hover ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    mixBlendMode: 'screen',
                  }}
                />
                <div className="absolute top-3.5 left-7 right-7 flex justify-between items-center z-25">
                  <div
                    className="flex items-center gap-2 bg-background/70 border border-accentPrimary/25 px-2.5 py-1 backdrop-blur"
                    style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                  >
                    {current.imglogo ? (
                      <Image
                        src={current.imglogo}
                        alt=""
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 object-contain"
                      />
                    ) : (
                      <span
                        className="w-2 h-2 bg-accentPrimary"
                        style={{ transform: 'rotate(45deg)' }}
                      />
                    )}
                    <span className="font-mono text-[8px] text-accentPrimary/75 tracking-[0.15em] uppercase">
                      {company.opCode}·{String(active + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[8px] text-accentPrimary/55 tracking-[0.15em] uppercase bg-background/70 border border-accentPrimary/25 px-2.5 py-1 backdrop-blur"
                    style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                  >
                    {String(active + 1).padStart(2, '0')} /{' '}
                    {String(company.projects.length).padStart(2, '0')}
                  </span>
                </div>
                <SweepBar key={`sweep-${active}`} />
                <AnimatedPin key={`pin-${active}`} logo={current.imglogo} accent={accent} />
                <div
                  className="absolute left-4.5 top-1/2 -translate-y-1/2 w-px h-15 z-25"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${accent} 50%, transparent 100%)`,
                    opacity: tilt.hover ? 0.9 : 0.5,
                    transition: 'opacity 0.4s ease',
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              </div>
            </div>{' '}
            <div
              className="absolute left-4.5 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full z-30"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}`,
                opacity: tilt.hover ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>
          <ProjectInfoBar
            key={`info-${current.title}`}
            project={current}
            index={active}
            company={company}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[8px] text-accentPrimary/40 tracking-[0.2em] uppercase mb-0.5">
            {'// BITÁCORA · '}
            {company.projects.length}
            {' OPS'}
          </p>
          {company.projects.map((p, i) => (
            <ThumbButton
              key={p.title}
              project={p}
              index={i}
              isActive={i === active}
              onClick={() => setActive(i)}
            />
          ))}
          <div className="mt-auto pt-3 border-t border-dashed border-accentPrimary/15 flex flex-col gap-1">
            <p className="font-mono text-[7px] text-accentPrimary/35 tracking-[0.2em] uppercase">
              {'ROL · '}
              {company.role}
            </p>
            <p className="font-mono text-[7px] text-accentPrimary/25 tracking-[0.2em] uppercase">
              ✱ MUEVE EL MOUSE EN EL PREVIEW
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectInfoBar: React.FC<{ project: WorkProject; index: number; company: WorkCompany }> = ({
  project,
  index,
  company,
}) => (
  <div
    className="relative border border-accentPrimary/20 bg-background-secondary/55 px-4 pt-3.5 pb-4 animate-fade-in"
    style={{ clipPath: CARD_CLIP }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accentPrimary/45 to-transparent" />
    <div className="flex items-baseline justify-between gap-3 mb-1">
      <div className="flex items-baseline gap-3 min-w-0">
        <span className="font-mono text-[10px] text-accentPrimary/40 tracking-[0.15em] uppercase shrink-0">
          {'// '}
          {company.opCode}.{String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-[22px] font-bold text-white tracking-tight truncate">
          {project.title}
        </h3>
        <span className="font-mono text-[9px] text-accentPrimary/55 italic">{project.subtitle}</span>
      </div>
      <span className="font-mono text-[8px] text-accentPrimary/40 tracking-[0.15em] uppercase">
        {project.kind}
      </span>
    </div>
    <p className="text-[12.5px] text-gray-400 leading-relaxed my-2.5 mb-3">{project.description}</p>

    <div className="flex items-center justify-between gap-3 flex-wrap">
      <TechTags techStack={project.techStack} />
      <div className="flex gap-2">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[10px] text-accentPrimary/85 tracking-[0.15em] uppercase border border-accentPrimary/40 px-3.5 py-1.5 bg-accentPrimary/5 hover:bg-accentPrimary/10 transition-colors"
          style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
        >
          <FiExternalLink size={11} />
          Ver despliegue
        </a>
        <a
          href={project.github ?? 'https://github.com/vngerus'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 tracking-[0.15em] uppercase border border-gray-700/60 px-3.5 py-1.5 hover:border-accentPrimary/30 hover:text-gray-300 transition-colors"
          style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
        >
          <FiGithub size={11} />
          GitHub
        </a>
      </div>
    </div>

    <div className="flex gap-4 mt-3 pt-2.5 border-t border-dashed border-accentPrimary/15">
      {[
        { k: 'LH', v: project.metrics.lh },
        { k: 'BUILD', v: project.metrics.build },
        { k: 'DEPS', v: project.metrics.deps },
      ].map(m => (
        <div key={m.k} className="flex items-baseline gap-1.5">
          <span className="font-mono text-[7px] text-accentPrimary/35 tracking-[0.2em] uppercase">
            {m.k}
          </span>
          <span className="font-mono text-[11px] text-light font-bold tracking-wider">{m.v}</span>
        </div>
      ))}
    </div>
  </div>
);

const ThumbButton: React.FC<{
  project: WorkProject;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ project, index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="relative p-0 border-0 bg-transparent cursor-pointer text-left transition-transform active:scale-96 duration-120"
  >
    <div
      className={`relative h-24 overflow-hidden border transition-all ${isActive ? 'border-accentPrimary/55' : 'border-accentPrimary/15'}`}
      style={{
        backgroundImage:
          project.imgback && !project.imgback.match(/\.gif$/i)
            ? `url(${project.imgback})`
            : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#0a0825',
        filter: project.imgback ? DUOTONE_FILTER : undefined,
        boxShadow: isActive ? '0 0 20px rgba(232,51,46,0.28)' : 'none',
        clipPath:
          'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
      }}
    >
      {project.imgback?.match(/\.gif$/i) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.imgback} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {!project.imgback && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(232,51,46,0.05) 0 6px, transparent 6px 14px), linear-gradient(180deg, #0a0825 0%, #0d0b2e 100%)',
          }}
        />
      )}
      <div
        className="absolute inset-0 transition-colors"
        style={{
          background: isActive
            ? 'linear-gradient(180deg, rgba(10,8,37,0.3) 0%, rgba(10,8,37,0.85) 100%)'
            : 'linear-gradient(180deg, rgba(10,8,37,0.65) 0%, rgba(10,8,37,0.95) 100%)',
        }}
      />
      {isActive && (
        <span
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accentPrimary animate-pulse"
          style={{ boxShadow: '0 0 8px #e8332e' }}
        />
      )}
      <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
        <span
          className={`font-mono text-[7px] tracking-[0.15em] uppercase ${isActive ? 'text-accentPrimary/85' : 'text-accentPrimary/40'}`}
        >
          {'#'}
          {String(index + 1).padStart(2, '0')}
          {' · '}
          {project.kind}
        </span>
        <div>
          <div
            className={`text-[13px] font-semibold tracking-tight ${isActive ? 'text-white' : 'text-gray-300'}`}
          >
            {project.title}
          </div>
          <span
            className={`block font-mono text-[7px] mt-0.5 tracking-wide ${isActive ? 'text-accentPrimary/65' : 'text-gray-400/60'}`}
          >
            {project.subtitle}
          </span>
        </div>
      </div>
      {isActive && (
        <>
          <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-accentPrimary/70" />
          <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-accentPrimary/70" />
        </>
      )}
    </div>
  </button>
);

export default CompanyCard;
