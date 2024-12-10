import React from 'react';

const Signature: React.FC = () => {
    return (
        <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-[50px] justify-end">
            <div
                className="text-sm font-bold text-white mb-1"
                style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                }}
            >
                V N G
            </div>
            <div className="w-[2px] h-32 bg-white mt-6"></div>
        </div>
    );
};

export default Signature;
