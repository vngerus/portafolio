'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
    const [developerType, setDeveloperType] = useState<string>('Full Stack');
    const [currentName, setCurrentName] = useState<string>('• エンジェル スミス •');

    const japaneseName = '• エンジェル スミス ';
    const englishName = 'Angel Smith';

    useEffect(() => {
        let currentIndex = 0;

        const changeToEnglish = () => {
            const intervalId = setInterval(() => {
                if (currentIndex < englishName.length) {
                    setCurrentName(
                        englishName.slice(0, currentIndex + 1) +
                        japaneseName.slice(currentIndex + 1)
                    );
                    currentIndex += 1;
                } else {
                    clearInterval(intervalId);
                }
            }, 100);
        };

        const delayBeforeChange = setTimeout(() => {
            changeToEnglish();
        }, 1500);

        return () => {
            clearTimeout(delayBeforeChange);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDeveloperType((prevType) =>
                prevType === 'Full Stack' ? 'Front-end' : 'Full Stack'
            );
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const letterVariant = {
        hidden: { opacity: 0, y: -20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05 },
        }),
    };

    const textVariant = {
        hidden: { opacity: 0, x: -30 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05 },
        }),
    };

    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative bg-[#0A0825]">
            <div className="w-full flex flex-col items-center text-center z-10 mt-[-150px]">
                <div className="text-lg md:text-2xl lg:text-xl uppercase text-gray-400 flex space-x-2">
                    {currentName.split('').map((letter, index) => (
                        <motion.span
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={letterVariant}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </div>

                <div className="text-4xl md:text-6xl lg:text-8xl font-medium text-white leading-tight relative inline-block mt-4">
                    <div className="relative inline-block overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={developerType}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.8 }}
                                className="inline-block relative z-20"
                            >
                                <span className="text-purple-500">+</span>{' '}
                                {developerType.split('').map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={textVariant}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-6 mb-16">
                    <div className="h-4 w-4 bg-purple-500 rounded-full mr-4"></div>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium text-white leading-tight">
                        Developer
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;
