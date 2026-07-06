"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight, Watch, Command } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LedgerBar, LiveDot } from "@/components/ui/LedgerBar";
import { Reveal, MaskedLines, defaultEase } from "@/components/motion/Reveal";

const chapters = [
    {
        no: "01",
        eyebrow: "AI Coach",
        title: "A hydration coach that never leaves the device.",
        body: "Sipli reads your streak, your beverage mix, your day. Apple Intelligence turns that into a nudge, a compliment, or a plan — privately, on your iPhone. No sign-in. No cloud round-trip.",
        image: "/images/sipli/iphone/02-coach-1320x2868.png",
        alt: "Sipli AI coach screen",
        pull: [
            "Context-aware advice based on your actual data",
            "Reads your beverage mix, streak, and schedule",
            "Runs entirely on-device — no cloud call",
            "Nudges you gently when the day slips",
        ],
    },
    {
        no: "02",
        eyebrow: "Beverages",
        title: "Not every sip is water — Sipli knows the difference.",
        body: "18+ beverages, each with an accurate hydration factor. Coffee counts, but only 80%. Sparkling water is a full pour. Soda barely rates. The maths is honest, so your day is too.",
        image: "/images/sipli/iphone/03-beverages-1320x2868.png",
        alt: "Sipli beverages screen",
        pull: [
            "18+ drinks with real hydration factors",
            "Custom drinks with your own values",
            "Quick-log favourites for the daily lineup",
            "Full breakdown per day, per week",
        ],
    },
    {
        no: "03",
        eyebrow: "Insights",
        title: "A dashboard you actually want to open.",
        body: "Weekly charts, a heatmap that reads like a habit calendar, streaks, and week-over-week trends. Insights are quiet by default — they show up when there is something worth saying.",
        image: "/images/sipli/iphone/04-insights-1320x2868.png",
        alt: "Sipli insights screen",
        pull: [
            "Weekly & monthly bar charts",
            "Hydration heatmap calendar",
            "Current & longest streaks",
            "Week-over-week trends",
        ],
    },
    {
        no: "04",
        eyebrow: "Diary",
        title: "Every day, captured — and easy to walk back through.",
        body: "Tap any date to see exactly what you drank, when, and how close you got to goal. Perfect for spotting the patterns behind a good week and the ones behind a rough one.",
        image: "/images/sipli/iphone/06-diary-1320x2868.jpg",
        alt: "Sipli diary screen",
        pull: [
            "Browse any past date in a single tap",
            "Full log of every beverage and time",
            "Goal progress and completion by day",
            "Syncs with Apple Health history",
        ],
    },
    {
        no: "05",
        eyebrow: "Widgets",
        title: "The bit of hydration you glance at without opening the app.",
        body: "Home screen widgets in small, medium, and large. Lock screen widgets for the wrist-flick check. Tap-to-log so a sip takes a second, not a screen.",
        image: "/images/sipli/iphone/07-widgets-1320x2868.jpg",
        alt: "Sipli widgets screen",
        pull: [
            "Home screen widgets, three sizes",
            "Lock screen widgets for a glance",
            "Tap-to-log quick add",
            "Live progress ring, real time",
        ],
    },
];

const stack = [
    { label: "Platforms", items: "iOS · iPadOS" },
    { label: "Language", items: "Swift · SwiftUI" },
    { label: "AI", items: "Apple Intelligence · on-device" },
    { label: "Data", items: "SwiftData · HealthKit · WeatherKit" },
    { label: "Widgets", items: "WidgetKit · Live Activities" },
    { label: "Distribution", items: "App Store · Free" },
];

const ticker = [
    "Free on the App Store",
    "iOS 18+",
    "iPhone & iPad",
    "On-device AI",
    "18+ beverages",
    "HealthKit sync",
    "Weather-adaptive",
    "No sign-in",
    "No tracking",
    "Made in Reading, UK",
];

