"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32 px-6 md:px-14 bg-background-secondary relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="text-[10px] font-medium text-foreground-tertiary uppercase tracking-[0.15em] mb-8"
                >
                    Get in Touch
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05, ease }}
                    className="text-3xl md:text-5xl font-display font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.15]"
                >
                    Let&apos;s build something
                    <br />
                    great together.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="text-lg text-foreground-secondary max-w-lg mx-auto mb-12"
                >
                    We&apos;re currently taking on new projects. Have an idea or need technical expertise? Reach out.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15, ease }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-3"
                >
                    <Link
                        href="mailto:anoop@flutterly.co.uk"
                        className="flex items-center gap-2.5 px-7 py-3.5 bg-foreground text-background text-[15px] font-medium hover:bg-white transition-colors w-full sm:w-auto justify-center min-h-[48px]"
                    >
                        <Mail size={16} />
                        anoop@flutterly.co.uk
                    </Link>

                    <Link
                        href="tel:+447780580534"
                        className="flex items-center gap-2.5 px-7 py-3.5 text-foreground-secondary hover:text-foreground border border-border hover:border-border-hover text-[15px] font-medium transition-all w-full sm:w-auto justify-center min-h-[48px]"
                    >
                        <Phone size={16} />
                        +44 7780 580534
                    </Link>

                    <Link
                        href="https://linkedin.com/in/anoop-jose-0b308a296/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-7 py-3.5 text-foreground-secondary hover:text-foreground border border-border hover:border-border-hover text-[15px] font-medium transition-all w-full sm:w-auto justify-center min-h-[48px]"
                    >
                        LinkedIn
                        <ArrowUpRight size={14} className="opacity-50" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
