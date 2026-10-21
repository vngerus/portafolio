'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { goToSection } from '@/lib/section-nav';

type Props = Omit<React.ComponentProps<typeof Link>, 'href' | 'onClick'> & {
  id: string;
  onNavigate?: () => void;
};

// Link to a home-page section. The href keeps the anchor (new tab / no JS still work); a normal
// click scrolls without putting #section in the address bar.
export default function SectionLink({ id, onNavigate, children, ...rest }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Link
      {...rest}
      href={`/#${id}`}
      onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
        e.preventDefault();
        onNavigate?.();
        goToSection(id, pathname === '/', router.push);
      }}
    >
      {children}
    </Link>
  );
}
