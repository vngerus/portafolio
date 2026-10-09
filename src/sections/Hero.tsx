'use client';

import dynamic from 'next/dynamic';

const CatCanvas = dynamic(() => import('@/components/CatCanvas'), { ssr: false });

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-280 items-center gap-12 px-[clamp(20px,4vw,40px)] pt-[clamp(56px,10vw,120px)] pb-[clamp(48px,8vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
    >
      <div className="flex flex-col gap-7">
        <h1 className="text-[clamp(44px,7vw,84px)] font-semibold leading-[0.96] tracking-[-0.03em]">
          Angel Smith
        </h1>
        <p className="max-w-[30ch] text-[clamp(18px,2vw,22px)] leading-[1.45] text-muted text-pretty">
          Desarrollador full-stack. Interfaces cuidadas en front-end, APIs y migraciones de
          sistemas en back-end. Hoy en <span className="text-bone">Books&amp;Bits</span>.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#e2b5ff]"
          >
            Ver proyectos <span>↓</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-edge px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Descargar CV <span className="font-jetbrains text-[11px]">PDF</span>
          </a>
        </div>
      </div>
      <div className="relative aspect-square max-h-120 w-full">
        <CatCanvas />
      </div>
    </section>
  );
}
