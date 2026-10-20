import Link from 'next/link';
import { Mail } from 'lucide-react';
import { cv } from '@/data';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { emoteSrc } from '@/lib/emotes';

const chip = 'font-jetbrains rounded-full border border-edge px-3 py-[5px] text-[11px] text-muted';
const social =
  'flex size-10 items-center justify-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent';

export default function Hero() {
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
            data-cat="¡Ese es Angel!"
            data-cat-e="🤩"
            className="flex items-center gap-[0.2em] text-[clamp(44px,8vw,96px)] font-semibold leading-[1] tracking-[-0.03em]"
          >
            Hola, soy Angel
            {wave && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={wave} alt="" width={96} height={96} className="size-[0.9em] shrink-0" />
            )}
            {cat && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cat} alt="" width={96} height={96} className="-ml-[0.1em] size-[0.9em] shrink-0" />
            )}
          </h1>
          <p
            data-cat="Front-end primero, sin miedo al back-end"
            data-cat-e="💻"
            className="max-w-[28ch] text-[clamp(20px,2.6vw,32px)] leading-[1.3] text-muted text-pretty"
          >
            Desarrollador front-end que también construye el back-end.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span data-cat="Ahí trabaja Angel hoy" data-cat-e="💪" className={chip}>
            Hoy en Books&amp;Bits
          </span>
          <span data-cat="Estudiando y construyendo a la vez" data-cat-e="🧐" className={chip}>
            Analista Programador · INACAP
          </span>
          <span data-cat="¡Hay espacio para colaborar!" data-cat-e="🤗" className={chip}>
            Abierto a código abierto
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#proyectos"
            data-cat="¡Vamos a ver proyectos!"
            data-cat-e="🚀"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#e2b5ff]"
          >
            Ver proyectos <span>↓</span>
          </a>
          <Link
            href="/cv"
            data-cat="Mi CV, en versión visual"
            data-cat-e="😉"
            className="inline-flex items-center gap-2 rounded-full border border-edge px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Ver CV <span className="font-jetbrains text-[11px]">→</span>
          </Link>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
          <a href="https://github.com/vngerus" target="_blank" rel="noreferrer" aria-label="GitHub" data-cat="Mi GitHub" data-cat-e="🤩" className={social}>
            <GithubIcon className="size-4" />
          </a>
          <a href="https://www.linkedin.com/in/angelsmithl/" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cat="Mi LinkedIn" data-cat-e="🤝" className={social}>
            <LinkedinIcon className="size-4" />
          </a>
          <a href={`mailto:${cv.email}`} aria-label="Correo" data-cat="Escríbeme un correo" data-cat-e="💌" className={social}>
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
