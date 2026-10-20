'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import { toast, Toaster } from 'sonner';
import SectionHead from '@/components/SectionHead';
import { catEvent } from '@/lib/cat';
import { ui } from '@/data';
import { useLang } from '@/components/LangProvider';

const INITIAL = { name: '', email: '', message: '', website: '' }; // website = honeypot

const links = [
  { name: 'GitHub', handle: '/vngerus ↗', href: 'https://github.com/vngerus' },
  { name: 'LinkedIn', handle: '/angelsmithl ↗', href: 'https://www.linkedin.com/in/angelsmithl/' },
  { name: 'Discord', handle: 'vngerus' },
];

const rowCls = 'flex justify-between border-b border-line py-3.5 text-base';
const fieldCls =
  'rounded-[10px] border border-edge bg-background px-3.5 py-3 text-[15px] text-bone outline-none placeholder:text-dim focus:border-accent';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Turnstile = {
  render: (el: HTMLElement, o: { sitekey: string; theme: string; callback: (t: string) => void; 'expired-callback': () => void }) => string;
  reset: (id?: string) => void;
};
const getTurnstile = () => (window as unknown as { turnstile?: Turnstile }).turnstile;

export default function Contact() {
  const { lang } = useLang();
  const t = ui[lang].contact;
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>(undefined);

  // send stays disabled until every field is filled (valid email) and the captcha passed
  const ready =
    form.name.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) &&
    form.message.trim() !== '' &&
    (!SITE_KEY || !!token);

  const mountCaptcha = () => {
    const ts = getTurnstile();
    if (!SITE_KEY || !ts || !boxRef.current || widgetId.current) return;
    widgetId.current = ts.render(boxRef.current, {
      sitekey: SITE_KEY,
      theme: 'dark',
      callback: setToken,
      'expired-callback': () => setToken(''),
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token, lang }),
      });
      if (res.ok) {
        toast.success(t.ok);
        catEvent('celebrate', t.catSent);
        setForm(INITIAL);
      } else {
        const { error } = await res.json().catch(() => ({ error: '' }));
        toast.error(error || t.fail);
        catEvent('oops', t.catFail);
      }
    } catch {
      toast.error(t.offline);
      catEvent('oops', t.catOffline);
    } finally {
      // a Turnstile token is single use: get a fresh one for the next attempt
      setToken('');
      getTurnstile()?.reset(widgetId.current);
      setLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <Toaster position="bottom-right" theme="dark" />
      <div className="grid gap-12 grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))]">
        <div className="flex flex-col gap-5">
          <SectionHead num="04" title={ui[lang].sections.contact} lang={lang} />
          <p className="max-w-[36ch] text-[17px] leading-[1.55] text-muted text-pretty">
            {t.intro}
          </p>
          <div className="flex flex-col pt-3">
            {links.map(l => {
              const inner = (
                <>
                  <span>{l.name}</span>
                  <span className="font-jetbrains text-xs text-dim">{l.handle}</span>
                </>
              );
              return l.href ? (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cat={t.catFollow(l.name)}
                  data-cat-e="🤩"
                  className={rowCls}
                >
                  {inner}
                </a>
              ) : (
                <div key={l.name} className={rowCls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          data-cat={t.catForm}
          data-cat-e="🧐"
          className="relative flex flex-col gap-4 rounded-[20px] border border-line bg-surface1 p-[clamp(20px,3vw,32px)]"
        >
          <label data-cat={t.catName} data-cat-e="😊" className="flex flex-col gap-2 text-[13px] text-muted">
            {t.name}
            <input name="name" required placeholder={t.phName} maxLength={80} autoComplete="name" value={form.name} onChange={onChange} className={fieldCls} />
          </label>
          <label data-cat={t.catEmail} data-cat-e="🤞" className="flex flex-col gap-2 text-[13px] text-muted">
            {t.email}
            <input
              name="email"
              placeholder={t.phEmail}
              type="email"
              required
              maxLength={120}
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              className={fieldCls}
            />
          </label>
          <label data-cat={t.catMessage} data-cat-e="🧐" className="flex flex-col gap-2 text-[13px] text-muted">
            {t.message}
            <textarea
              name="message"
              placeholder={t.phMessage}
              rows={5}
              required
              maxLength={3000}
              value={form.message}
              onChange={onChange}
              className={`${fieldCls} resize-y`}
            />
          </label>
          {SITE_KEY && (
            <>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={mountCaptcha} />
              <div ref={boxRef} className="flex justify-center" />
            </>
          )}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={form.website}
            onChange={onChange}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <button
            type="submit"
            data-cat={t.catSend}
            data-cat-e="🚀"
            disabled={loading || !ready}
            className="mt-1 cursor-pointer rounded-full bg-accent px-5 py-3.5 text-[15px] font-medium text-background transition-colors hover:bg-[#e2b5ff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t.sending : t.send}
          </button>
        </form>
      </div>
    </section>
  );
}
