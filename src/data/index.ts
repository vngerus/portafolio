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
    sigilTone: '#d28fff',
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
    sigilTone: '#7aa9ff',
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
    sigilTone: '#3ec9d8',
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

export const tags = [
  { id: 1, name: 'React.js', icon: '/stack/react.svg' },
  { id: 2, name: 'TailwindCSS', icon: '/stack/tailwindcss.svg' },
  { id: 3, name: 'TypeScript', icon: '/stack/typescript.svg' },
  { id: 4, name: 'Framer Motion', icon: '/stack/framer.svg' },
  { id: 6, name: 'Next.js', icon: '/stack/next.svg' },
  { id: 7, name: 'JavaScript', icon: '/stack/javascript.svg' },
  { id: 8, name: 'Firebase', icon: '/stack/firebase.svg' },
  { id: 9, name: 'Springboot', icon: '/stack/springboot.svg' },
  { id: 5, name: 'Flutter', icon: '/stack/flutter.svg' },
];

export type CompanyStatus = 'ACTIVE' | 'ARCHIVED';

export interface WorkProjectMetrics {
  lh: number;
  build: string;
  deps: number;
}

export interface WorkProject {
  title: string;
  subtitle: string;
  kind: string;
  imgback: string | null;
  videoback?: string;
  imglogo: string | null;
  link: string;
  github?: string;
  description: string;
  techStack: number[];
  metrics: WorkProjectMetrics;
  dev?: boolean;
}

export interface WorkCompany {
  id: string;
  company: string;
  role: string;
  period: string;
  status: CompanyStatus;
  location: string;
  opCode: string;
  projects: WorkProject[];
}

export const workCompanies: WorkCompany[] = [
  {
    id: 'cib',
    company: 'CIB',
    role: 'Front-end Developer',
    period: '2024.03 → 2025.01',
    status: 'ARCHIVED',
    location: 'CL · Remote',
    opCode: 'OP_02',
    projects: [
      {
        title: 'CIB Landing',
        subtitle: 'Consultants in Blockchain',
        kind: 'Landing corporativa',
        imgback: '/project/CibBack.webp',
        imglogo: '/project/CIB.webp',
        link: 'https://cib.app',
        github: 'https://github.com/vngerus',
        description:
          'Landing principal de Consultants in Blockchain. Diseño moderno alineado con la identidad blockchain, animaciones en scroll y secciones para destacar servicios y partners.',
        techStack: [1, 2, 3, 4],
        metrics: { lh: 96, build: '0.42s', deps: 18 },
      },
      {
        title: 'Museum NFT',
        subtitle: 'Galería de colecciones',
        kind: 'Web app · Galería',
        imgback: null,
        imglogo: null,
        dev: true,
        link: '#',
        description:
          'Plataforma para curaduría y exposición de colecciones NFT con preview interactivo, filtros por categoría y ficha técnica por pieza.',
        techStack: [6, 3, 2],
        metrics: { lh: 92, build: '0.61s', deps: 24 },
      },
      {
        title: 'Iny App',
        subtitle: 'Landing + prototipado',
        kind: 'Prototipo · Mobile-first',
        imgback: null,
        imglogo: null,
        dev: true,
        link: '#',
        description:
          'Landing de alto rendimiento y prototipo navegable. Sistema de componentes reutilizables y flow móvil completo.',
        techStack: [1, 3, 2],
        metrics: { lh: 98, build: '0.31s', deps: 12 },
      },
    ],
  },
  {
    id: 'personal',
    company: 'Personal · Lab',
    role: 'Self-directed',
    period: '2023 → presente',
    status: 'ACTIVE',
    location: 'Open source',
    opCode: 'OP_03',
    projects: [
      {
        title: 'Avida',
        subtitle: 'Reconectar con la naturaleza',
        kind: 'Proyecto integrador',
        imgback: '/project/AvidaBack.webp',
        imglogo: '/project/Avida.webp',
        link: 'https://avida.vercel.app',
        github: 'https://github.com/vngerus',
        description:
          'Explora rutas, humedales y áreas verdes cercanas a la ciudad. Promueve el redescubrimiento de espacios naturales y destaca la conservación de fauna autóctona.',
        techStack: [6, 3, 2, 4],
        metrics: { lh: 94, build: '0.55s', deps: 22 },
      },
      {
        title: 'Banana Cat 3D',
        subtitle: 'WebGL playground',
        kind: 'Experimento · R3F',
        imgback: null,
        imglogo: null,
        dev: true,
        link: '#',
        description:
          'Modelo 3D animado en React Three Fiber con controles paramétricos, post-processing y carga progresiva.',
        techStack: [1, 3, 2],
        metrics: { lh: 89, build: '0.78s', deps: 32 },
      },
      {
        title: 'Portfolio v2',
        subtitle: 'Este sitio',
        kind: 'Personal · Showcase',
        imgback: null,
        imglogo: null,
        link: '#',
        description:
          'Iteración con estética NERV: scanlines, telemetría y stack 3D para mostrar proyectos por empresa.',
        techStack: [6, 3, 2, 4],
        metrics: { lh: 97, build: '0.48s', deps: 20 },
      },
    ],
  },
];
