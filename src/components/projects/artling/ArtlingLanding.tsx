"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
    ArrowLeft,
    ArrowUpRight,
    Camera,
    Clock3,
    Cloud,
    FileText,
    Mic,
    Search,
    Share2,
    Sparkles,
    Star,
    Tags,
    WandSparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { Reveal, MaskedLines } from "@/components/motion/Reveal";

const ink = "#2F211D";
const inkSoft = "#715B51";
const inkTertiary = "#9C6A55";
const paper = "#FFF7F1";
const paperCream = "#FFFDF9";
const paperSand = "#FFF5EC";
const border = "#EFDDD1";
const accent = "#F2784B";
const green = "#76B699";
const blue = "#6FAFD1";

const chapters: {
    no: string;
    eyebrow: string;
    title: string;
    body: string;
    icon: LucideIcon;
    accent: string;
}[] = [
    {
        no: "01",
        eyebrow: "Capture",
        title: "Save the piece before it disappears into a drawer.",
        body: "Camera, photo library, document scanner — three taps and it is filed with the child, the date, and the story. Artling is designed for the moment right after a drawing is finished, when everything else is happening too.",
        icon: Camera,
        accent,
    },
    {
        no: "02",
        eyebrow: "Story",
        title: "The picture, plus the voice that explains why it mattered.",
        body: "Voice notes, dates, tags, and favourites live next to the artwork itself. Years later, you get the tiger AND the fact she called it Reginald.",
        icon: Mic,
        accent: green,
    },
    {
        no: "03",
        eyebrow: "Timeline",
        title: "Watch a childhood unfold without a shoebox in the loft.",
        body: "Browse a living timeline, celebrate milestones, and let On This Day surface the piece from two years ago without a single reminder to set.",
        icon: Clock3,
        accent: blue,
    },
];

const featureCards = [
    {
        icon: Share2,
        title: "Family sharing",
        description:
            "Invite another parent or guardian into a shared profile without turning the archive into a group chat.",
    },
    {
        icon: Sparkles,
        title: "AI captions",
        description:
            "Generate warm titles and captions from the artwork itself when you want help labeling a busy week.",
    },
    {
        icon: Search,
        title: "Search & filter",
        description:
            "Jump back to animals, school projects, favourite pieces, or a specific child in seconds.",
    },
    {
        icon: Star,
        title: "Milestones",
        description:
            "Track creative streaks, badge-worthy moments, and anniversary resurfacing without another routine.",
    },
    {
        icon: FileText,
        title: "PDF portfolios",
        description:
            "Turn a growing gallery into a polished PDF keepsake — school folder, gift, or grandparent parcel.",
    },
    {
        icon: Cloud,
        title: "Local-first",
        description:
            "Core library stays on device. Cloud only when sync, sharing, or AI actively require it.",
    },
];

const stack = [
    { label: "Platforms", items: "iOS · iPadOS" },
    { label: "Language", items: "Swift · SwiftUI" },
    { label: "Auth", items: "Sign in with Apple · Firebase" },
    { label: "Data", items: "Core Data · CloudKit · Firebase" },
    { label: "AI", items: "Firebase AI · Google AI (captions)" },
    { label: "Purchases", items: "StoreKit 2 · in-app family plan" },
];

const ticker = [
    "For families with fridge doors",
    "Capture · Story · Timeline",
    "Available on the App Store",
    "iPhone & iPad",
    "AI-assisted captions",
    "PDF export",
    "Family sharing",
    "Made in Reading, UK",
];

