import React from "react";
import { tags } from "@/data";
import Image from "next/image";

interface TechTagsProps {
    techStack: number[];
}

const TechTags: React.FC<TechTagsProps> = ({ techStack }) => {
    return (
        <div className="flex flex-wrap gap-1.5 mt-4">
            {Array.from(new Set(techStack)).map((tagId) => {
                const tech = tags.find((t) => t.id === tagId);
                return tech ? (
                    <div
                        key={tech.id}
                        className="inline-flex items-center gap-1.5 px-2 py-1 border border-textPrimary/25 bg-textPrimary/5"
                        style={{ clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}
                    >
                        <Image
                            src={tech.icon}
                            alt={`${tech.name} icon`}
                            width={14}
                            height={14}
                            className="w-3.5 h-3.5 object-contain"
                        />
                        <span className="font-mono text-[8px] text-textPrimary/60 tracking-[0.15em] uppercase">
                            {tech.name}
                        </span>
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default TechTags;
