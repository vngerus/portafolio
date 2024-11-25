"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Exp } from "@/components";
import { certifications, education, workExperience } from "@/constant";
import { HiBriefcase, HiAcademicCap, HiDocumentText } from "react-icons/hi";

type Category = "work" | "education" | "certifications";

const Experience: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>("work");
    const containerRef = useRef<HTMLDivElement | null>(null);

    const categories = {
        work: workExperience,
        education: education,
        certifications: certifications,
    };

    const data = categories[selectedCategory] || [];
    const defaultHeightTransform = useMotionValue(0);
    const defaultOpacityTransform = useMotionValue(1);

    return (
        <div className="z-0 mx-auto max-w-screen-lg px-4 sm:px-6 md:px-8" ref={containerRef}>
            <div className="flex justify-start items-center mb-6">
                <div className="relative flex bg-purple-900 rounded-full p-1 space-x-2">
                    <motion.div
                        layout
                        className="absolute top-0 bottom-0 rounded-full bg-purple-500"
                        style={{
                            width: "33.33%",
                            left: selectedCategory === "work" ? "0%" : selectedCategory === "education" ? "33.33%" : "66.66%",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                    />
                    {[
                        { key: "work", label: "Trabajo", icon: <HiBriefcase size={18} /> },
                        { key: "education", label: "Educación", icon: <HiAcademicCap size={18} /> },
                        { key: "certifications", label: "Certificados", icon: <HiDocumentText size={18} /> },
                    ].map(({ key, label, icon }) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key as Category)}
                            className={`flex items-center gap-2 justify-center px-6 py-2 rounded-full text-sm font-medium z-10 ${selectedCategory === key ? "text-white" : "text-gray-300"
                                }`}
                        >
                            {icon} {label}
                        </button>
                    ))}
                </div>
            </div>

            <Exp
                data={data}
                heightTransform={defaultHeightTransform}
                opacityTransform={defaultOpacityTransform}
                height={containerRef.current?.offsetHeight || 0}
            />
        </div>
    );
};

export default Experience;
