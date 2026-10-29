'use client';

import { localizeEducation, localizeStack, ui } from '@/data';
import { useLang } from '@/components/LangProvider';
import Image from 'next/image';
import SectionHead from '@/components/SectionHead';

const label = 'font-jetbrains text-[11px] tracking-widest text-dim';
const pill = 'font-jetbrains rounded-full border border-edge px-3 py-[5px] text-[11px]';

export default function About() {
  const { lang } = useLang();
  const t = ui[lang];
  const a = t.about;
  const education = localizeEducation(lang);
  const stackGroups = localizeStack(lang);
  return (
    <section
      id="sobre-mi"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <SectionHead num="03" title={t.sections.about} lang={lang} />
      <div className="grid gap-12 grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div data-cat={a.catBio} data-cat-e="💻" className="flex flex-col gap-4.5 text-[17px] leading-[1.6] text-muted">
          <div
            data-cat={a.catPhoto}
            data-cat-e="🤩"
            className="size-28 self-center overflow-hidden rounded-full border border-accent/40 md:size-40"
          >
            <Image
              src="/avatar.jpg"
              alt={a.photoAlt}
              width={320}
              height={320}
              className="size-full origin-[40%_20%] scale-[1.4] object-cover"
            />
          </div>
          <p className="text-pretty">
            {a.p1}
          </p>
          <p className="text-pretty">
            {a.p2}
          </p>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <span data-cat={a.catEnglish} data-cat-e="😎" className={pill}>{a.english}</span>
            <span data-cat={a.catCity} data-cat-e="☕" className={pill}>{a.city}</span>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <h3 className={label}>{a.stack}</h3>
            <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
              {stackGroups.map(g => (
                <div key={g.label} data-cat={a.catStack(g.label)} data-cat-e="💪" data-cat-group="stack" className="flex flex-col gap-2">
                  <span className="text-[13px] text-accent">{g.label}</span>
                  {g.items.map(i => (
                    <span key={i} className="text-[15px]">
                      {i}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <h3 className={label}>{a.education}</h3>
            {education.map(e => (
              <div
                key={e.name}
                data-cat={a.catEdu(e.name)}
                data-cat-e="🎉"
                data-cat-group="edu"
                className="flex flex-wrap justify-between gap-4 border-b border-line pb-2.5"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px]">{e.name}</span>
                  <span className="text-[13px] text-muted">{e.org}</span>
                </div>
                <span className="font-jetbrains text-[11px] text-dim">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
