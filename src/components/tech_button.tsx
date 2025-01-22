import React from "react";
import { tags } from "@/data";
import Image from "next/image";

interface TechTagsProps {
    techStack: number[];
}

const TechTags: React.FC<TechTagsProps> = ({ techStack }) => {
    return (
        <div className="flex flex-wrap gap-4 mt-4">
            {Array.from(new Set(techStack)).map((tagId) => {
                const tech = tags.find((t) => t.id === tagId);
                return tech ? (
                    <div
                        key={tech.id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md shadow-md transition-all border border-textSecondary"
                    >
                        <Image
                            src={tech.icon}
                            alt={`${tech.name} icon`}
                            width={20}
                            height={20}
                            className="w-5 h-6"
                        />
                        <span className="text-[9px] font-medium text-gray-300">{tech.name}</span>
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default TechTags;
