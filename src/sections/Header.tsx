'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black text-white fixed w-full top-0 z-50">
            <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-screen-xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/logos/gato.avif"
                        width={40}
                        height={40}
                        alt="Vngerus Logo"
                    />
                    <span className="text-xl font-bold tracking-wide">Vngerus</span>
                </div>

                <button
                    onClick={toggleMenu}
                    className="text-2xl md:hidden focus:outline-none"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className="hidden md:flex items-center space-x-6">
                    <a
                        href="https://github.com"
                        className="hover:text-purple-500 transition-all duration-300 ease-in-out text-sm uppercase"
                    >
                        GitHub
                    </a>
                    <span className="text-gray-400">/</span>
                    <a
                        href="https://reddit.com"
                        className="hover:text-purple-500 transition-all duration-300 ease-in-out text-sm uppercase"
                    >
                        Reddit
                    </a>
                </div>

                <ul className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase">
                    {[
                        { href: '#home', label: 'Home' },
                        { href: '#projects', label: 'Projects' },
                        { href: '#articles', label: 'Articles' },
                        { href: '#contact', label: 'Contact' },
                    ].map((item, index) => (
                        <li key={index} className="flex items-center">
                            <a
                                href={item.href}
                                className="hover:text-purple-500 transition-all duration-300 ease-in-out"
                            >
                                {item.label}
                            </a>
                            {index < 3 && (
                                <span className="mx-2 text-gray-400">/</span>
                            )}
                        </li>
                    ))}
                    <li>
                        <button className="hover:text-purple-500 transition-all duration-300 ease-in-out">
                            <FaMoon />
                        </button>
                    </li>
                </ul>
            </div>

            {isOpen && (
                <div className="md:hidden bg-black text-white w-full h-screen fixed top-0 left-0 z-40">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/logos/gato.avif"
                                width={40}
                                height={40}
                                alt="RUTKULI Logo"
                            />
                            <span className="text-xl font-bold tracking-wide">Vngerus</span>
                        </div>

                        <button
                            onClick={toggleMenu}
                            className="text-2xl focus:outline-none"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex flex-col items-center space-y-8 mt-8 text-lg">
                        {[
                            { href: '#home', label: 'Home' },
                            { href: '#projects', label: 'Projects' },
                            { href: '#articles', label: 'Articles' },
                            { href: '#contact', label: 'Contact' },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="hover:text-purple-500 transition-all duration-300 ease-in-out"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
