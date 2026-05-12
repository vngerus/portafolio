'use client';

import React, { useState } from 'react';
import { FaSteam, FaDiscord } from 'react-icons/fa';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { tags } from '@/data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SysLabel from '@/components/SysLabel';

const CLIP_SM =
  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)';
const CLIP_MD =
  'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)';
const DOT_BG = {
  backgroundImage: 'radial-gradient(circle, rgba(110,68,138,0.07) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const NervCard: React.FC<{
  recId: string;
  label: string;
  status?: 'ACTIVO' | 'ARCHIVADO' | null;
  className?: string;
  children: React.ReactNode;
}> = ({ recId, label, status = null, className = '', children }) => (
  <div
    className={`group relative overflow-hidden border border-gray-700/60 hover:border-textPrimary/50 bg-background-secondary transition-all duration-300 hover:shadow-[0_4px_24px_#d28fff12] flex flex-col ${className}`}
    style={{ clipPath: CLIP_MD }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/50 to-transparent" />
    <div className="flex items-center justify-between px-4 py-2 bg-buttonUnselected/20 border-b border-gray-700/40 shrink-0">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[8px] text-textPrimary/50 tracking-[0.2em] uppercase">
          {recId}
        </span>
        {status && (
          <>
            <span className="w-px h-3 bg-gray-700" />
            {status === 'ACTIVO' ? (
              <span className="flex items-center gap-1">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
                />
                <span className="font-mono text-[7px] text-textPrimary/60 tracking-[0.2em] uppercase">
                  ACTIVO
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600" />
                <span className="font-mono text-[7px] text-gray-600 tracking-[0.2em] uppercase">
                  ARCHIVADO
                </span>
              </span>
            )}
          </>
        )}
      </div>
      <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
    <div className="relative flex-1 p-5" style={DOT_BG}>
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-textPrimary/0 group-hover:border-textPrimary/40 transition-all duration-200" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="animate-nerv-scan" />
      </div>
      {children}
    </div>
  </div>
);

const SectionDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="font-mono text-[8px] text-textPrimary/40 tracking-[0.2em] uppercase">
      {label}
    </span>
    <div className="flex-1 h-px bg-gray-700/40" />
  </div>
);

const CopyButton: React.FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
  copied: string | null;
  onCopy: (v: string) => void;
}> = ({ value, label, icon, copied, onCopy }) => (
  <button
    onClick={() => onCopy(value)}
    className="flex items-center justify-between gap-3 px-3 py-2.5 border border-white/5 hover:border-textPrimary/40 hover:bg-textPrimary/5 transition-all group/btn"
    style={{ clipPath: CLIP_SM }}
  >
    <div className="flex items-center gap-3">
      <span className="text-gray-500 group-hover/btn:text-textPrimary transition-colors">
        {icon}
      </span>
      <div className="text-left">
        <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">{label}</p>
        <p className="font-mono text-xs text-gray-300 mt-0.5">{value}</p>
      </div>
    </div>
    {copied === value ? (
      <FiCheck size={12} className="text-textPrimary shrink-0" />
    ) : (
      <FiCopy size={12} className="text-gray-700 group-hover/btn:text-gray-400 shrink-0" />
    )}
  </button>
);

const CERTS = [
  {
    id: '01',
    name: 'Flutter Developer',
    org: 'Globant · Desafío Latam',
    hours: '80h',
    date: 'Dic 2024',
  },
  {
    id: '02',
    name: 'Fundamentos DevOps',
    org: 'Kibernum · Talento Digital',
    hours: '184h',
    date: 'Jun–Oct 2024',
  },
  {
    id: '03',
    name: 'Ciberseguridad',
    org: 'Google · Talento Digital',
    hours: null,
    date: 'Feb 2024',
  },
  {
    id: '04',
    name: 'Diseño de Experiencia UX',
    org: 'Google · Talento Digital',
    hours: null,
    date: 'Oct 2023',
  },
  {
    id: '05',
    name: 'Desarrollador Full Stack Java',
    org: 'Generation Chile',
    hours: '540h',
    date: 'Jul–Oct 2023',
  },
];

const EDUCATION = [
  {
    id: '01',
    degree: 'Analista Programador',
    institution: 'INACAP',
    period: 'Cursando',
    active: true,
  },
  {
    id: '02',
    degree: 'Ingeniería en Marketing',
    institution: 'IP Duoc UC',
    period: 'Mar 2017 – Nov 2021',
    active: false,
  },
];

