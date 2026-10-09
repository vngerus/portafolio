import { education, stackGroups } from '@/data';
import SectionHead from '@/components/SectionHead';

const label = 'font-jetbrains text-[11px] tracking-widest text-dim';
const pill = 'font-jetbrains rounded-full border border-edge px-3 py-[5px] text-[11px]';

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <SectionHead num="03" title="Sobre mí" />
      <div className="grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="flex flex-col gap-4.5 text-[17px] leading-[1.6] text-muted">
          <p className="text-pretty">
            Tengo experiencia construyendo aplicaciones web, mobile y de escritorio. Empecé como
            desarrollador front-end y fui avanzando hacia la integración completa de sistemas:
            modernización de servicios back-end y diseño de bases de datos relacionales.
          </p>
          <p className="text-pretty">
            Actualmente estudio Analista Programador en INACAP para fortalecer mis bases técnicas.
          </p>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <span className={pill}>Inglés B2</span>
            <span className={pill}>Santiago, CL</span>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <span className={label}>STACK</span>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
              {stackGroups.map(g => (
                <div key={g.label} className="flex flex-col gap-2">
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
            <span className={label}>FORMACIÓN Y CERTIFICACIONES</span>
            {education.map(e => (
              <div
                key={e.name}
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
