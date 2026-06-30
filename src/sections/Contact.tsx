'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import SysLabel from '@/components/SysLabel';
import { Mono, CornerFrame, AtFieldBackdrop, DotGrid, StatChip, SignalBars, WarnOverlay, useWarnHover, WARN_COLOR } from '@/components/nerv/primitives';

interface FormState {
  name: string;
  email: string;
  message: string;
}
const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

const CHANNELS = [
  { k: 'EMAIL', v: 'angel@vngerus.cl', icon: '✉', tone: '#d28fff', href: 'mailto:angel@vngerus.cl' },
  { k: 'LINKEDIN', v: '/in/angelsmithl', icon: '◈', tone: '#7aa9ff', href: 'https://www.linkedin.com/in/angelsmithl/' },
  { k: 'GITHUB', v: '@vngerus', icon: '◆', tone: '#3ec9d8', href: 'https://github.com/vngerus' },
];

const CLIP_FIELD = 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)';
const CLIP_CARD = 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)';

const TermInput: React.FC<{
  name: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  rows?: number;
}> = ({ name, label, value, onChange, placeholder, type = 'text', rows = 0 }) => {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const isTextArea = rows > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-baseline gap-2">
          <Mono
            className={`transition-colors ${focused ? 'text-textPrimary' : 'text-textPrimary/60'}`}
            style={{ fontSize: 8, letterSpacing: '0.25em' }}
          >
            {label}
          </Mono>
          {filled && <Mono className="text-[#3ec9d8]" style={{ fontSize: 7 }}>✓ OK</Mono>}
        </div>
        <Mono className="text-gray-600" style={{ fontSize: 7 }}>
          {filled ? `${value.length} CHARS` : 'EMPTY'}
        </Mono>
      </div>
      <div
        className="relative bg-background/60 transition-all"
        style={{
          border: `1px solid ${focused ? 'rgba(210,143,255,0.65)' : 'rgba(55,65,81,0.55)'}`,
          padding: '10px 12px 10px 28px',
          clipPath: CLIP_FIELD,
          boxShadow: focused ? '0 0 16px rgba(210,143,255,0.18)' : 'none',
        }}
      >
        <span
          className={`absolute font-jetbrains text-xs transition-colors ${focused ? 'text-textPrimary' : 'text-textPrimary/45'}`}
          style={isTextArea ? { left: 12, top: 11 } : { left: 12, top: '50%', transform: 'translateY(-50%)' }}
        >
          $
        </span>
        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            rows={rows}
            className="w-full bg-transparent border-none outline-none text-light font-jetbrains text-[13px] leading-relaxed resize-y"
            style={{ minHeight: rows * 22, letterSpacing: '0.02em' }}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-light font-jetbrains text-[13px]"
            style={{ letterSpacing: '0.02em' }}
          />
        )}
      </div>
    </div>
  );
};

