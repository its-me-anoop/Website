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
        <section id="products" ref={containerRef} className="relative py-24 md:py-32 px-6 md:px-14 overflow-hidden">
            <div className="max-w-[1340px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease }}
                        className="space-y-7 z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-accent/30 bg-accent-muted text-accent text-[11px] font-medium tracking-[0.1em] uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                            </span>
                            Our Product
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-[56px] font-display font-semibold tracking-[-0.02em] text-foreground leading-[1.05]">
                                Thirsty.ai
                            </h2>
                            <p className="text-lg md:text-xl text-foreground-secondary font-light leading-relaxed">
                                Intelligent hydration tracking powered by on-device AI.
                            </p>
                        </div>

                        <p className="text-foreground-secondary leading-relaxed max-w-md">
                            Our flagship iOS app that learns your habits and helps you stay hydrated. Built in-house with SwiftUI, CoreML, and a privacy-first approach — no health data ever leaves the device.
                        </p>

                        <div className="pt-2">
                            <Link
                                href="/projects/thirsty-ai"
                                className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 text-[15px] font-medium hover:bg-white transition-colors min-h-[48px]"
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
