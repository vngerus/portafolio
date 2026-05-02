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
            { tag: 'MODERNIZACIÓN',  text: 'Migración activa de servicios en VB hacia Python.' },
            { tag: 'DESKTOP',        text: 'Sistemas legacy migrados a apps modernas con ElectronJS.' },
            { tag: 'BACKEND · BDD',  text: 'APIs RESTful y creación de procedimientos almacenados en BDD.' },
            { tag: 'FRONT-END',      text: 'Intranet corporativa con múltiples funciones y páginas anexas.' },
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
            { tag: 'INTERFACES',    text: 'Interfaces web optimizadas para rendimiento y usabilidad.' },
            { tag: 'COMPONENTES',   text: 'Librería de componentes reutilizables con consistencia visual.' },
            { tag: 'UX/UI',         text: 'Optimización de flujos de trabajo con enfoque integrado de UX/UI.' },
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
            { tag: 'DATA · BI',      text: 'Análisis de datos y gestión de BDD con Power BI y Python.' },
            { tag: 'HERRAMIENTAS',   text: 'Automatización de scripts y optimización interna del área comercial.' },
        ],
        projects: [
            'Automatización de scripts en Python',
            'Ajustes y dashboards en Power BI',
            'Análisis de datos comerciales',
        ],
    },
];

export const tags = [
    { id: 1, name: "React.js", icon: "/stack/react.svg" },
    { id: 2, name: "TailwindCSS", icon: "/stack/tailwindcss.svg" },
    { id: 3, name: "TypeScript", icon: "/stack/typescript.svg" },
    { id: 4, name: "Framer Motion", icon: "/stack/framer.svg" },
    { id: 6, name: "Next.js", icon: "/stack/next.svg" },
    { id: 7, name: "JavaScript", icon: "/stack/javascript.svg" },
    { id: 8, name: "Firebase", icon: "/stack/firebase.svg" },
    { id: 9, name: "Springboot", icon: "/stack/springboot.svg" },
    { id: 5, name: "Flutter", icon: "/stack/flutter.svg" },
];

    

export const workProjects = [
    {
        category: "work",
        title: "CIB",
        company: "CIB",
        date: "Marzo 2024 - Actualmente",
        link: "https://.app",
        description: "Desarrollo de la landing page principal de Consultants in Blockchain, diseñada para representar la identidad de la empresa en el ecosistema cripto y destacar sus servicios. Implementación de una interfaz moderna y atractiva alineada con el sector blockchain.",
        imgback: "/project/CibBack.webp",
        imglogo: "/project/CIB.webp",
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        techStack: [1, 2, 3, 4],
    },
    {
        category: "personal",
        title: "Avida",
        company: "Proyecto Integrador",
        link: "https://avida.vercel.app",
        description: "Proyecto personal e integrador que busca reconectar a las personas con la naturaleza de su región. Facilita la exploración de rutas de trekking, hiking, humedales y áreas verdes cercanas a la ciudad, promoviendo la desconexión del entorno urbano y el redescubrimiento de espacios naturales. Además, destaca la presencia de fauna autóctona poco común en entornos urbanos, fomentando la conservación y el respeto por estos ecosistemas.",
        imgback: "/project/AvidaBack.webp",
        imglogo: "/project/Avida.webp",
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        techStack: [1, 2, 3, 4],
    },
];

