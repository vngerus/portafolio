'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experiences, type Experience } from '@/data';
import SysLabel from '@/components/SysLabel';

// ── Tech categorization ──────────────────────────────────────────────────────
const TECH_CATEGORIES: Record<string, string> = {
  'Next.js': 'FRONTEND', 'React': 'FRONTEND', 'Tailwind CSS': 'FRONTEND',
  'JavaScript': 'FRONTEND', 'TypeScript': 'FRONTEND', 'ElectronJS': 'FRONTEND',
  'Python': 'BACKEND', 'Node.js': 'BACKEND', 'SQL': 'BACKEND', 'FastAPI': 'BACKEND',
  'Power BI': 'DATA', 'Figma': 'DESIGN',
};

const CATEGORY_TONES: Record<string, string> = {
  FRONTEND: '#d28fff', BACKEND: '#3ec9d8', DATA: '#ffc864', DESIGN: '#b496ff', OTROS: '#9ca3af',
};

const CATEGORY_ORDER = ['FRONTEND', 'BACKEND', 'DATA', 'DESIGN', 'OTROS'];

const CARD_CLIP = 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)';
const DOT_BG = { backgroundImage: 'radial-gradient(circle, rgba(110,68,138,0.07) 1px, transparent 1px)', backgroundSize: '18px 18px' };

function groupTech(tech: string[]) {
  const groups: Record<string, string[]> = {};
  tech.forEach((t) => { const c = TECH_CATEGORIES[t] ?? 'OTROS'; (groups[c] ??= []).push(t); });
  const ordered: Record<string, string[]> = {};
  CATEGORY_ORDER.forEach((c) => { if (groups[c]) ordered[c] = groups[c]; });
  return ordered;
}

// ── Flip behavior hook ───────────────────────────────────────────────────────
function useFlipBehavior() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => setIsFlipped((v) => !v);
  return { isFlipped, handleClick };
}

// ── SyncGauge ────────────────────────────────────────────────────────────────
const SyncGauge: React.FC<{ value: number; size?: number }> = ({ value, size = 32 }) => {
  const r = (size - 6) / 2;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - value / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(210,143,255,0.15)" strokeWidth="2" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="#d28fff" strokeWidth="2" fill="none" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', filter: 'drop-shadow(0 0 4px #d28fff)', transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: size >= 36 ? 13 : 11, color: '#fff', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>
          {value}
        </span>
      </div>
    </div>
  );
};

// ── RichHeader ───────────────────────────────────────────────────────────────
const RichHeader: React.FC<{ exp: Experience }> = ({ exp }) => {
  const isActive = exp.status === 'ACTIVE';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(45,14,65,0.25)', borderBottom: '1px solid rgba(55,65,81,0.45)', flexShrink: 0, gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(210,143,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{exp.opCode}</span>
        <span style={{ width: 1, height: 11, background: '#374151' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{exp.missionCode}</span>
        <span style={{ width: 1, height: 11, background: '#374151' }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: isActive ? '#d28fff' : '#4b5563', boxShadow: isActive ? '0 0 8px #d28fff' : 'none', animation: isActive ? 'op-blink 1.6s ease-in-out infinite' : 'none' }} />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: isActive ? 'rgba(210,143,255,0.7)' : '#4b5563', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{exp.status}</span>
        </span>
        <span style={{ width: 1, height: 11, background: '#374151' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>CLR · {exp.clearance}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'rgba(210,143,255,0.4)', whiteSpace: 'nowrap', letterSpacing: '0.15em', textTransform: 'uppercase' }}>[ {exp.duration} ]</span>
        <SyncGauge value={exp.syncRate} size={32} />
      </div>
    </div>
  );
};

// ── KpiBar ───────────────────────────────────────────────────────────────────
const KpiBar: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div style={{ display: 'flex', gap: 14, padding: '8px 12px', border: '1px solid rgba(210,143,255,0.18)', background: 'rgba(45,14,65,0.2)', clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)', alignItems: 'baseline', justifyContent: 'space-between' }}>
    {[
      { k: 'DUR',  v: `${exp.durationMonths}M` },
      { k: 'TECH', v: exp.tech.length },
      { k: 'PROJ', v: exp.projects.length },
    ].map(({ k, v }, i, arr) => (
      <React.Fragment key={k}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{k}</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#fff', fontWeight: 700 }}>{v}</span>
        </div>
        {i < arr.length - 1 && <span style={{ width: 1, height: 12, background: 'rgba(210,143,255,0.18)' }} />}
      </React.Fragment>
    ))}
  </div>
);

