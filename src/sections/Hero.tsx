'use client';

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 300);
        return () => clearTimeout(timeout);
    }, []);

    const items = [
        <h1
            key="1"
            className="text-textPrimary font-mono text-base sm:text-lg md:text-xl mb-6">
            Hola, mi nombre es
        </h1>,
        <h2
            key="2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Angel Smith.
        </h2>,
        <h3
            key="3"
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-4">
            Desarrollador Front-End.
        </h3>,
        <p
            key="4"
            className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
            Si bien me especializo en el Front, también me gusta el desarrollo Back-End.
            Actualmente me encuentro realizando un curso intensivo de desarrollo en{' '}
            <a
                href="https://flutter.dev"
                target="_blank"
                rel="noreferrer"
                className="text-titles underline hover:text-accentWhite">
                Flutter
            </a>
            .
        </p>,
    ];

    return (
        <section className="relative flex flex-col items-start justify-center min-h-screen px-8 sm:px-12 md:px-16 lg:px-24 space-y-6 -mt-16">
            {isMounted && (
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.key}>{item}</div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Hero;
