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
        toast.success('¡Mensaje enviado! Te responderé pronto.');
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
              'repeating-linear-gradient(45deg, #a855f7, #a855f7 10px, #0b0a08 10px, #0b0a08 20px)',
          }}
        />

        <div className="flex flex-col w-full mb-8">
          <SysLabel left="// COMM_LINK" right="ESTABLECER CANAL SEGURO" />
          <div className="flex items-center w-full">
            <span className="text-accentPrimary font-mono text-lg mr-4">03.</span>
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">Contacto</h2>
            <div className="flex-1 h-px bg-gray-700 ml-4" />
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          {/* NERV Comm Terminal Card */}
          <div
            className="relative overflow-hidden"
            style={{
              background: 'rgba(15, 12, 22, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              clipPath:
                'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
              boxShadow:
                '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(168, 85, 247, 0.15)',
            }}
          >
            {/* Terminal Top Bar */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b border-accentPrimary/25 bg-accentPrimary/5"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-accentPrimary animate-pulse shadow-[0_0_8px_#a855f7]" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-accentPrimary uppercase font-semibold">
                  [ COMM_LINK // SECURE_RELAY ]
                </span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.15em] text-accentPrimary/60 uppercase hidden sm:inline-block">
                FREQ: 142.85 MHz · TLS_v1.3
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs text-gray-300 mb-8 leading-relaxed">
                ¿Tienes un proyecto en mente, una consulta de ingeniería o simplemente quieres coordinar?{' '}
                <span className="text-accentPrimary font-semibold">Inicia una transmisión</span> a través de este canal seguro.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="font-mono text-[9px] text-accentPrimary tracking-[0.2em] uppercase font-semibold"
                    >
                      [ 01 // NOMBRE_IDENTIFICADOR ]
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ej. Shinji Ikari / Tech Lead"
                      className="bg-[#0b0a0e]/90 border border-accentPrimary/25 px-4 py-3 text-gray-100 text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-accentPrimary focus:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-200"
                      style={{
                        clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-mono text-[9px] text-accentPrimary tracking-[0.2em] uppercase font-semibold"
                    >
                      [ 02 // FRECUENCIA_EMAIL ]
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu-correo@empresa.com"
                      className="bg-[#0b0a0e]/90 border border-accentPrimary/25 px-4 py-3 text-gray-100 text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-accentPrimary focus:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-200"
                      style={{
                        clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-mono text-[9px] text-accentPrimary tracking-[0.2em] uppercase font-semibold"
                  >
                    [ 03 // CUERPO_DE_LA_TRANSMISIÓN ]
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe el requerimiento, proyecto o mensaje..."
                    className="bg-[#0b0a0e]/90 border border-accentPrimary/25 px-4 py-3 text-gray-100 text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-accentPrimary focus:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-200 resize-none"
                    style={{
                      clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      clipPath:
                        'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    }}
                    className="px-8 py-3.5 bg-accentPrimary/15 border border-accentPrimary text-accentPrimary font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-accentPrimary hover:text-black active:scale-[0.97] transition-all duration-200 shadow-[0_0_18px_rgba(168,85,247,0.25)] hover:shadow-[0_0_24px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? '[ TRANSMITIENDO... ]' : '[ INICIAR TRANSMISIÓN ]'}
                  </button>

                  <span className="font-mono text-[8px] text-accentPrimary/40 tracking-[0.2em] uppercase">
                    NERV_RELAY_OK
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
