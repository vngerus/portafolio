'use client';

import { useState } from 'react';
import type { WorkProject } from '@/data';

const badge =
  'font-jetbrains absolute top-3 left-3 rounded-full border border-edge bg-background px-2.5 py-1 text-[10px] tracking-[0.08em] text-muted';

// Details open on click (not hover): nothing moves under the cursor while browsing.
export default function ProjectCard({ p, company }: { p: WorkProject; company: string }) {
  const [open, setOpen] = useState(false);
  const href = p.link ?? p.github;
  return (
    <div
      data-cat={
        p.dev ? `${p.title} sigue en desarrollo` : p.confidential ? `${p.title} es confidencial, shhh` : `${p.title}: ¡échale un vistazo!`
      }
      data-cat-e={p.dev ? '🚧' : p.confidential ? '🤫' : '👉'}
      className="flex min-w-0 flex-col gap-3.5"
    >
      <div
        className={`relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl border bg-surface1 transition-colors duration-200 ${
          open ? 'border-accent' : 'border-line'
        }`}
      >
        {p.cover ? (
          <div
            role="img"
            aria-label={p.title}
            className="size-full bg-cover bg-center"
            style={{ backgroundImage: `url(${p.cover})` }}
          />
        ) : (
          <span className="font-jetbrains text-xs tracking-[0.08em] text-dim">{p.title}</span>
        )}
        <div
          aria-hidden={!open}
          className={`pointer-events-none absolute inset-0 flex flex-col justify-between gap-3 bg-background/95 p-5 transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-y-0 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <p className="line-clamp-5 text-sm leading-normal text-pretty">{p.description}</p>
          <span className="font-jetbrains text-[11px] text-muted">{p.stack.join(' · ')}</span>
        </div>
        {p.dev && <span className={badge}>EN DESARROLLO</span>}
        {p.confidential && <span className={badge}>CONFIDENCIAL</span>}
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? 'Ocultar' : 'Ver'} detalles de ${p.title}`}
          onClick={() => setOpen(o => !o)}
          className="absolute inset-0 cursor-pointer"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[17px] font-medium">{p.title}</span>
          <span className="text-sm text-muted">
            {company} · {p.kind}
          </span>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${p.title}`}
            className="text-lg leading-none text-accent transition-transform duration-200 hover:-translate-y-px hover:translate-x-px"
          >
            ↗
          </a>
        )}
      </div>
    </div>
  );
}