const ChannelLink: React.FC<{ c: typeof CHANNELS[number] }> = ({ c }) => {
  const { warn, flash, warnProps } = useWarnHover();
  return (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      {...warnProps}
      className="relative flex items-center gap-2.5 px-2.5 py-2 transition-all overflow-hidden"
      style={{
        border: `1px solid ${warn ? 'rgba(255,91,58,0.6)' : c.tone + '22'}`,
        background: warn ? 'rgba(255,91,58,0.06)' : `${c.tone}08`,
        boxShadow: warn ? '0 0 14px rgba(255,91,58,0.2)' : 'none',
        clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
        transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <WarnOverlay warn={warn} flash={flash} offset={2} />
      <span
        className="relative flex items-center justify-center font-mono"
        style={{
          width: 28, height: 28,
          border: `1px solid ${warn ? 'rgba(255,91,58,0.55)' : c.tone + '55'}`,
          background: warn ? 'rgba(255,91,58,0.15)' : `${c.tone}15`,
          color: warn ? WARN_COLOR : c.tone,
          fontSize: 14,
          clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
          transition: 'all 0.2s ease',
          zIndex: 4,
        }}
      >
        {c.icon}
      </span>
      <div className="relative flex-1 min-w-0" style={{ zIndex: 4 }}>
        <Mono style={{ fontSize: 7, color: warn ? 'rgba(255,91,58,0.7)' : `${c.tone}80`, letterSpacing: '0.25em', transition: 'color 0.2s ease' }}>{c.k}</Mono>
        <div className="font-jetbrains text-[11px] text-white mt-0.5">{c.v}</div>
      </div>
      <Mono style={{ fontSize: 7, color: warn ? 'rgba(255,91,58,0.7)' : `${c.tone}80`, transition: 'color 0.2s ease', position: 'relative', zIndex: 4 }}>→</Mono>
    </a>
  );
};

const CommIdCard: React.FC = () => (
  <div
    className="relative border border-gray-700/55 bg-linear-to-b from-background-secondary/55 to-background/85 px-4 pt-4 pb-5 flex flex-col gap-4 overflow-hidden"
    style={{ clipPath: CLIP_CARD }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/45 to-transparent" />
    <CornerFrame tone="rgba(210,143,255,0.3)" size={10} offset={6} />

    <div className="flex items-center justify-between">
      <Mono className="text-textPrimary/60" style={{ fontSize: 9 }}>{'// ALT_CHANNELS'}</Mono>
      <div className="flex items-center gap-2">
        <SignalBars level={4} />
        <Mono className="text-[#3ec9d8]" style={{ fontSize: 8 }}>4/4</Mono>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      {CHANNELS.map(c => <ChannelLink key={c.k} c={c} />)}
    </div>

    <div className="grid grid-cols-2 gap-1.5 pt-3 border-t border-dashed border-textPrimary/15">
      <StatChip k="RESPONSE" v="24-48h" />
      <StatChip k="ENCRYPT" v="AES-256" />
    </div>

    <Mono className="absolute bottom-1.5 right-3.5 text-textPrimary/25" style={{ fontSize: 6.5, letterSpacing: '0.3em' }}>
      RX/TX · OPEN
    </Mono>
  </div>
);

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitFlash, setSubmitFlash] = useState(false);
  const sectionRef = useGsapReveal<HTMLElement>({ y: 40, start: 'top 80%' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const filled = Object.values(form).filter(Boolean).length;
  const ready = filled === 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) { toast.error('Por favor completa todos los campos.'); return; }
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
        setSubmitFlash(true);
        setTimeout(() => setSubmitFlash(false), 600);
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
        className="relative flex flex-col mx-auto max-w-300 px-4 md:px-6 py-12 mt-12"
      >
        <AtFieldBackdrop opacity={0.03} size={80} />

        <div
          className="w-full h-1.5 rounded-sm mb-8 opacity-40"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #6d448a, #6d448a 10px, #0d0b2e 10px, #0d0b2e 20px)',
          }}
        />

        <div className="flex flex-col w-full mb-6 relative z-[2]">
          <SysLabel left="// COMM_LINK" right="ESTABLECER CANAL SEGURO" />
          <div className="flex items-center w-full">
            <span className="text-textPrimary font-mono text-lg mr-4">04.</span>
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">Contacto</h2>
            <div className="flex-1 h-px bg-gray-700 ml-4" />
          </div>
        </div>

        <div
          className="relative z-[2] flex items-center justify-between px-3.5 py-2 border border-gray-700/55 bg-buttonUnselected/20 mb-4 flex-wrap gap-3"
          style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
        >
          <div className="flex items-center gap-3.5">
            <Mono className="text-textPrimary/60" style={{ fontSize: 8 }}>{'// CHANNEL_STATUS'}</Mono>
            <span className="w-px h-2.5 bg-gray-700" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ec9d8] animate-pulse" style={{ boxShadow: '0 0 6px #3ec9d8' }} />
              <Mono className="text-[#3ec9d8]" style={{ fontSize: 8 }}>OPEN · READY</Mono>
            </div>
            <span className="w-px h-2.5 bg-gray-700" />
            <Mono className="text-textPrimary/50" style={{ fontSize: 8 }}>CHANNEL_INTEGRITY · 96%</Mono>
          </div>
          <div className="flex items-center gap-2.5">
            <SignalBars level={4} />
            <Mono className="text-textPrimary/50" style={{ fontSize: 8 }}>ENCRYPTED · AES-256</Mono>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative z-[2] grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5"
        >
          <div
            className="relative border bg-linear-to-b from-background-secondary/55 to-background/85 px-5 pt-4 pb-5 overflow-hidden"
            style={{
              clipPath: CLIP_CARD,
              borderColor: submitFlash ? 'rgba(255,91,58,0.7)' : 'rgba(55,65,81,0.55)',
              boxShadow: submitFlash ? '0 0 24px rgba(255,91,58,0.25)' : 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <WarnOverlay warn={submitFlash} flash={submitFlash} offset={4} />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/45 to-transparent" />
            <DotGrid opacity={0.04} />

            <div className="relative flex items-center justify-between mb-4 z-[1]">
              <div className="flex items-center gap-2.5">
                <Mono className="text-textPrimary/60" style={{ fontSize: 9 }}>{'// TRANSMIT_FORM'}</Mono>
                <Mono className="text-textPrimary/35" style={{ fontSize: 8 }}>3 FIELDS REQUIRED</Mono>
              </div>
              <Mono
                className={ready ? 'text-[#3ec9d8]' : 'text-textPrimary/45'}
                style={{ fontSize: 8, letterSpacing: '0.25em' }}
              >
                {filled}/3 · {ready ? 'READY' : 'PENDING'}
              </Mono>
            </div>

            <p className="relative z-[1] font-jetbrains text-xs text-gray-400/85 leading-relaxed mb-4">
              <span className="text-textPrimary/45 mr-1.5">&gt;</span>
              ¿Proyecto en mente o solo saludar?{' '}
              <span className="text-textPrimary">Transmite</span> y respondo en 24-48h.
            </p>

            <div className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
              <TermInput name="name" label="// NAME" value={form.name} onChange={handleChange} placeholder="Steve Jobs" />
              <TermInput name="email" label="// EMAIL" value={form.email} onChange={handleChange} placeholder="sjobs@apple.com" type="email" />
            </div>

            <div className="relative z-[1] mb-4">
              <TermInput
                name="message"
                label="// PAYLOAD"
                value={form.message}
                onChange={handleChange}
                placeholder="Hola Ángel, me gustaría hablar sobre..."
                rows={5}
              />
            </div>

            <div className="relative z-[1] mb-4">
              <div className="flex justify-between mb-1">
                <Mono className="text-textPrimary/45" style={{ fontSize: 7 }}>{'// PACKET_READY'}</Mono>
                <Mono className="text-textPrimary/50" style={{ fontSize: 7 }}>{Math.round((filled / 3) * 100)}%</Mono>
              </div>
              <div className="relative h-[3px] bg-textPrimary/[0.08] overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: `${(filled / 3) * 100}%`,
                    background: 'linear-gradient(90deg, rgba(210,143,255,0.5), #d28fff)',
                    boxShadow: '0 0 6px #d28fff',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            <div className="relative z-[1] flex items-center gap-3">
              <button
                type="submit"
                disabled={!ready || loading}
                className="font-jetbrains text-xs uppercase font-semibold px-5 py-2.5 transition-all disabled:cursor-not-allowed"
                style={{
                  color: ready ? '#fff' : 'rgba(156,163,175,0.5)',
                  background: ready ? 'rgba(210,143,255,0.18)' : 'rgba(75,85,99,0.15)',
                  border: `1px solid ${ready ? 'rgba(210,143,255,0.7)' : 'rgba(75,85,99,0.4)'}`,
                  letterSpacing: '0.18em',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  boxShadow: ready ? '0 0 16px rgba(210,143,255,0.25)' : 'none',
                }}
              >
                <span style={{ color: ready ? '#d28fff' : 'inherit', marginRight: 6 }}>▸</span>
                {loading ? 'Transmitiendo…' : 'Transmitir'}
              </button>
              <Mono className="text-gray-600" style={{ fontSize: 8 }}>⌘ + ↵ para enviar</Mono>
            </div>
          </div>

          <CommIdCard />
        </form>
      </section>
    </>
  );
};

export default Contact;
