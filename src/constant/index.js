export const calculateResponsiveSizes = (deviceType) => {
  switch (deviceType) {
    case 'mobile':
      return {
        catScale: 2,
        catPosition: [0.0, 0.99, 1.1],  
        cameraPosition: [0, 0, 20],    
      };
    case 'tablet':
      return {
        catScale: 3,
        catPosition: [0.0, -1, 1.2],
        cameraPosition: [0, 0, 25],
      };
    case 'desktop':
    default:
      return {
        catScale: 5,
        catPosition: [-0.2, -1.2, -5.0],
        cameraPosition: [0, 0, 30],
      };
  }
};
  

  export const myProjects = [
    {
      title: 'Podcastr - AI Podcast Platform',
      desc: 'Podcastr is a revolutionary Software-as-a-Service platform that transforms the way podcasts are created. With advanced AI-powered features like text-to-multiple-voices functionality, it allows creators to generate diverse voiceovers from a single text input.',
      subdesc:
        'Built as a unique Software-as-a-Service app with Next.js 14, Tailwind CSS, TypeScript, Framer Motion and Convex, Podcastr is designed for optimal performance and scalability.',
      href: 'https://www.youtube.com/watch?v=zfAb95tJvZQ',
      texture: '/textures/project/project1.mp4',
      logo: '/src/assets/projcts/project-logo1.png',
      logoStyle: {
        backgroundColor: '#2A1816',
        border: '0.2px solid #36201D',
        boxShadow: '0px 0px 60px 0px #AA3C304D',
      },
      spotlight: '/src/assets/background/spotlight1.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/src/assets/stack/react.svg',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: '/src/assets/stack/tailwindcss.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/src/assets/stack/typescript.png',
        },
        {
          id: 4,
          name: 'Framer Motion',
          path: '/src/assets/stack/framer.png',
        },
      ],
    },
    {
      title: 'LiveDoc - Real-Time Google Docs Clone',
      desc: 'LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.',
      subdesc:
        'With LiveDoc, users can experience the future of collaboration, where multiple contributors work together in real time without any lag, by using Next.js and Liveblocks newest features.',
      href: 'https://www.youtube.com/watch?v=y5vE8y_f_OM',
      texture: '/textures/project/project2.mp4',
      logo: '/src/assets/projcts/project-logo2.png',
      logoStyle: {
        backgroundColor: '#13202F',
        border: '0.2px solid #17293E',
        boxShadow: '0px 0px 60px 0px #2F6DB54D',
      },
      spotlight: '/src/assets/background/spotlight2.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/src/assets/stack/react.svg',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: '/src/assets/stack/tailwindcss.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/src/assets/stack/typescript.png',
        },
        {
          id: 4,
          name: 'Framer Motion',
          path: '/src/assets/stack/framer.png',
        },
      ],
    },
    {
      title: 'CarePulse - Health Management System',
      desc: 'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
      subdesc:
        'With a focus on efficiency, CarePulse integrantes complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.',
      href: 'https://www.youtube.com/watch?v=lEflo_sc82g',
      texture: '/textures/project/project3.mp4',
      logo: '/src/assets/projcts/project-logo3.png',
      logoStyle: {
        backgroundColor: '#60f5a1',
        background:
          'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
        border: '0.2px solid rgba(208, 213, 221, 1)',
        boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
      },
      spotlight: '/src/assets/stack/spotlight3.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/src/assets/stack/react.svg',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: '/src/assets/stack/tailwindcss.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/src/assets/stack/typescript.png',
        },
        {
          id: 4,
          name: 'Framer Motion',
          path: '/src/assets/stack/ramer.png',
        },
      ],
    },
    {
      title: 'Horizon - Online Banking Platform',
      desc: 'Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.',
      subdesc:
        'Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.',
      href: 'https://www.youtube.com/watch?v=PuOVqP_cjkE',
      texture: '/textures/project/project4.mp4',
      logo: '/src/assets/projcts/project-logo4.png',
      logoStyle: {
        backgroundColor: '#0E1F38',
        border: '0.2px solid #0E2D58',
        boxShadow: '0px 0px 60px 0px #2F67B64D',
      },
      spotlight: '/src/assets/background/spotlight4.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/src/assets/stack/react.svg',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: '/src/assets/stack/tailwindcss.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/src/assets/stack/typescript.png',
        },
        {
          id: 4,
          name: 'Framer Motion',
          path: '/src/assets/stack/framer.png',
        },
      ],
    },
    {
      title: 'Imaginify - AI Photo Manipulation App',
      desc: 'Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.',
      subdesc:
        'Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.',
      href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
      texture: '/textures/project/project5.mp4',
      logo: '/src/assets/projcts/project-logo5.png',
      logoStyle: {
        backgroundColor: '#1C1A43',
        border: '0.2px solid #252262',
        boxShadow: '0px 0px 60px 0px #635BFF4D',
      },
      spotlight: '/src/assets/background/spotlight5.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/src/assets/stack/react.svg',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: '/src/assets/stack/tailwindcss.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/src/assets/stack/typescript.png',
        },
        {
          id: 4,
          name: 'Framer Motion',
          path: '/src/assets/stack/framer.png',
        },
      ],
    },
  ];
  
