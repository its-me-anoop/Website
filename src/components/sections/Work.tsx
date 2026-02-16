"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Using existing images found in public folder
const projects = [
    {
        title: "Thirsty.ai",
        category: "iOS & AI",
        image: "/projects/thirsty-ai/dashboard-new.png",
        link: "/projects/thirsty-ai"
    },
    {
        title: "Greenmead",
        category: "Web Development",
        image: "/project-greenmead.png",
        link: "/projects/greenmead" // Assuming a link structure
    },
    {
        title: "JJ Paper",
        category: "E-commerce",
        image: "/project-jjpaper.png",
        link: "/projects/jjpaper"
    },
    {
        title: "Sandbourne",
        category: "Real Estate",
        image: "/project-sandbourne.png",
        link: "/projects/sandbourne"
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
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-xl font-medium text-white">{project.title}</h3>
                                <p className="text-sm text-zinc-300">{project.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
