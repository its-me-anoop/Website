"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function FeaturedWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease }}
                        className="space-y-6 z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] text-accent text-xs font-medium tracking-wide uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                            </span>
                            Featured Project
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-[-0.03em] text-foreground leading-[1.1]">
                                Thirsty.ai
                            </h2>
                            <p className="text-lg md:text-xl text-foreground-secondary font-light">
                                Intelligent hydration tracking powered by on-device AI.
                            </p>
                        </div>

                        <p className="text-foreground-secondary leading-relaxed max-w-md">
                            A delightful iOS experience that learns your habits and helps you stay hydrated. Built with SwiftUI, CoreML, and a privacy-first approach.
                        </p>

                        <div className="pt-2">
                            <Link
                                href="/projects/thirsty-ai"
                                className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-xl text-[15px] font-medium hover:bg-white transition-colors min-h-[48px]"
                            >
                                View Case Study
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Phone visual */}
                    <motion.div
                        style={{ y }}
                        className="relative flex justify-center lg:justify-end will-change-transform"
                    >
                        <div className="relative w-full max-w-[280px]">
                            <div className="absolute inset-0 bg-accent/[0.12] blur-[60px] rounded-full scale-125 pointer-events-none" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease }}
                            >
                                <Iphone17ProFrame className="shadow-2xl shadow-black/40">
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
