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
        title: "Artling",
        category: "Mobile Application",
        description: "Family artwork archive with sharing, timelines, and AI-assisted captions.",
        image: "/projects/artling/fox-painter.png",
        href: "/projects/artling",
        color: "#241816",
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
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="sticky top-0 flex h-screen items-center justify-center">
            <motion.div
                style={{ scale, backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex h-[600px] w-full origin-top flex-col overflow-hidden rounded-3xl border border-border/10 shadow-2xl"
            >
                <div className="flex h-full flex-col md:flex-row">
                    <div className="relative z-10 flex w-full flex-col justify-between p-10 md:w-[40%]">
                        <div>
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-accent" />
                                <span className="font-mono text-xs uppercase tracking-widest text-foreground-tertiary">{category}</span>
                            </div>
                            <h2 className="mb-4 font-display text-4xl font-bold leading-[0.95] text-foreground md:text-5xl">{title}</h2>
                            <p className="max-w-sm text-lg leading-relaxed text-foreground-secondary">{description}</p>
                        </div>

                        <Link
                            href={href}
                            className="group mt-8 inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                        >
                            <span className="text-sm font-bold uppercase tracking-wide">View Project</span>
                            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="relative h-full w-full overflow-hidden md:w-[60%]">
                        <motion.div style={{ scale: imageScale }} className="relative h-full w-full">
                            <Image src={image} alt={title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/40 md:to-black/80" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function FeaturedWork() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={container} id="products" className="relative bg-background px-4 pb-20 md:px-10">
            <div className="mx-auto max-w-[1200px] py-24">
                <div className="mb-20">
                    <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-accent">[01]</span>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">Selected Work</h2>
                </div>

                {projects.map((project, i) => {
                    const targetScale = 1 - (projects.length - i) * 0.05;

                    return (
                        <Card
                            key={project.title}
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
