import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-background-secondary text-light py-6 group hover:text-textPrimary transition-colors duration-300">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full max-w-[880px] h-[1px] bg-gray-700  transition-colors duration-300"></div>
                <p className="text-xs text-gray-400 text-center font-mono group-hover:text-textPrimary">
                    Desarrollado por{' '}
                    <a
                        href="https://github.com/tu-usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group-hover:text-textPrimary transition-colors duration-300"
                    >
                        Angel &quot;<span className="text-gray-600 group-hover:text-buttonSelected">vngerus</span>&quot; Smith
                    </a>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
