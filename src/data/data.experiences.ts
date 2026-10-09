export type HighlightSeverity = 'info' | 'success' | 'warn';

export interface ExperienceHighlight {
  tag: string;
  text: string;
  severity: HighlightSeverity;
}

export interface ExperienceOutcome {
  v: string | number;
  k: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  opCode: string;
  missionCode: string;
  clearance: string;
  syncRate: number;
  status: 'ACTIVE' | 'ARCHIVED';
  location: string;
  sigilLabel: string;
  sigilTone: string;
  position: string;
  team: string;
  mode: string;
  rolAbbr: string;
  durationMonths: number;
  brief: string;
  description: string[];
  tech: string[];
  highlights: ExperienceHighlight[];
  projects: string[];
  outcomes: ExperienceOutcome[];
}

export const experiences: Experience[] = [
  {
    company: 'Books&Bits',
    role: 'Desarrollador Web Front-end',
    duration: 'Ene 2025 — Presente',
    opCode: 'OP_01',
    missionCode: 'MSN_021',
    clearance: 'LV.3',
    syncRate: 87,
    status: 'ACTIVE',
    location: 'CL · Hybrid',
    sigilLabel: 'B&B',
    sigilTone: '#a855f7',
    position: 'Front-end',
    team: 'Engineering',
    mode: 'Hybrid',
    rolAbbr: 'FE',
    durationMonths: 16,
    brief: 'Modernización full-stack: migración VB→Python, intranet corporativa y APIs RESTful.',
    description: [
      'Modernización de servicios legacy (VB → Python) y migración de sistemas desktop a ElectronJS.',
      'Desarrollo y consumo de APIs RESTful, además de creación de procedimientos almacenados.',
      'Implementación de una nueva intranet corporativa y páginas web de alto rendimiento.',
    ],
    tech: ['Next.js', 'Python', 'ElectronJS', 'Node.js', 'SQL', 'Tailwind CSS', 'TypeScript'],
    highlights: [
      { tag: 'MODERNIZACIÓN', severity: 'info',    text: 'Migración activa de servicios VB → Python.' },
      { tag: 'DESKTOP',       severity: 'success', text: 'Sistemas legacy migrados a apps con ElectronJS.' },
      { tag: 'BACKEND · BDD', severity: 'info',    text: 'APIs RESTful y procedimientos almacenados.' },
      { tag: 'FRONT-END',     severity: 'success', text: 'Intranet corporativa con múltiples funciones.' },
    ],
    projects: [
      'Landing para búsqueda de boletas',
      'Intranet corporativa con múltiples funciones',
      'Migración del sistema de correos VB → Python',
      'Sistema de despachos con comandas',
    ],
    outcomes: [
      { v: '4+',  k: 'servicios migrados' },
      { v: '∞',   k: 'horas ahorradas / mes' },
      { v: 'LIVE', k: 'intranet en prod' },
    ],
  },
  {
    company: 'CIB',
    role: 'Front-end Developer',
    duration: 'Mar 2024 — Ene 2025',
    opCode: 'OP_02',
    missionCode: 'MSN_017',
    clearance: 'LV.2',
    syncRate: 78,
    status: 'ARCHIVED',
    location: 'CL · Remote',
    sigilLabel: 'CIB',
    sigilTone: '#8a97a6',
    position: 'Front-end',
    team: 'Web Lab',
    mode: 'Remote',
    rolAbbr: 'FE',
    durationMonths: 11,
    brief: 'UI optimizadas para rendimiento y biblioteca de componentes reutilizables.',
    description: [
      'Diseño y desarrollo de interfaces web optimizadas para rendimiento y usabilidad.',
      'Construcción de componentes reutilizables.',
      'Optimización de flujos de trabajo con enfoque UX/UI.',
    ],
    tech: ['React', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'Figma'],
    highlights: [
      { tag: 'INTERFACES',  severity: 'success', text: 'Web optimizadas para rendimiento y usabilidad.' },
      { tag: 'COMPONENTES', severity: 'info',    text: 'Librería reutilizable con consistencia visual.' },
      { tag: 'UX/UI',       severity: 'success', text: 'Flujos de trabajo optimizados.' },
    ],
    projects: [
      'Landing page corporativa CIB',
      'Museum NFT page',
      'Iny App — landing + prototipado',
      'Priveehost — página de hosting',
      'Tarotista — sitio personal',
    ],
    outcomes: [
      { v: '5',   k: 'sitios entregados' },
      { v: '+96', k: 'lighthouse promedio' },
      { v: '12',  k: 'comp. reutilizables' },
    ],
  },
  {
    company: 'SEDSA',
    role: 'Developer Intern',
    duration: 'Nov 2023 — Dic 2023',
    opCode: 'OP_03',
    missionCode: 'MSN_003',
    clearance: 'LV.1',
    syncRate: 65,
    status: 'ARCHIVED',
    location: 'CL · On-site',
    sigilLabel: 'SED',
    sigilTone: '#ffcc00',
    position: 'Intern',
    team: 'Comercial',
    mode: 'On-site',
    rolAbbr: 'INT',
    durationMonths: 2,
    brief: 'Análisis BI con Power BI/Python y prototipos web React + FastAPI.',
    description: [
      'Gestión de bases de datos y análisis con Power BI y Python.',
      'Herramientas de optimización interna para el área comercial.',
      'Prototipado en Figma y apps web con React + FastAPI.',
    ],
    tech: ['Python', 'Power BI', 'React', 'TypeScript', 'FastAPI', 'Figma'],
    highlights: [
      { tag: 'DATA · BI',    severity: 'info', text: 'Análisis de datos y BDD con Power BI y Python.' },
      { tag: 'HERRAMIENTAS', severity: 'info', text: 'Automatización y optimización del área comercial.' },
    ],
    projects: [
      'Automatización de scripts en Python',
      'Ajustes y dashboards en Power BI',
      'Análisis de datos comerciales',
    ],
    outcomes: [
      { v: '3',  k: 'scripts en producción' },
      { v: '2',  k: 'dashboards BI' },
      { v: 'JR', k: 'rol completado' },
    ],
  },
];