export default function SipliPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroImageY = useSpring(
        useTransform(heroProgress, [0, 1], [0, -120]),
        { stiffness: 140, damping: 22 }
    );
    const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.08]);

    return (
        <main className="sipli-theme min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative overflow-hidden px-4 pt-24 pb-14 sm:px-6 sm:pt-32 md:px-10 md:pt-36"
                aria-label="Sipli — an AI hydration coach for iPhone and iPad"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[1200px] -translate-x-1/2 opacity-[0.06] md:block"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, rgba(200,228,255,0.35) 1px, transparent 1px)",
                        backgroundSize: "calc(100% / 12) 100%",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/3 right-[-10%] h-[600px] w-[600px] rounded-full"
                    style={{
                        background: "rgba(77,212,232,0.10)",
                        filter: "blur(140px)",
                    }}
                />

                <div className="relative mx-auto max-w-[1200px]">
                    <Reveal y={0} duration={0.4} className="mb-8 sm:mb-10">
                        <Link
                            href="/#work"
                            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-secondary transition-colors hover:text-accent sm:text-[11px]"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform group-hover:-translate-x-0.5"
                            />
                            Back to the ledger
                        </Link>
                    </Reveal>

                    <LedgerBar
                        cells={[
                            { label: "Project", value: "Sipli" },
                            { label: "Year", value: "2025 — ongoing" },
                            { label: "Platforms", value: "iOS · iPadOS" },
                            { label: "Status", value: <LiveDot label="Live on App Store" /> },
                        ]}
                    />

                    <div className="mt-16 grid grid-cols-1 items-center gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7">
                            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                                № 01 · The Project
                            </p>
                            <h1 className="font-display text-[clamp(2.75rem,8vw,6.75rem)] font-light leading-[0.94] tracking-[-0.035em] text-foreground">
                                <span className="block">
                                    <MaskedLines text="Sipli." />
                                </span>
                                <span className="block italic text-foreground-secondary">
                                    <MaskedLines text="Drink water," delay={0.15} />
                                </span>
                                <span className="block">
                                    <MaskedLines text="intelligently." delay={0.3} />
                                </span>
                            </h1>

                            <Reveal delay={0.6} className="mt-8 max-w-xl">
                                <p className="text-pretty text-[17px] leading-[1.55] text-foreground-secondary sm:text-lg">
                                    A hydration coach for iPhone and iPad, powered by
                                    on-device Apple Intelligence. 18+ beverages tracked
                                    accurately, adaptive goals that read the weather and
                                    your activity, widgets, and a diary that keeps the
                                    whole week within reach. Made by Flutterly.
                                </p>
                            </Reveal>

                            <Reveal
                                delay={0.75}
                                className="mt-10 flex flex-wrap items-center gap-4"
                            >
                                <Link
                                    href="https://apps.apple.com/us/app/sipli/id6758851574"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-background transition-colors hover:bg-accent-hover"
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
                                    className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground-secondary transition-colors hover:text-foreground"
                                >
                                    <span className="border-b border-border pb-1 group-hover:border-foreground">
                                        Read the notes
                                    </span>
                                </Link>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-5">
                            <motion.div
                                style={{ y: heroImageY, scale: heroImageScale }}
                                className="relative mx-auto w-[260px] sm:w-[300px] md:w-[340px]"
                            >
                                <div
                                    aria-hidden
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: "rgba(77,212,232,0.20)",
                                        filter: "blur(90px)",
                                        transform: "scale(0.7)",
                                    }}
                                />
                                <div className="animate-mask-reveal relative overflow-hidden rounded-[36px]">
                                    <Image
                                        src="/images/sipli/iphone/01-hero-1320x2868.png"
                                        alt="Sipli home screen"
                                        width={1320}
                                        height={2868}
                                        priority
                                        className="relative h-auto w-full"
                                        style={{
                                            filter:
                                                "drop-shadow(0 40px 80px rgba(0,0,0,0.85))",
                                        }}
                                    />
                                </div>
                                <span
                                    aria-hidden
                                    className="absolute -left-4 -top-4 h-10 w-10 border-l border-t border-accent/60"
                                />
                                <span
                                    aria-hidden
                                    className="absolute -bottom-4 -right-4 h-10 w-10 border-b border-r border-accent/60"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-24 flex items-center justify-between border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:text-[11px]">
                        <p>Signed, Flutterly · 2025</p>
                        <p className="hidden sm:block">
                            Editorial № 01 · Sipli dossier
                        </p>
                    </div>
                </div>
            </section>

            {/* ── TICKER ─────────────────────────────────────── */}
            <section
                aria-hidden
                className="relative overflow-hidden border-y border-border bg-surface py-6"
            >
                <div className="flex w-max animate-marquee whitespace-nowrap">
                    {[...ticker, ...ticker].map((item, i) => (
                        <span
                            key={i}
                            className="mx-8 inline-flex items-center gap-8 font-display text-2xl italic text-foreground-secondary sm:text-3xl"
                        >
                            {item}
                            <span
                                aria-hidden
                                className="h-1.5 w-1.5 rounded-full bg-accent"
                            />
                        </span>
                    ))}
                </div>
            </section>

            {/* ── CHAPTERS ─────────────────────────────────────── */}
            <section
                id="chapters"
                aria-labelledby="chapters-heading"
                className="relative bg-background px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-40"
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal className="mb-16 grid grid-cols-1 items-end gap-6 border-b border-border pb-8 sm:mb-24 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                                № 02 · Notes on the product
                            </p>
                            <h2
                                id="chapters-heading"
                                className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
                            >
                                Five short chapters
                                <br />
                                <span className="italic text-foreground-secondary">
                                    from the studio floor.
                                </span>
                            </h2>
                        </div>
                        <div className="md:col-span-5">
                            <p className="text-pretty text-[15px] leading-relaxed text-foreground-secondary">
                                Sipli was built to solve a small, personal itch: none of
                                the hydration apps we tried felt like they trusted the
                                person using them. So we built one that does — and quietly
                                learns them, too.
                            </p>
                        </div>
                    </Reveal>

                    <div className="space-y-24 sm:space-y-32 md:space-y-40">
                        {chapters.map((chapter, i) => (
                            <Chapter
                                key={chapter.no}
                                chapter={chapter}
                                flip={i % 2 === 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ON THE SHELF (Gallery) ─────────────────────────────────────── */}
            <section
                aria-labelledby="shelf-heading"
                className="relative overflow-hidden border-t border-border bg-background-secondary px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-40"
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal className="mb-16 border-b border-border pb-8 sm:mb-20">
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                            № 03 · On the shelf
                        </p>
                        <h2
                            id="shelf-heading"
                            className="max-w-3xl font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
                        >
                            Every screen{" "}
                            <span className="italic text-foreground-secondary">
                                built with the same patience.
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1} className="mb-16 flex justify-center sm:mb-20">
                        <div className="relative w-full max-w-[700px]">
                            <div
                                aria-hidden
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: "rgba(77,212,232,0.10)",
                                    filter: "blur(90px)",
                                    transform: "scale(0.85)",
                                }}
                            />
                            <div className="animate-mask-reveal relative overflow-hidden rounded-3xl">
                                <Image
                                    src="/images/sipli/ipad/02-ipad-insights-1668x2388.png"
                                    alt="Sipli insights on iPad"
                                    width={1668}
                                    height={2388}
                                    className="relative h-auto w-full"
                                    style={{
                                        filter:
                                            "drop-shadow(0 40px 80px rgba(0,0,0,0.85))",
                                    }}
                                />
                            </div>
                        </div>
                    </Reveal>

                    <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6 md:gap-10">
                        {[
                            "/images/sipli/iphone/05-breakdown-1320x2868.jpg",
                            "/images/sipli/iphone/08-more-1320x2868.jpg",
                            "/images/sipli/iphone/07-widgets-1320x2868.jpg",
                        ].map((src, i) => (
                            <Reveal
                                key={src}
                                delay={0.1 + i * 0.1}
                                className="relative w-[45%] max-w-[220px] sm:w-[220px] md:w-[240px]"
                            >
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: defaultEase,
                                    }}
                                    className="relative"
                                >
                                    <div
                                        aria-hidden
                                        className="absolute inset-0 rounded-3xl"
                                        style={{
                                            background: "rgba(77,212,232,0.10)",
                                            filter: "blur(50px)",
                                            transform: "scale(0.7)",
                                        }}
                                    />
                                    <Image
                                        src={src}
                                        alt=""
                                        width={1320}
                                        height={2868}
                                        className="relative h-auto w-full rounded-3xl"
                                        style={{
                                            filter:
                                                "drop-shadow(0 30px 60px rgba(0,0,0,0.75))",
                                        }}
                                    />
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STACK ─────────────────────────────────────── */}
            <section
                aria-labelledby="stack-heading"
                className="relative border-t border-border bg-background px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-40"
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal className="mb-14 border-b border-border pb-8 sm:mb-20">
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                            № 04 · The stack
                        </p>
                        <h2
                            id="stack-heading"
                            className="max-w-3xl font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
                        >
                            What Sipli is{" "}
                            <span className="italic text-foreground-secondary">
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
                                className="group flex flex-col gap-3 border-b border-border py-6 sm:py-8"
                            >
                                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                                    {row.label}
                                </dt>
                                <dd className="font-display text-lg leading-snug text-foreground sm:text-xl">
                                    {row.items}
                                </dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ── ROADMAP ─────────────────────────────────────── */}
            <section
                aria-labelledby="roadmap-heading"
                className="relative overflow-hidden border-t border-border bg-background-secondary px-4 py-24 sm:px-6 sm:py-32 md:px-10 md:py-40"
            >
                <div className="mx-auto max-w-[1200px]">
                    <Reveal className="mb-14 grid grid-cols-1 items-end gap-6 border-b border-border pb-8 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                                № 05 · What&rsquo;s next
                            </p>
                            <h2
                                id="roadmap-heading"
                                className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
                            >
                                On the bench{" "}
                                <span className="italic text-foreground-secondary">
                                    for the next release.
                                </span>
                            </h2>
                        </div>
                        <div className="md:col-span-5">
                            <p className="text-pretty text-[15px] leading-relaxed text-foreground-secondary">
                                Sipli ships in small, frequent updates. Here is what
                                we&rsquo;re working on right now — dates approximate,
                                intent firm.
                            </p>
                        </div>
                    </Reveal>

                    <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                        {[
                            {
                                icon: Watch,
                                title: "Apple Watch companion",
                                body: "Log drinks from the wrist. Complications on every face. Coming spring 2026.",
                            },
                            {
                                icon: Command,
                                title: "Siri Shortcuts",
                                body: "Automate logging with any morning routine, workout, or focus mode. Coming summer 2026.",
                            },
                        ].map((item, i) => (
                            <Reveal
                                key={item.title}
                                delay={i * 0.1}
                                as="li"
                                className="group flex items-start gap-6 border-t border-border py-8 sm:gap-8 sm:py-10"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent-muted text-accent">
                                    <item.icon size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground-secondary">
                                        {item.body}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── CLOSING CTA ─────────────────────────────────────── */}
            <section className="relative overflow-hidden border-t border-border bg-background px-4 py-32 text-center sm:px-6 md:px-10 md:py-44">
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        background: "rgba(77,212,232,0.12)",
                        filter: "blur(150px)",
                    }}
                />
                <div className="relative mx-auto max-w-2xl">
                    <Reveal>
                        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                            Signed
                        </p>
                        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-foreground">
                            Try Sipli.{" "}
                            <span className="italic text-foreground-secondary">
                                Free, on the App Store.
                            </span>
                        </h2>
                        <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-foreground-secondary">
                            iPhone and iPad · iOS 18.0 or later · No sign-in · No
                            tracking · Made in Reading, UK.
                        </p>
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="https://apps.apple.com/us/app/sipli/id6758851574"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-xs font-bold uppercase tracking-[0.22em] text-background transition-colors hover:bg-accent-hover"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden
                                >
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                Download Sipli
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </Link>
                            <Link
                                href="/#work"
                                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground-secondary transition-colors hover:text-foreground"
                            >
                                <span className="border-b border-border pb-1 group-hover:border-foreground">
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

