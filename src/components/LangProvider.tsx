'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ui } from '@/data';
import type { Lang } from '@/lib/lang';

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'es', setLang: () => {} });

export const useLang = () => useContext(Ctx);

// `initial` comes from the server (Accept-Language). The provider lives in the root layout, so the
// choice survives client-side navigation; a full reload goes back to the browser's language.
export default function LangProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);
  const pathname = usePathname();

  // keep <html lang> and the tab title in step with the chosen language
  useEffect(() => {
    const t = ui[lang];
    document.documentElement.lang = lang;
    document.title = pathname.startsWith('/cv') ? t.cv.metaTitle : pathname.startsWith('/proyectos') ? t.archive.metaTitle : t.meta.title;
  }, [lang, pathname]);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
