"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-10 overflow-hidden bg-background">
            {/* Subtle Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
             {/* Radial gradient mask for grid */}
             <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, transparent 0%, var(--background) 80%)"
                }}
             />


            <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col items-center text-center pt-20">
                {/* Status Badge */}
                 <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="mb-8"
                    >
                         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-elevated/50 text-xs font-mono text-foreground-secondary uppercase tracking-widest backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Available for hire
                        </span>
                </motion.div>

                {/* Massive Typography */}
                <h1 className="font-display font-bold leading-[0.9] tracking-tighter text-foreground mb-8">
                    <div className="overflow-hidden">
                        <motion.div
                             initial={{ y: "100%" }}
                             animate={{ y: 0 }}
                             transition={{ duration: 1, ease }}
                             className="text-[clamp(4rem,14vw,11rem)]"
                        >
                            DIGITAL
                        </motion.div>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div
                             initial={{ y: "100%" }}
                             animate={{ y: 0 }}
                             transition={{ duration: 1, delay: 0.15, ease }}
                             className="text-[clamp(4rem,14vw,11rem)] text-transparent"
                             style={{ WebkitTextStroke: "2px var(--foreground-muted)"}}
                        >
                           CRAFT
                        </motion.div>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div
                             initial={{ y: "100%" }}
                             animate={{ y: 0 }}
                             transition={{ duration: 1, delay: 0.3, ease }}
                             className="text-[clamp(4rem,14vw,11rem)] text-accent"
                        >
                           STUDIO
                        </motion.div>
                    </div>
                </h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease }}
                    className="font-sans text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-12"
                >
                    Flutterly is a UK-based engineering partner. We build bespoke web & mobile applications with a focus on performance, scalability, and flawless user interaction.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease }}
                >
                     <Link
                            href="#products"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-background bg-accent overflow-hidden transition-transform active:scale-95"
                        >
                             <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                             <span>VIEW SELECTED WORK</span>
                        </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono text-foreground-tertiary uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
        </section>
    );
}
