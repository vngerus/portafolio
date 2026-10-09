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
  accentColor?: string;
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
        accentColor: '#3ec9d8',
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
        accentColor: '#ffc864',
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
        accentColor: '#b496ff',
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
        accentColor: '#3ec9d8',
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
        accentColor: '#d28fff',
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
        accentColor: '#d28fff',
      },
    ],
  },
];
