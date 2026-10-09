import Link from 'next/link';

const links = [
  { href: '/#experiencia', label: 'Experiencia' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#sobre-mi', label: 'Sobre mí' },
  { href: '/#contacto', label: 'Contacto' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-280 items-center justify-between gap-4 px-[clamp(20px,4vw,40px)] py-4">
        <Link href="/#top" className="font-jetbrains text-[15px] tracking-[0.18em] text-accent">
          vngerus
        </Link>
        <nav className="flex flex-wrap justify-end gap-[clamp(14px,2.4vw,28px)] text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-muted transition-colors hover:text-bone">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
