import Image from 'next/image';
import { cn } from '@/lib/utils';

// App icon of a project. No `icon` yet → placeholder with the title's initials.
export default function ProjectIcon({ title, icon, className }: { title: string; icon?: string; className?: string }) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden border border-edge bg-surface1 font-jetbrains text-accent',
        className
      )}
    >
      {icon ? (
        <Image src={icon} alt="" fill sizes="96px" className="object-contain p-1" />
      ) : (
        <span aria-hidden>
          {title
            .split(/\s+/)
            .slice(0, 2)
            .map(w => w[0].toUpperCase())
            .join('')}
        </span>
      )}
    </div>
  );
}
