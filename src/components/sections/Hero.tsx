"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Hero() {
    return (
        <section className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 overflow-hidden">
            {/* Ambient gradient orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.07] rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[120px]" style={{ animationDelay: "3s" }} />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-foreground-secondary text-xs font-medium tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        UK-based digital agency
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-semibold tracking-[-0.035em] text-foreground leading-[1.08] mb-6"
                >
                    We craft digital
                    <br />
                    products that
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
                        perform.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="text-lg md:text-xl text-foreground-secondary max-w-xl mx-auto leading-relaxed mb-10"
                >
                    From web applications to native mobile experiences, we build software with precision, performance, and lasting impact.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35, ease }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link
                        href="#work"
                        className="group inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-xl text-[15px] font-medium hover:bg-white transition-colors min-h-[48px]"
                    >
                        See Our Work
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                        href="mailto:anoop@flutterly.co.uk"
                        className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground px-7 py-3.5 rounded-xl text-[15px] font-medium border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all min-h-[48px]"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>

            {/* Scroll line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-foreground-tertiary/40 to-transparent"
                />
            </motion.div>
        </section>
    );
}
