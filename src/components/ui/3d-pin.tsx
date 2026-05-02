"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface PinContainerProps {
    children?: React.ReactNode;
    title?: string;
    href?: string;
    backgroundImage?: string;
    imgLogo?: string;
    className?: string;
    containerClassName?: string;
}

const PinContainer = forwardRef(({
    children,
    title = "Default Title",
    href = "/",
    backgroundImage,
    imgLogo,
    className,
    containerClassName,
}: PinContainerProps, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    useImperativeHandle(ref, () => ({
        triggerEnter: onMouseEnter,
        triggerLeave: onMouseLeave,
    }));

    return (
        <Link
            href={href}
            aria-label={title}
            className={`relative group/pin z-50 cursor-pointer ${containerClassName}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="relative w-full h-full flex justify-center items-center">
                <div
                    style={{
                        perspective: "1000px",
                        transform: "rotateX(70deg) translateZ(0deg)",
                    }}
                    className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
                >
                    <div
                        style={{
                            transform: `translate(-50%, -50%) rotateX(${isHovered ? "40deg" : "0deg"}) scale(${isHovered ? 0.8 : 1})`,
                            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="absolute left-1/2 sm:w-[20rem] md:w-[24rem] h-60 w-[20rem] sm:h-72 md:h-80 -top-3 p-4 flex justify-center items-center rounded-2xl shadow-lg bg-black border border-textPrimary/20 group-hover/pin:border-textPrimary/50 group-hover/pin:shadow-[0_0_28px_#d28fff30] transition duration-700 overflow-hidden"
                    >
                        {/* ── Hologram overlays ── */}

                        {/* Grid de datos */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10 opacity-[0.07]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(210,143,255,0.8) 1px, transparent 1px),' +
                                    'linear-gradient(90deg, rgba(210,143,255,0.8) 1px, transparent 1px)',
                                backgroundSize: '28px 28px',
                            }}
                        />

                        {/* Tinta morada pulsante — simula campo AT */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#d28fff]/0 via-[#6d448a]/12 to-[#d28fff]/6"
                            animate={{ opacity: [0.5, 1, 0.6, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                        />

                        {/* Scan line continua */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                            <div className="animate-nerv-scan opacity-50" />
                        </div>

                        {/* Flicker ocasional de interferencia */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-20 bg-textPrimary/8"
                            animate={{ opacity: [0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0.2, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 9,
                                times: [0, 0.1, 0.2, 0.35, 0.5, 0.6, 0.62, 0.64, 0.75, 0.77, 0.79],
                                ease: 'steps(1)',
                            }}
                        />

                        {/* Corner brackets + datos */}
                        <div className="absolute inset-0 pointer-events-none z-20 p-2.5">
                            {/* Top-left */}
                            <div className="absolute top-2.5 left-2.5">
                                <div className="w-3 h-3 border-t border-l border-textPrimary/60" />
                                <p className="font-mono text-[6px] text-textPrimary/40 tracking-wider mt-0.5 uppercase">SYS_LINK</p>
                            </div>
                            {/* Top-right */}
                            <div className="absolute top-2.5 right-2.5 text-right">
                                <div className="w-3 h-3 border-t border-r border-textPrimary/60 ml-auto" />
                                <p className="font-mono text-[6px] text-textPrimary/40 tracking-wider mt-0.5 uppercase">ACTIVO</p>
                            </div>
                            {/* Bottom-left */}
                            <div className="absolute bottom-2.5 left-2.5">
                                <p className="font-mono text-[6px] text-textPrimary/30 tracking-wider mb-0.5 uppercase">OP_REC</p>
                                <div className="w-3 h-3 border-b border-l border-textPrimary/60" />
                            </div>
                            {/* Bottom-right */}
                            <div className="absolute bottom-2.5 right-2.5 text-right">
                                <p className="font-mono text-[6px] text-textPrimary/30 tracking-wider mb-0.5 uppercase">NERV</p>
                                <div className="w-3 h-3 border-b border-r border-textPrimary/60 ml-auto" />
                            </div>
                        </div>

                        {/* Contenido hijo */}
                        <div className={`relative z-50 ${className}`}>{children}</div>
                    </div>
                </div>
            </div>
            <PinPerspective imgLogo={imgLogo} isHovered={isHovered} />
        </Link>
    );
});
PinContainer.displayName = "PinContainer";

interface PinPerspectiveProps {
    imgLogo?: string;
    isHovered: boolean;
}

const PinPerspective: React.FC<PinPerspectiveProps> = ({ imgLogo, isHovered }) => {
    return (
        <motion.div
            className={`pointer-events-none w-40 h-auto flex items-center justify-center ${
                isHovered ? "opacity-100" : "opacity-0"
            } z-60 transition duration-500`}
        >
            <div className="w-full h-full -mt-7 flex-none inset-0">
                <div className="absolute top-0 inset-x-0 flex justify-center">
                    {imgLogo && (
                        <Image
                            src={imgLogo}
                            width={100}
                            height={100}
                            alt="Logo"
                            className="relative z-20 w-20 h-20 object-contain rounded-full shadow-md"
                        />
                    )}
                </div>

                <div
                    style={{ perspective: '1000px', transform: 'rotateX(70deg) translateZ(0)' }}
                    className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                        animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
                        transition={{ duration: 6, repeat: Infinity, delay: 0 }}
                        className="absolute left-1/2 top-1/2 h-45 w-45 rounded-[50%] bg-[#6d448a]/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                        animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
                        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                        className="absolute left-1/2 top-1/2 h-45 w-45 rounded-[50%] bg-[#6d448a]/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                        animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
                        transition={{ duration: 6, repeat: Infinity, delay: 4 }}
                        className="absolute left-1/2 top-1/2 h-45 w-45 rounded-[50%] bg-[#6d448a]/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                    />
                </div>

                {/* Aguja del pin — morado */}
                <motion.div className="absolute right-1/2 bottom-1/2 bg-linear-to-b from-transparent to-[#d28fff] translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
                <motion.div className="absolute right-1/2 bottom-1/2 bg-linear-to-b from-transparent to-[#d28fff] translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
                <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-[#d28fff] translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
                <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-white translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
            </div>
        </motion.div>
    );
};

export { PinContainer, PinPerspective };
