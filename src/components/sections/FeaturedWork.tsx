"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { useRef } from "react";
import dynamic from "next/dynamic";

const LiquidEffectAnimation = dynamic(
    () =>
        import("@/components/ui/LiquidEffectAnimation").then(
            (mod) => mod.LiquidEffectAnimation
        ),
    { ssr: false }
);

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function FeaturedWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section
            id="products"
            ref={containerRef}
            className="relative bg-background-secondary py-24 md:py-32 px-6 md:px-14 overflow-hidden"
        >
            {/* Liquid effect background */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <LiquidEffectAnimation
                    text={["Hydrate"]}
                    subText=""
                    tagline=""
                    backgroundColor="#FDFBF7"
                    textColor="#B8704D"
                />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease }}
                        className="space-y-7 z-10"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] text-accent text-xs font-medium tracking-wide">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                            </span>
                            Featured Project
                        </div>

                        {/* Title */}
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-foreground leading-[1.1]">
                                Thirsty.ai
                            </h2>
                            <p className="text-xl font-medium text-accent">
                                Intelligent hydration, privacy-first
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-foreground-secondary leading-relaxed max-w-md">
                            Our flagship iOS app that learns your habits and
                            helps you stay hydrated. Built in-house with
                            SwiftUI, CoreML, and a privacy-first approach — no
                            health data ever leaves the device.
                        </p>

                        {/* CTA */}
                        <div className="pt-2">
                            <Link
                                href="/projects/thirsty-ai"
                                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors min-h-[48px]"
                            >
                                View Case Study
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right — Phone Mockup */}
                    <motion.div
                        style={{ y }}
                        className="relative flex justify-center lg:justify-end will-change-transform"
                    >
                        <div className="relative w-full max-w-[280px]">
                            {/* Liquid radial glow */}
                            <div
                                className="absolute inset-0 scale-150 pointer-events-none blur-[80px] opacity-40 animate-liquid-glow"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(184,112,77,0.35) 0%, rgba(139,158,126,0.2) 60%, transparent 100%)",
                                }}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease }}
                            >
                                <Iphone17ProFrame className="shadow-2xl shadow-black/30">
                                    <Image
                                        src="/projects/thirsty-ai/dashboard-new.png"
                                        alt="Thirsty.ai Dashboard"
                                        fill
                                        className="object-cover"
                                    />
                                </Iphone17ProFrame>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
