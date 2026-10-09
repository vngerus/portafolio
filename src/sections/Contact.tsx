'use client';

import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import SectionHead from '@/components/SectionHead';

const INITIAL = { name: '', email: '', message: '' };

const links = [
  { name: 'GitHub', handle: '/vngerus ↗', href: 'https://github.com/vngerus' },
  { name: 'LinkedIn', handle: '/angelsmithl ↗', href: 'https://www.linkedin.com/in/angelsmithl/' },
  { name: 'Discord', handle: 'vngerus' },
];

const rowCls = 'flex justify-between border-b border-line py-3.5 text-base';
const fieldCls =
  'rounded-[10px] border border-edge bg-background px-3.5 py-3 text-[15px] text-bone outline-none focus:border-accent';

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('¡Mensaje enviado! Te responderé pronto.');
        setForm(INITIAL);
      } else {
        toast.error('Ocurrió un error. Inténtalo nuevamente.');
      }
    } catch {
      toast.error('Error de conexión. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="mx-auto max-w-280 scroll-mt-18 border-t border-line px-[clamp(20px,4vw,40px)] py-[clamp(48px,8vw,96px)]"
    >
      <Toaster position="bottom-right" theme="dark" />
      <div className="grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
        <div className="flex flex-col gap-5">
          <SectionHead num="04" title="Hablemos" />
          <p className="max-w-[36ch] text-[17px] leading-[1.55] text-muted text-pretty">
            ¿Tienes un proyecto, una vacante o una consulta técnica? Escríbeme y te respondo pronto.
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
                <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className={rowCls}>
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
          className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface1 p-[clamp(20px,3vw,32px)]"
        >
          <label className="flex flex-col gap-2 text-[13px] text-muted">
            Nombre
            <input name="name" required value={form.name} onChange={onChange} className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2 text-[13px] text-muted">
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              className={fieldCls}
            />
          </label>
          <label className="flex flex-col gap-2 text-[13px] text-muted">
            Mensaje
            <textarea
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={onChange}
              className={`${fieldCls} resize-y`}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-1 cursor-pointer rounded-full bg-accent px-5 py-3.5 text-[15px] font-medium text-background transition-colors hover:bg-[#e2b5ff] disabled:opacity-60"
          >
            {loading ? 'Enviando…' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
}
