'use client';

import React from 'react';
import { workCompanies } from '@/data';
import { useIsMobile } from '@/hooks/isMobile';
import { useGsapStagger } from '@/hooks/useGsapReveal';
import SysLabel from '@/components/SysLabel';
import CompanyCard from '@/components/projects/CompanyCard';
import CompanyCardMobile from '@/components/projects/CompanyCardMobile';

const Projects: React.FC = () => {
  const isMobile = useIsMobile();
  const listRef = useGsapStagger<HTMLDivElement>('.project-company-card', {
    y: 50,
    stagger: 0.2,
    start: 'top 80%',
  });

  const totalOps = workCompanies.reduce((sum, c) => sum + c.projects.length, 0);

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
        {workCompanies.map((company) => (
          <div key={company.id} className="project-company-card">
            {isMobile ? (
              <CompanyCardMobile company={company} />
            ) : (
              <CompanyCard company={company} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-dashed border-textPrimary/15 flex justify-end">
        <span className="font-mono text-[8px] text-textPrimary/30 tracking-[0.2em] uppercase">
          {'// EOF · '}{totalOps}{' OPS REGISTRADAS'}
        </span>
      </div>
    </section>
  );
};

export default Projects;
