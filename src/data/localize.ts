import type { Lang } from '@/lib/lang';
import { experiences } from './data.experiences';
import { workCompanies } from './data.projects';
import { education } from './data.education';
import { stackGroups } from './data.stack';
import { cv as cvEs, type CvEntry } from './data.cv';

// English layer over the Spanish source data. Spanish is the default; anything missing falls back to it.

const experienceEn: Record<string, { role: string; duration: string; mode: string; brief: string; catLine: string }> = {
  'Books&Bits': {
    role: 'Front-end Web Developer',
    duration: 'Jan 2025 — Present',
    mode: 'Hybrid',
    brief: 'Full-stack modernization: VB→Python migration, corporate intranet and RESTful APIs.',
    catLine: 'From VB to Python… brave!',
  },
  CIB: {
    role: 'Front-end Developer',
    duration: 'Mar 2024 — Jan 2025',
    mode: 'Remote',
    brief: 'Performance-optimized UIs and a reusable component library.',
    catLine: 'Reusable components: my kind of laziness',
  },
  SEDSA: {
    role: 'Developer Intern',
    duration: 'Nov 2023 — Dec 2023',
    mode: 'On-site',
    brief: 'BI analysis with Power BI/Python and React + FastAPI web prototypes.',
    catLine: 'Power BI and React: the first round',
  },
};

const companyEn: Record<string, { role: string; period: string }> = {
  bb: { role: 'Full-stack Developer', period: '2025 → present' },
  cib: { role: 'Front-end Developer', period: '2024.03 → 2025.01' },
  personal: { role: 'Personal projects', period: '2023 → present' },
};

const projectEn: Record<string, { title?: string; kind: string; description: string }> = {
  'bb-intranet': {
    title: 'Corporate intranet',
    kind: 'Internal web app',
    description: 'New corporate intranet and high-performance web pages, consuming our own RESTful APIs.',
  },
  'bb-mail': {
    title: 'Email migration',
    kind: 'VB → Python migration',
    description: 'Migration of the Visual Basic mail system to Python services, part of the legacy services modernization.',
  },
  'bb-despacho': {
    title: 'Dispatch system',
    kind: 'Desktop · ElectronJS',
    description: 'Migration of desktop systems to ElectronJS for dispatch and order management.',
  },
  'bb-boletas': { title: 'Receipt lookup', kind: 'Web page', description: 'Public page where customers can quickly look up their receipts.' },
  'cib-landing': {
    kind: 'Corporate site',
    description:
      'Main site of Consultants in Blockchain. Modern design aligned with the blockchain identity, scroll animations and sections highlighting services and partners.',
  },
  'cib-museum': {
    kind: 'Web app · Gallery',
    description:
      'Platform for curating and exhibiting NFT collections with interactive preview, category filters and a technical sheet per piece.',
  },
  'cib-iny': {
    kind: 'Prototype · Mobile-first',
    description: 'High-performance page and clickable prototype. Reusable component system and a complete mobile flow.',
  },
  avida: {
    kind: 'Capstone project',
    description:
      'Explore routes, wetlands and green areas near the city. Promotes rediscovering natural spaces and highlights native wildlife conservation.',
  },
  bananacat: {
    kind: 'Experiment · R3F',
    description: 'Animated 3D model in React Three Fiber with parametric controls, post-processing and progressive loading.',
  },
};

const educationEn: Record<string, { name: string; date: string }> = {
  'Analista Programador': { name: 'Analyst Programmer', date: 'In progress' },
  'Ingeniería en Marketing': { name: 'Marketing Engineering', date: 'Mar 2017 – Nov 2021' },
  'Flutter Developer': { name: 'Flutter Developer', date: 'Dec 2024' },
  'Fundamentos DevOps': { name: 'DevOps Fundamentals', date: 'Jun – Oct 2024' },
  Ciberseguridad: { name: 'Cybersecurity', date: 'Feb 2024' },
  'Diseño de Experiencia de Usuario (UX)': { name: 'User Experience (UX) Design', date: 'Oct 2023' },
  'Desarrollador Full Stack Java': { name: 'Full Stack Java Developer', date: 'Jul – Oct 2023' },
};

