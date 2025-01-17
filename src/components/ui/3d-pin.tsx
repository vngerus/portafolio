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
                            backgroundImage: backgroundImage
                                ? `url(${backgroundImage})`
                                : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="absolute left-1/2 sm:w-[20rem] md:w-[24rem] h-[15rem] w-[20rem] sm:h-[18rem] md:h-[20rem] -top-3 p-4 flex justify-center items-center rounded-2xl shadow-lg bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
                    >
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

const PinPerspective: React.FC<PinPerspectiveProps> = ({
    imgLogo,
    isHovered,
}) => {
    return (
        <motion.div
            className={`pointer-events-none w-[10rem] h-[auto] flex items-center justify-center ${isHovered ? "opacity-100" : "opacity-0"
                } z-[60] transition duration-500`}
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
                    style={{
                        perspective: '1000px',
                        transform: 'rotateX(70deg) translateZ(0)',
                    }}
                    className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
                    <>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '-50%',
                                y: '-50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0.5, 0],
                                scale: 1,
                                z: 0,
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: 0,
                            }}
                            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '-50%',
                                y: '-50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0.5, 0],
                                scale: 1,
                                z: 0,
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: 2,
                            }}
                            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '-50%',
                                y: '-50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0.5, 0],
                                scale: 1,
                                z: 0,
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: 4,
                            }}
                            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"></motion.div>
                    </>
                </div>

                <>
                    <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
                    <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
                    <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
                    <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
                </>
            </div>
        </motion.div >
    );
};

export { PinContainer, PinPerspective };