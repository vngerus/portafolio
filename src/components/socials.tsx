'use client';

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Socials: React.FC = () => {
    return (
        <div className="flex flex-col items-center fixed left-0 bottom-0 h-full w-[50px] justify-end z-50">
            <div className="flex flex-col items-center gap-4 mb-2">
                <a
                    href="https://github.com/vngerus"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group relative flex flex-col items-center"
                >
                    <Github className="w-5 h-5 text-gray-500 group-hover:text-textPrimary transition-colors duration-200" />
                    <span className="font-mono text-[6px] text-gray-700 group-hover:text-textPrimary/50 tracking-widest uppercase mt-0.5 transition-colors">
                        GH
                    </span>
                </a>

                <a
                    href="https://www.linkedin.com/in/angelsmithl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group relative flex flex-col items-center"
                >
                    <Linkedin className="w-5 h-5 text-gray-500 group-hover:text-textPrimary transition-colors duration-200" />
                    <span className="font-mono text-[6px] text-gray-700 group-hover:text-textPrimary/50 tracking-widest uppercase mt-0.5 transition-colors">
                        IN
                    </span>
                </a>

                {/* Energy bar placeholder — mismo ancho que Signature */}
                <div className="w-full px-1 mt-1">
                    <motion.div
                        className="h-1.5 bg-gray-800 rounded-full overflow-hidden"
                        title="Canal social"
                    >
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-textPrimary/40 to-textPrimary/70"
                            animate={{ width: ['60%', '80%', '60%'] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Línea vertical — idéntica a Signature */}
            <div className="w-px h-20 bg-white/20 mt-3" />
        </div>
    );
};

export default Socials;
