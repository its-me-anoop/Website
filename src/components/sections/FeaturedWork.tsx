"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets } from "lucide-react";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { useRef } from "react";

export function FeaturedWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative py-32 px-6 bg-black overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8 z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Featured Case Study
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
                                Thirsty.ai
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-300 font-light">
                                Intelligent hydration tracking powered by AI.
                            </p>
                        </div>

                        <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                            We designed and built a delightful iOS experience that learns your habits and helps you stay hydrated without the nagging. Featuring generic algorithms, adaptive reminders, and a fluid SwiftUI interface.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/projects/thirsty-ai"
                                className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-200 transition-colors"
                            >
                                View Case Study
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                                <Droplets className="text-blue-500" size={24} />
                                <span className="text-white font-medium">4.9 App Store Rating</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                        style={{ y }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[320px] transform rotate-[-6deg] hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-110" />
                            <Iphone17ProFrame className="shadow-2xl">
                                <Image
                                    src="/projects/thirsty-ai/dashboard-new.png"
                                    alt="Thirsty.ai Dashboard"
                                    fill
                                    className="object-cover"
                                />
                            </Iphone17ProFrame>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
