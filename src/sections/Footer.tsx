import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0A0825] text-white text-center p-4 border-t border-gray-600 mt-12">
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
                    className="text-purple-500 hover:underline"
                >
                    Next.js
                </Link>.
            </p>
        </footer>
    );
};

export default Footer;
