import { education, stackGroups } from '@/data';
import Image from 'next/image';
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
        <div data-cat="De front-end a sistemas completos" data-cat-e="💻" className="flex flex-col gap-4.5 text-[17px] leading-[1.6] text-muted">
          <div
            data-cat="¡Ese es Angel!"
            data-cat-e="🤩"
            className="size-28 self-center overflow-hidden rounded-full border border-accent/40 md:size-40"
          >
            <Image
              src="/avatar.jpg"
              alt="Foto de Angel Smith"
              width={320}
              height={320}
              className="size-full origin-[40%_20%] scale-[1.4] object-cover"
            />
          </div>
          <p className="text-pretty">
            Hola, soy Angel Smith. Soy desarrollador con un enfoque fuerte en front-end, pero cada
            vez más metido en el full stack: APIs, bases de datos y migraciones de sistemas.
          </p>
          <p className="text-pretty">
            Hoy trabajo en Books&amp;Bits y estudio Analista Programador en INACAP. Fuera del código
            me gustan los gatos, el café de especialidad y algún jueguito. Estoy abierto a colaborar
            en código abierto y en lo que venga.
          </p>
          <div className="flex flex-wrap gap-2 pt-1.5">
            <span data-cat="Inglés B2: puedo leer los errores en su idioma original" data-cat-e="😎" className={pill}>Inglés B2</span>
            <span data-cat="Desde Santiago, con café" data-cat-e="☕" className={pill}>Santiago, CL</span>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <span className={label}>STACK</span>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
              {stackGroups.map(g => (
                <div key={g.label} data-cat={`${g.label}: lo domina Angel`} data-cat-e="💪" data-cat-group="stack" className="flex flex-col gap-2">
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
                data-cat={`${e.name}: otro logro desbloqueado`}
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