export function ArtlingLanding() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const foxY = useSpring(useTransform(heroProgress, [0, 1], [0, -80]), {
        stiffness: 120,
        damping: 22,
    });
    const phoneY = useSpring(useTransform(heroProgress, [0, 1], [0, -120]), {
        stiffness: 120,
        damping: 22,
    });

    return (
        <main
            style={{ background: paper, color: ink }}
            className="min-h-screen overflow-x-hidden"
        >
            <Navbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-32 md:px-10 md:pt-36 md:pb-24"
                style={{
                    background: `linear-gradient(180deg, ${paperCream} 0%, ${paperSand} 60%, ${paper} 100%)`,
                }}
                aria-label="Artling — an iOS art archive for families"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-90"
                    style={{
                        background:
                            "radial-gradient(circle at 12% 12%, rgba(242,120,75,0.18), transparent 32%), radial-gradient(circle at 82% 20%, rgba(118,182,153,0.14), transparent 30%), radial-gradient(circle at 76% 78%, rgba(111,175,209,0.16), transparent 34%)",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[1200px] -translate-x-1/2 opacity-[0.08] md:block"
                    style={{
                        backgroundImage: `linear-gradient(90deg, ${inkTertiary}55 1px, transparent 1px)`,
                        backgroundSize: "calc(100% / 12) 100%",
                    }}
                />

                <div className="relative mx-auto max-w-[1200px]">
                    <Reveal y={0} duration={0.4} className="mb-8 sm:mb-10">
                        <Link
                            href="/#work"
                            style={{ color: inkTertiary }}
                            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors hover:text-[color:var(--accent)] sm:text-[11px]"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform group-hover:-translate-x-0.5"
                            />
                            Back to the ledger
                        </Link>
                    </Reveal>

                    <div
                        className="grid grid-cols-2 gap-4 border-b pb-4 font-mono text-[10px] uppercase tracking-[0.22em] sm:grid-cols-4 sm:text-[11px]"
                        style={{ borderColor: border, color: inkTertiary }}
                    >
                        {[
                            { label: "Project", value: "Artling" },
                            { label: "Year", value: "2025 — ongoing" },
                            { label: "Platforms", value: "iOS · iPadOS" },
                            {
                                label: "Status",
                                value: (
                                    <span
                                        className="inline-flex items-center gap-2"
                                        style={{ color: ink }}
                                    >
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span
                                                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                                                style={{ background: accent }}
                                            />
                                            <span
                                                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                                                style={{ background: accent }}
                                            />
                                        </span>
                                        Live on App Store
                                    </span>
                                ),
                            },
                        ].map((c) => (
                            <div key={c.label} className="flex flex-col gap-1">
                                <span>{c.label}</span>
                                <span style={{ color: inkSoft }}>{c.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 grid grid-cols-1 items-center gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7">
                            <p
                                className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em]"
                                style={{ color: accent }}
                            >
                                № 01 · The Project
                            </p>
                            <h1
                                className="font-display text-[clamp(2.75rem,7.5vw,6.5rem)] font-light leading-[0.96] tracking-[-0.045em]"
                                style={{ color: ink }}
                            >
                                <span className="block">
                                    <MaskedLines text="Artling." />
                                </span>
                                <span className="block italic" style={{ color: inkSoft }}>
                                    <MaskedLines
                                        text="A living family gallery"
                                        delay={0.15}
                                    />
                                </span>
                                <span className="block">
                                    <MaskedLines
                                        text="for the fridge-door years."
                                        delay={0.3}
                                    />
                                </span>
                            </h1>

                            <Reveal delay={0.55} className="mt-8 max-w-xl">
                                <p
                                    className="text-pretty text-[17px] leading-[1.55] sm:text-lg"
                                    style={{ color: inkSoft }}
                                >
                                    Artling helps parents capture children&rsquo;s
                                    artwork the moment it&rsquo;s finished, keep the
                                    story alongside each piece, and revisit a
                                    childhood through timelines, milestones, sharing,
                                    and AI-assisted captions. Made by Flutterly.
                                </p>
                            </Reveal>

                            <Reveal
                                delay={0.7}
                                className="mt-10 flex flex-wrap items-center gap-4"
                            >
                                <Link
                                    href="https://apps.apple.com/us/app/artling"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5"
                                    style={{
                                        background: accent,
                                        boxShadow: "0 10px 30px rgba(242,120,75,0.35)",
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                        aria-hidden
                                    >
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <span>Get on the App Store</span>
                                    <ArrowUpRight
                                        size={14}
                                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </Link>
                                <Link
                                    href="#chapters"
                                    className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] transition-colors"
                                    style={{ color: inkSoft }}
                                >
                                    <span
                                        className="border-b pb-1 group-hover:border-current"
                                        style={{ borderColor: border }}
                                    >
                                        Read the notes
                                    </span>
                                </Link>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-5">
                            <motion.div
                                style={{ y: phoneY }}
                                className="relative mx-auto max-w-[380px]"
                            >
                                <div className="animate-mask-reveal relative">
                                    <Iphone17ProFrame>
                                        <ArtlingPhoneMockup />
                                    </Iphone17ProFrame>
                                </div>

                                <motion.div
                                    style={{ y: foxY }}
                                    animate={{ rotate: [0, -2, 0, 2, 0] }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="pointer-events-none absolute -bottom-4 -right-6 z-20 w-[140px] sm:w-[170px] md:w-[190px]"
                                >
                                    <Image
                                        src="/projects/artling/fox-painter.png"
                                        alt="Artling fox mascot"
                                        width={806}
                                        height={1129}
                                        priority
                                        className="h-auto w-full drop-shadow-[0_26px_40px_rgba(0,0,0,0.24)]"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    <div
                        className="mt-24 flex items-center justify-between border-t pt-5 font-mono text-[10px] uppercase tracking-[0.22em] sm:text-[11px]"
                        style={{ borderColor: border, color: inkTertiary }}
                    >
                        <p>Signed, Flutterly · 2025</p>
                        <p className="hidden sm:block">
                            Editorial № 02 · Artling dossier
                        </p>
                    </div>
                </div>
            </section>

            {/* ── TICKER ─────────────────────────────────────── */}
            <section
                aria-hidden
                className="relative overflow-hidden border-y py-6"
                style={{
                    background: ink,
                    color: paperCream,
                    borderColor: "#3D2A25",
                }}
            >
                <div className="flex w-max animate-marquee whitespace-nowrap">
                    {[...ticker, ...ticker].map((item, i) => (
                        <span
                            key={i}
                            className="mx-8 inline-flex items-center gap-8 font-display text-2xl italic sm:text-3xl"
                            style={{ color: "#F4D7C8" }}
                        >
                            {item}
                            <span
                                aria-hidden
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: accent }}
                            />
                        </span>
                    ))}
                </div>
            </section>

            {/* ── CHAPTERS (Three pillars) ─────────────────────────────────────── */}
            <section
                id="chapters"
                aria-labelledby="chapters-heading"
                className="relative px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-40"
                style={{ background: paper }}
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal
                        className="mb-16 grid grid-cols-1 items-end gap-6 border-b pb-8 sm:mb-20 md:grid-cols-12"
                        style={{ borderColor: border }}
                    >
                        <div className="md:col-span-7">
                            <p
                                className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]"
                                style={{ color: accent }}
                            >
                                № 02 · The three parts
                            </p>
                            <h2
                                id="chapters-heading"
                                className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] sm:text-5xl md:text-6xl"
                                style={{ color: ink }}
                            >
                                Capture. Story.
                                <br />
                                <span className="italic" style={{ color: inkSoft }}>
                                    Timeline.
                                </span>
                            </h2>
                        </div>
                        <div className="md:col-span-5">
                            <p
                                className="text-pretty text-[15px] leading-relaxed"
                                style={{ color: inkSoft }}
                            >
                                Artling is deliberately structured around three actions
                                you already take with your children&rsquo;s art — take
                                a picture, tell the story, look back later. Everything
                                else in the app supports one of those three.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {chapters.map((chapter, i) => (
                            <Reveal
                                key={chapter.no}
                                delay={i * 0.1}
                                as="article"
                                className="group relative flex flex-col overflow-hidden rounded-[32px] border p-8 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2"
                                style={{
                                    background: "rgba(255,255,255,0.72)",
                                    borderColor: "rgba(255,255,255,0.9)",
                                    boxShadow: "0 24px 80px rgba(69,40,28,0.08)",
                                }}
                            >
                                <div
                                    aria-hidden
                                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                                    style={{ background: `${chapter.accent}22` }}
                                />
                                <p
                                    className="relative mb-6 font-mono text-[10px] uppercase tracking-[0.28em]"
                                    style={{ color: chapter.accent }}
                                >
                                    № {chapter.no} · {chapter.eyebrow}
                                </p>
                                <div
                                    className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                                    style={{ background: `${chapter.accent}18` }}
                                >
                                    <chapter.icon
                                        size={26}
                                        strokeWidth={1.5}
                                        style={{ color: chapter.accent }}
                                    />
                                </div>
                                <h3
                                    className="relative font-display text-2xl font-medium leading-tight tracking-tight sm:text-[1.65rem]"
                                    style={{ color: ink }}
                                >
                                    {chapter.title}
                                </h3>
                                <p
                                    className="relative mt-4 text-[15px] leading-relaxed"
                                    style={{ color: inkSoft }}
                                >
                                    {chapter.body}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PULL QUOTE ─────────────────────────────────────── */}
            <section
                className="relative overflow-hidden border-y px-4 py-24 sm:px-6 sm:py-32 md:px-10"
                style={{ background: paperCream, borderColor: border }}
            >
                <div className="mx-auto max-w-4xl text-center">
                    <Reveal>
                        <span
                            aria-hidden
                            className="mb-4 block font-display text-[10rem] leading-none opacity-30"
                            style={{ color: accent }}
                        >
                            &ldquo;
                        </span>
                        <p
                            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light italic leading-[1.25] tracking-[-0.015em]"
                            style={{ color: ink }}
                        >
                            The best archive is the one you actually keep up with.
                            Artling turns twenty seconds after art class into a
                            memory that stays with the family forever.
                        </p>
                        <p
                            className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em]"
                            style={{ color: inkTertiary }}
                        >
                            — Notes from the design studio
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ── FEATURE GRID ─────────────────────────────────────── */}
            <section
                aria-labelledby="features-heading"
                className="relative px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-36"
                style={{ background: paper }}
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal
                        className="mb-14 grid grid-cols-1 items-end gap-6 border-b pb-8 md:grid-cols-12"
                        style={{ borderColor: border }}
                    >
                        <div className="md:col-span-7">
                            <p
                                className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]"
                                style={{ color: accent }}
                            >
                                № 03 · Inside the app
                            </p>
                            <h2
                                id="features-heading"
                                className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] sm:text-5xl md:text-6xl"
                                style={{ color: ink }}
                            >
                                Six ways{" "}
                                <span className="italic" style={{ color: inkSoft }}>
                                    it earns its place
                                </span>
                                <br />
                                on the home screen.
                            </h2>
                        </div>
                        <div className="md:col-span-5">
                            <p
                                className="text-pretty text-[15px] leading-relaxed"
                                style={{ color: inkSoft }}
                            >
                                Capture, organisation, memory resurfacing, and sharing
                                — in one calm workflow, so nothing needs to move
                                between photo albums, notes apps, or shoeboxes.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {featureCards.map((card, i) => (
                            <Reveal
                                key={card.title}
                                delay={i * 0.06}
                                as="article"
                                className="group rounded-[24px] border p-6 transition-transform duration-500 hover:-translate-y-1"
                                style={{
                                    background: paperCream,
                                    borderColor: border,
                                    boxShadow: "0 18px 40px rgba(92,63,51,0.05)",
                                }}
                            >
                                <div
                                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                                    style={{
                                        background: "#FCE6D8",
                                        color: accent,
                                    }}
                                >
                                    <card.icon size={20} strokeWidth={1.5} />
                                </div>
                                <h3
                                    className="font-display text-xl font-medium tracking-tight"
                                    style={{ color: ink }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="mt-3 text-[14px] leading-relaxed"
                                    style={{ color: inkSoft }}
                                >
                                    {card.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STACK ─────────────────────────────────────── */}
            <section
                aria-labelledby="stack-heading"
                className="relative border-t px-4 py-24 sm:px-6 sm:py-32 md:px-10"
                style={{ background: paperSand, borderColor: border }}
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal
                        className="mb-12 border-b pb-8 sm:mb-16"
                        style={{ borderColor: border }}
                    >
                        <p
                            className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]"
                            style={{ color: accent }}
                        >
                            № 04 · The stack
                        </p>
                        <h2
                            id="stack-heading"
                            className="max-w-3xl font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] sm:text-5xl md:text-6xl"
                            style={{ color: ink }}
                        >
                            What Artling is{" "}
                            <span className="italic" style={{ color: inkSoft }}>
                                built from.
                            </span>
                        </h2>
                    </Reveal>

                    <dl className="grid grid-cols-1 gap-y-0 sm:grid-cols-2 md:grid-cols-3">
                        {stack.map((row, i) => (
                            <Reveal
                                key={row.label}
                                delay={i * 0.05}
                                as="div"
                                className="flex flex-col gap-3 border-b py-6 sm:py-8"
                                style={{ borderColor: border }}
                            >
                                <dt
                                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                                    style={{ color: accent }}
                                >
                                    {row.label}
                                </dt>
                                <dd
                                    className="font-display text-lg leading-snug sm:text-xl"
                                    style={{ color: ink }}
                                >
                                    {row.items}
                                </dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ── PRIVACY LINK ─────────────────────────────────────── */}
            <section
                className="relative border-t px-4 py-24 sm:px-6 sm:py-32 md:px-10"
                style={{ background: paper, borderColor: border }}
            >
                <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12">
                    <Reveal className="lg:col-span-7">
                        <p
                            className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]"
                            style={{ color: accent }}
                        >
                            № 05 · Privacy
                        </p>
                        <h2
                            className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] sm:text-5xl md:text-[3.25rem]"
                            style={{ color: ink }}
                        >
                            Clear practices,{" "}
                            <span className="italic" style={{ color: inkSoft }}>
                                not vague reassurance.
                            </span>
                        </h2>
                        <p
                            className="mt-6 max-w-lg text-[15px] leading-relaxed sm:text-base"
                            style={{ color: inkSoft }}
                        >
                            Artling stores its core library on device and uses cloud
                            services only when sync, sharing, or AI captions require
                            them. The privacy policy documents Firebase auth, Sign in
                            with Apple, StoreKit purchases, notifications, and AI
                            processing plainly.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/projects/artling/privacy-policy"
                                className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5"
                                style={{ background: ink }}
                            >
                                Read the privacy policy
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-5">
                        <ul className="space-y-3">
                            {[
                                {
                                    icon: Cloud,
                                    label: "Cloud-ready",
                                    body: "Profiles, sync, and premium cloud content use Firebase.",
                                },
                                {
                                    icon: WandSparkles,
                                    label: "AI explained",
                                    body: "Caption generation runs via Firebase AI / Google AI when used.",
                                },
                                {
                                    icon: Tags,
                                    label: "Family controls",
                                    body: "Permissions, notifications, sharing, and deletion are documented plainly.",
                                },
                            ].map((row) => (
                                <li
                                    key={row.label}
                                    className="flex items-start gap-4 rounded-[22px] border p-4"
                                    style={{
                                        background: paperCream,
                                        borderColor: border,
                                    }}
                                >
                                    <div
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                                        style={{ background: "#FCE6D8", color: accent }}
                                    >
                                        <row.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-semibold"
                                            style={{ color: ink }}
                                        >
                                            {row.label}
                                        </p>
                                        <p
                                            className="mt-1 text-sm leading-6"
                                            style={{ color: inkSoft }}
                                        >
                                            {row.body}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ── FINAL CTA ─────────────────────────────────────── */}
            <section
                className="relative overflow-hidden px-4 py-32 text-center sm:px-6 md:px-10 md:py-40"
                style={{
                    background:
                        "linear-gradient(135deg, #F2784B 0%, #D96C43 42%, #B75734 100%)",
                    color: "#FFF8F1",
                }}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 78% 74%, rgba(0,0,0,0.28), transparent 42%)",
                    }}
                />
                <div className="relative mx-auto max-w-3xl">
                    <Reveal>
                        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                            Signed
                        </p>
                        <h2 className="font-display text-[clamp(2.5rem,7vw,5.75rem)] font-light leading-[0.95] tracking-[-0.03em] text-white">
                            Save the drawing.{" "}
                            <span className="italic text-white/80">
                                Keep the story.
                            </span>
                        </h2>
                        <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-white/85">
                            Free to download. iPhone and iPad. Made in Reading, UK for
                            families with fridge doors covered in art.
                        </p>
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="https://apps.apple.com/us/app/artling"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-xs font-bold uppercase tracking-[0.22em] transition-transform hover:-translate-y-0.5"
                                style={{ color: "#B75734" }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden
                                >
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                Download Artling
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </Link>
                            <Link
                                href="/#work"
                                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/85 transition-colors hover:text-white"
                            >
                                <span className="border-b border-white/30 pb-1 group-hover:border-white">
                                    ← Back to the ledger
                                </span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ArtlingPhoneMockup() {
    const galleryCards = [
        {
            title: "Rainbow House",
            meta: "Saved today",
            palette: "from-[#FFE8D8] via-[#FFF4EA] to-[#FFD5BE]",
            rotation: "-rotate-[2deg]",
        },
        {
            title: "Tiger Parade",
            meta: "Shared with Dad",
            palette: "from-[#FFEED9] via-[#FFF8EE] to-[#E4F3EA]",
            rotation: "rotate-[2deg]",
        },
        {
            title: "Rocket Garden",
            meta: "Favourite",
            palette: "from-[#EAF6FF] via-[#FFF7F1] to-[#FFDCCE]",
            rotation: "rotate-[-1.5deg]",
        },
        {
            title: "Ocean Parade",
            meta: "2 years ago",
            palette: "from-[#E7F4FF] via-[#FFF7F1] to-[#FDE6D6]",
            rotation: "rotate-[1.5deg]",
        },
    ];

    return (
        <div
            className="relative h-full w-full overflow-hidden rounded-[44px] px-5 pb-5 pt-6 text-[#2F211D]"
            style={{
                background:
                    "linear-gradient(180deg, #FFF8F0 0%, #FFF1E7 46%, #FFEBDD 100%)",
            }}
        >
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(242,120,75,0.18),transparent_70%)]" />
            <div className="absolute -right-10 top-24 h-32 w-32 rounded-full bg-[#F7C7A8]/40 blur-3xl" />
            <div className="absolute -left-8 bottom-32 h-28 w-28 rounded-full bg-[#A8D1B6]/35 blur-3xl" />

            <div className="relative flex items-center justify-between pt-9">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A46B53]">
                        Artling
                    </p>
                    <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.03em]">
                        Gallery
                    </h3>
                </div>
                <div className="rounded-full border border-[#ECD9CF] bg-white/80 px-3 py-2 text-[10px] font-semibold text-[#6E574D] shadow-sm">
                    2 children
                </div>
            </div>

            <div className="relative mt-4 flex gap-2 overflow-hidden">
                {["All", "Maya", "Noah", "Add"].map((chip, index) => (
                    <span
                        key={chip}
                        className={`rounded-full px-3 py-2 text-[10px] font-semibold shadow-sm ${
                            index === 0
                                ? "bg-[#F2784B] text-white"
                                : "border border-[#ECD9CF] bg-white/75 text-[#6E574D]"
                        }`}
                    >
                        {chip}
                    </span>
                ))}
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-3">
                {galleryCards.map((card) => (
                    <div
                        key={card.title}
                        className={`rounded-[24px] border border-white/80 bg-gradient-to-br ${card.palette} p-3 shadow-[0_12px_28px_rgba(96,67,54,0.10)] ${card.rotation}`}
                    >
                        <div className="rounded-[18px] bg-white/70 p-2">
                            <div className="aspect-[0.95/1] rounded-[14px] bg-[radial-gradient(circle_at_30%_25%,rgba(242,120,75,0.28),transparent_34%),radial-gradient(circle_at_72%_32%,rgba(111,175,209,0.22),transparent_32%),radial-gradient(circle_at_54%_72%,rgba(118,182,153,0.22),transparent_28%),linear-gradient(180deg,#FFF8F1_0%,#FBE6D8_100%)]" />
                        </div>
                        <p className="mt-3 text-[11px] font-semibold text-[#35251E]">
                            {card.title}
                        </p>
                        <p className="mt-1 text-[10px] text-[#7F665C]">{card.meta}</p>
                    </div>
                ))}
            </div>

            <div className="relative mt-4 rounded-[24px] border border-[#ECD9CF] bg-white/85 p-4 shadow-[0_18px_34px_rgba(96,67,54,0.08)]">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A46B53]">
                    <Clock3 className="h-4 w-4 text-[#F2784B]" />
                    On This Day
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#2F211D]">
                    Maya made &ldquo;Ocean Parade&rdquo; two years ago. Artling keeps
                    the memory next to the art.
                </p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-[26px] bg-[#2F211D] px-5 py-4 text-white shadow-[0_20px_44px_rgba(47,33,29,0.28)]">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                            Quick capture
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            Camera, gallery, or scanner
                        </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2784B] shadow-[0_10px_24px_rgba(242,120,75,0.35)]">
                        <Camera className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
