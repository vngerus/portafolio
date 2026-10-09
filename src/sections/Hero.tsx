export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-280 px-[clamp(20px,4vw,40px)] pt-[clamp(72px,12vw,150px)] pb-[clamp(56px,9vw,112px)]"
    >
      <div className="flex flex-col gap-7">
        <h1 className="text-[clamp(52px,9vw,112px)] font-semibold leading-[0.95] tracking-[-0.03em]">
          Angel Smith
        </h1>
        <p className="max-w-[34ch] text-[clamp(18px,2vw,24px)] leading-[1.45] text-muted text-pretty">
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
    </section>
  );
}
