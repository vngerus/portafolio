import { experiences } from '@/data';
import SectionHead from '@/components/SectionHead';

export default function Experiences() {
  return (
    <section
      id="experiencia"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <SectionHead num="01" title="Experiencia" />
      <div className="flex flex-col">
        {experiences.map(e => (
          <div
            key={e.company}
            data-cat={e.catLine}
            data-cat-e={e.status === 'ACTIVE' ? '💪' : '🧐'}
            className="grid gap-x-10 gap-y-3 border-b border-line py-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-jetbrains text-xs text-dim">{e.duration}</span>
              <span className="text-[19px] font-semibold">{e.company}</span>
              <span className="text-sm text-muted">
                {e.role} · {e.mode}
              </span>
            </div>
            <div className="flex min-w-0 flex-col gap-3.5 [grid-column:span_2]">
              <p className="text-base leading-[1.55] text-pretty">{e.brief}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.tech.map(t => (
                  <span
                    key={t}
                    data-cat={`${t}: parte del arsenal`}
                    data-cat-e="💪"
                    data-cat-once
                    data-cat-group="tech"
                    className="font-jetbrains rounded-full border border-edge px-2.5 py-1 text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
