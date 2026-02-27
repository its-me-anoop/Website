"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const secondaryProjects = [
    {
        title: "Greenmead",
        description: "Brand identity and digital presence for a sustainable living community.",
        image: "/project-greenmead.png",
        tags: ["Branding", "Web"],
    },
    {
        title: "JJ Paper",
        description: "E-commerce platform and product catalog for artisan paper goods.",
        image: "/project-jjpaper.png",
        tags: ["E-commerce", "Next.js"],
    },
    {
        title: "Sandbourne",
        description: "Corporate website with booking system for a boutique hospitality brand.",
        image: "/project-sandbourne.png",
        tags: ["Web App", "Booking"],
    },
];

export function FeaturedWork() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section
            id="products"
            ref={containerRef}
            className="relative bg-background-secondary py-24 md:py-32 px-6 md:px-14 overflow-hidden"
        >
            <div className="max-w-[1200px] mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-16"
                >
                    <p className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                        Our Work
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-foreground">
                        Projects we&apos;re proud of
                    </h2>
                </motion.div>

                {/* Featured project: Sipli */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left — Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease }}
                        className="space-y-7"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-muted text-accent text-xs font-medium tracking-wide">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                            </span>
                            Featured Project
                        </div>

                        {/* Title */}
                        <div className="space-y-3">
                            <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-foreground leading-[1.1]">
                                Sipli
                            </h3>
                            <p className="text-xl font-medium text-accent">
                                Intelligent hydration, privacy-first
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-foreground-secondary leading-relaxed max-w-md">
                            A gamified hydration tracker with AI coaching,
                            weather-adaptive goals, and 18+ beverage types.
                            Built with SwiftUI and on-device intelligence —
                            all health data stays on your device.
                        </p>

                        {/* CTA */}
                        <div className="pt-2">
                            <Link
                                href="/projects/sipli"
                                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors min-h-[48px]"
                            >
                                View Case Study
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right — Phone Mockup */}
                    <motion.div
                        style={{ y }}
                        className="relative flex justify-center lg:justify-end will-change-transform"
                    >
                        <div className="relative w-full max-w-[480px]">
                            {/* Radial glow */}
                            <div
                                className="absolute inset-0 scale-150 pointer-events-none blur-[80px] opacity-30"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(20,184,166,0.15) 60%, transparent 100%)",
                                }}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease }}
                            >
                                <Image
                                    src="/projects/sipli/iphone_and_ipad.png"
                                    alt="Sipli on iPhone and iPad"
                                    width={1024}
                                    height={1366}
                                    sizes="(max-width: 1024px) 100vw, 480px"
                                    className="relative w-full h-auto"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Secondary projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {secondaryProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease,
                            }}
                            whileHover={{ y: -2 }}
                            className="group bg-surface rounded-2xl overflow-hidden border border-border"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs bg-background-secondary text-foreground-tertiary rounded-full px-3 py-1 font-medium"
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
