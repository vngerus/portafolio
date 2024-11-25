"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PinContainer } from "@/components/ui/3d-pin";
import { workProjects, personalProjects, challenges, tags } from "@/constant";

interface Project {
    title: string;
    description: string;
    techStack: number[];
    link: string;
    imgback: string;
    imglogo: string;
}

const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<"work" | "personal" | "challenge">("work");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getData = useCallback((): Project[] => {
        const categoryData: Record<"work" | "personal" | "challenge", Project[]> = {
            work: workProjects,
            personal: personalProjects,
            challenge: challenges,
        };
        return categoryData[selectedCategory];
    }, [selectedCategory]);

    const data = getData();

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, [data.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    }, [data.length]);

    const renderProject = useCallback(
        (project: Project) => (
            <div key={project.title} className="relative flex flex-col md:flex-row gap-6 w-full">
                <div className="relative flex flex-col w-full h-[350px] mt-[15px] md:w-1/2 p-6 rounded-2xl shadow-md border transition duration-700 overflow-hidden">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
                    <p className="text-lg text-gray-400 mt-2 md:text-xl">{project.description}</p>
                    <div className="flex flex-wrap gap-4 mt-8">
                        {project.techStack.map((id) => {
                            const tag = tags.find((tag) => tag.id === id);
                            return (
                                tag && (
                                    <div key={tag.id} className="flex items-center space-x-2 p-2 rounded-lg">
                                        <Image src={tag.path} alt={`Tecnología: ${tag.name}`} width={24} height={24} />
                                        <span className="text-sm text-white">{tag.name}</span>
                                    </div>
                                )
                            );
                        })}
                    </div>

                    <button
                        onClick={handlePrev}
                        className="arrow-btn absolute left-8 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-200 mt-36"
                        aria-label="Proyecto Anterior"
                    >
                        <Image src="/resources/left-arrow.png"
                            width={20}
                            height={20}
                            alt="Proyecto Anterior" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="arrow-btn absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-200 mt-36"
                        aria-label="Siguiente Proyecto"
                    >
                        <Image src="/resources/right-arrow.png"
                            width={20}
                            height={20}
                            alt="Siguiente Proyecto" />
                    </button>

                </div>
                <div className="relative flex w-full md:w-1/2 justify-center">
                    <PinContainer
                        title={project.title}
                        href={project.link}
                        backgroundImage={project.imgback || "/default-background.jpg"}
                        imgLogo={project.imglogo || "/default-logo.png"}
                    />
                </div>
            </div>
        ),
        [handleNext, handlePrev]
    );

    if (!isMounted) return null;

    return (
        <div className="z-40 mx-auto max-w-screen-lg px-4 sm:px-6 md:px-8 mt-24 bg-black">
            <div className="flex justify-center space-x-8 mb-6">
                {["work", "personal", "challenge"].map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category as "work" | "personal" | "challenge");
                            setCurrentIndex(0);
                        }}
                        className={`text-lg sm:text-base md:text-xl ${selectedCategory === category ? "text-purple-500" : "text-gray-500"
                            }`}
                    >
                        {category === "work" ? "💼 Proyectos de Trabajo" : category === "personal" ? "👨‍💻 Proyectos Personales" : "📜 Desafíos"}
                    </button>
                ))}
            </div>
            <div className="flex flex-col items-center mt-12">{data.length > 0 && renderProject(data[currentIndex])}</div>
        </div>
    );
};

export default Projects;
