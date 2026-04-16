"use client";

import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

// Floating preview card — 260×325 (4:5 aspect). Offset above cursor.
const PREVIEW_HEIGHT = 325;
const PREVIEW_OFFSET = 24;

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

type Project = {
    number: string;
    title: string;
    year: string;
    category: string;
    description: string;
    image: string;
    href: string;
    live: boolean;
};

const projects: Project[] = [
    {
        number: "01",
        title: "Sipli",
        year: "2025",
        category: "iOS · iPadOS",
        description:
            "An AI hydration coach in your pocket. 18+ beverages, widgets, and an on-device model that feels human.",
        image: "/projects/sipli/app-icon.png",
        href: "/projects/sipli",
        live: true,
    },
    {
        number: "02",
        title: "Artling",
        year: "2025",
        category: "iOS · Family archive",
        description:
            "A quiet corner of the App Store for families to archive, caption, and share a lifetime of children’s artwork.",
        image: "/projects/artling/fox-painter.png",
        href: "/projects/artling",
        live: true,
    },
    {
        number: "03",
        title: "Greenmead",
        year: "2024",
        category: "Brand · Marketing site",
        description:
            "Digital home for a sustainable living community — warm typography, low carbon footprint.",
        image: "/project-greenmead.png",
        href: "#",
        live: false,
    },
    {
        number: "04",
        title: "JJ Paper",
        year: "2024",
        category: "Commerce · Next.js",
        description:
            "Artisan paper goods, direct to door. A storefront that feels as considered as what it sells.",
        image: "/project-jjpaper.png",
        href: "#",
        live: false,
    },
    {
        number: "05",
        title: "Sandbourne",
        year: "2024",
        category: "Booking · Hospitality",
        description:
            "A reservations engine for boutique inns — built to feel effortless from the first tap to the front desk.",
        image: "/project-sandbourne.png",
        href: "#",
        live: false,
    },
];

export function FeaturedWork() {
    const [hovered, setHovered] = useState<Project | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.4 });
    const springY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.4 });
    // Keep the preview fully on-screen: place it above the cursor, but never
    // above the viewport top (min Y = PREVIEW_HEIGHT + PREVIEW_OFFSET).
    const clampedY = useTransform(springY, (y) =>
        Math.max(y, PREVIEW_HEIGHT + PREVIEW_OFFSET)
    );

    const handleMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            id="work"
            aria-labelledby="work-heading"
            className="relative border-t border-border bg-background px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36"
            onMouseMove={handleMove}
        >
            <div className="mx-auto max-w-[1200px]">
                {/* Section header — editorial style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease }}
                    className="mb-12 grid grid-cols-1 items-end gap-6 border-b border-border pb-8 sm:mb-16 md:grid-cols-12"
                >
                    <div className="md:col-span-5">
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                            № 02 · Ledger of Ships
                        </p>
                        <h2
                            id="work-heading"
                            className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
                        >
                            Five recent things
                            <br />
                            <span className="italic text-foreground-secondary">we’re proud of.</span>
                        </h2>
                    </div>
                    <div className="md:col-span-5 md:col-start-8">
                        <p className="text-pretty text-[15px] leading-relaxed text-foreground-secondary">
                            A running journal of client work and internal products. Dates
                            are when we shipped — not when we started. We’re usually still
                            iterating long after the first release.
                        </p>
                    </div>
                </motion.div>

                {/* Column headings — like a ledger */}
                <div className="hidden grid-cols-12 gap-6 border-b border-border/50 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary md:grid">
                    <span className="col-span-1">№</span>
                    <span className="col-span-4">Project</span>
                    <span className="col-span-2">Year</span>
                    <span className="col-span-4">Category</span>
                    <span className="col-span-1 text-right">View</span>
                </div>

                {/* Rows */}
                <ul role="list" className="divide-y divide-border">
                    {projects.map((project, i) => (
                        <ProjectRow
                            key={project.title}
                            project={project}
                            index={i}
                            onHoverStart={() => setHovered(project)}
                            onHoverEnd={() => setHovered(null)}
                        />
                    ))}
                </ul>

                {/* Footnote */}
                <p className="mt-10 max-w-md font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-tertiary">
                    A few engagements are covered by NDAs and don’t appear here. Happy to
                    walk through them on a call.
                </p>
            </div>

            {/* Floating image preview — desktop only */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        key={hovered.title}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.25, ease }}
                        style={{
                            x: springX,
                            y: clampedY,
                            translateX: "-50%",
                            translateY: `calc(-100% - ${PREVIEW_OFFSET}px)`,
                        }}
                        className="pointer-events-none fixed left-0 top-0 z-50 hidden aspect-[4/5] w-[260px] overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.6)] md:block"
                    >
                        <Image
                            src={hovered.image}
                            alt=""
                            fill
                            sizes="260px"
                            className="object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ProjectRow({
    project,
    index,
    onHoverStart,
    onHoverEnd,
}: {
    project: Project;
    index: number;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) {
    const isLink = project.href !== "#";
    const Wrapper: React.ElementType = isLink ? Link : "div";
    const wrapperProps = isLink ? { href: project.href } : {};

    return (
        <li>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease, delay: index * 0.04 }}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
            >
                <Wrapper
                    {...wrapperProps}
                    className={`grid grid-cols-12 items-baseline gap-4 py-6 transition-colors duration-300 sm:gap-6 sm:py-8 ${
                        isLink ? "group hover:bg-accent/[0.015]" : "group cursor-default"
                    }`}
                    aria-label={`${project.title} — ${project.category}, ${project.year}`}
                >
                    <span className="col-span-2 font-mono text-xs text-foreground-tertiary sm:text-sm md:col-span-1">
                        {project.number}
                    </span>

                    <div className="col-span-10 md:col-span-4">
                        <h3 className={`font-display text-2xl font-medium leading-tight tracking-tight transition-colors sm:text-3xl md:text-4xl ${
                            isLink ? "text-foreground group-hover:text-accent" : "text-foreground-secondary"
                        }`}>
                            {project.title}
                            {project.live && (
                                <span
                                    aria-label="Live"
                                    className="ml-2 align-middle inline-block h-1.5 w-1.5 rounded-full bg-accent"
                                />
                            )}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-foreground-secondary sm:text-[15px] md:max-w-md">
                            {project.description}
                        </p>
                    </div>

                    <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-secondary sm:text-xs md:col-span-2">
                        {project.year}
                    </span>

                    <span className="col-span-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-secondary sm:text-xs md:col-span-4">
                        {project.category}
                    </span>

                    <span className="col-span-3 flex items-center justify-end md:col-span-1">
                        {isLink ? (
                            <ArrowUpRight
                                size={20}
                                strokeWidth={1.5}
                                className="text-foreground-tertiary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            />
                        ) : (
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                                Soon
                            </span>
                        )}
                    </span>
                </Wrapper>
            </motion.div>
        </li>
    );
}