const About: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="about"
      className="flex flex-col items-center mx-auto max-w-250 px-4 py-12 min-h-screen mt-12"
    >
      <div className="flex flex-col w-full mb-10">
        <SysLabel left="// PILOT_FILE" right="ARCHIVO DE PERSONAL" />
        <div className="flex items-center w-full">
          <span className="text-textPrimary font-mono text-lg mr-4">03.</span>
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Sobre mí</h2>
          <div className="flex-1 h-px bg-gray-700 ml-4" />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={cardVariants} className="md:col-span-2">
          <NervCard recId="REC_03A" label="// PERFIL" status="ACTIVO" className="h-full">
            <SectionDivider label="// DESCRIPCIÓN" />
            <div className="space-y-2.5 text-gray-400 text-sm leading-relaxed mb-5">
              <p>
                Cuento con experiencia en la construcción de aplicaciones{' '}
                <span className="text-white">web, mobile y de escritorio</span>. Inicié como{' '}
                <span className="text-white">Desarrollador Front-End</span> y he evolucionado hacia
                la integración completa de sistemas, participando activamente en la modernización de
                servicios <span className="text-textPrimary">Back-End</span> y el diseño de{' '}
                <span className="text-textPrimary">bases de datos relacionales</span>.
              </p>
              <p>
                Actualmente cursando <span className="text-white">Analista Programador</span> en
                INACAP para fortalecer mis bases técnicas.
              </p>
            </div>

            <SectionDivider label="// ESTADO DEL SISTEMA" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
                />
                <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                  DISPONIBLE · <span className="text-textPrimary">BOOKS&BITS</span>
                </span>
              </div>
              <span className="w-px h-3 bg-gray-700" />
              <span
                className="font-mono text-[8px] text-textPrimary/60 tracking-[0.15em] uppercase border border-textPrimary/25 bg-textPrimary/5 px-2 py-0.5"
                style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
              >
                Inglés B2
              </span>
            </div>
          </NervCard>
        </motion.div>

        <motion.div variants={cardVariants}>
          <NervCard recId="REC_03B" label="// CANAL" className="h-full">
            <div className="space-y-2.5">
              <CopyButton
                value="79456154"
                label="Steam ID"
                icon={<FaSteam size={15} />}
                copied={copied}
                onCopy={copy}
              />
              <CopyButton
                value="vngerus"
                label="Discord"
                icon={<FaDiscord size={15} />}
                copied={copied}
                onCopy={copy}
              />
            </div>
            <p className="font-mono text-[9px] text-gray-700 mt-4 border-t border-white/5 pt-3 tracking-wide">
              🐱 Luna · ☕ ex-barista · 🏋️ gym AM
            </p>
          </NervCard>
        </motion.div>

        <motion.div variants={cardVariants}>
          <NervCard recId="REC_03C" label="// FORMACIÓN" className="h-full">
            <div className="space-y-4">
              {EDUCATION.map(edu => (
                <div key={edu.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[8px] text-textPrimary/40 tracking-[0.15em] uppercase">
                      EDU_{edu.id}
                    </span>
                    {edu.active && (
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                        className="inline-block w-1.5 h-1.5 rounded-full bg-textPrimary"
                      />
                    )}
                  </div>
                  <p className="text-white text-sm font-medium leading-tight">{edu.degree}</p>
                  <p className="font-mono text-[10px] text-textPrimary/60 mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="font-mono text-[9px] text-gray-600 mt-0.5 tracking-wider">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </NervCard>
        </motion.div>

        <motion.div variants={cardVariants} className="md:col-span-2">
          <NervCard recId="REC_03D" label="// CERTIFICACIONES" className="h-full">
            <div className="space-y-3">
              {CERTS.map(cert => (
                <div key={cert.id} className="flex items-start gap-3">
                  <span className="font-mono text-[8px] text-textPrimary/40 tracking-[0.12em] uppercase shrink-0 border border-textPrimary/20 px-1.5 py-0.5 mt-0.5">
                    CERT_{cert.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm leading-tight">{cert.name}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <p className="font-mono text-[9px] text-textPrimary/50">{cert.org}</p>
                      {cert.hours && (
                        <>
                          <span className="w-px h-2.5 bg-gray-700" />
                          <span className="font-mono text-[8px] text-gray-600">{cert.hours}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[8px] text-gray-600 shrink-0 tracking-wider whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </NervCard>
        </motion.div>

        <motion.div variants={cardVariants} className="md:col-span-3">
          <NervCard recId="REC_03E" label="// TECH_STACK">
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {tags.map(tag => (
                <div
                  key={tag.id}
                  className="flex flex-col items-center gap-2 py-3 px-2 cursor-default border border-white/5"
                  style={{ clipPath: CLIP_SM }}
                >
                  <Image
                    src={tag.icon}
                    alt={tag.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-mono text-[8px] text-gray-500 text-center leading-tight tracking-[0.15em] uppercase">
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          </NervCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
