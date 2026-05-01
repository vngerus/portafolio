'use client';
import { useEffect, useRef, useState } from 'react';

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const ALL_CHARS = KATAKANA + '01!@#$%^&*<>?/\\|{}[]';

// ── Load-time scramble (SSR-safe) ───────────────────────────────────────────
// Initializes with `target` so SSR and first client render match.
// After mount, scrambles from random chars → resolves to target.
export function useTextScramble(target: string, duration = 1200, startDelay = 300) {
    const [display, setDisplay] = useState(target);

    useEffect(() => {
        let frame = 0;
        let rafId: number;
        const totalFrames = duration / 16;

        // Immediately show scrambled state (client-only, post-hydration)
        setDisplay(randomString(target.length));

        const tick = () => {
            const progress = frame / totalFrames;
            const revealed = Math.floor(progress * target.length);

            setDisplay(
                target
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < revealed) return char;
                        return ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
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

        const timer = setTimeout(() => {
            rafId = requestAnimationFrame(tick);
        }, startDelay);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafId);
        };
    }, [target, duration, startDelay]);

    return display;
}

// ── Hover scramble ──────────────────────────────────────────────────────────
// On hover: mixes katakana INTO the original chars (~60% replaced randomly).
// On leave: progressively resolves back to the original left-to-right.
// Width is stable because caller must use monospace font + fixed width.
export function useHoverScramble(target: string) {
    const [display, setDisplay] = useState(target);
    const rafRef = useRef<number | null>(null);
    const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const cancel = () => {
        if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        if (loopRef.current !== null) { clearInterval(loopRef.current); loopRef.current = null; }
    };

    const onMouseEnter = () => {
        cancel();
        loopRef.current = setInterval(() => {
            setDisplay(
                target
                    .split('')
                    .map((char) => {
                        // Preserve spaces, dots and digits so the structure stays readable
                        if (char === ' ' || char === '.') return char;
                        // ~65% of letter-chars become katakana, 35% stay original
                        return Math.random() < 0.65
                            ? KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
                            : char;
                    })
                    .join('')
            );
        }, 55);
    };

    const onMouseLeave = () => {
        cancel();
        let frame = 0;
        const total = 20; // frames to resolve
        const tick = () => {
            frame++;
            const revealed = Math.floor((frame / total) * target.length);
            setDisplay(
                target
                    .split('')
                    .map((char, i) => {
                        if (char === ' ' || char === '.') return char;
                        if (i < revealed) return char;
                        return Math.random() < 0.5
                            ? KATAKANA[Math.floor(Math.random() * KATAKANA.length)]
                            : char;
                    })
                    .join('')
            );
            if (frame < total) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setDisplay(target);
            }
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => () => cancel(), []);

    return { display, onMouseEnter, onMouseLeave };
}

function randomString(length: number) {
    return Array.from({ length }, () =>
        ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]
    ).join('');
}
