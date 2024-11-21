"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { Exp } from '@/components';
import { certifications, education, workExperience } from '@/constant';

type Category = 'work' | 'education' | 'certifications';

const Experience: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('work');
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number>(0);

    const categories = {
        work: workExperience,
        education: education,
        certifications: certifications,
    };

    const data = categories[selectedCategory] || [];

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [selectedCategory]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 10%', 'end 50%'],
    });

    const heightTransform: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform: MotionValue<number> = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="z-0 mx-auto max-w-screen-lg px-4 xs:px-4 sm:px-6 md:px-8" ref={containerRef}>
            <div className="flex justify-center space-x-8 mb-6">
                {Object.keys(categories).map((key) => (
                    <button
                        key={key}
                        onClick={() => setSelectedCategory(key as Category)}
                        className={`text-lg ${selectedCategory === key ? 'text-purple-500' : 'text-gray-500'
                            }`}>
                        {key === 'education' && (
                            <span role="img" aria-label="Education">
                                🎓
                            </span>
                        )}
                        {key === 'work' && (
                            <span role="img" aria-label="Work">
                                💼
                            </span>
                        )}
                        {key === 'certifications' && (
                            <span role="img" aria-label="Certifications">
                                📜
                            </span>
                        )}
                        {` ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                    </button>
                ))}
            </div>

            <Exp
                data={data}
                heightTransform={heightTransform}
                opacityTransform={opacityTransform}
                height={height}
            />
        </div>
    );
};

export default Experience;
