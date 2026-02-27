"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowLeft,
    Target,
    Droplets,
    Zap,
    Bell,
    Heart,
    Shield,
    Eye,
    BarChart3,
    Calendar,
    Smartphone,
    Check,
} from "lucide-react";

/* ═══════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════ */

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const beverages = [
    { name: "Water", emoji: "💧", factor: 100 },
    { name: "Sparkling Water", emoji: "🫧", factor: 100 },
    { name: "Coconut Water", emoji: "🥥", factor: 100 },
    { name: "Herbal Tea", emoji: "🍵", factor: 100 },
    { name: "Coffee", emoji: "☕", factor: 80 },
    { name: "Milk", emoji: "🥛", factor: 90 },
    { name: "Juice", emoji: "🧃", factor: 85 },
    { name: "Smoothie", emoji: "🫐", factor: 90 },
    { name: "Sports Drink", emoji: "⚡", factor: 80 },
    { name: "Soda", emoji: "🥤", factor: 45 },
    { name: "Beer", emoji: "🍺", factor: 30 },
    { name: "Wine", emoji: "🍷", factor: 25 },
];

const highlights = [
    {
        icon: Target,
        title: "Smart Goals",
        description:
            "Your daily target is calculated from body weight and activity level. Adjusts for workouts and weather.",
    },
    {
        icon: Droplets,
        title: "18 Beverages",
        description:
            "Every drink has an accurate hydration factor. Water counts at 100%, coffee at 80%, wine at just 25%.",
    },
    {
        icon: Zap,
        title: "AI Coaching",
        description:
            "Personalized hydration tips powered by on-device Apple Intelligence. Private, fast, context-aware.",
    },
];

const insightFeatures = [
    "Interactive weekly & monthly charts",
    "Hydration heatmap at a glance",
    "Current and longest streaks",
    "Week-over-week trends & consistency",
    "Beverage breakdown pie chart",
    "AI-powered coaching tips",
];

/* ═══════════════════════════════════════════
   Local Components
   ═══════════════════════════════════════════ */

