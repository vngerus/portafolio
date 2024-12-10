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
                <div className="flex flex-col md:flex-row items-start justify-center">

                    <div className="flex flex-col border-l-2 border-gray-600 pl-4 w-full md:w-1/4">
                        {experiences.map((experience, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCompany(index)}
                                className={`text-left py-3 px-4 font-medium w-full ${selectedCompany === index
                                    ? 'text-primary border-l-4 border-primary bg-gray-800'
                                    : 'text-gray-400 hover:text-primary'
                                    }`}
                            >
                                {experience.company}
                            </button>
                        ))}
                    </div>

                    <div className="w-full md:w-3/4 mt-6 md:mt-0 md:ml-8">
                        <h3 className="text-xl md:text-2xl font-semibold text-white">
                            {experiences[selectedCompany].role} @{' '}
                            <span className="text-primary">{experiences[selectedCompany].company}</span>
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">{experiences[selectedCompany].duration}</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {experiences[selectedCompany].description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (

                <div className="space-y-8">
                    {experiences.map((experience, index) => (
                        <div key={index} className="border-b border-gray-700 pb-6">
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
