'use client';

import { localizeCompanies, ui } from '@/data';
import { useLang } from '@/components/LangProvider';
import Link from 'next/link';
import SectionHead from '@/components/SectionHead';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  const { lang } = useLang();
  const t = ui[lang];
  const workCompanies = localizeCompanies(lang);
  const all = workCompanies.flatMap(c => c.projects.map(p => ({ p, company: c.company })));
  const featured = all.filter(({ p }) => p.featured);
  return (
    <section
      id="proyectos"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <SectionHead num="02" title={t.sections.projects} lang={lang} />
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {featured.map(({ p, company }) => (
          <ProjectCard key={p.id} p={p} company={company} />
        ))}
      </div>
      <Link
        href="/proyectos"
        className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-edge px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        {t.projects.viewAll} <span className="font-jetbrains text-xs text-dim">{all.length}</span>{' '}
        <span>→</span>
      </Link>
    </section>
  );
}
