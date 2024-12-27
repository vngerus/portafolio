'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { experiences } from '@/data';
import { ExpContex } from '@/components';

const Experiences: React.FC = () => {
    const [viewMode, setViewMode] = useState<'standard' | 'expanded'>('standard');
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            if (isMobileView) setViewMode('expanded');
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const options = [
        { key: 'standard', label: 'Contraer', icon: <HiChevronUp size={16} /> },
        { key: 'expanded', label: 'Expandir', icon: <HiChevronDown size={16} /> },
    ];

    return (
        <div className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12">
            <div className="flex items-center w-full mb-8">
                <span className="text-primary font-mono text-lg mr-4">01.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Donde he trabajado</h2>
                <div className="flex-1 h-[1px] bg-gray-700 ml-4"></div>
            </div>

            {!isMobile && (
                <div className="w-full mb-8 flex justify-start">
                    <div className="relative flex bg-purple-900 rounded-full w-[300px] h-10 ml-10">
                        <motion.div
                            layout
                            className="absolute top-0 bottom-0 bg-purple-500 rounded-full"
                            style={{
                                width: '50%',
                                left: viewMode === 'standard' ? '0%' : '50%',
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        ></motion.div>

                        {options.map(({ key, label, icon }) => (
                            <button
                                key={key}
                                onClick={() => setViewMode(key as 'standard' | 'expanded')}
                                className={`relative z-10 flex items-center justify-center w-1/2 text-sm font-medium transition ${viewMode === key ? 'text-white' : 'text-gray-300'
                                    }`}
                            >
                                {icon} <span className="ml-2">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div
                className={`w-full transition-all duration-300 ease-in-out ${viewMode === 'standard' ? 'ml-24 h-auto' : 'ml-10 h-full'
                    }`}
            >
                <ExpContex
                    experiences={experiences}
                    viewMode={viewMode}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                />
            </div>

        </div>
    );
};

export default Experiences;
