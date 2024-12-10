'use client';

import React, { useEffect, useState } from 'react';
import { experiences } from '@/data';
import { ExpContex, ExpControls } from '@/components';

const Experiences: React.FC = () => {
    const [viewMode, setViewMode] = useState<'standard' | 'expanded'>('standard');
    const [selectedCompany, setSelectedCompany] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setViewMode('expanded');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12">

            <div className="flex items-center w-full mb-8">
                <span className="text-primary font-mono text-lg mr-4">02.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">
                    Where I’ve Worked
                </h2>
                <div className="flex-1 h-[1px] bg-gray-700 ml-4"></div>
            </div>

            {window.innerWidth >= 768 && (
                <ExpControls viewMode={viewMode} setViewMode={setViewMode} />
            )}

            <ExpContex
                experiences={experiences}
                viewMode={viewMode}
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
            />
        </div>
    );
};

export default Experiences;
