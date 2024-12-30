"use client";

import React, { useRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { workProjects } from "@/data";
import { PinContainer } from "@/components/ui/3d-pin";
import { useIsMobile } from "@/hooks/isMobile";
import TechTags from "@/components/tech_button";

const Projects: React.FC = () => {
    const isMobile = useIsMobile();

    const pinRefs = useRef(
        workProjects.map(() =>
            React.createRef<{ triggerEnter?: () => void; triggerLeave?: () => void }>()
        )
    );

    return (
        <div className="flex flex-col mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12 overflow-hidden box-border">
            <div className="flex items-center w-full mb-8">
                <span className="text-primary font-mono text-lg mr-4">02.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Proyectos</h2>
                <div className="flex-1 h-[1px] bg-gray-700 ml-4"></div>
            </div>

            {workProjects.map((project, index) => (
                <div
                    key={index}
                    className={`relative flex ${isMobile
                        ? "flex-col"
                        : index % 2 === 0
                            ? "md:flex-row"
                            : "md:flex-row-reverse"
                        } items-center justify-between gap-4 md:gap-8 mb-12 w-full ${!isMobile && index === 1 ? "md:ml-[4%]" : ""
                        }`}
                >
                    <div
                        className={`w-full ${isMobile ? "h-[20rem]" : "md:w-[48%] h-[20rem]"
                            } rounded-md overflow-hidden flex-shrink-0 box-border`}
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
                        className={`w-full ${isMobile ? "w-[20rem]" : "md:w-[48%]"
                            } flex flex-col justify-center text-left box-border`}
                    >
                        <div className="mb-4">
                            <h4 className="text-purple-400 text-xs md:text-sm font-semibold">
                                {project.company}
                            </h4>
                            <h3 className="text-lg md:text-2xl font-bold text-gray-200">{project.title}</h3>
                        </div>

                        <div className="bg-purple-950 p-4 md:p-6 rounded-md shadow-lg mb-4">
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs md:text-sm mb-6">
                            <TechTags techStack={project.techStack} />
                        </div>

                        <div className="flex space-x-4 md:space-x-6  text-gray-300">
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
                                <FiExternalLink className="text-xl md:text-2xl hover:text-purple-300" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <FiGithub className="text-xl md:text-2xl hover:text-purple-300" />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Projects;
