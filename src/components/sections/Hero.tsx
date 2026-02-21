"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const LiquidEffectAnimation = dynamic(
    () =>
        import("@/components/ui/LiquidEffectAnimation").then(
            (mod) => mod.LiquidEffectAnimation
        ),
    { ssr: false }
);

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Hero() {
    return (
        <section className="relative min-h-0 flex items-center px-5 md:px-10 overflow-hidden">
            {/* Background organic blobs with liquid animation */}
            <div
                className="absolute top-[10%] -left-[10%] w-[350px] h-[350px] rounded-full bg-sage-muted opacity-40 blur-3xl pointer-events-none animate-liquid-float"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-[5%] right-[5%] w-[280px] h-[280px] rounded-full bg-accent/10 opacity-40 blur-3xl pointer-events-none animate-liquid-float-reverse"
                aria-hidden="true"
            />

            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center pt-28 pb-16 md:pt-32 md:pb-20">
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

                {/* Right column: Liquid effect animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease }}
                    className="relative"
                >
                    {/* Desktop: large square */}
                    <div className="hidden lg:block relative w-full aspect-square max-w-[500px] ml-auto rounded-[40px] overflow-hidden shadow-2xl shadow-accent/10">
                        <LiquidEffectAnimation
                            text={["Thirsty.ai"]}
                            subText="Intelligent Hydration"
                            tagline="Built with care"
                            backgroundColor="#F5EFE6"
                            textColor="#3D3830"
                            className="rounded-[40px]"
                        />
                    </div>
                    {/* Mobile: shorter banner */}
                    <div className="lg:hidden relative w-full h-[240px] rounded-3xl overflow-hidden shadow-xl shadow-accent/10">
                        <LiquidEffectAnimation
                            text={["Thirsty.ai"]}
                            subText="Intelligent Hydration"
                            backgroundColor="#F5EFE6"
                            textColor="#3D3830"
                            className="rounded-3xl"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
