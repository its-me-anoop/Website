"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import { ExternalLink, Home, Heart, Leaf, Stethoscope, Shield, Activity } from "lucide-react";

const projects = [
    {
        title: "Greenmead Housing",
        description: "A specialized housing solution platform for a Community Interest Company. We built a fully accessible, responsive website that effectively communicates their mission of providing safe, empowering homes for individuals with learning disabilities.",
        icon: Home,
        tags: ["Web Development", "Accessibility", "CIC"],
        link: "https://www.greenmead.co.uk",
        color: "from-green-500 to-emerald-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },
    {
        title: "Sandbourne Care",
        description: "A comprehensive digital presence for a residential and supported living service provider. The platform showcases their specialized care services for mental health and autism, featuring an accessible design and clear service pathways.",
        icon: Heart,
        tags: ["Web Design", "Healthcare", "Accessibility"],
        link: "https://sandbournecare.co.uk",
        color: "from-teal-500 to-cyan-500",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20"
    },
    {
        title: "JJ Paper Essentials",
        description: "An eco-friendly e-commerce platform for sustainable paper products made from sugarcane waste. The site features a clean, nature-inspired design that highlights the environmental benefits and premium quality of the products.",
        icon: Leaf,
        tags: ["E-commerce", "Sustainability", "Product Design"],
        link: "https://www.jjpaperessential.com",
        color: "from-lime-500 to-green-500",
        bg: "bg-lime-500/10",
        border: "border-lime-500/20"
    },
    {
        title: "Nursely",
        description: "A comprehensive mobile application for nursing staff management and scheduling. Available on iOS and Android, it streamlines shift booking, compliance tracking, and communication for healthcare professionals.",
        icon: Stethoscope,
        tags: ["Mobile App", "iOS & Android", "Healthcare"],
        link: "https://nursely.app",
        color: "from-blue-500 to-indigo-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        title: "Montis Care",
        description: "A professional digital platform for a care service provider specializing in support for learning disabilities and mental health. The site provides clear information on services, compliance, and care philosophy.",
        icon: Shield,
        tags: ["Web Design", "Care Services", "Compliance"],
        link: "https://www.montiscare.co.uk",
        color: "from-rose-500 to-pink-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20"
    },
    {
        title: "Uniq Healthcare",
        description: "A digital presence for a home healthcare provider focused on compassion and dignity. The site highlights their expertise in caring for adults and individuals with learning disabilities, showcasing their CQC 'Good' rating.",
        icon: Activity,
        tags: ["Web Design", "Home Care", "CQC Registered"],
        link: "https://uniqhealthcare.co.uk",
        color: "from-purple-500 to-violet-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    }
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />

            <section className="pt-32 pb-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Our Work
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            A showcase of digital experiences we've crafted for our clients.
                        </motion.p>
                    </div>

                    <div className="space-y-32">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                            >
                                {/* Icon Side */}
                                <div className={`relative rounded-2xl overflow-hidden border ${project.border} ${project.bg} aspect-[16/10] flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 blur-3xl`} />
                                    <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-2xl shadow-${project.color}/20 group-hover:scale-110 transition-transform duration-500`}>
                                        <project.icon className="w-16 h-16 text-white" />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <h2 className="text-4xl font-bold mb-6">{project.title}</h2>
                                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-10">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Visit Website
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Contact />
        </main>
    );
}
