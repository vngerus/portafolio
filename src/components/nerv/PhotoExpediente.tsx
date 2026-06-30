'use client';

import React from 'react';
import Image from 'next/image';
import { Mono, CornerFrame, StatChip } from './primitives';

interface Props {
  photo?: string | null;
  name: string;
  callsign: string;
  role: string;
  location: string;
  pilotId?: string;
  languages?: string[];
}

const CLIP_MD =
  'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)';

const PhotoExpediente: React.FC<Props> = ({
  photo = null,
  name,
  callsign,
  role,
  location,
  pilotId = 'PILOT_07',
  languages = ['ES nativo', 'EN B2'],
}) => (
  <div
    className="relative border border-gray-700/55 bg-linear-to-b from-background-secondary/55 to-background/85 overflow-hidden p-3.5 pb-5 flex flex-col flex-1 min-w-0"
    style={{ clipPath: CLIP_MD }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/45 to-transparent" />
    <CornerFrame tone="rgba(210,143,255,0.35)" size={10} offset={6} />

    <div className="flex justify-between items-center mb-3 px-1">
      <Mono className="text-textPrimary/65" style={{ fontSize: 8 }}>PILOT_FILE</Mono>
      <Mono className="text-textPrimary/35" style={{ fontSize: 7 }}>{pilotId}</Mono>
    </div>

    <div className="relative w-full mx-auto flex items-center justify-center" style={{ aspectRatio: '1 / 1.08' }}>
      <div
        className="absolute inset-0"
        style={{
          border: '1.5px solid rgba(210,143,255,0.55)',
          clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
          boxShadow: '0 0 24px rgba(210,143,255,0.25)',
        }}
      />
      <div
        className="absolute"
        style={{
          inset: 8,
          clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
          background: 'linear-gradient(180deg, #1a1640 0%, #0d0b2e 100%)',
          overflow: 'hidden',
        }}
      >
        {photo ? (
          <Image src={photo} alt={name} fill className="object-cover" sizes="280px" />
        ) : null}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(13,11,46,0.15) 0%, rgba(13,11,46,0.5) 100%)' }}
        />
        <div
          className="absolute left-0 right-0 animate-nerv-scan"
          style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(210,143,255,0.45), transparent)' }}
        />
        {!photo && (
          <div
            className="absolute left-1/2 -translate-x-1/2 font-mono uppercase border border-textPrimary/45 bg-background/70 px-2 py-1"
            style={{
              bottom: '40%',
              fontSize: 8,
              color: 'rgba(210,143,255,0.7)',
              letterSpacing: '0.2em',
              textShadow: '0 0 8px #d28fff',
              clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
            }}
          >
            REEMPLAZAR · PHOTO
          </div>
        )}
      </div>

      <span style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 1, height: 6, background: '#d28fff' }} />
      <span style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 1, height: 6, background: '#d28fff' }} />
      <span style={{ position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)', width: 6, height: 1, background: '#d28fff' }} />
      <span style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 6, height: 1, background: '#d28fff' }} />

      <div
        className="absolute font-mono uppercase font-bold"
        style={{
          top: 18,
          right: -10,
          padding: '4px 10px',
          border: '1.5px solid rgba(62,201,216,0.6)',
          color: 'rgba(62,201,216,0.85)',
          transform: 'rotate(8deg)',
          fontSize: 8,
          letterSpacing: '0.2em',
          backgroundColor: 'rgba(62,201,216,0.06)',
          zIndex: 4,
        }}
      >
        APROBADO
      </div>
    </div>

    <div className="text-center mt-3.5">
      <h3 className="font-jetbrains font-bold text-white text-lg m-0 leading-tight tracking-tight">
        {name}
      </h3>
      <Mono className="text-textPrimary block mt-1" style={{ fontSize: 10, letterSpacing: '0.25em' }}>
        @{callsign}
      </Mono>
    </div>

    <div className="grid grid-cols-2 gap-1.5 mt-3.5">
      <StatChip k="ROLE" v={role} />
      <StatChip k="LOCATION" v={location} />
    </div>

    <div className="mt-2.5">
      <Mono className="text-textPrimary/40 block mb-1.5" style={{ fontSize: 7 }}>
        {'// LANGUAGES'}
      </Mono>
      <div className="flex flex-wrap gap-1">
        {languages.map(l => (
          <span
            key={l}
            className="font-mono text-textPrimary/70 border border-textPrimary/25 bg-textPrimary/5 px-1.5 py-0.5"
            style={{ fontSize: 8, clipPath: 'polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)' }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>

    <Mono
      className="absolute bottom-1.5 left-3.5 text-textPrimary/25"
      style={{ fontSize: 6.5, letterSpacing: '0.3em' }}
    >
      F-{pilotId.replace('PILOT_', '')}
    </Mono>
  </div>
);

export default PhotoExpediente;
