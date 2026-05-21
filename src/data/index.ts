export const experiences = [
  {
    company: 'Books&Bits',
    role: 'Desarrollador Web Front-end',
    duration: 'Ene 2025 - Presente',
    description: [
      'Participé activamente en la modernización de servicios legacy (VB → Python) y migración de sistemas desktop a ElectronJS.',
      'Desarrollé y consumí APIs RESTful, además de crear procedimientos almacenados en base de datos.',
      'Implementé una nueva intranet corporativa y páginas web de alto rendimiento.',
    ],
    tech: ['Next.js', 'Python', 'ElectronJS', 'Node.js', 'SQL', 'Tailwind CSS', 'TypeScript'],
    highlights: [
      { tag: 'MODERNIZACIÓN', text: 'Migración activa de servicios en VB hacia Python.' },
      { tag: 'DESKTOP', text: 'Sistemas legacy migrados a apps modernas con ElectronJS.' },
      {
        tag: 'BACKEND · BDD',
        text: 'APIs RESTful y creación de procedimientos almacenados en BDD.',
      },
      { tag: 'FRONT-END', text: 'Intranet corporativa con múltiples funciones y páginas anexas.' },
    ],
    projects: [
      'Landing para búsqueda de boletas',
      'Intranet corporativa con múltiples funciones',
      'Migración de sistema de correos VB → Python',
      'Sistema de despachos con comandas',
    ],
  },
  {
    company: 'CIB',
    role: 'Front-end Developer',
    duration: 'Mar 2024 - Ene 2025',
    description: [
      'Diseñé y desarrollé interfaces web optimizadas para rendimiento y usabilidad.',
      'Construí componentes reutilizables para acelerar el desarrollo y mantener consistencia visual.',
      'Optimicé flujos de trabajo integrando enfoques de UX/UI en proyectos de clientes.',
    ],
    tech: ['React', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'Figma'],
    highlights: [
      { tag: 'INTERFACES', text: 'Interfaces web optimizadas para rendimiento y usabilidad.' },
      {
        tag: 'COMPONENTES',
        text: 'Librería de componentes reutilizables con consistencia visual.',
      },
      { tag: 'UX/UI', text: 'Optimización de flujos de trabajo con enfoque integrado de UX/UI.' },
    ],
    projects: [
      'Landing page corporativa CIB',
      'Museum NFT page',
      'Iny App — landing + prototipado de alto rendimiento',
      'Priveehost — página de hosting',
      'Página web para tarotista',
    ],
  },
  {
    company: 'SEDSA',
    role: 'Developer Intern',
    duration: 'Nov 2023 - Dic 2023',
    description: [
      'Gestioné bases de datos y desarrollé análisis de datos con Power BI y Python.',
      'Colaboré en herramientas de optimización interna para el área comercial.',
      'Prototipé en Figma y desarrollé aplicaciones web con React, TypeScript y FastAPI.',
    ],
    tech: ['Python', 'Power BI', 'React', 'TypeScript', 'FastAPI', 'Figma'],
    highlights: [
      { tag: 'DATA · BI', text: 'Análisis de datos y gestión de BDD con Power BI y Python.' },
      {
        tag: 'HERRAMIENTAS',
        text: 'Automatización de scripts y optimización interna del área comercial.',
      },
    ],
    projects: [
      'Automatización de scripts en Python',
      'Ajustes y dashboards en Power BI',
      'Análisis de datos comerciales',
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

// ─────────── Nueva estructura: por empresa ───────────
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
    ],
  },
];
