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
        tags: ["Cloud Architecture", "API Design", "Databases"]
    }
];

export function Services() {
    return (
        <section id="services" className="py-24 md:py-32 px-6 md:px-14">
            <div className="max-w-[1340px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-16"
                >
                    <h2 className="text-[10px] font-medium text-foreground-tertiary uppercase tracking-[0.15em] mb-4">What We Do</h2>
                    <p className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground max-w-lg">
                        End-to-end development for web, mobile, and cloud.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease }}
                            className="group p-8 md:p-10 bg-background hover:bg-surface transition-colors duration-300"
                        >
                            <div className="w-10 h-10 flex items-center justify-center mb-6">
                                <service.icon className="w-5 h-5 text-accent" />
                            </div>

                            <h3 className="text-lg font-display font-semibold text-foreground mb-3 tracking-tight">{service.title}</h3>
                            <p className="text-sm text-foreground-secondary leading-relaxed mb-6">{service.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-[11px] text-foreground-tertiary border border-border px-2.5 py-1">
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
