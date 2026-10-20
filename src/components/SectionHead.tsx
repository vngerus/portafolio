import { ui } from '@/data';
import type { Lang } from '@/lib/lang';

// Plain (sync) component so it works from both server and client sections.
export default function SectionHead({ num, title, lang }: { num: string; title: string; lang: Lang }) {
  return (
    <div data-cat={ui[lang].sections.catSection(num, title)} data-cat-e="🧐" className="flex flex-col gap-2.5 mb-10">
      <span className="font-jetbrains text-xs tracking-[0.08em] text-accent">{num}</span>
      <h2 className="text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">{title}</h2>
    </div>
  );
}
