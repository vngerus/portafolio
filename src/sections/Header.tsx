'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0825]/80 backdrop-blur-md' : 'bg-[#0A0825]'
                } text-white`}
        >
            <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/logos/gato.avif"
                            width={40}
                            height={40}
                            alt="Vngerus Logo"
                        />
                        <span className="text-xl font-bold tracking-wide uppercase">
                            @Vngerus
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-2 font-semibold">
                        <a
                            href="https://www.linkedin.com/in/angelsmithl/"
                            className="hover:text-[#D28FFF] transition-all duration-300 ease-in-out text-xs uppercase"
                        >
                            LinkedIn
                        </a>
                        <span className="text-gray-400">/</span>
                        <a
                            href="https://github.com/vngerus"
                            className="hover:text-[#D28FFF] transition-all duration-300 ease-in-out text-xs uppercase"
                        >
                            Github
                        </a>
                    </div>
                </div>

                <ul className="hidden md:flex items-center space-x-2 text-xs font-semibold uppercase">
                    {[{ href: '#projects', label: 'Proyectos' },
                    { href: '#aboutme', label: 'Sobre Mi' },
                    { href: '#contact', label: 'Contacto' }].map((item, index) => (
                        <li key={index} className="flex items-center">
                            <a
                                href={item.href}
                                className="hover:text-[#D28FFF] transition-all duration-300 ease-in-out"
                            >
                                {item.label}
                            </a>
                            {index < 2 && (
                                <span className="mx-4 text-gray-400">/</span>
                            )}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={toggleMenu}
                    className="text-2xl md:hidden focus:outline-none"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#0A0825] text-white w-full h-screen fixed top-0 left-0 z-40">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/logos/gato.avif"
                                width={40}
                                height={40}
                                alt="Vngerus Logo"
                            />
                        </div>

                        <button
                            onClick={toggleMenu}
                            className="text-2xl focus:outline-none"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex flex-col items-center space-y-8 mt-8 text-lg">
                        {[{ href: '#projects', label: 'Proyectos' },
                        { href: '#aboutme', label: 'Sobre Mi' },
                        { href: '#contact', label: 'Contacto' }].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="hover:text-[#D28FFF] transition-all duration-300 ease-in-out"
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