// ── ProjectRow ───────────────────────────────────────────────────────────────
const ProjectRow: React.FC<{ name: string; i: number; total: number }> = ({ name, i, total }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '28px 3px 1fr', gap: 10, alignItems: 'stretch', animation: `op-fade 0.45s ease ${i * 0.06}s both`, paddingBottom: 7, borderBottom: i < total - 1 ? '1px dashed rgba(62,201,216,0.1)' : 'none' }}>
    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.35)', alignSelf: 'center', letterSpacing: '0.1em' }}>
      {String(i + 1).padStart(3, '0')}
    </span>
    <div style={{ background: 'rgba(62,201,216,0.7)', opacity: 0.7, boxShadow: '0 0 6px rgba(62,201,216,0.7)' }} />
    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11.5, color: '#cbd5e1', lineHeight: 1.5, alignSelf: 'center' }}>{name}</span>
  </div>
);

// ── TechGroup ────────────────────────────────────────────────────────────────
const TechGroup: React.FC<{ label: string; items: string[]; tone: string }> = ({ label, items, tone }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
      <span style={{ width: 6, height: 6, background: tone, boxShadow: `0 0 6px ${tone}`, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: tone, opacity: 0.95, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: `${tone}22` }} />
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 6, color: tone, opacity: 0.55, textTransform: 'uppercase' }}>{String(items.length).padStart(2, '0')}</span>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {items.map((t) => (
        <span key={t} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: tone, textTransform: 'uppercase', letterSpacing: '0.12em', border: `1px solid ${tone}33`, background: `${tone}10`, padding: '2px 7px', clipPath: 'polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)' }}>
          {t}
        </span>
      ))}
    </div>
  </div>
);

