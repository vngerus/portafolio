import { workCompanies, type WorkProject } from '@/data';
import Link from 'next/link';
import SectionHead from '@/components/SectionHead';

const badge =
  'font-jetbrains absolute top-3 left-3 rounded-full border border-edge bg-background px-2.5 py-1 text-[10px] tracking-[0.08em] text-muted';

function Card({ p, company }: { p: WorkProject; company: string }) {
  const href = p.link ?? p.github;
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
      data-cat={
        p.dev ? `${p.title} sigue en desarrollo` : p.confidential ? `${p.title} es confidencial, shhh` : `${p.title}: ¡échale un vistazo!`
      }
      data-cat-e={p.dev ? '🚧' : p.confidential ? '🤫' : '👉'}
      className="group flex min-w-0 flex-col gap-3.5"
    >
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface1 transition-colors group-hover:border-accent">
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
        <div className="absolute inset-0 flex translate-y-2.5 flex-col justify-between gap-3 bg-background/95 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-5 text-sm leading-normal text-pretty">{p.description}</p>
          <span className="font-jetbrains text-[11px] text-muted">{p.stack.join(' · ')}</span>
        </div>
        {p.dev && <span className={badge}>EN DESARROLLO</span>}
        {p.confidential && <span className={badge}>CONFIDENCIAL</span>}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[17px] font-medium">{p.title}</span>
          <span className="text-sm text-muted">
            {company} · {p.kind}
          </span>
        </div>
        {href && <span className="text-lg leading-none text-accent">↗</span>}
      </div>
    </Tag>
  );
}

export default function Projects() {
  const all = workCompanies.flatMap(c => c.projects.map(p => ({ p, company: c.company })));
  const featured = all.filter(({ p }) => p.featured);
  return (
    <section
      id="proyectos"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <SectionHead num="02" title="Proyectos" />
      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {featured.map(({ p, company }) => (
          <Card key={p.id} p={p} company={company} />
        ))}
      </div>
      <Link
        href="/proyectos"
        className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-edge px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        Ver todos los proyectos <span className="font-jetbrains text-xs text-dim">{all.length}</span>{' '}
        <span>→</span>
      </Link>
    </section>
  );
}