function Chapter({
    chapter,
    flip,
}: {
    chapter: (typeof chapters)[number];
    flip: boolean;
}) {
    return (
        <article className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12 lg:gap-20">
            <div
                className={`${
                    flip ? "lg:col-start-8" : "lg:col-start-1"
                } lg:col-span-5`}
            >
                <Reveal y={40} duration={0.9}>
                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.5, ease: defaultEase }}
                        className="relative mx-auto w-[240px] sm:w-[280px] md:w-[320px]"
                    >
                        <div
                            aria-hidden
                            className="absolute inset-0 rounded-3xl"
                            style={{
                                background: "rgba(77,212,232,0.14)",
                                filter: "blur(70px)",
                                transform: "scale(0.7)",
                            }}
                        />
                        <Image
                            src={chapter.image}
                            alt={chapter.alt}
                            width={1320}
                            height={2868}
                            className="relative h-auto w-full rounded-3xl"
                            style={{
                                filter:
                                    "drop-shadow(0 40px 70px rgba(0,0,0,0.8))",
                            }}
                        />
                    </motion.div>
                </Reveal>
            </div>

            <div
                className={`${
                    flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"
                } lg:col-span-6`}
            >
                <Reveal>
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                        № {chapter.no} · {chapter.eyebrow}
                    </p>
                    <h3 className="font-display text-3xl font-light leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[2.75rem]">
                        <MaskedLines text={chapter.title} />
                    </h3>
                    <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-foreground-secondary sm:text-base">
                        {chapter.body}
                    </p>
                    <ul
                        role="list"
                        className="mt-8 divide-y divide-border border-t border-border"
                    >
                        {chapter.pull.map((line, i) => (
                            <li
                                key={line}
                                className="flex items-baseline gap-5 py-3.5 sm:gap-6"
                            >
                                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                                    0{i + 1}
                                </span>
                                <span className="text-[14px] leading-relaxed text-foreground-secondary sm:text-[15px]">
                                    {line}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </article>
    );
}
