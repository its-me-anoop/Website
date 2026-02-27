"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Server } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description:
            "Modern, performant web applications built with Next.js, React, and Tailwind CSS. We engineer scalable frontends that feel native.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    },
    {
        icon: Smartphone,
        title: "Mobile Development",
        description:
            "Native and cross-platform mobile apps with Flutter and SwiftUI. Pixel-perfect implementation with focus on smooth 120fps animations.",
        tags: ["Flutter", "SwiftUI", "React Native", "Kotlin"],
    },
    {
        icon: Server,
        title: "Enterprise Solutions",
        description:
            "Scalable cloud architecture, API design, and database solutions. Built for growth, reliability and security.",
        tags: ["Cloud Architecture", "GraphQL", "PostgreSQL", "AWS"],
    },
];

export function Services() {
    return (
        <section id="services" className="py-24 md:py-32 px-4 md:px-10 bg-background-secondary border-t border-border">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                 <div className="mb-20">
                     <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">[02]</span>
                     <h2 className="text-3xl font-display font-bold text-foreground uppercase tracking-tight">Capabilities</h2>
                </div>

                {/* Technical Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/20 border border-border/20">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease,
                            }}
                            className="group relative bg-background p-10 hover:bg-foreground hover:text-background transition-colors duration-500"
                        >
                            <div className="flex flex-col h-full justify-between gap-10">
                                <div>
                                    {/* Icon */}
                                    <div className="mb-8 text-accent group-hover:text-background transition-colors duration-500">
                                        <service.icon size={32} strokeWidth={1.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-display font-bold mb-4 tracking-tight group-hover:text-background transition-colors duration-500">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-foreground-secondary text-sm leading-relaxed group-hover:text-background/70 transition-colors duration-500">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-[10px] uppercase tracking-wider text-foreground-tertiary group-hover:text-background/60 border border-border/20 group-hover:border-background/20 px-2 py-1 rounded-sm transition-colors duration-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
