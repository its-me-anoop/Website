"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Server } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "High-performance websites and web applications built with modern frameworks and thoughtful architecture.",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"]
    },
    {
        icon: Smartphone,
        title: "Mobile Development",
        description: "Native-quality apps for iOS and Android with fluid interfaces and platform-native feel.",
        tags: ["Flutter", "React Native", "SwiftUI", "Kotlin"]
    },
    {
        icon: Server,
        title: "Enterprise Solutions",
        description: "Scalable backend systems, cloud infrastructure, and internal tools that grow with your business.",
        tags: ["Cloud Architecture", "API Design", "Database Design"]
    }
];

export function Services() {
    return (
        <section id="services" className="py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-medium text-foreground-tertiary uppercase tracking-widest mb-3">What We Do</h2>
                    <p className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground max-w-lg">
                        End-to-end development for web, mobile, and cloud.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease }}
                            className="group p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent/[0.1] flex items-center justify-center mb-5 group-hover:bg-accent/[0.15] transition-colors">
                                <service.icon className="w-5 h-5 text-accent" />
                            </div>

                            <h3 className="text-lg font-display font-semibold text-foreground mb-2 tracking-tight">{service.title}</h3>
                            <p className="text-sm text-foreground-secondary leading-relaxed mb-5">{service.description}</p>

                            <div className="flex flex-wrap gap-1.5">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-[11px] font-mono text-foreground-tertiary border border-white/[0.06] px-2 py-0.5 rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
