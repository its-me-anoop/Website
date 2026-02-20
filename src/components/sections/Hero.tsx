"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const projectImages = [
    {
        src: "/projects/thirsty-ai/dashboard-new.png",
        alt: "Thirsty AI Dashboard",
        width: 320,
        height: 240,
        className: "rounded-2xl shadow-xl",
        wrapperClassName: "z-10",
    },
    {
        src: "/projects/thirsty-ai/insights-new.png",
        alt: "Thirsty AI Insights",
        width: 280,
        height: 220,
        className: "rounded-2xl shadow-lg rotate-2",
        wrapperClassName: "-mt-12 ml-8 z-20",
    },
    {
        src: "/projects/thirsty-ai/onboarding.png",
        alt: "Thirsty AI Onboarding",
        width: 200,
        height: 160,
        className: "rounded-2xl shadow-lg -rotate-2",
        wrapperClassName: "-mt-8 -ml-4 z-0",
    },
];

export function Hero() {
    return (
        <section className="relative min-h-[100svh] flex items-center px-5 md:px-10 overflow-hidden">
            {/* Background organic blobs */}
            <div
                className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-sage-muted opacity-40 blur-3xl pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent/10 opacity-40 blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-28 md:py-32">
                {/* Left column: text content */}
                <div className="flex flex-col">
                    {/* Pill badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-sage-muted px-4 py-2 text-sage text-xs font-medium tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                            Digital Studio
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        className="font-display font-medium text-[clamp(2.25rem,5.5vw,3.5rem)] tracking-tight leading-[1.12] text-foreground mb-6"
                    >
                        We bring ideas
                        <br />
                        to life, beautifully.
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        className="font-sans text-lg text-foreground-secondary leading-relaxed max-w-md mb-10"
                    >
                        Flutterly is a UK-based studio crafting web & mobile
                        experiences with care, creativity, and craft.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease }}
                        className="flex flex-col sm:flex-row items-start gap-4"
                    >
                        <Link
                            href="#products"
                            className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-white px-8 py-4 text-sm font-medium transition-colors duration-200"
                        >
                            See Our Work
                        </Link>
                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="inline-flex items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-sm font-medium transition-all duration-200"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>

                {/* Right column: scattered project images (desktop only) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease }}
                    className="hidden lg:flex flex-wrap items-center justify-center relative"
                >
                    {projectImages.map((img, index) => (
                        <motion.div
                            key={img.src}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: 0.5 + index * 0.15,
                                ease,
                            }}
                            className={img.wrapperClassName}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={img.width}
                                height={img.height}
                                className={img.className}
                                priority={index === 0}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-[1.5px] h-14 bg-gradient-to-b from-foreground-tertiary/50 to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
}
