'use client';

import { ui } from '@/data';
import { useLang } from '@/components/LangProvider';

export default function Footer() {
  const t = ui[useLang().lang].footer;
  return (
    <footer className="font-jetbrains mx-auto flex max-w-280 flex-wrap justify-between gap-4 border-t border-line px-[clamp(20px,4vw,40px)] pt-7 pb-28 text-[11px] md:pb-7 text-dim">
      <span data-cat={t.catEnd} data-cat-e="😌">{t.rights}</span>
      <span data-cat={t.catMade} data-cat-e="☕">
        {t.made}
      </span>
    </footer>
  );
}
