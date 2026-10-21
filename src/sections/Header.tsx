'use client';

import Link from 'next/link';
import SectionLink from '@/components/SectionLink';
import { usePathname } from 'next/navigation';
import LangToggle from '@/components/LangToggle';
import MobileNav from '@/components/MobileNav';
import { useLang } from '@/components/LangProvider';
import { ui } from '@/data';

const ids = ['experiencia', 'proyectos', 'sobre-mi', 'contacto'];

export default function Header() {
  const { lang } = useLang();
  const pathname = usePathname();
  const t = ui[lang].nav;
  const items = ids.map(id => ({ id, href: `/#${id}`, label: t.items[id], cat: t.goTo(t.items[id]) }));

  // Logo → top of the home page with a clean URL (no #top): scroll in place when already on "/"
  const goTop = (e: React.MouseEvent) => {
    if (pathname !== '/') return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) history.replaceState(null, '', '/');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-280 items-center gap-3 px-[clamp(20px,4vw,40px)] py-3 sm:py-4">
        <Link
          href="/"
          onClick={goTop}
          data-cat={t.logoCat}
          data-cat-e="😎"
          className="font-jetbrains mr-auto text-[15px] tracking-widest text-accent sm:tracking-[0.18em]"
        >
          vngerus
        </Link>
        <nav className="hidden gap-7 text-sm sm:flex">
          {items.map(i => (
            <SectionLink key={i.id} id={i.id} data-cat={i.cat} data-cat-e="👉" className="text-muted transition-colors hover:text-bone">
              {i.label}
            </SectionLink>
          ))}
        </nav>
        <LangToggle />
        <MobileNav items={items} openLabel={t.openMenu} closeLabel={t.closeMenu} />
      </div>
    </header>
  );
}
