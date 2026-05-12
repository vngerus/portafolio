'use client';

import React, { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { workProjects } from '@/data';
import { PinContainer } from '@/components/ui/3d-pin';
import { useIsMobile } from '@/hooks/isMobile';
import TechTags from '@/components/tech_button';
import { useGsapStagger } from '@/hooks/useGsapReveal';
import SysLabel from '@/components/SysLabel';

const Projects: React.FC = () => {
  const isMobile = useIsMobile();
  const listRef = useGsapStagger<HTMLDivElement>('.project-card', {
    y: 50,
    stagger: 0.2,
    start: 'top 80%',
  });

  const pinRefs = useRef(
    workProjects.map(() =>
      React.createRef<{ triggerEnter?: () => void; triggerLeave?: () => void }>(),
    ),
  );

  return (
    <section
      id="projects"
      className="flex flex-col mx-auto max-w-250 px-4 py-12 min-h-screen mt-12 overflow-hidden box-border"
    >
      <div className="flex flex-col w-full mb-8">
        <SysLabel left="// OP_RECORD" right="REGISTRO DE OPERACIONES" />
        <div className="flex items-center w-full">
          <span className="text-textPrimary font-mono text-lg mr-4">02.</span>
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">Proyectos</h2>
          <div className="flex-1 h-px bg-gray-700 ml-4" />
        </div>
      </div>

      <div ref={listRef}>
        {workProjects.map((project, index) => (
          <div
            key={index}
            className={`project-card relative flex ${
              isMobile ? 'flex-col' : index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center justify-between gap-4 md:gap-8 mb-12 w-full ${
              !isMobile && index === 1 ? 'md:ml-[4%]' : ''
            }`}
          >
            <div
              className={`w-full ${
                isMobile ? 'h-80' : 'md:w-[48%] h-80'
              } rounded-md overflow-hidden shrink-0 box-border`}
            >
              <PinContainer
                ref={pinRefs.current[index]}
                href={project.link}
                backgroundImage={project.imgback}
                title={project.title}
                imgLogo={project.imglogo}
                className="w-full max-w-full h-full object-cover"
              />
            </div>

            <div
              className={`w-full ${
                isMobile ? 'w-[20rem]' : 'md:w-[48%]'
              } flex flex-col justify-center text-left box-border`}
            >
              <div className="mb-4">
                <p className="font-mono text-[9px] text-textPrimary/40 tracking-[0.2em] uppercase mb-1">
                  // OP_{String(index + 1).padStart(2, '0')} · {project.company}
                </p>
                <h3 className="text-lg md:text-2xl font-bold text-gray-200 tracking-tight">
                  {project.title}
                </h3>
              </div>

              <div
                className="relative border border-textPrimary/15 bg-buttonUnselected/20 p-4 md:p-5 mb-4"
                style={{
                  clipPath:
                    'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-textPrimary/30 to-transparent" />
                <p className="font-mono text-[9px] text-textPrimary/40 tracking-[0.2em] uppercase mb-2">
                  // DESCRIPCIÓN
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
              </div>
              <TechTags techStack={project.techStack} />
              <div className="flex gap-3 mt-5">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => pinRefs.current[index]?.current?.triggerEnter?.()}
                  onMouseLeave={() => pinRefs.current[index]?.current?.triggerLeave?.()}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-textPrimary/60 tracking-[0.15em] uppercase border border-textPrimary/25 px-3 py-1.5 hover:border-textPrimary/60 hover:text-textPrimary/90 transition-colors"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                >
                  <FiExternalLink size={11} />
                  Ver despliegue
                </a>
                <a
                  href="https://github.com/vngerus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500 tracking-[0.15em] uppercase border border-gray-700/60 px-3 py-1.5 hover:border-textPrimary/30 hover:text-gray-300 transition-colors"
                  style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                >
                  <FiGithub size={11} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
