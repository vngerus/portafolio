'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface RevealOptions {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    start?: string;
}

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions = {}) {
    const ref = useRef<T>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;

        const {
            y = 50,
            x = 0,
            duration = 0.8,
            delay = 0,
            ease = 'power3.out',
            start = 'top 85%',
        } = options;

        const ctx = gsap.context(() => {
            gsap.from(el, {
                y,
                x,
                opacity: 0,
                duration,
                delay,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: 'play none none none',
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return ref;
}

export function useGsapStagger<T extends HTMLElement>(selector: string, options: RevealOptions = {}) {
    const containerRef = useRef<T>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const container = containerRef.current;
        if (!container) return;

        const {
            y = 40,
            x = 0,
            duration = 0.7,
            delay = 0,
            stagger = 0.15,
            ease = 'power3.out',
            start = 'top 85%',
        } = options;

        const ctx = gsap.context(() => {
            gsap.from(container.querySelectorAll(selector), {
                y,
                x,
                opacity: 0,
                duration,
                delay,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: container,
                    start,
                    toggleActions: 'play none none none',
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return containerRef;
}
