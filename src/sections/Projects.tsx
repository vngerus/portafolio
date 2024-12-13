'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PinContainer } from "@/components/ui/3d-pin";
import { workProjects, personalProjects, tags } from "@/data";
import { HiBriefcase, HiUserCircle, HiEye } from "react-icons/hi";

interface Project {
    title: string;
    description: string;
    techStack: number[];
    link: string;
    imgback: string;
    imglogo: string;
}

const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<"work" | "personal" | "all">("work");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getData = (): Project[] => {
        if (selectedCategory === "all") {
            return [...workProjects, ...personalProjects];
        }
        if (selectedCategory === "work") return workProjects;
        return personalProjects;
    };

    const data = getData();

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const renderProject = (project: Project) => (
        <div key={project.title} className="relative flex flex-col md:flex-row gap-6 w-full">
            <div className="relative flex flex-col w-full h-[350px] mt-[15px] md:w-1/2 p-6 rounded-2xl shadow-md border border-gray-500 transition duration-700 overflow-hidden">
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
            </div>
            <div className="relative flex w-full md:w-1/2 justify-center">
                <PinContainer
                    title={project.title}
                    href={project.link}
                    backgroundImage={project.imgback}
                    imgLogo={project.imglogo}
                />
            </div>
        </div>
    );

    if (!isMounted) return null;

    return (
        <div className="z-40 mx-auto max-w-screen-lg px-4 sm:px-6 md:px-8 mt-24">
            <div className="flex justify-start items-center mb-6">
                <div className="relative flex bg-purple-900 rounded-full w-[300px] h-10">
                    <motion.div
                        layout
                        className="absolute top-0 bottom-0 bg-purple-500 rounded-full"
                        style={{
                            width: `calc(100% / 3)`,
                            left: `calc(${["work", "personal", "all"].indexOf(selectedCategory)} * 100% / 3)`,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    ></motion.div>

                    {[
                        { key: "work", label: "Trabajo", icon: <HiBriefcase size={16} /> },
                        { key: "personal", label: "Personal", icon: <HiUserCircle size={16} /> },
                        { key: "all", label: "Ver Todos", icon: <HiEye size={16} /> },
                    ].map(({ key, label, icon }) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key as "work" | "personal" | "all")}
                            className={`relative z-10 flex items-center justify-center w-1/3 text-sm font-medium transition ${selectedCategory === key ? "text-white" : "text-gray-300"
                                }`}
                        >
                            {icon}
                            <span className="ml-2">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {selectedCategory === "all" ? (
                <div className="grid grid-cols-1 gap-8 mt-12">
                    {data.map((project) => renderProject(project))}
                </div>
            ) : (
                <div className="flex flex-col items-center mt-12">
                    {data.length > 0 && renderProject(data[currentIndex])}
                    <div className="flex mt-4 space-x-4">
                        <button onClick={handlePrev} className="text-gray-500 hover:text-gray-300">
                            Anterior
                        </button>
                        <button onClick={handleNext} className="text-gray-500 hover:text-gray-300">
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
