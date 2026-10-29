export interface WorkProject {
  id: string;
  title: string;
  kind: string;
  description: string;
  stack: string[];
  cover?: string; // app screenshot / background (public path)
  icon?: string; // app icon (public path); placeholder initials until set
  link?: string;
  github?: string;
  dev?: boolean;
  confidential?: boolean;
  featured?: boolean;
}

export interface WorkCompany {
  id: string;
  company: string;
  role: string;
  period: string;
  projects: WorkProject[];
}

export const workCompanies: WorkCompany[] = [
  {
    id: 'bb',
    company: 'Books&Bits',
    role: 'Desarrollador Full-stack',
    period: '2025 → presente',
    projects: [
      {
        id: 'bb-intranet',
        title: 'Intranet corporativa',
        kind: 'Aplicación web interna',
        description:
          'Nueva intranet corporativa y páginas web de alto rendimiento, consumiendo APIs RESTful propias.',
        stack: ['Next.js', 'TypeScript', 'Node.js', 'SQL'],
        confidential: true,
        featured: true,
      },
      {
        id: 'bb-mail',
        title: 'Migración de correos',
        kind: 'Migración VB → Python',
        description:
          'Migración del sistema de correos escrito en Visual Basic a servicios en Python, parte de la modernización de servicios legacy.',
        stack: ['Python', 'SQL'],
        confidential: true,
      },
      {
        id: 'bb-despacho',
        title: 'Sistema de despachos',
        kind: 'Escritorio · ElectronJS',
        description:
          'Migración de sistemas desktop a ElectronJS para la gestión de despachos y comandas.',
        stack: ['ElectronJS', 'Node.js', 'SQL'],
        confidential: true,
      },
      {
        id: 'bb-boletas',
        title: 'Búsqueda de boletas',
        kind: 'Página web',
        description: 'Página pública para que clientes busquen sus boletas de forma rápida.',
        stack: ['Next.js', 'Tailwind CSS'],
        confidential: true,
      },
    ],
  },
  {
    id: 'cib',
    company: 'CIB',
    role: 'Desarrollador Front-end',
    period: '2024.03 → 2025.01',
    projects: [
      {
        id: 'cib-landing',
        title: 'CIB Sitio web',
        kind: 'Sitio corporativo',
        description:
          'Sitio principal de Consultants in Blockchain. Diseño moderno alineado con la identidad blockchain, animaciones en scroll y secciones para destacar servicios y partners.',
        stack: ['React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
        cover: '/project/CibBack.webp',
        icon: '/project/CIB.webp',
        link: 'https://cib.app',
        github: 'https://github.com/vngerus',
        featured: true,
      },
      {
        id: 'cib-museum',
        title: 'Museum NFT',
        kind: 'Aplicación web · Galería',
        description:
          'Plataforma para curaduría y exposición de colecciones NFT con preview interactivo, filtros por categoría y ficha técnica por pieza.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        dev: true,
      },
      {
        id: 'cib-iny',
        title: 'Iny App',
        kind: 'Prototipo · Móvil primero',
        description:
          'Página de alto rendimiento y prototipo navegable. Sistema de componentes reutilizables y flow móvil completo.',
        stack: ['React', 'TypeScript', 'Tailwind CSS'],
        dev: true,
      },
    ],
  },
  {
    id: 'personal',
    company: 'Personal · Lab',
    role: 'Proyectos propios',
    period: '2023 → presente',
    projects: [
      {
        id: 'avida',
        title: 'Avida',
        kind: 'Proyecto integrador',
        description:
          'Explora rutas, humedales y áreas verdes cercanas a la ciudad. Promueve el redescubrimiento de espacios naturales y destaca la conservación de fauna autóctona.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        cover: '/project/AvidaBack.webp',
        icon: '/project/Avida.webp',
        link: 'https://avida.vercel.app',
        github: 'https://github.com/vngerus',
        featured: true,
      },
      {
        id: 'bananacat',
        title: 'Banana Cat 3D',
        kind: 'Experimento · R3F',
        description:
          'Modelo 3D animado en React Three Fiber con controles paramétricos, post-processing y carga progresiva.',
        stack: ['React', 'Three.js', 'TypeScript'],
        dev: true,
      },
    ],
  },
];
