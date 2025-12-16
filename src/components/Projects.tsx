"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
    {
        title: "Greenmead Housing",
        description: "A specialized housing solution platform for a Community Interest Company. We built a fully accessible, responsive website that effectively communicates their mission of providing safe, empowering homes for individuals with learning disabilities.",
        image: "/project-greenmead.png",
        tags: ["Web Development", "Accessibility", "CIC"],
        link: "https://www.greenmead.co.uk",
        color: "from-green-500/20 to-emerald-500/5"
    },
    {
        title: "Sandbourne Care",
        description: "A comprehensive digital presence for a residential and supported living service provider. The platform showcases their specialized care services for mental health and autism, featuring an accessible design and clear service pathways.",
        image: "/project-sandbourne.png",
        tags: ["Web Design", "Healthcare", "Accessibility"],
        link: "https://sandbournecare.co.uk",
        color: "from-teal-500/20 to-cyan-500/5"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        See how we help businesses and communities thrive in the digital age.
                    </p>
                </div>

                <div className="space-y-20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                        >
                            {/* Image Side */}
                            <div className={`relative rounded-2xl overflow-hidden border border-white/10 aspect-video ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content Side */}
                            <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium group/link"
                                >
                                    Visit Website
                                    <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
