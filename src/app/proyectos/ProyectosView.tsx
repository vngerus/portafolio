'use client';

import Link from 'next/link';
import { localizeCompanies, ui } from '@/data';
import { useLang } from '@/components/LangProvider';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import ProjectArchive from '@/components/ProjectArchive';

export default function ProyectosView() {
  const { lang } = useLang();
  const t = ui[lang].archive;
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-280 px-[clamp(20px,4vw,40px)] pt-[clamp(28px,5vw,56px)] pb-[clamp(48px,8vw,96px)]">
        <Link
          href="/"
          data-cat={t.catHome}
          data-cat-e="👋"
          className="font-jetbrains text-xs tracking-[0.06em] text-muted transition-colors hover:text-accent"
        >
          {t.home}
        </Link>
        <ProjectArchive companies={localizeCompanies(lang)} />
      </main>
      <Footer />
    </>
  );
}
