'use client';

import ProjectIcon from '@/components/ProjectIcon';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ui, type WorkCompany } from '@/data';
import { useLang } from '@/components/LangProvider';

const tag =
  'font-jetbrains rounded-full border border-edge px-2 py-0.5 text-[10px] tracking-[0.06em] text-muted';

export default function ProjectArchive({ companies }: { companies: WorkCompany[] }) {
  const { lang } = useLang();
  const t = ui[lang].archive;
  const tp = ui[lang].projects;
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const rows = companies
    .filter(c => filter === 'all' || c.id === filter)
    .flatMap(c => c.projects.map(p => ({ p, company: c.company, year: c.period.slice(0, 4) })));
  const filters = [{ id: 'all', label: t.all }, ...companies.map(c => ({ id: c.id, label: c.company }))];

  return (
    <>
      <div className="mt-9 mb-12 flex flex-wrap items-end justify-between gap-6">
        <div data-cat={t.catHead} data-cat-e="🧐" className="flex flex-col gap-3.5">
          <span className="font-jetbrains text-xs tracking-[0.08em] text-accent">
            {t.count(rows.length)}
          </span>
          <h1 className="text-[clamp(36px,6vw,64px)] leading-none font-semibold tracking-[-0.03em]">
            {t.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button
              key={f.id}
              data-cat={t.catFilter(f.label)}
              data-cat-e="🤔"
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
        <span className="basis-14">{t.year}</span>
        <span className="flex-1 basis-55">{t.project}</span>
        <span className="hidden basis-40 sm:block">{t.company}</span>
        <span className="hidden basis-50 md:block">{t.type}</span>
        <span className="basis-5" />
      </div>

      {rows.map(({ p, company, year }) => {
        const href = p.link ?? p.github;
        const isOpen = openId === p.id;
        return (
          <div
            key={p.id}
            data-cat={p.dev ? tp.catDev(p.title) : p.confidential ? tp.catConf(p.title) : tp.catOk(p.title)}
            data-cat-e={p.dev ? '🚧' : p.confidential ? '🤫' : '👉'}
            className="relative border-b border-line"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : p.id)}
              className="group flex w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 py-4.5 pr-8 text-left"
            >
              <span className="font-jetbrains basis-14 text-xs text-dim">{year}</span>
              <div className="flex min-w-0 flex-1 basis-55 items-center gap-3">
                <ProjectIcon title={p.title} icon={p.icon} className="size-9 rounded-full text-[13px]" />
                <span className={cn('text-lg font-semibold transition-colors duration-200', isOpen && 'text-accent')}>
                  {p.title}
                </span>
                {p.confidential && <span className={tag}>NDA</span>}
                {p.dev && <span className={tag}>WIP</span>}
              </div>
              <span className="hidden basis-40 text-sm text-muted sm:block">{company}</span>
              <span className="hidden basis-50 text-sm text-muted md:block">{p.kind}</span>
            </button>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={tp.open(p.title)}
                className="absolute top-4.5 right-0 text-base leading-none text-accent"
              >
                ↗
              </a>
            )}
            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex max-w-190 flex-col gap-2.5 pb-5 sm:pl-18">
                  <p className="text-sm leading-[1.6] text-muted text-pretty">{p.description}</p>
                  <span className="font-jetbrains text-[11px] text-dim">{p.stack.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
