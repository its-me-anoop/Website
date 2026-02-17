"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SafariBrowserFrame } from "@/components/ui/SafariBrowserFrame";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const projects = [
    {
        title: "Thirsty.ai",
        category: "iOS & AI",
        image: "/projects/thirsty-ai/dashboard-new.png",
        href: "/projects/thirsty-ai",
        isExternal: false,
        isWeb: false
    },
    {
        title: "Greenmead",
        category: "Web Development",
        image: "/project-greenmead.png",
        href: "https://www.greenmead.co.uk",
        isExternal: true,
        isWeb: true,
        url: "greenmead.co.uk"
    },
    {
        title: "JJ Paper",
        category: "E-commerce",
        image: "/project-jjpaper.png",
        href: "https://www.jjpaperessential.com",
        isExternal: true,
        isWeb: true,
        url: "jjpaperessential.com"
    },
    {
        title: "Sandbourne",
        category: "Real Estate",
        image: "/project-sandbourne.png",
        href: "https://sandbournecare.co.uk",
        isExternal: true,
        isWeb: true,
        url: "sandbourne.co.uk"
    }
];

export function Work() {
    return (
        <section id="work" className="py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4"
                >
                    <div>
                        <h2 className="text-sm font-medium text-foreground-tertiary uppercase tracking-widest mb-3">Portfolio</h2>
                        <p className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground">
                            Selected Work
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        className="text-sm text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-1.5 group"
                    >
                        All projects
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project, index) => {
                        const CardContent = (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08, ease }}
                                className="group relative"
                            >
                                <div className="rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.03]">
                                    {project.isWeb ? (
                                        <SafariBrowserFrame url={project.url} className="aspect-[16/10]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                        </SafariBrowserFrame>
                                    ) : (
                                        <div className="relative aspect-[16/10] bg-gradient-to-br from-accent/[0.08] to-purple-500/[0.05]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                                            />
                                        </div>
                                    )}

                                    <div className="p-5 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-display font-semibold text-foreground tracking-tight">{project.title}</h3>
                                            <p className="text-xs text-foreground-tertiary mt-0.5">{project.category}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                                            <ArrowUpRight size={14} className="text-foreground-secondary group-hover:text-foreground transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );

                        if (project.isExternal) {
                            return (
                                <a key={index} href={project.href} target="_blank" rel="noopener noreferrer">
                                    {CardContent}
                                </a>
                            );
                        }

                        return (
                            <Link key={index} href={project.href}>
                                {CardContent}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
