'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { WorkCompany } from '@/data';

const tag =
  'font-jetbrains rounded-full border border-edge px-2 py-0.5 text-[10px] tracking-[0.06em] text-muted';

export default function ProjectArchive({ companies }: { companies: WorkCompany[] }) {
  const [filter, setFilter] = useState('all');
  const rows = companies
    .filter(c => filter === 'all' || c.id === filter)
    .flatMap(c => c.projects.map(p => ({ p, company: c.company, year: c.period.slice(0, 4) })));
  const filters = [{ id: 'all', label: 'Todos' }, ...companies.map(c => ({ id: c.id, label: c.company }))];

  return (
    <>
      <div className="mt-9 mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3.5">
          <span className="font-jetbrains text-xs tracking-[0.08em] text-accent">
            {rows.length} proyectos
          </span>
          <h1 className="text-[clamp(36px,6vw,64px)] leading-none font-semibold tracking-[-0.03em]">
            Todos los proyectos
          </h1>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'cursor-pointer rounded-full border px-3.5 py-[7px] text-[13px] transition-colors',
                filter === f.id
                  ? 'border-accent bg-accent text-background'
                  : 'border-edge text-muted hover:border-accent'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="font-jetbrains flex gap-4 border-b border-edge pb-3 text-[11px] tracking-widest text-dim">
        <span className="basis-14">AÑO</span>
        <span className="flex-1 basis-55">PROYECTO</span>
        <span className="hidden basis-40 sm:block">EMPRESA</span>
        <span className="hidden basis-50 md:block">TIPO</span>
        <span className="basis-5" />
      </div>

      {rows.map(({ p, company, year }) => {
        const href = p.link ?? p.github;
        const Tag = href ? 'a' : 'div';
        return (
          <Tag
            key={p.id}
            {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
            className="group flex flex-col border-b border-line"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4.5">
              <span className="font-jetbrains basis-14 text-xs text-dim">{year}</span>
              <div className="flex min-w-0 flex-1 basis-55 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-edge bg-surface1">
                  {p.cover ? (
                    <div
                      role="img"
                      aria-label={p.title}
                      className="size-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${p.cover})` }}
                    />
                  ) : (
                    <span className="font-jetbrains text-[13px] text-accent">
                      {p.title
                        .split(/\s+/)
                        .slice(0, 2)
                        .map(w => w[0].toUpperCase())
                        .join('')}
                    </span>
                  )}
                </div>
                <span className="text-lg font-semibold transition-colors group-hover:text-accent">
                  {p.title}
                </span>
                {p.confidential && <span className={tag}>NDA</span>}
                {p.dev && <span className={tag}>WIP</span>}
              </div>
              <span className="hidden basis-40 text-sm text-muted sm:block">{company}</span>
              <span className="hidden basis-50 text-sm text-muted md:block">{p.kind}</span>
              <span className="basis-5 text-base text-accent">{href ? '↗' : ''}</span>
            </div>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
              <div className="min-h-0 overflow-hidden">
                <div className="flex max-w-190 flex-col gap-2.5 pb-5 sm:pl-18">
                  <p className="text-sm leading-[1.6] text-muted text-pretty">{p.description}</p>
                  <span className="font-jetbrains text-[11px] text-dim">{p.stack.join(' · ')}</span>
                </div>
              </div>
            </div>
          </Tag>
        );
      })}
    </>
  );
}
