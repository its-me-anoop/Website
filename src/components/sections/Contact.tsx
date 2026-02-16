"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Linkedin } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section id="contact" className="py-32 px-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-8"
                >
                    Let’s build something great.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto mb-16"
                >
                    We’re currently taking on new projects. If you have an idea or need technical expertise, get in touch directly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-6"
                >
                    <Link
                        href="mailto:anoop@flutterly.co.uk"
                        className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-zinc-200 transition-colors w-full md:w-auto justify-center"
                    >
                        <Mail size={20} />
                        anoop@flutterly.co.uk
                    </Link>

                    <Link
                        href="tel:+447780580534"
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full text-lg font-medium hover:bg-zinc-800 transition-colors w-full md:w-auto justify-center"
                    >
                        <Phone size={20} />
                        +44 7780 580534
                    </Link>

                    <Link
                        href="https://linkedin.com/in/anoop-jose-0b308a296/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full text-lg font-medium hover:bg-zinc-800 transition-colors w-full md:w-auto justify-center"
                    >
                        <Linkedin size={20} />
                        LinkedIn <ArrowUpRight size={16} className="ml-1 opacity-50" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
