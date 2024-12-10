import React from 'react';

interface ExpControlsProps {
    viewMode: 'standard' | 'expanded';
    setViewMode: (mode: 'standard' | 'expanded') => void;
}

const ExpControls: React.FC<ExpControlsProps> = ({ viewMode, setViewMode }) => (
    <div className="flex justify-center space-x-4 mb-8">
        <button
            onClick={() => setViewMode('standard')}
            className={`py-2 px-4 font-medium rounded ${viewMode === 'standard'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
        >
            Vista Estándar
        </button>
        <button
            onClick={() => setViewMode('expanded')}
            className={`py-2 px-4 font-medium rounded ${viewMode === 'expanded'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
        >
            Vista Expandida
        </button>
    </div>
);

export default ExpControls;
