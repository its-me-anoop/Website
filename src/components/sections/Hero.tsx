"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Hero() {
    return (
        <section className="relative min-h-0 flex items-center px-5 md:px-10 overflow-hidden">
            {/* Decorative gradient mesh — lightweight CSS only */}
            <div
                className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-30"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle at 60% 40%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(20,184,166,0.15) 0%, transparent 50%)",
                }}
            />
            <div
                className="absolute bottom-0 left-[20%] w-[400px] h-[400px] pointer-events-none opacity-20"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-28 pb-16 md:pt-36 md:pb-24">
                {/* Left column: text content */}
                <div className="flex flex-col">
                    {/* Pill badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-accent-muted px-4 py-2 text-accent text-xs font-medium tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Digital Studio
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        className="font-display font-medium text-[clamp(2.25rem,5.5vw,3.75rem)] tracking-tight leading-[1.1] text-foreground mb-6"
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

                {/* Right column: Decorative visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease }}
                    className="hidden lg:flex relative items-center justify-center"
                >
                    <div className="relative w-full max-w-[460px] aspect-square ml-auto">
                        {/* Gradient orb composition */}
                        <div
                            className="absolute inset-0 rounded-[40px] overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(20,184,166,0.06) 50%, rgba(99,102,241,0.04) 100%)",
                            }}
                        >
                            {/* Grid pattern overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px",
                                }}
                            />

                            {/* Floating accent circles */}
                            <div className="absolute top-[15%] left-[20%] w-24 h-24 rounded-full bg-accent/10 animate-subtle-float" />
                            <div
                                className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-teal/10 animate-subtle-float"
                                style={{ animationDelay: "-10s" }}
                            />
                            <div
                                className="absolute top-[55%] left-[55%] w-16 h-16 rounded-full bg-accent/[0.06] animate-subtle-float"
                                style={{ animationDelay: "-5s" }}
                            />

                            {/* Center content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="space-y-3 text-center">
                                    <div className="flex items-center justify-center gap-2 text-accent/60">
                                        <span className="w-2 h-2 rounded-full bg-accent/40" />
                                        <span className="w-2 h-2 rounded-full bg-teal/40" />
                                        <span className="w-2 h-2 rounded-full bg-accent/20" />
                                    </div>
                                    <p className="font-display text-2xl font-medium text-foreground/30 tracking-tight">
                                        {"{ }"}
                                    </p>
                                    <p className="text-xs text-foreground-tertiary/60 font-medium tracking-widest uppercase">
                                        Code &middot; Design &middot; Ship
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