function BeverageCard({
    emoji,
    name,
    factor,
    index,
}: {
    emoji: string;
    name: string;
    factor: number;
    index: number;
}) {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-surface border border-border rounded-2xl p-4 cursor-default hover:border-border-strong transition-colors"
        >
            <span className="text-2xl block mb-2">{emoji}</span>
            <p className="text-xs font-semibold text-foreground mb-1">{name}</p>
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${factor}%` }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.05,
                            ease,
                        }}
                    />
                </div>
                <span
                    className="text-[10px] font-bold tabular-nums text-accent"
                >
                    {factor}%
                </span>
            </div>
        </motion.div>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <motion.div
            variants={fadeInUp}
            className="bg-surface rounded-3xl p-8 md:p-10 border border-border"
        >
            <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-accent-muted"
            >
                <Icon className="w-6 h-6 text-accent" />
            </div>
            <h4 className="text-lg font-display font-semibold tracking-tight text-foreground mb-3">
                {title}
            </h4>
            <p className="text-sm text-foreground-secondary leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}


/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */

export default function SipliPage() {
    return (
        <main
            className="min-h-screen bg-background text-foreground"
        >
            <Navbar />

            {/* ═══════════════════════════════════════
               Section 1: Hero
               ═══════════════════════════════════════ */}
            <section
                className="relative pt-28 pb-20 px-6 md:px-14 min-h-[90vh] flex items-center overflow-hidden bg-background-secondary"
            >
                {/* Decorative glows */}
                <div
                    className="absolute top-[5%] -right-[15%] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none animate-subtle-float bg-accent-muted"
                    aria-hidden="true"
                />
                <div
                    className="absolute bottom-[10%] -left-[10%] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none animate-subtle-float bg-accent-muted"
                    aria-hidden="true"
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-accent-muted text-accent">
                                    <Droplets className="w-3.5 h-3.5" />
                                    Hydration Tracking for iOS
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-[clamp(2.5rem,5.5vw,4rem)] font-display font-medium tracking-[-0.03em] leading-[1.08] mb-6 text-foreground"
                            >
                                Staying hydrated,{" "}
                                <span className="text-accent">
                                    effortlessly.
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-lg text-foreground-secondary leading-relaxed max-w-md mb-8"
                            >
                                Set a personalized daily goal based on your
                                weight and activity level, then watch your
                                progress come to life with a beautiful
                                liquid-fill animation.
                            </motion.p>

                            <motion.div variants={fadeInUp}>
                                <Link
                                    href="https://apps.apple.com/us/app/sipli/id6758851574"
                                    className="inline-flex items-center gap-3 bg-accent text-background rounded-[14px] px-7 py-4 hover:bg-accent-hover transition-colors"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] leading-tight opacity-60">
                                            Download on the
                                        </div>
                                        <div className="text-base font-semibold leading-tight">
                                            App Store
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Device mockup */}
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            className="relative w-full flex items-center justify-center lg:justify-end"
                        >
                            <div className="relative">
                                {/* Radial glow */}
                                <div
                                    className="absolute inset-0 scale-150 pointer-events-none blur-[80px] opacity-30 bg-accent-muted"
                                />
                                <Image
                                    src="/projects/sipli/iphone_and_ipad.png"
                                    alt="Sipli on iPhone and iPad"
                                    width={1024}
                                    height={1366}
                                    className="relative w-full max-w-[500px] lg:max-w-[560px] h-auto"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 2: Feature Highlights
               ═══════════════════════════════════════ */}
            <section
                className="py-24 md:py-32 px-6 md:px-14 bg-background"
            >
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-14"
                    >
                        <h3 className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                            Why Sipli
                        </h3>
                        <p className="text-2xl md:text-3xl font-display font-medium tracking-tight max-w-lg text-foreground">
                            Everything you need to build{" "}
                            <span className="text-accent">
                                better habits.
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-surface rounded-2xl p-8 border border-border hover:border-border-strong transition-colors duration-300"
                            >
                                <div
                                    className="mb-5 w-12 h-12 rounded-xl flex items-center justify-center bg-accent-muted"
                                >
                                    <item.icon
                                        className="w-5 h-5 text-accent"
                                    />
                                </div>
                                <h4 className="text-base font-display font-semibold mb-2 tracking-tight text-foreground">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-foreground-secondary leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 3: Smart Hydration Goals
               ═══════════════════════════════════════ */}
            <section className="py-24 md:py-32 px-6 md:px-14 bg-background">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <h3 className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                                Smart Hydration Goals
                            </h3>
                            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-[-0.02em] leading-[1.1] mb-5 text-foreground">
                                Your goal.{" "}
                                <span className="text-accent">
                                    Personalized.
                                </span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6 max-w-md">
                                Your daily target isn&apos;t a guess &mdash;
                                it&apos;s calculated from your body weight and
                                activity level. Connect Apple Health to let Sipli
                                automatically adjust your goal when you work out.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "Weight-based daily goal calculation",
                                    "Auto-adjusts for workouts via Apple Health",
                                    "Weather-aware — increases on hot, humid days",
                                    "Activity level factored into every target",
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-accent" />
                                        </div>
                                        <p className="text-sm text-foreground-secondary">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="flex justify-center lg:justify-end"
                        >
                            <Image
                                src="/projects/sipli/dashboard.png"
                                alt="Sipli smart hydration goals"
                                width={1284}
                                height={2778}
                                className="w-full max-w-[260px] h-auto"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 4: Track Any Beverage
               ═══════════════════════════════════════ */}
            <section
                className="py-24 md:py-32 px-6 md:px-14 bg-background-secondary"
            >
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-14"
                    >
                        <h3 className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                            Beverage Tracking
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-[-0.02em] text-foreground mb-4">
                            Track{" "}
                            <span className="text-accent">
                                any beverage.
                            </span>
                        </h2>
                        <p className="text-foreground-secondary max-w-lg mx-auto">
                            18 drink types, each with a realistic hydration
                            factor. See exactly how much effective hydration
                            you&apos;re getting from every sip.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {beverages.map((bev, i) => (
                            <BeverageCard
                                key={bev.name}
                                emoji={bev.emoji}
                                name={bev.name}
                                factor={bev.factor}
                                index={i}
                            />
                        ))}
                    </motion.div>

                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center text-sm text-foreground-tertiary mt-8"
                    >
                        + Lemonade, Sparkling Water, Energy Drink, Soup,
                        Cocktail, and more
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 5: Insights
               ═══════════════════════════════════════ */}
            <section className="py-24 md:py-32 px-6 md:px-14 bg-background">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    >
                        {/* Chart visual */}
                        <motion.div
                            variants={scaleIn}
                            className="order-2 lg:order-1 flex justify-center"
                        >
                            <Image
                                src="/projects/sipli/analytics.png"
                                alt="Sipli insights and analytics"
                                width={1284}
                                height={2778}
                                className="w-full max-w-[280px] h-auto"
                            />
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            variants={fadeInUp}
                            className="order-1 lg:order-2"
                        >
                            <h3 className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                                Insights
                            </h3>
                            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-[-0.02em] leading-[1.1] mb-5 text-foreground">
                                Understand your{" "}
                                <span className="text-accent">habits.</span>
                            </h2>
                            <p className="text-foreground-secondary leading-relaxed mb-6 max-w-md">
                                Visualize your hydration journey with detailed
                                charts, streaks, and AI-powered tips that help
                                you stay consistent.
                            </p>
                            <div className="space-y-2.5">
                                {insightFeatures.map((feat, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        <p className="text-sm text-foreground-secondary">
                                            {feat}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 6: Design Showcase (dark)
               ═══════════════════════════════════════ */}
            <section
                className="py-24 md:py-32 px-6 md:px-14 overflow-hidden bg-background-secondary"
            >
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h3 className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">
                            Beautiful Design
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-[-0.02em] text-foreground mb-4">
                            Designed to{" "}
                            <span className="text-accent">delight.</span>
                        </h2>
                        <p className="text-foreground-secondary max-w-lg mx-auto leading-relaxed">
                            Animated liquid-fill progress, glassmorphism cards,
                            custom haptics, full iPad support, and Light, Dark &
                            System themes.
                        </p>
                    </motion.div>

                    {/* Three phone mockups */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    >
                        <motion.div variants={fadeInUp} className="flex justify-center md:mt-8">
                            <Image
                                src="/projects/sipli/analytics.png"
                                alt="Sipli Analytics"
                                width={1284}
                                height={2778}
                                className="w-full max-w-[240px] h-auto"
                            />
                        </motion.div>
                        <motion.div variants={scaleIn} className="flex justify-center">
                            <Image
                                src="/projects/sipli/dashboard.png"
                                alt="Sipli Dashboard"
                                width={1284}
                                height={2778}
                                className="w-full max-w-[260px] h-auto"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex justify-center md:mt-8">
                            <Image
                                src="/projects/sipli/dashboard_dark.png"
                                alt="Sipli Dark Mode"
                                width={1284}
                                height={2778}
                                className="w-full max-w-[240px] h-auto"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Design features */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
                    >
                        {[
                            {
                                icon: Smartphone,
                                label: "iPhone & iPad",
                            },
                            {
                                icon: Eye,
                                label: "Light & Dark themes",
                            },
                            {
                                icon: Calendar,
                                label: "Full diary view",
                            },
                            {
                                icon: BarChart3,
                                label: "Rich analytics",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-border bg-surface hover:border-border-strong transition-colors"
                            >
                                <item.icon className="w-5 h-5 text-accent" />
                                <span className="text-xs text-foreground-secondary text-center font-medium">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 7: Smart Reminders + Apple Health
               ═══════════════════════════════════════ */}
            <section
                className="py-24 md:py-32 px-6 md:px-14 bg-background"
            >
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <FeatureCard
                            icon={Bell}
                            title="Reminders that adapt"
                            description="Sipli schedules reminders around your activity. They pause when you've hit your goal, adapt to your sleep schedule, and reschedule when you log a drink. Choose smart adaptive or classic fixed-time."
                        />
                        <FeatureCard
                            icon={Heart}
                            title="Apple Health integration"
                            description="Reads your workouts and calories to adjust your daily goal. Writes water intake automatically. Two-way sync keeps everything in harmony with one-tap manual sync."
                        />
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 8: Privacy & Accessibility
               ═══════════════════════════════════════ */}
            <section
                className="py-24 md:py-32 px-6 md:px-14 bg-background-secondary"
            >
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-[-0.02em] text-foreground">
                            Built on{" "}
                            <span className="text-accent">trust.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-3xl p-8 md:p-10 border border-border bg-surface"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-accent-muted flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-accent" />
                            </div>
                            <h4 className="text-lg font-display font-semibold text-foreground mb-3 tracking-tight">
                                Privacy first
                            </h4>
                            <p className="text-sm text-foreground-secondary leading-relaxed">
                                All your data stays on your device. No accounts,
                                no cloud sync, no tracking, no ads. Sipli only
                                communicates with Apple services &mdash;
                                HealthKit, WeatherKit, and StoreKit &mdash;
                                never with third-party servers.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-3xl p-8 md:p-10 border border-border bg-surface"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-accent-muted flex items-center justify-center mb-6">
                                <Eye className="w-6 h-6 text-accent" />
                            </div>
                            <h4 className="text-lg font-display font-semibold text-foreground mb-3 tracking-tight">
                                Accessible to everyone
                            </h4>
                            <p className="text-sm text-foreground-secondary leading-relaxed">
                                Full VoiceOver support, Dynamic Type, and
                                Reduce Motion are built into every screen.
                                Sipli is designed so everyone can track their
                                hydration with ease.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
               Section 9: Final CTA
               ═══════════════════════════════════════ */}
            <section className="relative py-32 md:py-40 px-6 md:px-14 overflow-hidden bg-background">
                {/* Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none bg-accent-muted"
                    aria-hidden="true"
                />

                <div className="relative z-10 max-w-[600px] mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeInUp} className="mb-4">
                            <Droplets className="w-10 h-10 text-accent mx-auto" />
                        </motion.div>

                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl md:text-5xl font-display font-medium tracking-[-0.03em] leading-[1.1] mb-5 text-foreground"
                        >
                            Start your hydration{" "}
                            <span className="text-accent">journey.</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-foreground-secondary mb-8"
                        >
                            Free on the App Store.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <Link
                                href="https://apps.apple.com/us/app/sipli/id6758851574"
                                className="inline-flex items-center gap-3 bg-accent text-background rounded-[14px] px-7 py-4 hover:bg-accent-hover transition-colors"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div>
                                    <div className="text-[10px] leading-tight opacity-80">
                                        Download on the
                                    </div>
                                    <div className="text-base font-semibold leading-tight">
                                        App Store
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xs text-foreground-tertiary mt-6"
                        >
                            Requires iOS 18.0 or later. Works on iPhone and
                            iPad.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
