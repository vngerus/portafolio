import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Socials: React.FC = () => {
    return (
        <div className="flex flex-col items-center fixed left-0 bottom-0 h-full w-[50px] justify-end">
            <div className="flex flex-col gap-4 mb-3">
                <a href="https://github.com/vngerus" target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 text-white hover:text-purple-500" aria-label="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/angelsmithl/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6 text-white hover:text-purple-500" aria-label="Linkedin" />
                </a>
            </div>
            <div className="w-[2px] h-32 bg-white mt-6"></div>
        </div>
    );
};

export default Socials;
