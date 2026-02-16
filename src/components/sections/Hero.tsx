"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-40 pointer-events-none" />

            <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]"
                >
                    We build high-performance digital products.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Flutterly is a UK-based digital agency specialising in web development, cross-platform mobile apps, and enterprise solutions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <Link
                        href="#work"
                        className="group inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-lg font-medium hover:bg-zinc-200 transition-colors"
                    >
                        View Our Work
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="mailto:anoop@flutterly.co.uk"
                        className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-white/5 border border-white/10 transition-colors"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator or subtle element */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    );
}
