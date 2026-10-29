'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLink from '@/components/SectionLink';
import { Menu, X } from 'lucide-react';

type Item = { id: string; href: string; label: string; cat: string };

// Hamburger menu for small screens. Opens on tap, closes on link, outside tap or Escape.
export default function MobileNav({ items, openLabel, closeLabel }: { items: Item[]; openLabel: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen(o => !o)}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      <nav
        id="mobile-nav"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full origin-top border-b border-line bg-background transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-y-0 ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <ul className="mx-auto flex max-w-280 flex-col px-[clamp(20px,4vw,40px)] py-2">
          {items.map(i => (
            <li key={i.id} className="border-b border-line last:border-b-0">
              <SectionLink
                id={i.id}
                tabIndex={open ? 0 : -1}
                data-cat={i.cat}
                data-cat-e="👉"
                onNavigate={() => setOpen(false)}
                className="block py-3.5 text-base text-muted transition-colors hover:text-bone"
              >
                {i.label}
              </SectionLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
