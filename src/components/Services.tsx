"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Building2, Code, Server, Shield } from "lucide-react";

const services = [
    {
        title: "Web Development",
        description: "High-performance websites and web applications built with modern frameworks.",
        icon: Globe,
        tech: ["React", "Next.js", "WordPress"],
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        icon: Smartphone,
        tech: ["Flutter", "SwiftUI", "React Native"],
        color: "bg-cyan-500/10 text-cyan-500",
    },
    {
        title: "Enterprise Support",
        description: "Comprehensive setup and maintenance for business suites and infrastructure.",
        icon: Building2,
        tech: ["Zoho", "Google Workspace", "Windows"],
        color: "bg-purple-500/10 text-purple-500",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We deliver end-to-end solutions tailored to your business needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                                <service.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-6">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {service.tech.map((tech) => (
                                    <span key={tech} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                        {tech}
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
