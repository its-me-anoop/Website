"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Hero() {
    return (
        <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-14 overflow-hidden">
            <div className="max-w-[1340px] mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-border text-foreground-tertiary text-[11px] font-medium tracking-[0.15em] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        UK-based digital agency
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                    className="text-[clamp(2.5rem,7vw,4.5rem)] font-display font-semibold tracking-[-0.02em] text-foreground leading-[1.08] mb-8 max-w-3xl"
                >
                    We craft digital products{" "}
                    <br className="hidden sm:block" />
                    that perform.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="text-lg md:text-xl text-foreground-secondary max-w-xl leading-relaxed mb-12"
                >
                    From web applications to native mobile experiences, we build software with precision, performance, and lasting impact.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35, ease }}
                    className="flex flex-col sm:flex-row items-start gap-3"
                >
                    <Link
                        href="#products"
                        className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 text-[15px] font-medium hover:bg-white transition-colors min-h-[48px]"
                    >
                        See Our Work
                    </Link>
                    <Link
                        href="mailto:anoop@flutterly.co.uk"
                        className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground px-7 py-3.5 text-[15px] font-medium border border-border hover:border-border-hover transition-all min-h-[48px]"
                    >
                        Get in Touch
                    </Link>
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
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-foreground-tertiary/40 to-transparent"
                />
            </motion.div>
        </section>
    );
}
