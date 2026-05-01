'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer: React.FC = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Separator draws from center outward
        gsap.fromTo(
            lineRef.current,
            { scaleX: 0, opacity: 0 },
            {
                scaleX: 1,
                opacity: 1,
                duration: 0.9,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: lineRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Text items fade up with stagger
        const items = contentRef.current?.querySelectorAll('.footer-item');
        if (items?.length) {
            gsap.fromTo(
                items,
                { y: 12, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 95%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }
    }, []);

    return (
        <footer className="w-full py-10 pb-24">
            {/* Warning tape separator */}
            <div
                ref={lineRef}
                className="w-full max-w-[880px] mx-auto h-[6px] rounded-sm origin-center opacity-30"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #6d448a, #6d448a 10px, #0d0b2e 10px, #0d0b2e 20px)',
                }}
            />

            <div ref={contentRef} className="flex flex-col items-center gap-2 mt-6">
                <p className="footer-item font-mono text-[11px] text-gray-700 tracking-[0.3em] uppercase">
                    powered by cats
                </p>
                <p className="footer-item font-mono text-[10px] text-gray-700">
                    © {new Date().getFullYear()} · Ángel &ldquo;<span className="text-gray-600">vngerus</span>&rdquo; Smith
                </p>
            </div>
        </footer>
    );
};

export default Footer;
