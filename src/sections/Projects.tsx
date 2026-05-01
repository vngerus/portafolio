"use client";

import React, { useRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { workProjects } from "@/data";
import { PinContainer } from "@/components/ui/3d-pin";
import { useIsMobile } from "@/hooks/isMobile";
import TechTags from "@/components/tech_button";
import { useGsapStagger } from "@/hooks/useGsapReveal";

const Projects: React.FC = () => {
    const isMobile = useIsMobile();
    const listRef = useGsapStagger<HTMLDivElement>('.project-card', {
        y: 50,
        stagger: 0.2,
        start: 'top 80%',
    });

    const pinRefs = useRef(
        workProjects.map(() =>
            React.createRef<{ triggerEnter?: () => void; triggerLeave?: () => void }>()
        )
    );

    return (
        <section
            id="projects"
            className="flex flex-col mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12 overflow-hidden box-border"
        >
            <div className="flex flex-col w-full mb-8">
                <p className="font-mono text-[9px] text-textPrimary/40 tracking-[0.3em] uppercase mb-2">
                    // OP_RECORD · REGISTRO DE OPERACIONES
                </p>
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
                            isMobile
                                ? 'flex-col'
                                : index % 2 === 0
                                ? 'md:flex-row'
                                : 'md:flex-row-reverse'
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
                                    [OP_{String(index + 1).padStart(2, '0')}] · {project.company}
                                </p>
                                <h3 className="text-lg md:text-2xl font-bold text-gray-200">
                                    {project.title}
                                </h3>
                            </div>

                            <div className="bg-purple-950 p-4 md:p-6 rounded-md shadow-lg mb-4">
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <TechTags techStack={project.techStack} />

                            <div className="flex space-x-4 md:space-x-6 mt-6 text-gray-300">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() =>
                                        pinRefs.current[index]?.current?.triggerEnter?.()
                                    }
                                    onMouseLeave={() =>
                                        pinRefs.current[index]?.current?.triggerLeave?.()
                                    }
                                >
                                    <FiExternalLink
                                        className="text-xl md:text-2xl hover:text-textPrimary transition-colors"
                                        aria-label="Ver proyecto"
                                    />
                                </a>
                                <a
                                    href="https://github.com/vngerus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FiGithub
                                        className="text-xl md:text-2xl hover:text-textPrimary transition-colors"
                                        aria-label="GitHub"
                                    />
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
