"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Server } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description:
            "Modern, performant web applications built with Next.js, React, and Tailwind CSS. From landing pages to complex web apps.",
        tags: ["Next.js", "React", "Tailwind"],
        color: {
            iconBg: "bg-teal-muted",
            iconText: "text-teal",
            tagBg: "bg-teal-muted",
            tagText: "text-teal",
        },
    },
    {
        icon: Smartphone,
        title: "Mobile Development",
        description:
            "Native and cross-platform mobile apps with Flutter, SwiftUI, and React Native. Beautiful on every device.",
        tags: ["Flutter", "SwiftUI", "React Native"],
        color: {
            iconBg: "bg-accent-muted",
            iconText: "text-accent",
            tagBg: "bg-accent-muted",
            tagText: "text-accent",
        },
    },
    {
        icon: Server,
        title: "Enterprise Solutions",
        description:
            "Scalable cloud architecture, API design, and database solutions. Built for growth and reliability.",
        tags: ["Cloud", "APIs", "Databases"],
        color: {
            iconBg: "bg-deep-earth/[0.08]",
            iconText: "text-foreground",
            tagBg: "bg-deep-earth/[0.08]",
            tagText: "text-foreground",
        },
    },
];

export function Services() {
    return (
        <section id="services" className="py-24 md:py-32 px-6 md:px-14">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                        What We Do
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-foreground">
                        End-to-end craft for digital products
                    </h2>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.12,
                                ease,
                            }}
                            className="bg-background-secondary rounded-2xl p-8"
                        >
                            {/* Icon */}
                            <div
                                className={`w-14 h-14 rounded-xl ${service.color.iconBg} flex items-center justify-center mb-6`}
                            >
                                <service.icon
                                    className={`w-6 h-6 ${service.color.iconText}`}
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-display font-medium text-foreground mb-3">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm font-sans text-foreground-secondary leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`text-xs ${service.color.tagBg} ${service.color.tagText} rounded-full px-3 py-1 font-medium`}
                                    >
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