const stackEn: Record<string, string> = { 'Escritorio · Móvil': 'Desktop · Mobile' };

export const localizeExperiences = (lang: Lang) =>
  lang === 'es' ? experiences : experiences.map(e => ({ ...e, ...experienceEn[e.company] }));

export const localizeCompanies = (lang: Lang) =>
  lang === 'es'
    ? workCompanies
    : workCompanies.map(c => ({
        ...c,
        ...companyEn[c.id],
        projects: c.projects.map(p => ({ ...p, ...projectEn[p.id] })),
      }));

export const localizeEducation = (lang: Lang) =>
  lang === 'es' ? education : education.map(e => ({ ...e, ...educationEn[e.name] }));

export const localizeStack = (lang: Lang) =>
  lang === 'es' ? stackGroups : stackGroups.map(g => ({ ...g, label: stackEn[g.label] ?? g.label }));

// ---- CV
const cvEn: typeof cvEs = {
  role: 'Front-End Developer',
  email: cvEs.email,
  about:
    'Front-End Developer with proven Full Stack experience in production environments, specialized in React, Next.js and ElectronJS. Autonomous on the back-end: REST APIs with Node.js, Airflow pipelines, legacy system migration and SQL/Supabase databases. I deliver products end to end, with a focus on UX/UI.',
  experience: [
    {
      title: 'Front-End Web Developer',
      org: 'Books & Bits',
      period: 'January 2025 - Present',
      bullets: [
        'Built desktop applications with ElectronJS and TypeScript: an order system and a dispatch system with FedEx labels, both in production.',
        'Migrated legacy Visual Basic services to Python and automated their pipelines with Apache Airflow.',
        'Built a corporate intranet with Next.js, Node.js, SQL and Supabase, integrating multiple modules and internal services.',
        'Designed in-house REST APIs and developed static and dynamic pages with React, Next.js and Tailwind CSS.',
      ],
    },
    {
      title: 'Front-End Developer',
      org: 'CIB',
      period: 'March 2024 - January 2025',
      bullets: [
        'Delivered, with React and Tailwind CSS, the main corporate site, the VPS page, the NFT museum page, a visual wine system and an AI page.',
        'Created reusable components, applied a UX/UI approach with Figma and optimized performance in every project.',
      ],
    },
    {
      title: 'Junior Developer',
      org: 'Grupo SEDSA (Bestwork English Institute)',
      period: 'November 2023 - December 2023',
      bullets: ['Automated mass email campaigns with Python and managed commercial data with Power BI.'],
    },
  ],
  stack: [
    { label: 'Frontend', items: cvEs.stack[0].items },
    { label: 'Backend', items: cvEs.stack[1].items },
    { label: 'Languages', items: cvEs.stack[2].items },
    { label: 'Databases', items: cvEs.stack[3].items },
    { label: 'Tools', items: cvEs.stack[4].items },
    { label: 'Mobile (collab.)', items: cvEs.stack[5].items },
  ],
  education: [
    {
      title: 'Analyst Programmer',
      org: 'Inacap',
      period: 'March 2025 - Present',
      bullets: ['Cross-platform software development, databases, agile methodologies, maintenance and systems testing.'],
    },
    {
      title: 'Marketing Engineering',
      org: 'Duoc UC',
      period: 'March 2017 - November 2021',
      bullets: ['Digital marketing strategies, ecommerce and market analysis.'],
    },
  ] as CvEntry[],
  certifications: [
    { name: 'Flutter Developer', org: 'Globant · Desafío Latam', date: 'December 2024 - January 2025' },
    { name: 'English B2', org: 'Poliglota.org', date: 'December 2024' },
    { name: 'DevOps Fundamentals', org: 'Kibernum IT Academy · Talento Digital', date: 'June - October 2024' },
    { name: 'Cybersecurity', org: 'Google · Talento Digital', date: 'February 2024' },
    { name: 'User Experience (UX) Design', org: 'Google · Talento Digital', date: 'October 2023' },
    { name: 'Full Stack Java Developer', org: 'Generation Chile', date: 'July - October 2023' },
  ],
};

export const getCv = (lang: Lang) => (lang === 'es' ? cvEs : cvEn);
