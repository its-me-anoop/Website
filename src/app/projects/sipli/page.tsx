"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowLeft,
    Droplets,
    Zap,
    Bell,
    Heart,
    Shield,
    Calendar,
    Smartphone,
    Check,
    Sparkles,
    CloudRain,
    Watch,
    Command,
    ChevronRight,
    Star,
    Leaf,
} from "lucide-react";

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.11, delayChildren: 0.05 },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

const floatIn: Variants = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

function AppStoreBadge({ className = "" }: { className?: string }) {
    return (
        <Link
            href="https://apps.apple.com/us/app/sipli-water-tracker/id6758851574"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 bg-accent text-background font-sans rounded-[14px] px-7 py-4 hover:bg-accent-hover transition-all duration-200 hover:scale-[1.02] ${className}`}
        >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div>
                <div className="text-[10px] leading-tight opacity-60">Download on the</div>
                <div className="text-base font-semibold leading-tight">App Store</div>
            </div>
        </Link>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-accent-muted text-accent border border-accent/20 mb-6">
            {children}
        </div>
    );
}

function CheckItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-muted border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-accent" />
            </div>
            <p className="text-sm text-foreground-secondary leading-relaxed">{children}</p>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */

export default function SipliPage() {
    return (
        <main className="sipli-theme min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-28 pb-20 px-6 md:px-14 min-h-[92vh] flex items-center overflow-hidden">
                <div
                    className="absolute top-[5%] right-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.07)", filter: "blur(130px)" }}
                    aria-hidden
                />
                <div
                    className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.05)", filter: "blur(100px)" }}
                    aria-hidden
                />

                <div className="relative z-10 max-w-[1200px] mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="mb-12"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-accent transition-colors group min-h-[44px]"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Text */}
                        <motion.div initial="hidden" animate="visible" variants={stagger}>
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-accent-muted text-accent border border-accent/20">
                                    <Droplets className="w-3 h-3" />
                                    Version 3.0 · Free
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-teal-muted text-teal border border-teal/20">
                                    <Watch className="w-3 h-3" />
                                    New on Apple Watch
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="font-display font-medium tracking-[-0.035em] leading-[1.04] mb-3 text-foreground"
                                style={{ fontSize: "clamp(3.25rem, 7vw, 5.5rem)" }}
                            >
                                Sipli
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="font-display font-light tracking-tight text-accent mb-6 leading-snug"
                                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)" }}
                            >
                                Stay Hydrated, Effortlessly.
                            </motion.p>

                            <motion.p
                                variants={fadeInUp}
                                className="text-base text-foreground-secondary leading-relaxed max-w-[420px] mb-8"
                            >
                                Adaptive goals that flex with your body, weather, and
                                workouts. Now on Apple Watch — log a sip in one tap from
                                your wrist. 35+ beverages, on-device AI coaching, and
                                reminders that think with you, not at you.
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            >
                                <AppStoreBadge />
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                                    ))}
                                    <span className="text-sm text-foreground-secondary ml-2">
                                        Free on the App Store
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Hero screenshot */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={floatIn}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative w-[270px] md:w-[300px] flex-shrink-0">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.18)", filter: "blur(80px)", transform: "scale(0.75)" }}
                                />
                                <Image
                                    src="/images/sipli/iphone/01-hero-1320x2868.png"
                                    alt="Sipli app — home screen"
                                    width={1320}
                                    height={2868}
                                    className="relative w-full h-auto rounded-3xl"
                                    style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.85))" }}
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FEATURE STRIP ── */}
            <section className="py-14 px-6 md:px-14 border-y border-border bg-surface">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { icon: Watch,     label: "Apple Watch",   desc: "One-tap logging on your wrist" },
                            { icon: Sparkles,  label: "AI Coaching",   desc: "On-device Apple Intelligence" },
                            { icon: Droplets,  label: "35+ Beverages", desc: "Science-backed hydration factors" },
                            { icon: Heart,     label: "HealthKit Sync",desc: "Two-way Apple Health sync" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="flex flex-col items-center text-center gap-3 py-6 px-4 rounded-2xl border border-border hover:border-accent/30 transition-colors duration-300 bg-background/60"
                            >
                                <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-0.5">{item.label}</p>
                                    <p className="text-xs text-foreground-tertiary">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── APPLE WATCH (NEW IN 3.0) ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background-secondary relative overflow-hidden">
                <div
                    className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.08)", filter: "blur(130px)" }}
                    aria-hidden
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-teal-muted text-teal border border-teal/20 mb-6">
                                <Sparkles className="w-3 h-3" /> New in 3.0
                            </div>
                            <h2
                                className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                            >
                                Sipli on{" "}
                                <span className="text-accent">your wrist.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-7 max-w-[440px]">
                                A brand-new Apple Watch app. Log a sip in one tap, glance
                                at your progress ring from any watch face, and celebrate
                                goal-met trophies right where you&apos;ll see them.
                            </p>
                            <div className="space-y-3.5">
                                <CheckItem>One-tap logging for water, coffee, tea — whatever you&apos;re drinking</CheckItem>
                                <CheckItem>Live progress ring complication on your watch face</CheckItem>
                                <CheckItem>Smart Stack widgets in small, medium, and large</CheckItem>
                                <CheckItem>Full two-way sync with iPhone and Apple Health — instant</CheckItem>
                                <CheckItem>Goal-met trophy on your wrist, right when you hit it</CheckItem>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.20)", filter: "blur(90px)", transform: "scale(0.85)" }}
                                />
                                <div
                                    className="relative rounded-[56px] border-[6px] border-[#1a2332] shadow-2xl flex items-center justify-center"
                                    style={{
                                        width: "260px",
                                        height: "310px",
                                        background: "linear-gradient(145deg, #0a1420 0%, #0f1d2e 100%)",
                                        boxShadow:
                                            "0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
                                    }}
                                    aria-hidden
                                >
                                    {/* Digital crown hint */}
                                    <div
                                        className="absolute top-12 right-[-8px] w-3 h-16 rounded-r-md"
                                        style={{ background: "linear-gradient(90deg, #1a2332, #252f3d)" }}
                                    />
                                    <div
                                        className="absolute bottom-12 right-[-6px] w-2.5 h-10 rounded-r-md"
                                        style={{ background: "linear-gradient(90deg, #1a2332, #252f3d)" }}
                                    />

                                    {/* Watch face content */}
                                    <div className="relative w-[200px] h-[240px] flex flex-col items-center justify-center">
                                        {/* Progress ring */}
                                        <div className="relative w-[150px] h-[150px] mb-3">
                                            <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                                                <circle
                                                    cx="75"
                                                    cy="75"
                                                    r="62"
                                                    fill="none"
                                                    stroke="rgba(77,212,232,0.15)"
                                                    strokeWidth="10"
                                                />
                                                <circle
                                                    cx="75"
                                                    cy="75"
                                                    r="62"
                                                    fill="none"
                                                    stroke="#4dd4e8"
                                                    strokeWidth="10"
                                                    strokeLinecap="round"
                                                    strokeDasharray="389"
                                                    strokeDashoffset="97"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <Droplets className="w-7 h-7 text-accent mb-1" />
                                                <div className="text-foreground font-display font-semibold text-xl leading-none">
                                                    1.9L
                                                </div>
                                                <div className="text-foreground-tertiary text-[10px] mt-1 tracking-wider uppercase">
                                                    of 2.4L
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-muted border border-accent/20">
                                            <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                                            <span className="text-[9px] font-semibold tracking-widest uppercase text-accent">
                                                12 day streak
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── EARTH WEEK ── */}
            <section className="py-24 md:py-32 px-6 md:px-14 bg-background-secondary relative overflow-hidden">
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: "rgba(56,158,107,0.10)", filter: "blur(140px)" }}
                    aria-hidden
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                    >
                        {/* Banner Card */}
                        <motion.div
                            variants={scaleIn}
                            className="relative rounded-[32px] overflow-hidden p-10 md:p-14 lg:p-16"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgb(56,158,107) 0%, rgb(20,115,77) 55%, rgb(10,77,56) 100%)",
                            }}
                        >
                            <div
                                className="absolute -top-20 -right-16 w-72 h-72 rounded-full pointer-events-none"
                                style={{ background: "rgba(255,255,255,0.08)", filter: "blur(60px)" }}
                                aria-hidden
                            />
                            <div
                                className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full pointer-events-none"
                                style={{ background: "rgba(0,0,0,0.18)", filter: "blur(80px)" }}
                                aria-hidden
                            />

                            <div className="relative max-w-[640px]">
                                <motion.div variants={fadeInUp}>
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-white/20 text-white border border-white/20 mb-6 backdrop-blur-sm">
                                        <Leaf className="w-3 h-3" />
                                        Earth Week 2026 · Apr 20–26
                                    </span>
                                </motion.div>

                                <motion.h2
                                    variants={fadeInUp}
                                    className="font-display font-medium tracking-[-0.025em] leading-[1.05] mb-5 text-white"
                                    style={{ fontSize: "clamp(2.25rem, 4.8vw, 3.75rem)" }}
                                >
                                    Every sip,{" "}
                                    <span className="italic font-light text-white/90">
                                        less plastic.
                                    </span>
                                </motion.h2>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-white/85 leading-relaxed mb-8 max-w-[480px]"
                                >
                                    From April 20 to 26, Sipli joins Earth Week with a quiet
                                    in-app moment for the refill habit — a shareable Refill
                                    Pledge, a leaf-green home banner, and an Insights tile
                                    that counts every sip you log during the week.
                                </motion.p>

                                <motion.blockquote
                                    variants={fadeInUp}
                                    className="border-l-2 border-white/40 pl-5 mb-9"
                                >
                                    <p
                                        className="font-display italic text-white leading-snug"
                                        style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
                                    >
                                        “I pledge to refill, not rebuy, this Earth Week.”
                                    </p>
                                    <p className="text-white/70 text-xs mt-2 tracking-wide uppercase font-semibold">
                                        The Sipli Refill Pledge
                                    </p>
                                </motion.blockquote>

                                <motion.div variants={fadeInUp}>
                                    <AppStoreBadge />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* What's inside */}
                        <motion.div
                            variants={stagger}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                        >
                            {[
                                {
                                    title: "Refill Pledge",
                                    desc: "A shareable pledge card — exported straight from your device. No accounts, no cloud.",
                                },
                                {
                                    title: "Earth Week banner",
                                    desc: "A leaf-green card on the Dashboard from April 20 through the 26th, dismissible any time.",
                                },
                                {
                                    title: "Sips this Earth Week",
                                    desc: "A dedicated Insights tile that quietly counts every drink you log during the week.",
                                },
                                {
                                    title: "Why reusable bottles",
                                    desc: "Year-round in Settings — the honest case for tap water, reusable bottles, and habit over hype.",
                                },
                            ].map((f, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="p-6 rounded-2xl border border-border bg-surface hover:border-border-strong transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: "rgba(56,158,107,0.14)" }}
                                        >
                                            <Leaf
                                                className="w-4 h-4"
                                                style={{ color: "rgb(56,158,107)" }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-display font-semibold mb-1.5 text-foreground tracking-tight">
                                                {f.title}
                                            </h4>
                                            <p className="text-sm text-foreground-secondary leading-relaxed">
                                                {f.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xs text-foreground-tertiary text-center mt-8 max-w-[520px] mx-auto leading-relaxed"
                        >
                            Sipli doesn’t count bottles saved or fabricate eco-metrics. It
                            just helps you notice each sip — and noticing is usually what
                            makes a habit stick.
                        </motion.p>
                    </motion.div>
                </div>
            </section>


            {/* ── AI COACH ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background relative overflow-hidden">
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.06)", filter: "blur(120px)" }}
                    aria-hidden
                />
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <motion.div
                            variants={scaleIn}
                            className="flex justify-center lg:justify-start order-2 lg:order-1"
                        >
                            <div className="relative w-[260px] md:w-[285px] flex-shrink-0">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.14)", filter: "blur(70px)", transform: "scale(0.75)" }}
                                />
                                <Image
                                    src="/images/sipli/iphone/02-coach-1320x2868.png"
                                    alt="Sipli AI Coach"
                                    width={1320}
                                    height={2868}
                                    className="relative w-full h-auto rounded-3xl"
                                    style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.75))" }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                            <SectionLabel>
                                <Sparkles className="w-3 h-3" /> AI Coach
                            </SectionLabel>
                            <h2
                                className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                            >
                                Your personal{" "}
                                <span className="text-accent">hydration coach.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-7 max-w-[420px]">
                                Powered by on-device Apple Intelligence, the AI Coach
                                analyzes your habits and delivers personalized tips —
                                privately, without ever leaving your device.
                            </p>
                            <div className="space-y-3.5">
                                <CheckItem>Context-aware advice based on your actual data</CheckItem>
                                <CheckItem>Understands your beverage mix, streak, and schedule</CheckItem>
                                <CheckItem>Completely private — processed on-device only</CheckItem>
                                <CheckItem>Smart nudges when you fall behind your daily goal</CheckItem>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── BEVERAGES ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background-secondary relative overflow-hidden">
                <div
                    className="absolute left-[-5%] top-1/3 w-[450px] h-[450px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.05)", filter: "blur(100px)" }}
                    aria-hidden
                />
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <SectionLabel>
                                <Droplets className="w-3 h-3" /> Beverages
                            </SectionLabel>
                            <h2
                                className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                            >
                                Not just water —{" "}
                                <span className="text-accent">every sip counts.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-7 max-w-[420px]">
                                Track 35+ drinks with science-backed hydration factors —
                                specialty coffees, teas, matcha, kombucha, plant milks,
                                juices, sports drinks, and more. Caffeine and alcohol are
                                accounted for, so a cold brew doesn&apos;t count like water.
                            </p>
                            <motion.div variants={stagger} className="flex flex-wrap gap-2">
                                {[
                                    { name: "Water",        pct: "100%" },
                                    { name: "Sparkling",    pct: "100%" },
                                    { name: "Herbal Tea",   pct: "100%" },
                                    { name: "Coconut Water",pct: "95%"  },
                                    { name: "Matcha",       pct: "90%"  },
                                    { name: "Kombucha",     pct: "90%"  },
                                    { name: "Plant Milk",   pct: "90%"  },
                                    { name: "Green Tea",    pct: "90%"  },
                                    { name: "Cold Brew",    pct: "80%"  },
                                    { name: "Cappuccino",   pct: "80%"  },
                                    { name: "Sports Drink", pct: "80%"  },
                                    { name: "+ 25 more",    pct: ""     },
                                ].map((b) => (
                                    <motion.span
                                        key={b.name}
                                        variants={fadeInUp}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border text-foreground-secondary hover:border-border-strong transition-colors"
                                    >
                                        {b.name}
                                        {b.pct && (
                                            <span className="text-accent font-bold">{b.pct}</span>
                                        )}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div variants={scaleIn} className="flex justify-center lg:justify-end">
                            <div className="relative w-[260px] md:w-[285px] flex-shrink-0">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.14)", filter: "blur(70px)", transform: "scale(0.75)" }}
                                />
                                <Image
                                    src="/images/sipli/iphone/03-beverages-1320x2868.png"
                                    alt="Sipli beverages screen"
                                    width={1320}
                                    height={2868}
                                    className="relative w-full h-auto rounded-3xl"
                                    style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.75))" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── INSIGHTS (iPad showcase) ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background relative overflow-hidden">
                <div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(77,212,232,0.06), transparent)" }}
                    aria-hidden
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-14"
                    >
                        <motion.div variants={fadeInUp}>
                            <SectionLabel>Insights</SectionLabel>
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                        >
                            Understand your{" "}
                            <span className="text-accent">habits.</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-foreground-secondary max-w-[480px] mx-auto leading-relaxed"
                        >
                            Weekly charts, hydration heatmaps, beverage breakdowns, and
                            streak tracking — everything you need to stay consistent.
                        </motion.p>
                    </motion.div>

                    {/* iPad screenshot */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={scaleIn}
                        className="flex justify-center mb-14"
                    >
                        <div className="relative w-full max-w-[620px]">
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                style={{ background: "rgba(77,212,232,0.10)", filter: "blur(80px)", transform: "scale(0.85)" }}
                            />
                            <Image
                                src="/images/sipli/ipad/02-ipad-insights-1668x2388.png"
                                alt="Sipli insights on iPad"
                                width={1668}
                                height={2388}
                                className="relative w-full h-auto rounded-3xl"
                                style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.85))" }}
                            />
                        </div>
                    </motion.div>

                    {/* Feature chips */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto"
                    >
                        {[
                            "Weekly & monthly bar charts",
                            "Hydration heatmap calendar",
                            "Current & longest streaks",
                            "Week-over-week trends",
                            "Beverage breakdown chart",
                            "AI coaching tips",
                        ].map((feat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-surface border border-border"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                <span className="text-xs text-foreground-secondary">{feat}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── DIARY ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background-secondary relative overflow-hidden">
                <div
                    className="absolute right-[-5%] bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.05)", filter: "blur(100px)" }}
                    aria-hidden
                />
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <motion.div variants={fadeInUp} className="order-1">
                            <SectionLabel>
                                <Calendar className="w-3 h-3" /> Diary
                            </SectionLabel>
                            <h2
                                className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                            >
                                Every day,{" "}
                                <span className="text-accent">captured.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-7 max-w-[420px]">
                                Go back any day in your hydration history. See exactly
                                what you drank, when you drank it, and how close you got
                                to your goal — perfect for spotting patterns.
                            </p>
                            <div className="space-y-3.5">
                                <CheckItem>Browse any past date with a single tap</CheckItem>
                                <CheckItem>Full log of every beverage and time of day</CheckItem>
                                <CheckItem>See goal progress and completion for any date</CheckItem>
                                <CheckItem>Syncs seamlessly with Apple Health history</CheckItem>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="order-2 flex justify-center lg:justify-end"
                        >
                            <div className="relative w-[260px] md:w-[285px] flex-shrink-0">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.14)", filter: "blur(70px)", transform: "scale(0.75)" }}
                                />
                                <Image
                                    src="/images/sipli/iphone/06-diary-1320x2868.jpg"
                                    alt="Sipli diary screen"
                                    width={1320}
                                    height={2868}
                                    className="relative w-full h-auto rounded-3xl"
                                    style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.75))" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── WIDGETS ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(77,212,232,0.05), transparent)" }}
                    aria-hidden
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <motion.div
                            variants={scaleIn}
                            className="flex justify-center lg:justify-start order-2 lg:order-1"
                        >
                            <div className="relative w-[260px] md:w-[285px] flex-shrink-0">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.14)", filter: "blur(70px)", transform: "scale(0.75)" }}
                                />
                                <Image
                                    src="/images/sipli/iphone/07-widgets-1320x2868.jpg"
                                    alt="Sipli widgets"
                                    width={1320}
                                    height={2868}
                                    className="relative w-full h-auto rounded-3xl"
                                    style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.75))" }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="order-1 lg:order-2">
                            <SectionLabel>
                                <Smartphone className="w-3 h-3" /> Widgets
                            </SectionLabel>
                            <h2
                                className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                            >
                                Always within{" "}
                                <span className="text-accent">reach.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-7 max-w-[420px]">
                                Log a drink or check progress without opening the app.
                                Home screen and lock screen widgets keep your hydration
                                goal front and center at all times.
                            </p>
                            <div className="space-y-3.5">
                                <CheckItem>Home screen widgets in small, medium, and large</CheckItem>
                                <CheckItem>Lock screen widgets for instant glanceable data</CheckItem>
                                <CheckItem>Tap-to-log quick-add from your home screen</CheckItem>
                                <CheckItem>Live progress ring updates in real time</CheckItem>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── 3-PHONE GALLERY ── */}
            <section className="py-20 md:py-28 px-6 md:px-14 bg-background-secondary overflow-hidden">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-14"
                    >
                        <h2
                            className="font-display font-medium tracking-tight text-foreground"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            Beautifully crafted,{" "}
                            <span className="text-accent">every screen.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="flex items-end justify-center gap-4 md:gap-8"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="flex-shrink-0 mb-10"
                            style={{ width: "clamp(120px, 14vw, 180px)" }}
                        >
                            <Image
                                src="/images/sipli/iphone/04-insights-1320x2868.png"
                                alt="Sipli insights"
                                width={1320}
                                height={2868}
                                className="w-full h-auto rounded-3xl"
                                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.65))" }}
                            />
                        </motion.div>
                        <motion.div
                            variants={scaleIn}
                            className="relative flex-shrink-0"
                            style={{ width: "clamp(150px, 18vw, 230px)" }}
                        >
                            <div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{ background: "rgba(77,212,232,0.20)", filter: "blur(60px)", transform: "scale(0.7)" }}
                            />
                            <Image
                                src="/images/sipli/iphone/01-hero-1320x2868.png"
                                alt="Sipli home"
                                width={1320}
                                height={2868}
                                className="relative w-full h-auto rounded-3xl"
                                style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.85))" }}
                            />
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="flex-shrink-0 mb-10"
                            style={{ width: "clamp(120px, 14vw, 180px)" }}
                        >
                            <Image
                                src="/images/sipli/iphone/05-breakdown-1320x2868.jpg"
                                alt="Sipli breakdown"
                                width={1320}
                                height={2868}
                                className="w-full h-auto rounded-3xl"
                                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.65))" }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── FEATURES GRID ── */}
            <section className="py-28 md:py-36 px-6 md:px-14 bg-background">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-14"
                    >
                        <h2
                            className="font-display font-medium tracking-[-0.02em] text-foreground mb-3"
                            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                        >
                            Everything you{" "}
                            <span className="text-accent">need.</span>
                        </h2>
                        <p className="text-foreground-secondary max-w-[420px] mx-auto">
                            Smart reminders, weather-adjusted goals, HealthKit sync, and
                            a design crafted to delight.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {[
                            {
                                icon: Bell,
                                title: "Smart Reminders",
                                desc: "Rebuilt in 3.0. Pauses when you're ahead, nudges when you drift — no 2 a.m. buzzes, no pestering.",
                            },
                            {
                                icon: Heart,
                                title: "Apple Health Sync",
                                desc: "Two-way HealthKit sync. Reads workouts to adjust your goal, writes hydration data back automatically.",
                            },
                            {
                                icon: Shield,
                                title: "Privacy First",
                                desc: "No accounts, no cloud servers, no tracking. Your data stays on your device and only talks to Apple services.",
                            },
                            {
                                icon: CloudRain,
                                title: "Weather Adjusted",
                                desc: "On hot, humid days your goal automatically increases. Powered by WeatherKit — always accurate.",
                            },
                            {
                                icon: Smartphone,
                                title: "iPhone, iPad & Watch",
                                desc: "Full native support across iPhone, iPad, and Apple Watch with layouts optimised for every screen size.",
                            },
                            {
                                icon: Zap,
                                title: "Dark & Light Mode",
                                desc: "Follow your system theme or set a preference. Both modes are crafted with equal precision and care.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-surface rounded-2xl p-7 border border-border hover:border-border-strong transition-colors duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center mb-5">
                                    <item.icon className="w-5 h-5 text-accent" />
                                </div>
                                <h4 className="text-base font-display font-semibold mb-2.5 text-foreground tracking-tight">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-foreground-secondary leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── COMING SOON ── */}
            <section className="py-24 md:py-32 px-6 md:px-14 bg-background-secondary relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(77,212,232,0.04) 0%, transparent 60%)" }}
                    aria-hidden
                />
                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-teal-muted text-teal border border-teal/20 mb-6">
                                The Refill Pledge · Earth Week
                            </span>
                            <h2
                                className="font-display font-medium tracking-[-0.025em] leading-[1.08] mb-5 text-foreground"
                                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                            >
                                Refill,{" "}
                                <span className="text-accent">not rebuy.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-8 max-w-[420px]">
                                Every April, Sipli joins Earth Week with the Refill Pledge —
                                a simple idea: track each refill and watch a quiet daily
                                habit keep plastic bottles out of your hand.
                            </p>
                            <div className="space-y-3">
                                {[
                                    {
                                        icon: Droplets,
                                        label: "Refill Counter",
                                        desc: "Every reusable fill adds up over the week",
                                    },
                                    {
                                        icon: Command,
                                        label: "Shortcuts Support",
                                        desc: "On the roadmap — automate logging with Siri",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface hover:border-border-strong transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">{item.label}</p>
                                            <p className="text-xs text-foreground-tertiary mt-0.5">{item.desc}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-foreground-tertiary ml-auto" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={scaleIn} className="flex justify-center lg:justify-end">
                            <div className="relative w-[260px] md:w-[285px] flex-shrink-0">
                                <div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{ background: "rgba(77,212,232,0.10)", filter: "blur(70px)", transform: "scale(0.75)" }}
                                />
                                <Image
                                    src="/images/sipli/iphone/08-more-1320x2868.jpg"
                                    alt="Sipli — more features"
                                    width={1320}
                                    height={2868}
                                    className="relative w-full h-auto rounded-3xl"
                                    style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.75))" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="relative py-40 md:py-52 px-6 md:px-14 overflow-hidden bg-background">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: "rgba(77,212,232,0.10)", filter: "blur(150px)" }}
                    aria-hidden
                />

                <div className="relative z-10 max-w-[580px] mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp} className="mb-6">
                            <Droplets className="w-12 h-12 text-accent mx-auto" />
                        </motion.div>

                        <motion.h2
                            variants={fadeInUp}
                            className="font-display font-medium tracking-[-0.03em] leading-[1.05] mb-5 text-foreground"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                        >
                            Start your hydration{" "}
                            <span className="text-accent">journey.</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-foreground-secondary mb-10"
                        >
                            Free on the App Store. iPhone, iPad, and Apple Watch.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex justify-center">
                            <AppStoreBadge />
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xs text-foreground-tertiary mt-8"
                        >
                            Requires iOS 17.0 or later. Works on iPhone, iPad, and Apple Watch.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
