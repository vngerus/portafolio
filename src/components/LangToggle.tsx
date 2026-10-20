'use client';

import { useLang } from '@/components/LangProvider';
import type { Lang } from '@/lib/lang';

const OPTIONS: Lang[] = ['es', 'en'];

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label={lang === 'es' ? 'Idioma' : 'Language'}
      className="font-jetbrains flex items-center gap-1 rounded-full border border-edge p-0.5 text-[11px]"
    >
      {OPTIONS.map(l => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`cursor-pointer rounded-full px-2 py-0.5 uppercase transition-colors duration-200 ${
            lang === l ? 'bg-accent text-background' : 'text-muted hover:text-bone'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
