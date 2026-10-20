// Content of the visual CV (/cv). Mirrors public/cv-angel-smith.pdf.
export interface CvEntry {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

export const cv = {
  role: 'Desarrollador Front-End',
  email: 'angelsmithlgs@gmail.com',
  about:
    'Desarrollador Front-End con experiencia Full Stack en entornos productivos, especializado en React, Next.js y ElectronJS. Autónomo en back-end: APIs REST con Node.js, pipelines con Airflow, migración de sistemas legacy y bases de datos SQL/Supabase. Entrego productos de punta a punta, con foco en UX/UI.',
  experience: [
    {
      title: 'Desarrollador Web Front-End',
      org: 'Books & Bits',
      period: 'Enero 2025 - Actualidad',
      bullets: [
        'Desarrollé con ElectronJS y TypeScript un sistema de comandas y un sistema de despachos con etiquetas FedEx, ambos en producción.',
        'Migré servicios legacy de Visual Basic a Python y automaticé sus pipelines con Apache Airflow.',
        'Construí una intranet corporativa con Next.js, Node.js, SQL y Supabase, integrando múltiples módulos y servicios internos.',
        'Diseñé APIs REST propias y desarrollé páginas estáticas y dinámicas con React, Next.js y Tailwind CSS.',
      ],
    },
    {
      title: 'Front-End Developer',
      org: 'CIB',
      period: 'Marzo 2024 - Enero 2025',
      bullets: [
        'Entregué con React y Tailwind CSS el sitio corporativo principal, la página de VPS, la del museo NFT, un sistema visual de vinos y una página de IA.',
        'Creé componentes reutilizables, apliqué enfoque UX/UI con Figma y optimicé el rendimiento en cada proyecto.',
      ],
    },
    {
      title: 'Desarrollador Jr.',
      org: 'Grupo SEDSA (Bestwork English Institute)',
      period: 'Noviembre 2023 - Diciembre 2023',
      bullets: ['Automaticé campañas de email masivo con Python y gestioné datos comerciales con Power BI.'],
    },
  ] as CvEntry[],
  stack: [
    { label: 'Frontend', items: ['React', 'Next.js', 'ElectronJS', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { label: 'Backend', items: ['Node.js', 'Python', 'Apache Airflow'] },
    { label: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'Python'] },
    { label: 'Bases de datos', items: ['MySQL', 'OracleDB', 'Supabase'] },
    { label: 'Herramientas', items: ['Git', 'Figma', 'Power BI'] },
    { label: 'Mobile (col.)', items: ['Flutter', 'React Native'] },
  ],
  education: [
    {
      title: 'Analista Programador',
      org: 'Inacap',
      period: 'Marzo 2025 - Actualidad',
      bullets: ['Desarrollo de software multiplataforma, bases de datos, metodologías ágiles, mantención y pruebas de sistemas.'],
    },
    {
      title: 'Ingeniería en Marketing',
      org: 'Duoc UC',
      period: 'Marzo 2017 - Noviembre 2021',
      bullets: ['Estrategias de marketing digital, ecommerce y análisis de mercado.'],
    },
  ] as CvEntry[],
  certifications: [
    { name: 'Flutter Developer', org: 'Globant · Desafío Latam', date: 'Diciembre 2024 - Enero 2025' },
    { name: 'Inglés B2', org: 'Poliglota.org', date: 'Diciembre 2024' },
    { name: 'Fundamentos DevOps', org: 'Kibernum IT Academy · Talento Digital', date: 'Junio - Octubre 2024' },
    { name: 'Ciberseguridad', org: 'Google · Talento Digital', date: 'Febrero 2024' },
    { name: 'Diseño de Experiencia de Usuario (UX)', org: 'Google · Talento Digital', date: 'Octubre 2023' },
    { name: 'Full Stack Java Developer', org: 'Generation Chile', date: 'Julio - Octubre 2023' },
  ],
};
