"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const clients = ["Thirsty.ai", "Greenmead", "JJ Paper", "Sandbourne"];

export function ClientLogos() {
    return (
        <section className="py-16 md:py-20 px-6 md:px-14">
            <div className="max-w-[1340px] mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="text-[10px] font-medium text-foreground-tertiary uppercase tracking-[0.2em] mb-12"
                >
                    Trusted By
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="hidden md:flex items-center justify-between px-10"
                >
                    {clients.map((client) => (
                        <span
                            key={client}
                            className="text-2xl font-display font-semibold text-foreground-muted tracking-wide"
                        >
                            {client}
                        </span>
                    ))}
                </motion.div>

                {/* Mobile: 2x2 grid */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="md:hidden grid grid-cols-2 gap-y-8"
                >
                    {clients.map((client) => (
                        <span
                            key={client}
                            className="text-lg font-display font-semibold text-foreground-muted tracking-wide"
                        >
                            {client}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
