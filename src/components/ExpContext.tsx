import React from 'react';

interface ExpContextProps {
    experiences: {
        company: string;
        role: string;
        duration: string;
        description: string[];
    }[];
    viewMode: 'standard' | 'expanded';
    selectedCompany: number;
    setSelectedCompany: (index: number) => void;
}

const ExpContext: React.FC<ExpContextProps> = ({
    experiences,
    viewMode,
    selectedCompany,
    setSelectedCompany,
}) => {
    return (
        <div>
            {viewMode === 'standard' ? (
                <div className="flex flex-col md:flex-row items-start justify-center relative">
                    <div role="tablist" aria-label="Job tabs" className="relative flex flex-col border-l-2 border-gray-500 w-full md:w-1/4">
                        <div
                            className="absolute left-0 w-[1px] bg-white transition-transform duration-0 ease-in-out animate-pulse"
                            style={{
                                height: '48px',
                                transform: `translateY(${selectedCompany * 48}px)`,
                            }}
                        ></div>

                        {experiences.map((experience, index) => (
                            <button
                                key={index}
                                id={`tab-${index}`}
                                role="tab"
                                aria-selected={selectedCompany === index}
                                aria-controls={`panel-${index}`}
                                tabIndex={selectedCompany === index ? 0 : -1}
                                onClick={() => setSelectedCompany(index)}
                                className={`relative text-left h-[48px] pl-6 font-medium w-full transition-all duration-0 ${selectedCompany === index
                                    ? 'text-white bg-purple-800 border-l-2 border-white'
                                    : 'text-gray-400 hover:text-white hover:bg-purple-950'
                                    }`}
                            >
                                <span>{experience.company}</span>
                            </button>
                        ))}
                    </div>

                    <div className="w-full md:w-3/4 mt-6 md:mt-0 md:ml-8">
                        {experiences.map((experience, index) => (
                            <div
                                key={index}
                                id={`panel-${index}`}
                                role="tabpanel"
                                aria-labelledby={`tab-${index}`}
                                aria-hidden={selectedCompany !== index}
                                className={`focus:outline-none transition-opacity duration-300 ${selectedCompany === index ? 'opacity-100' : 'opacity-0 hidden'
                                    }`}
                            >
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    <span>{experience.role}</span>
                                    <span className="text-primary"> @ {experience.company}</span>
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    {experience.duration}
                                </p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {experience.description.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (

                <div className="space-y-8">
                    {experiences.map((experience, index) => (
                        <div key={index} className="border-b border-gray-700 pb-6 px-6">
                            <h3 className="text-xl md:text-2xl font-semibold text-white">
                                {experience.role} @{' '}
                                <span className="text-primary">{experience.company}</span>
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">{experience.duration}</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                {experience.description.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default ExpContext;
