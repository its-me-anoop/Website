"use client";

import { motion } from "framer-motion";

const services = [
    {
        title: "Web Development",
        description: "High-performance websites and web applications using Next.js, React, and modern CSS.",
        tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"]
    },
    {
        title: "Mobile Development",
        description: "Native-quality cross-platform mobile apps for iOS and Android.",
        tags: ["Flutter", "React Native", "SwiftUI", "Kotlin"]
    },
    {
        title: "Enterprise Solutions",
        description: "Scalable backend architecture, cloud infrastructure, and internal tools.",
        tags: ["Cloud Architecture", "API Design", "Database Optimization"]
    }
];

export function Services() {
    return (
        <section id="services" className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 border-b border-white/10 pb-8"
                >
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">Our Services</h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group flex flex-col md:flex-row md:items-start justify-between gap-8 py-8 border-b border-white/5 hover:border-white/20 transition-colors"
                        >
                            <div className="md:w-1/3">
                                <h3 className="text-2xl font-medium text-white group-hover:text-blue-500 transition-colors">{service.title}</h3>
                            </div>
                            <div className="md:w-2/3 space-y-4">
                                <p className="text-lg text-zinc-400 max-w-2xl">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">{tag}</span>
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
