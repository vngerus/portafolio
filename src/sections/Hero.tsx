'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { cv, ui } from '@/data';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { emoteSrc } from '@/lib/emotes';
import { useLang } from '@/components/LangProvider';

const chip = 'font-jetbrains rounded-full border border-edge px-3 py-[5px] text-[11px] text-muted';
const social =
  'flex size-10 items-center justify-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent';
const emote = 'inline-block size-[0.85em] align-[-0.08em]';

export default function Hero() {
  const { lang } = useLang();
  const t = ui[lang].hero;
  const wave = emoteSrc('👋');
  const cat = emoteSrc('🐱');
  return (
    <section
      id="top"
      className="mx-auto max-w-280 px-[clamp(20px,4vw,40px)] pt-[clamp(72px,12vw,150px)] pb-[clamp(56px,9vw,112px)]"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h1
            data-cat={t.catName}
            data-cat-e="🤩"
            className="text-[clamp(44px,8vw,96px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          >
            {t.greeting}
            {wave && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={wave} alt="" width={96} height={96} className={`ml-[0.2em] ${emote}`} />
            )}
            {cat && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cat} alt="" width={96} height={96} className={`ml-[-0.05em] ${emote}`} />
            )}
          </h1>
          <p
            data-cat={t.catTagline}
            data-cat-e="💻"
            className="max-w-[28ch] text-[clamp(20px,2.6vw,32px)] leading-[1.3] text-muted text-pretty"
          >
            {t.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span data-cat={t.catNow} data-cat-e="💪" className={chip}>
            {t.chipNow}
          </span>
          <span data-cat={t.catStudy} data-cat-e="🧐" className={chip}>
            {t.chipStudy}
          </span>
          <span data-cat={t.catOpen} data-cat-e="🤗" className={chip}>
            {t.chipOpen}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#proyectos"
            data-cat={t.catProjects}
            data-cat-e="🚀"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#e2b5ff]"
          >
            {t.projects} <span>↓</span>
          </a>
          <Link
            href="/cv"
            data-cat={t.catCv}
            data-cat-e="😉"
            className="inline-flex items-center gap-2 rounded-full border border-edge px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {t.cv} <span className="font-jetbrains text-[11px]">→</span>
          </Link>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
          <a
            href="https://github.com/vngerus"
            target="_blank"
            rel="noreferrer"
            aria-label={t.github}
            data-cat={t.catGithub}
            data-cat-e="🤩"
            className={social}
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/angelsmithl/"
            target="_blank"
            rel="noreferrer"
            aria-label={t.linkedin}
            data-cat={t.catLinkedin}
            data-cat-e="🤝"
            className={social}
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a href={`mailto:${cv.email}`} aria-label={t.mail} data-cat={t.catMail} data-cat-e="💌" className={social}>
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
