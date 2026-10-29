'use client';

import Link from 'next/link';
import { Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { getCv, ui, type CvEntry } from '@/data';
import { useLang } from '@/components/LangProvider';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';

const label = 'font-jetbrains text-[11px] tracking-widest text-accent';
const meta = 'font-jetbrains text-xs text-dim';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-t border-line pt-8">
      <h2 className={label}>{title}</h2>
      {children}
    </section>
  );
}

function Entry({ e, emoji }: { e: CvEntry; emoji: string }) {
  return (
    <div data-cat={`${e.org}: ${e.title}`} data-cat-e={emoji} className="grid gap-x-10 gap-y-2 md:grid-cols-[200px_1fr]">
      <span className={meta}>{e.period}</span>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">
          {e.title} <span className="font-normal text-muted">· {e.org}</span>
        </h3>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-normal text-muted marker:text-accent">
          {e.bullets.map(b => (
            <li key={b} className="text-pretty">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CvView() {
  const { lang } = useLang();
  const cv = getCv(lang);
  const t = ui[lang].cv;
  const h = ui[lang].archive;
  return (
    <>
      <Header />
      <main id="main" className="mx-auto flex max-w-280 flex-col gap-10 px-[clamp(20px,4vw,40px)] pt-[clamp(28px,5vw,56px)] pb-[clamp(48px,8vw,96px)]">
        <Link
          href="/"
          data-cat={h.catHome}
          data-cat-e="👋"
          className="font-jetbrains self-start text-xs tracking-[0.06em] text-muted transition-colors hover:text-accent"
        >
          {h.home}
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-[clamp(36px,6vw,64px)] leading-none font-semibold tracking-[-0.03em]">Angel Smith L.</h1>
            <p className="text-[clamp(16px,2vw,20px)] text-muted">{cv.role}</p>
            <div className="font-jetbrains flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
              <a href={`mailto:${cv.email}`} data-cat={t.catMail} data-cat-e="💌" className="inline-flex items-center gap-1.5 hover:text-accent">
                <Mail className="size-3.5" />
                {cv.email}
              </a>
              <a href="https://www.linkedin.com/in/angelsmithl/" target="_blank" rel="noreferrer" data-cat={t.catLinkedin} data-cat-e="🤝" className="inline-flex items-center gap-1.5 hover:text-accent">
                <LinkedinIcon className="size-3.5" />
                LinkedIn
              </a>
              <a href="https://github.com/vngerus" target="_blank" rel="noreferrer" data-cat={t.catGithub} data-cat-e="🤩" className="inline-flex items-center gap-1.5 hover:text-accent">
                <GithubIcon className="size-3.5" />
                GitHub
              </a>
            </div>
          </div>
          <a
            href="/cv-angel-smith.pdf"
            download
            data-cat={t.catDownload}
            data-cat-e="🎉"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#e2b5ff]"
          >
            <Download className="size-4" /> {t.download}
          </a>
        </div>

        <Block title={t.about}>
          <p data-cat={t.catAbout} data-cat-e="💻" className="max-w-[75ch] text-[17px] leading-[1.6] text-muted text-pretty">
            {cv.about}
          </p>
        </Block>

        <Block title={t.experience}>
          {cv.experience.map(e => (
            <Entry key={e.org} e={e} emoji="💪" />
          ))}
        </Block>

        <Block title={t.stack}>
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {cv.stack.map(g => (
              <div key={g.label} data-cat={ui[lang].about.catStack(g.label)} data-cat-e="💪" data-cat-group="stack" className="flex flex-col gap-2">
                <span className="text-[13px] text-accent">{g.label}</span>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map(i => (
                    <span key={i} className="font-jetbrains rounded-full border border-edge px-2.5 py-1 text-[11px] text-muted">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block title={t.education}>
          {cv.education.map(e => (
            <Entry key={e.org} e={e} emoji="🧐" />
          ))}
        </Block>

        <Block title={t.certs}>
          <div className="flex flex-col">
            {cv.certifications.map(c => (
              <div
                key={c.name}
                data-cat={ui[lang].about.catEdu(c.name)}
                data-cat-e="🎉"
                data-cat-group="edu"
                className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-line py-3"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px]">{c.name}</span>
                  <span className="text-[13px] text-muted">{c.org}</span>
                </div>
                <span className={meta}>{c.date}</span>
              </div>
            ))}
          </div>
        </Block>
      </main>
      <Footer />
    </>
  );
}
