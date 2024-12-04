import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0A0825] text-white text-center p-4 mt-12">
            <div className="max-w-[60rem] mx-auto border-t border-gray-600 pt-4">
                <p className="text-sm">
                    Built with{' '}
                    <span
                        className="inline-block animate-bounce"
                        role="img"
                        aria-label="cat"
                    >
                        🐈
                    </span>{' '}
                    by <span className="font-semibold">Ángel Smith</span> using{' '}
                    <Link
                        href="https://nextjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:underline font-semibold"
                    >
                        Next.js
                    </Link>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
