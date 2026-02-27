"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
    {
        title: "Sipli",
        category: "Mobile Application",
        description: "Intelligent hydration tracking with on-device AI.",
        image: "/projects/sipli/iphone_and_ipad.png",
        href: "/projects/sipli",
        color: "#1d1d1f",
    },
    {
        title: "Greenmead",
        category: "Brand & Web",
        description: "Digital presence for a sustainable living community.",
        image: "/project-greenmead.png",
        href: "#",
        color: "#18181b",
    },
    {
        title: "JJ Paper",
        category: "E-commerce",
        description: "Artisan paper goods store built with Next.js.",
        image: "/project-jjpaper.png",
        href: "#",
        color: "#0f0f0f",
    },
    {
        title: "Sandbourne",
        category: "Web Application",
        description: "Booking system for boutique hospitality.",
        image: "/project-sandbourne.png",
        href: "#",
        color: "#0a0a0a",
    },
];

interface CardProps {
    title: string;
    category: string;
    description: string;
    image: string;
    href: string;
    color: string;
    i: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card = ({ title, category, description, image, href, color, i, progress, range, targetScale }: CardProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
                className="flex flex-col relative w-full h-[600px] rounded-3xl overflow-hidden border border-border/10 origin-top shadow-2xl"
            >
                <div className="flex flex-col md:flex-row h-full">
                     {/* Content */}
                    <div className="w-full md:w-[40%] p-10 flex flex-col justify-between z-10 relative">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-2 h-2 rounded-full bg-accent" />
                                <span className="text-xs font-mono uppercase tracking-widest text-foreground-tertiary">{category}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-[0.95]">{title}</h2>
                            <p className="text-lg text-foreground-secondary leading-relaxed max-w-sm">{description}</p>
                        </div>

                        <Link
                            href={href}
                            className="group inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors mt-8"
                        >
                            <span className="text-sm font-bold uppercase tracking-wide">View Project</span>
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="w-full md:w-[60%] h-full relative overflow-hidden">
                        <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                             <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/40 md:to-black/80" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export function FeaturedWork() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} id="products" className="relative bg-background px-4 md:px-10 pb-20">
             <div className="max-w-[1200px] mx-auto py-24">
                <div className="mb-20">
                     <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">[01]</span>
                     <h2 className="text-3xl font-display font-bold text-foreground uppercase tracking-tight">Selected Work</h2>
                </div>

                {projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return (
                        <Card
                            key={i}
                            i={i}
                            {...project}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}
