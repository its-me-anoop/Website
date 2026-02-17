"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ExternalLink,
    Home,
    Heart,
    Leaf,
    Stethoscope,
    Shield,
    Activity,
    Droplet,
    ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { SafariBrowserFrame } from "@/components/ui/SafariBrowserFrame";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const projects = [
    {
        title: "Thirsty.ai",
        description: "A privacy-first iOS hydration tracker powered by on-device Apple Foundation Models. Features intelligent reminders and personalized insights without compromising user data.",
        icon: Droplet,
        tags: ["iOS", "AI", "SwiftUI", "Privacy"],
        link: "/projects/thirsty-ai",
        internal: true,
        type: "app",
        image: "/projects/thirsty-ai/dashboard-new.png"
    },
    {
        title: "Greenmead Housing",
        description: "A specialized housing solution platform for a Community Interest Company. Fully accessible, responsive website communicating their mission of providing safe, empowering homes for individuals with learning disabilities.",
        icon: Home,
        tags: ["Web Development", "Accessibility", "CIC"],
        link: "https://www.greenmead.co.uk",
        type: "web",
        image: "/project-greenmead.png"
    },
    {
        title: "Sandbourne Care",
        description: "A comprehensive digital presence for a residential and supported living service provider. Showcasing specialized care services for mental health and autism with an accessible design.",
        icon: Heart,
        tags: ["Web Design", "Healthcare", "Accessibility"],
        link: "https://sandbournecare.co.uk",
        type: "web",
        image: "/project-sandbourne.png"
    },
    {
        title: "JJ Paper Essentials",
        description: "An eco-friendly e-commerce platform for sustainable paper products made from sugarcane waste. Nature-inspired design highlighting environmental benefits and premium product quality.",
        icon: Leaf,
        tags: ["E-commerce", "Sustainability", "Product Design"],
        link: "https://www.jjpaperessential.com",
        type: "web",
        image: "/project-jjpaper.png"
    },
    {
        title: "Nursely",
        description: "A mobile application for nursing staff management and scheduling. Available on iOS and Android, streamlining shift booking, compliance tracking, and communication.",
        icon: Stethoscope,
        tags: ["Mobile App", "iOS & Android", "Healthcare"],
        link: "https://nursely.app",
        type: "app"
    },
    {
        title: "Montis Care",
        description: "A professional digital platform for a care service provider specializing in support for learning disabilities and mental health.",
        icon: Shield,
        tags: ["Web Design", "Care Services", "Compliance"],
        link: "https://www.montiscare.co.uk",
        type: "web"
    },
    {
        title: "Uniq Healthcare",
        description: "A digital presence for a home healthcare provider focused on compassion and dignity, showcasing their CQC 'Good' rating and expertise.",
        icon: Activity,
        tags: ["Web Design", "Home Care", "CQC Registered"],
        link: "https://uniqhealthcare.co.uk",
        type: "web"
    },
];

export default function ProjectsClient() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 relative">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-20">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease }}
                            className="text-sm font-medium text-foreground-tertiary uppercase tracking-widest mb-4"
                        >
                            Portfolio
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05, ease }}
                            className="text-4xl md:text-5xl font-display font-semibold tracking-[-0.03em] mb-4"
                        >
                            Our Work
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease }}
                            className="text-lg text-foreground-secondary max-w-lg"
                        >
                            Digital experiences crafted with precision for clients across healthcare, sustainability, and care services.
                        </motion.p>
                    </div>

                    <div className="space-y-24">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, ease }}
                                className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                            >
                                {/* Visual */}
                                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                    {project.type === "web" && project.image ? (
                                        <div className="group-hover:-translate-y-1 transition-transform duration-500">
                                            <SafariBrowserFrame
                                                url={project.link.replace("https://", "").replace("www.", "")}
                                                className="aspect-[16/10]"
                                            >
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                                />
                                            </SafariBrowserFrame>
                                        </div>
                                    ) : project.type === "app" && project.image ? (
                                        <div className="flex justify-center">
                                            <div className="relative w-full max-w-[260px]">
                                                <Iphone17ProFrame>
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </Iphone17ProFrame>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-surface aspect-[16/10] flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center">
                                                <project.icon className="w-8 h-8 text-foreground-tertiary" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4">{project.title}</h2>
                                    <p className="text-foreground-secondary leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-foreground-secondary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {project.internal ? (
                                        <Link
                                            href={project.link}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium text-sm hover:bg-white transition-colors min-h-[44px]"
                                        >
                                            View Case Study
                                        </Link>
                                    ) : (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium text-sm hover:bg-white transition-colors min-h-[44px]"
                                        >
                                            Visit Website
                                            <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
