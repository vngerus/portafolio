'use client';
import { useEffect, useState } from 'react';

const CHARS = '01アイウエカキサシスセタチツテナニヌネ!@#$%^&*<>?/\\|';

export function useTextScramble(target: string, duration = 1200, startDelay = 300) {
    const [display, setDisplay] = useState(() => randomString(target.length));

    useEffect(() => {
        let frame = 0;
        let rafId: number;
        const totalFrames = duration / 16;

        const start = () => {
            const tick = () => {
                const progress = frame / totalFrames;
                const revealed = Math.floor(progress * target.length);

                setDisplay(
                    target
                        .split('')
                        .map((char, i) => {
                            if (char === ' ') return ' ';
                            if (i < revealed) return char;
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join('')
                );

                frame++;
                if (frame <= totalFrames) {
                    rafId = requestAnimationFrame(tick);
                } else {
                    setDisplay(target);
                }
            };
            rafId = requestAnimationFrame(tick);
        };

        const timer = setTimeout(start, startDelay);
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [target, duration, startDelay]);

    return display;
}

function randomString(length: number) {
    return Array.from({ length }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join('');
}
