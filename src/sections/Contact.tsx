'use client';

import React, { useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import SysLabel from '@/components/SysLabel';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const sectionRef = useGsapReveal<HTMLElement>({ y: 40, start: 'top 80%' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('[ TRANSMISIÓN EXITOSA ] Gracias. En breve me pondré en contacto.');
        setForm(INITIAL_FORM);
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
    <>
      <Toaster position="bottom-right" theme="dark" />
      <section
        id="contact"
        ref={sectionRef}
        className="flex flex-col items-center mx-auto max-w-250 px-4 py-12 mt-12"
      >
        <div
          className="w-full h-1.5 rounded-sm mb-10 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #e8332e, #e8332e 10px, #0b0a08 10px, #0b0a08 20px)',
          }}
        />

        <div className="flex flex-col w-full mb-8">
          <SysLabel left="// COMM_LINK" right="ESTABLECER CANAL SEGURO" />
          <div className="flex items-center w-full">
            <span className="text-textPrimary font-mono text-lg mr-4">04.</span>
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">Contacto</h2>
            <div className="flex-1 h-px bg-gray-700 ml-4" />
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <p className="text-gray-400 text-center mb-10 leading-relaxed">
            ¿Tienes un proyecto en mente o simplemente quieres saludar?{' '}
            <span className="text-accentPrimary">Escríbeme</span>, estaré encantado de responder.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-[10px] text-accentPrimary tracking-[0.2em] uppercase"
                >
                  {'// Nombre'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Steve Jobs"
                  className="bg-background-secondary border border-bone/20 rounded px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-accentPrimary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] text-accentPrimary tracking-[0.2em] uppercase"
                >
                  {'// Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="sjobs@apple.com"
                  className="bg-background-secondary border border-bone/20 rounded px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-accentPrimary transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-mono text-[10px] text-accentPrimary tracking-[0.2em] uppercase"
              >
                {'// Mensaje'}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Hola Angel, me gustaría hablar sobre..."
                className="bg-background-secondary border border-bone/20 rounded px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-accentPrimary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
              className="self-start px-8 py-3 border border-accentPrimary text-accentPrimary font-mono text-sm hover:bg-accentPrimary/10 active:scale-97 transition-[background-color,transform] duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '[ Conectando... ]' : '[ Transmitir ]'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
