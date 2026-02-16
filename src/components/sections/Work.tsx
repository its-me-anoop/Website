"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SafariBrowserFrame } from "@/components/ui/SafariBrowserFrame";

// Using existing images found in public folder
const projects = [
    {
        title: "Thirsty.ai",
        category: "iOS & AI",
        image: "/projects/thirsty-ai/dashboard-new.png",
        link: "/projects/thirsty-ai",
        isWeb: false
    },
    {
        title: "Greenmead",
        category: "Web Development",
        image: "/project-greenmead.png",
        link: "/projects/greenmead", // Assuming a link structure
        isWeb: true,
        url: "greenmead.co.uk"
    },
    {
        title: "JJ Paper",
        category: "E-commerce",
        image: "/project-jjpaper.png",
        link: "/projects/jjpaper",
        isWeb: true,
        url: "jjpaperessential.com"
    },
    {
        title: "Sandbourne",
        category: "Real Estate",
        image: "/project-sandbourne.png",
        link: "/projects/sandbourne",
        isWeb: true,
        url: "sandbourne.co.uk"
    }
];

export function Work() {
    return (
        <section id="work" className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 gap-6"
                >
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">Selected Work</h2>
                    <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                        View all projects <ArrowUpRight size={18} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {project.isWeb ? (
                                <div className="group-hover:-translate-y-2 transition-transform duration-500">
                                    <SafariBrowserFrame url={project.url} className="aspect-[4/3]">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                    </SafariBrowserFrame>
                                </div>
                            ) : (
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                            )}

                            <div className="mt-4 flex flex-col">
                                <h3 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <p className="text-sm text-zinc-400">{project.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