// ── SigilCol ─────────────────────────────────────────────────────────────────
const SigilCol: React.FC<{ exp: Experience; maxDuration: number }> = ({ exp, maxDuration }) => (
  <div style={{ width: 110, flexShrink: 0, borderRight: '1px solid rgba(55,65,81,0.5)', background: 'linear-gradient(180deg, rgba(45,14,65,0.35) 0%, rgba(10,8,37,0.6) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px 8px', gap: 12, position: 'relative' }}>
    <div style={{ position: 'relative', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${exp.sigilTone}55`, clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' }} />
      <div style={{ position: 'absolute', inset: 6, border: `1px solid ${exp.sigilTone}88`, clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)', background: `linear-gradient(180deg, ${exp.sigilTone}15 0%, transparent 100%)` }} />
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textShadow: `0 0 12px ${exp.sigilTone}` }}>{exp.sigilLabel}</span>
      <span style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 1, height: 4, background: exp.sigilTone }} />
      <span style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)', width: 1, height: 4, background: exp.sigilTone }} />
    </div>

    <div style={{ padding: '3px 10px', border: `1px solid ${exp.sigilTone}55`, background: `${exp.sigilTone}12`, clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#fff', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>ROL · {exp.rolAbbr}</span>
    </div>

    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 6, color: 'rgba(210,143,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>DURATION</span>
      <div style={{ width: '100%', height: 5, background: 'rgba(210,143,255,0.08)', border: '1px solid rgba(210,143,255,0.15)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(exp.durationMonths / maxDuration) * 100}%`, background: `linear-gradient(90deg, ${exp.sigilTone}88, ${exp.sigilTone})`, boxShadow: `0 0 6px ${exp.sigilTone}aa`, animation: 'op-trace-grow 1s cubic-bezier(.2,.7,.3,1) 0.4s both', transformOrigin: 'left' }} />
      </div>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#fff', fontWeight: 700, marginTop: 1, letterSpacing: '0.1em' }}>{exp.durationMonths}M</span>
    </div>

    <div style={{ width: '70%', height: 1, background: 'rgba(210,143,255,0.15)' }} />

    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 6, color: 'rgba(210,143,255,0.45)', textAlign: 'center', lineHeight: 1.5, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
      CLEARANCE
      <br />
      <span style={{ color: '#fff', fontSize: 10, letterSpacing: '0.15em', fontWeight: 700 }}>{exp.clearance}</span>
    </div>

    <span style={{ position: 'absolute', bottom: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.25)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
      F-{exp.missionCode.replace('MSN_', '')}
    </span>
  </div>
);

// ── FrontBody ────────────────────────────────────────────────────────────────
const FrontBody: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div style={{ position: 'relative', padding: '16px 20px', flex: 1, ...DOT_BG }}>
    <div className="exp-card-scan" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s ease' }}>
      <div className="animate-nerv-scan" style={{ opacity: 0.5 }} />
    </div>

    <div style={{ marginBottom: 10 }}>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.4)', display: 'block', marginBottom: 4, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{'// CARGO'}</span>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{exp.role}</h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#d28fff' }}>@ {exp.company}</span>
        <span style={{ width: 1, height: 10, background: 'rgba(210,143,255,0.3)' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(210,143,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{exp.duration}</span>
      </div>
    </div>

    <div style={{ padding: '8px 11px', border: '1px solid rgba(210,143,255,0.15)', background: 'rgba(45,14,65,0.15)', marginBottom: 14, clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 6, color: 'rgba(210,143,255,0.4)', display: 'block', marginBottom: 3, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{'// MISSION BRIEF'}</span>
      <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', lineHeight: 1.55, fontFamily: '"JetBrains Mono", monospace' }}>{exp.brief}</p>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(62,201,216,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{'// PROGRAMAS · LOG'}</span>
      <span style={{ flex: 1, height: 1, background: 'rgba(62,201,216,0.2)' }} />
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(62,201,216,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{String(exp.projects.length).padStart(2, '0')} PROG</span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
      {exp.projects.map((p, i) => (
        <ProjectRow key={i} name={p} i={i} total={exp.projects.length} />
      ))}
    </div>

    <KpiBar exp={exp} />

    <p style={{ marginTop: 14, marginBottom: 0, textAlign: 'right', fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>↻ CLIC PARA VER STACK</p>
  </div>
);

// ── BackBody ─────────────────────────────────────────────────────────────────
const BackBody: React.FC<{ exp: Experience }> = ({ exp }) => {
  const grouped = groupTech(exp.tech);
  return (
    <div style={{ position: 'relative', padding: '16px 20px', flex: 1, ...DOT_BG }}>
      <div style={{ position: 'absolute', right: 16, top: 8, padding: '4px 10px', border: '1.5px solid rgba(62,201,216,0.55)', color: 'rgba(62,201,216,0.85)', transform: 'rotate(-6deg)', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, backgroundColor: 'rgba(62,201,216,0.04)', textTransform: 'uppercase' }}>
        FILE · CLEARED
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{'// TECH_STACK'}</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(210,143,255,0.2)' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{Object.keys(grouped).length} GRP · {exp.tech.length} TOTAL</span>
      </div>
      {Object.entries(grouped).map(([k, v]) => (
        <TechGroup key={k} label={k} items={v} tone={CATEGORY_TONES[k] ?? '#d28fff'} />
      ))}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 14 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{'// PROGRAMAS'}</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(210,143,255,0.2)' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{String(exp.projects.length).padStart(2, '0')} ENTREGADOS</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 16 }}>
        {exp.projects.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 9px', border: '1px solid rgba(210,143,255,0.12)', background: 'rgba(10,8,37,0.4)', clipPath: 'polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.4)', flexShrink: 0, letterSpacing: '0.1em' }}>[{String(i + 1).padStart(2, '0')}]</span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(62,201,216,0.55)', boxShadow: '0 0 4px rgba(62,201,216,0.7)', flexShrink: 0 }} />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }} title={p}>{p}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(62,201,216,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{'// DEPLOYMENT YIELD'}</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(62,201,216,0.2)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${exp.outcomes.length}, 1fr)`, gap: 8 }}>
        {exp.outcomes.map((o) => (
          <div key={o.k} style={{ padding: '10px 12px', border: '1px solid rgba(62,201,216,0.25)', background: 'rgba(62,201,216,0.04)', clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 22, color: '#fff', fontWeight: 700, lineHeight: 1 }}>{o.v}</div>
            <div style={{ height: 1, background: 'rgba(62,201,216,0.5)', marginTop: 5, marginBottom: 5, width: '40%' }} />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(62,201,216,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{o.k}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 14, marginBottom: 0, textAlign: 'right', fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'rgba(210,143,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>← CLIC PARA VOLVER</p>
    </div>
  );
};

// ── ExperienceCard ───────────────────────────────────────────────────────────
const ExperienceCard: React.FC<{ exp: Experience; index: number; maxDuration: number }> = ({ exp, index, maxDuration }) => {
  const { isFlipped, handleClick } = useFlipBehavior();

  return (
    <div
      onClick={handleClick}
      className="exp-card-host"
      style={{ flex: 1, cursor: 'pointer', userSelect: 'none', perspective: '1600px', animation: `op-boot-on 0.7s cubic-bezier(.2,.7,.3,1) ${index * 0.08}s both` }}
    >
      <div style={{ display: 'grid', transition: 'transform 450ms cubic-bezier(.32,.72,0,1)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div
          className="exp-face"
          style={{ gridArea: '1 / 1', position: 'relative', overflow: 'hidden', border: '1px solid rgba(55,65,81,0.6)', background: 'linear-gradient(180deg, #0d0b2e 0%, #0a0825 100%)', display: 'flex', flexDirection: 'column', clipPath: CARD_CLIP, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(210,143,255,0.4), transparent)' }} />
          <RichHeader exp={exp} />
          <div style={{ display: 'flex', flex: 1 }}>
            <SigilCol exp={exp} maxDuration={maxDuration} />
            <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
              <FrontBody exp={exp} />
            </div>
          </div>
        </div>

        <div
          style={{ gridArea: '1 / 1', position: 'relative', overflow: 'hidden', border: '1px solid rgba(210,143,255,0.3)', background: 'linear-gradient(180deg, #0d0b2e 0%, #0a0825 100%)', display: 'flex', flexDirection: 'column', clipPath: CARD_CLIP, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(210,143,255,0.7), transparent)' }} />
          <RichHeader exp={exp} />
          <div style={{ display: 'flex', flex: 1 }}>
            <SigilCol exp={exp} maxDuration={maxDuration} />
            <div style={{ flex: 1, position: 'relative', minWidth: 0 }}><BackBody exp={exp} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Experiences section ───────────────────────────────────────────────────────
const Experiences: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 75%', 'end 30%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const maxDuration = Math.max(...experiences.map((e) => e.durationMonths));
  const avgSync = Math.round(experiences.reduce((s, e) => s + e.syncRate, 0) / experiences.length);

  return (
    <section id="experiences" className="flex flex-col items-center mx-auto max-w-250 px-4 py-12 min-h-screen mt-12">
      <div className="flex flex-col w-full mb-12">
        <SysLabel left="// EXP_LOG" right="HISTORIAL DE DESPLIEGUES" />
        <div className="flex items-center w-full">
          <span className="text-textPrimary font-mono text-lg mr-4">01.</span>
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Donde he trabajado</h2>
          <div className="flex-1 h-px bg-gray-700 ml-4" />
        </div>
      </div>

      <div ref={containerRef} className="relative w-full">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-700/40" />
        <motion.div
          className="absolute left-5 top-0 w-px bg-textPrimary/80 origin-top"
          style={{ scaleY, height: '100%' }}
        />

        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative', alignItems: 'stretch' }}
          >
            <div style={{ flexShrink: 0, width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, position: 'relative', zIndex: 2 }}>
              <div style={{ position: 'relative', width: 14, height: 14, borderRadius: '50%', border: '2px solid #d28fff', background: '#010103', boxShadow: exp.status === 'ACTIVE' ? '0 0 14px #d28fff, 0 0 22px rgba(210,143,255,0.5)' : '0 0 10px #d28fff88' }}>
                {exp.status === 'ACTIVE' && (
                  <span style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '1px solid #d28fff', animation: 'op-pin-ripple 2s ease-out infinite' }} />
                )}
              </div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'rgba(210,143,255,0.55)', marginTop: 8, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                {exp.missionCode}
              </span>
            </div>

            <div style={{ position: 'absolute', left: 44, top: 27, width: 22, height: 1, background: 'linear-gradient(90deg, #d28fff 0%, rgba(210,143,255,0.3) 100%)', zIndex: 1, animation: `op-trace-grow 0.6s ease-out ${index * 0.08 + 0.2}s both`, transformOrigin: 'left' }} />
            <div style={{ position: 'absolute', left: 62, top: 24, width: 6, height: 6, background: '#d28fff', transform: 'rotate(45deg)', zIndex: 1, animation: `op-fade 0.4s ease ${index * 0.08 + 0.5}s both`, boxShadow: '0 0 6px #d28fff' }} />

            <ExperienceCard exp={exp} index={index} maxDuration={maxDuration} />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2.5 border-t border-dashed border-textPrimary/15 flex justify-between w-full">
        <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">
          {'// SYNC PROMEDIO · '}{avgSync}{'% · CLEARANCE PROM · LV.2'}
        </span>
        <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">
          {'// EOF · '}{experiences.length}{' EXPEDIENTES'}
        </span>
      </div>
    </section>
  );
};

export default Experiences;
