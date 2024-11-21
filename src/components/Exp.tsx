import React from 'react';
import { Timeline } from './ui/timeline';
import { MotionValue } from 'framer-motion';

interface ExpData {
    title: string;
    company?: string;
    institution?: string;
    date: string;
    description: string;
    details?: string[];
    skills?: string[];
}

interface ExpProps {
    data: ExpData[];
    heightTransform: MotionValue<number>;
    opacityTransform: MotionValue<number>;
    height: number;
}

const Exp: React.FC<ExpProps> = ({ data }) => {
    return (
        <div className="relative max-w-7xl mx-auto pb-8">
            {data && data.length > 0 ? (
                <Timeline
                    data={data.map((item) => ({
                        title: item.title,
                        content: (
                            <div className="relative pl-6 md:pl-12 w-full max-w-[700px] mx-auto group rounded-lg p-6 transition-shadow duration-300 hover:bg-[#141810] hover:shadow-lg">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 group-hover:text-purple-500 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-400 mb-2">
                                    {item.company || item.institution} | {item.date}
                                </p>
                                <p className="text-sm md:text-base lg:text-lg text-gray-300 mt-2 mb-3 leading-relaxed">
                                    {item.description}
                                </p>

                                {item.details && (
                                    <ul className="list-disc list-inside text-sm md:text-base text-gray-300 mb-3">
                                        {item.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                )}
                                {item.skills && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {item.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-800 text-white text-xs md:text-sm lg:text-base rounded-full border border-gray-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ),
                    }))}
                />
            ) : (
                <p className="text-center text-gray-700">No hay datos disponibles.</p>
            )}
        </div>
    );
};

export default Exp;
