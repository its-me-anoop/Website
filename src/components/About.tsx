"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-white/2 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Flutterly?</h2>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            At Flutterly, we don't just write code; we build digital assets that drive growth.
                            Our team of expert developers and consultants works closely with you to understand your unique challenges and deliver solutions that scale.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Expertise in latest technologies (Next.js, Flutter)",
                                "Enterprise-grade security and scalability",
                                "Dedicated support and maintenance",
                                "User-centric design approach"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 glass p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl bg-white/5 text-center">
                                    <h4 className="text-4xl font-bold text-blue-500 mb-2">50+</h4>
                                    <p className="text-sm text-gray-400">Projects Delivered</p>
                                </div>
                                <div className="p-6 rounded-xl bg-white/5 text-center">
                                    <h4 className="text-4xl font-bold text-cyan-500 mb-2">100%</h4>
                                    <p className="text-sm text-gray-400">Client Satisfaction</p>
                                </div>
                                <div className="p-6 rounded-xl bg-white/5 text-center">
                                    <h4 className="text-4xl font-bold text-purple-500 mb-2">24/7</h4>
                                    <p className="text-sm text-gray-400">Support Available</p>
                                </div>
                                <div className="p-6 rounded-xl bg-white/5 text-center">
                                    <h4 className="text-4xl font-bold text-green-500 mb-2">5+</h4>
                                    <p className="text-sm text-gray-400">Years Experience</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 relative"
                >
                    {/* Glow effect behind the card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full -z-10" />

                    <div className="glass p-10 md:p-16 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-xl max-w-5xl mx-auto relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
                        {/* Top gradient line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                            <div className="relative z-10 flex-1 text-left order-2 md:order-1">
                                <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Anoop Jose</h3>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-medium text-xl mb-8">Lead Developer & Founder</p>

                                <blockquote className="text-xl text-gray-300 leading-relaxed font-light italic mb-10 border-l-4 border-blue-500/30 pl-6">
                                    "I believe in crafting digital experiences that are not just functional, but truly memorable.
                                    Every line of code is written with performance, scalability, and user experience in mind."
                                </blockquote>

                                {/* Social Links */}
                                <div className="flex gap-4">
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-gray-400 hover:text-white">
                                        Github
                                    </a>
                                    <a href="https://www.linkedin.com/in/anoop-jose-0b308a296/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-gray-400 hover:text-white">
                                        Linkedin
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-gray-400 hover:text-white">
                                        Twitter
                                    </a>
                                </div>
                            </div>

                            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 order-1 md:order-2">
                                {/* Image glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-2xl opacity-50" />
                                <Image
                                    src="/anoop-jose.png"
                                    alt="Anoop Jose"
                                    fill
                                    className="object-contain drop-shadow-2xl scale-110 group-hover:scale-115 transition-transform duration-700 brightness-105 contrast-110 grayscale-[10%]"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
