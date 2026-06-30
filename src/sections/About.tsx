'use client';

import React, { useState } from 'react';
import { FaSteam, FaDiscord } from 'react-icons/fa';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { motion, type Variants } from 'motion/react';
import Image from 'next/image';
import { tags } from '@/data';
import SysLabel from '@/components/SysLabel';
import PhotoExpediente from '@/components/nerv/PhotoExpediente';
import { Mono, AtFieldBackdrop, WarnOverlay, useWarnHover, WARN_COLOR } from '@/components/nerv/primitives';

const CLIP_MD = 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)';
const CLIP_SM = 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const NervCard: React.FC<{
  recId: string;
  label: string;
  status?: 'ACTIVO' | 'ARCHIVADO' | null;
  children: React.ReactNode;
}> = ({ recId, label, status = null, children }) => (
  <div
    className="group relative overflow-hidden border border-gray-700/55 hover:border-textPrimary/40 bg-linear-to-b from-background-secondary/55 to-background/85 transition-all duration-300 hover:shadow-[0_4px_24px_#d28fff14] flex flex-col flex-1 min-w-0"
    style={{ clipPath: CLIP_MD }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/45 to-transparent" />
    <div className="flex items-center justify-between px-3.5 py-1.5 bg-buttonUnselected/20 border-b border-gray-700/40 shrink-0">
      <div className="flex items-center gap-2">
        <Mono className="text-textPrimary/50" style={{ fontSize: 8 }}>{recId}</Mono>
        {status && (
          <>
            <span className="w-px h-2.5 bg-gray-700" />
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${status === 'ACTIVO' ? 'bg-textPrimary animate-pulse' : 'bg-gray-600'}`}
              style={status === 'ACTIVO' ? { boxShadow: '0 0 6px #d28fff' } : {}}
            />
            <Mono className={status === 'ACTIVO' ? 'text-textPrimary/65' : 'text-gray-600'} style={{ fontSize: 7 }}>
              {status}
            </Mono>
          </>
        )}
      </div>
      <Mono className="text-textPrimary/30" style={{ fontSize: 7 }}>{label}</Mono>
    </div>
    <div className="relative flex-1 p-4">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(210,143,255,0.6) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="animate-nerv-scan" />
      </div>
      <div className="relative">{children}</div>
    </div>
  </div>
);

const ProfileCard: React.FC = () => (
  <NervCard recId="REC_03A" label="// PERFIL" status="ACTIVO">
    <Mono className="text-textPrimary/40 block mb-1.5" style={{ fontSize: 7 }}>
      {'// DESCRIPCIÓN'}
    </Mono>
    <div className="flex flex-col gap-2 text-gray-400 text-[12.5px] leading-relaxed mb-3.5">
      <p className="m-0">
        Cuento con experiencia en la construcción de aplicaciones{' '}
        <span className="text-white">web, mobile y de escritorio</span>. Inicié como{' '}
        <span className="text-white">Desarrollador Front-End</span> y he evolucionado hacia la
        integración completa de sistemas, participando activamente en la modernización de servicios{' '}
        <span className="text-textPrimary">Back-End</span> y el diseño de{' '}
        <span className="text-textPrimary">bases de datos relacionales</span>.
      </p>
      <p className="m-0">
        Actualmente cursando <span className="text-white">Analista Programador</span> en INACAP para
        fortalecer mis bases técnicas.
      </p>
    </div>

    <Mono className="text-textPrimary/40 block mb-1.5" style={{ fontSize: 7 }}>
      {'// ESTADO DEL SISTEMA'}
    </Mono>
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: '#3ec9d8', boxShadow: '0 0 6px #3ec9d8' }}
        />
        <Mono className="text-gray-400" style={{ fontSize: 9 }}>
          DISPONIBLE · <span className="text-textPrimary">BOOKS&BITS</span>
        </Mono>
      </div>
      <span className="w-px h-3 bg-gray-700" />
      <Mono
        className="text-textPrimary/70 border border-textPrimary/30 bg-textPrimary/5 px-2 py-0.5"
        style={{ fontSize: 8, clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
      >
        Inglés B2
      </Mono>
    </div>

    <Mono className="text-textPrimary/40 block mb-1.5 mt-3.5" style={{ fontSize: 7 }}>
      {'// PERSONAL'}
    </Mono>
    <div className="flex flex-wrap gap-2">
      {['▴ LUNA', '≋ BARISTA', '▲ GYM·AM'].map(h => (
        <span
          key={h}
          className="font-mono text-gray-300/75 border border-gray-700/60 bg-background/40 px-2 py-0.5"
          style={{ fontSize: 10, clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
        >
          {h}
        </span>
      ))}
    </div>
  </NervCard>
);

const CHANNELS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: '79456154', label: 'Steam ID', icon: <FaSteam size={14} /> },
  { value: 'vngerus', label: 'Discord', icon: <FaDiscord size={14} /> },
];

const ChannelButton: React.FC<{ ch: typeof CHANNELS[number]; onCopy: (v: string) => void; copied: string | null }> = ({ ch, onCopy, copied }) => {
  const { warn, flash, warnProps } = useWarnHover();
  return (
    <button
      onClick={() => onCopy(ch.value)}
      {...warnProps}
      className="relative flex items-center justify-between gap-2 px-2.5 py-2 transition-all overflow-hidden"
      style={{
        clipPath: CLIP_SM,
        border: `1px solid ${warn ? 'rgba(255,91,58,0.55)' : 'rgba(255,255,255,0.05)'}`,
        background: warn ? 'rgba(255,91,58,0.05)' : 'transparent',
        boxShadow: warn ? '0 0 12px rgba(255,91,58,0.18)' : 'none',
        transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <WarnOverlay warn={warn} flash={flash} offset={2} />
      <div className="relative flex items-center gap-2.5" style={{ zIndex: 4 }}>
        <span style={{ color: warn ? WARN_COLOR : '#6b7280', transition: 'color 0.2s ease' }}>{ch.icon}</span>
        <div className="text-left">
          <Mono style={{ fontSize: 8, color: warn ? 'rgba(255,91,58,0.65)' : '#4b5563', transition: 'color 0.2s ease' }}>{ch.label}</Mono>
          <p className="font-mono text-xs text-gray-300 mt-0">{ch.value}</p>
        </div>
      </div>
      {copied === ch.value ? (
        <FiCheck size={11} style={{ color: warn ? WARN_COLOR : '#d28fff', flexShrink: 0, position: 'relative', zIndex: 4 }} />
      ) : (
        <FiCopy size={11} style={{ color: warn ? 'rgba(255,91,58,0.5)' : '#374151', flexShrink: 0, transition: 'color 0.2s ease', position: 'relative', zIndex: 4 }} />
      )}
    </button>
  );
};

const ChannelsCard: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <NervCard recId="REC_03B" label="// CHANNELS">
      <div className="flex flex-col gap-1.5">
        {CHANNELS.map(ch => <ChannelButton key={ch.label} ch={ch} onCopy={copy} copied={copied} />)}
      </div>
      <Mono className="block mt-3 pt-2.5 border-t border-white/5 text-gray-700" style={{ fontSize: 8, letterSpacing: '0.18em' }}>
        LATENCY · LOW · CHILE/SCL
      </Mono>
    </NervCard>
  );
};

const EDUCATION = [
  { id: '01', degree: 'Analista Programador', institution: 'INACAP', period: 'Cursando', active: true },
  { id: '02', degree: 'Ingeniería en Marketing', institution: 'IP Duoc UC', period: 'Mar 2017 – Nov 2021', active: false },
];

const EducationCard: React.FC = () => (
  <NervCard recId="REC_03C" label="// FORMACIÓN">
    <div className="flex flex-col gap-3.5">
      {EDUCATION.map(edu => (
        <div key={edu.id}>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Mono className="text-textPrimary/40" style={{ fontSize: 7 }}>EDU_{edu.id}</Mono>
            {edu.active && (
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
                style={{ boxShadow: '0 0 4px #d28fff' }}
              />
            )}
          </div>
          <p className="text-white text-[13px] font-medium leading-tight m-0">{edu.degree}</p>
          <p className="font-mono text-[10px] text-textPrimary/60 mt-0.5 m-0">{edu.institution}</p>
          <p className="font-mono text-[9px] text-gray-600 mt-0.5 m-0 tracking-wider">{edu.period}</p>
        </div>
      ))}
    </div>
  </NervCard>
);

const CERTS = [
  { id: '01', name: 'Flutter Developer', org: 'Globant · Desafío Latam', hours: '80h', date: 'Dic 2024' },
  { id: '02', name: 'Fundamentos DevOps', org: 'Kibernum · Talento Digital', hours: '184h', date: 'Jun–Oct 2024' },
  { id: '03', name: 'Ciberseguridad', org: 'Google · Talento Digital', hours: null as string | null, date: 'Feb 2024' },
  { id: '04', name: 'Diseño UX', org: 'Google · Talento Digital', hours: null as string | null, date: 'Oct 2023' },
  { id: '05', name: 'Full Stack Java', org: 'Generation Chile', hours: '540h', date: 'Jul–Oct 2023' },
];

const CertsCard: React.FC = () => (
  <NervCard recId="REC_03D" label="// CERTIFICACIONES">
    <div className="flex flex-col gap-2.5">
      {CERTS.map(c => (
        <div key={c.id} className="flex items-start gap-2.5">
          <span
            className="font-mono text-textPrimary/50 border border-textPrimary/25 px-1 py-0.5 mt-0.5 shrink-0"
            style={{ fontSize: 7, letterSpacing: '0.1em' }}
          >
            C_{c.id}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-gray-300 text-xs leading-tight">{c.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Mono className="text-textPrimary/55" style={{ fontSize: 8 }}>{c.org}</Mono>
              {c.hours && (
                <>
                  <span className="w-px h-2 bg-gray-700" />
                  <Mono className="text-gray-600" style={{ fontSize: 7 }}>{c.hours}</Mono>
                </>
              )}
            </div>
          </div>
          <Mono className="text-gray-600 shrink-0 whitespace-nowrap" style={{ fontSize: 7 }}>{c.date}</Mono>
        </div>
      ))}
    </div>
  </NervCard>
);

const TECH_CATS: Record<string, { tone: string; label: string; ids: number[] }> = {
  FE: { tone: '#d28fff', label: 'FRONT-END', ids: [1, 2, 3, 4, 6, 7] },
  BE: { tone: '#3ec9d8', label: 'BACK-END', ids: [8, 9] },
  MOB: { tone: '#ffc864', label: 'MOBILE', ids: [5] },
};

const TechCard: React.FC = () => (
  <NervCard recId="REC_03E" label="// TECH_STACK">
    {(['FE', 'BE', 'MOB'] as const).map(cat => {
      const conf = TECH_CATS[cat];
      const items = tags.filter(t => conf.ids.includes(t.id));
      if (!items.length) return null;
      return (
        <div key={cat} className="mb-3 last:mb-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5" style={{ background: conf.tone, transform: 'rotate(45deg)', boxShadow: `0 0 6px ${conf.tone}` }} />
            <Mono style={{ fontSize: 7, color: conf.tone, letterSpacing: '0.2em' }}>{conf.label}</Mono>
            <span className="flex-1 h-px" style={{ background: `${conf.tone}22` }} />
            <Mono style={{ fontSize: 6.5, color: `${conf.tone}99` }}>{String(items.length).padStart(2, '0')}</Mono>
          </div>
          <div className="flex flex-wrap gap-1">
            {items.map(t => (
              <span
                key={t.id}
                className="inline-flex items-center gap-1.5 font-mono uppercase border px-2 py-0.5"
                style={{
                  fontSize: 9,
                  color: conf.tone,
                  borderColor: `${conf.tone}40`,
                  background: `${conf.tone}10`,
                  letterSpacing: '0.12em',
                  clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                }}
              >
                <Image src={t.icon} alt={t.name} width={11} height={11} className="object-contain" />
                {t.name}
              </span>
            ))}
          </div>
        </div>
      );
    })}
  </NervCard>
);

const About: React.FC = () => (
  <section
    id="about"
    className="relative flex flex-col mx-auto max-w-300 px-4 md:px-6 py-12 min-h-screen mt-12"
  >
    <AtFieldBackdrop opacity={0.02} size={80} />

    <div className="flex flex-col w-full mb-8 relative z-[2]">
      <SysLabel left="// PILOT_FILE" right="ARCHIVO DE PERSONAL" />
      <div className="flex items-center w-full">
        <span className="text-textPrimary font-mono text-lg mr-4">03.</span>
        <h2 className="text-3xl font-bold text-white whitespace-nowrap">Sobre mí</h2>
        <div className="flex-1 h-px bg-gray-700 ml-4" />
      </div>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="relative z-[2] grid grid-cols-1 md:grid-cols-3 gap-3"
      style={{ gridTemplateAreas: `"photo profile profile" "photo certs edu" "channels tech tech"` }}
    >
      <motion.div variants={cardVariants} className="flex" style={{ gridArea: 'photo' }}>
        <PhotoExpediente
          name="Ángel Smith"
          callsign="vngerus"
          role="FE Developer"
          location="Santiago · CL"
          pilotId="PILOT_07"
          languages={['ES nativo', 'EN B2']}
          photo={null}
        />
      </motion.div>
      <motion.div variants={cardVariants} className="flex" style={{ gridArea: 'profile' }}>
        <ProfileCard />
      </motion.div>
      <motion.div variants={cardVariants} className="flex" style={{ gridArea: 'certs' }}>
        <CertsCard />
      </motion.div>
      <motion.div variants={cardVariants} className="flex" style={{ gridArea: 'edu' }}>
        <EducationCard />
      </motion.div>
      <motion.div variants={cardVariants} className="flex" style={{ gridArea: 'channels' }}>
        <ChannelsCard />
      </motion.div>
      <motion.div variants={cardVariants} className="flex" style={{ gridArea: 'tech' }}>
        <TechCard />
      </motion.div>
    </motion.div>
  </section>
);

export default About;
