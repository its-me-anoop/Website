"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { ArrowLeft, BellRing, Cpu, LockKeyhole, Sparkles } from "lucide-react";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease }
    }
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease }
    }
};

const features = [
    {
        title: "On-device Foundation AI",
        description: "Hydration guidance runs directly on iPhone using Apple Foundation Models. Fast, context-aware, and completely private.",
        icon: Cpu,
        color: {
            iconBg: "bg-sage-muted",
            iconText: "text-sage",
        },
    },
    {
        title: "Privacy by Default",
        description: "No cloud model calls for daily coaching. Your health patterns and personal context remain strictly on your device.",
        icon: LockKeyhole,
        color: {
            iconBg: "bg-accent/[0.15]",
            iconText: "text-accent",
        },
    },
    {
        title: "Smart Reminder Engine",
        description: "Reminders adapt to your routine and hydration consistency, nudging you at the right moments without alert fatigue.",
        icon: BellRing,
        color: {
            iconBg: "bg-deep-earth/[0.08]",
            iconText: "text-foreground",
        },
    },
];

const productScreens = [
    {
        title: "Hydration Intelligence",
        description: "A glanceable home view combining real-time progress, AI-generated coaching, and adaptive reminders into one focused surface.",
        src: "/projects/thirsty-ai/dashboard-new.png",
        alt: "Thirsty.ai hydration dashboard"
    },
    {
        title: "Actionable Insights",
        description: "AI-generated cards translate your hydration history into timely, practical prompts that keep you engaged without being intrusive.",
        src: "/projects/thirsty-ai/insights-new.png",
        alt: "Thirsty.ai insights screen"
    },
];

export default function ThirstyAiProjectPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-28 pb-20 px-6 md:px-14 overflow-hidden">
                {/* Background organic blobs */}
                <div
                    className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-sage-muted opacity-30 blur-3xl pointer-events-none"
                    aria-hidden="true"
                />
                <div
                    className="absolute bottom-[5%] -left-[10%] w-[400px] h-[400px] rounded-full bg-accent/10 opacity-30 blur-3xl pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="mb-12"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors group min-h-[44px]"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div initial="hidden" animate="visible" variants={stagger}>
                            <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3">
                                <div className="p-2.5 bg-background-secondary rounded-xl border border-border">
                                    <Image
                                        src="/projects/thirsty-ai/app-icon.png"
                                        alt="Thirsty.ai Icon"
                                        width={40}
                                        height={40}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl font-display font-semibold tracking-tight">Thirsty.ai</h1>
                                    <p className="text-foreground-tertiary text-xs">iOS & AI &middot; 2024</p>
                                </div>
                            </motion.div>

                            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-medium tracking-[-0.02em] leading-[1.1] mb-5">
                                Intelligent hydration,{" "}
                                <span className="text-accent">
                                    privacy-first.
                                </span>
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-lg text-foreground-secondary leading-relaxed max-w-md mb-6">
                                An iOS hydration tracker leveraging on-device Apple Foundation Models for personalized guidance without ever sending health data to the cloud.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                                {["SwiftUI", "CoreML", "HealthKit"].map(tag => (
                                    <span key={tag} className="px-3 py-1.5 rounded-full bg-accent/[0.08] text-accent text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            className="relative w-full flex items-center justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-[280px]">
                                <div className="absolute inset-0 bg-accent/[0.1] blur-[80px] rounded-full scale-125 pointer-events-none" />
                                <Iphone17ProFrame>
                                    <Image
                                        src="/projects/thirsty-ai/dashboard-new.png"
                                        alt="Thirsty.ai Dashboard"
                                        fill
                                        className="object-cover relative z-10"
                                        priority
                                    />
                                </Iphone17ProFrame>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 md:px-14 bg-background-secondary">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-14"
                    >
                        <h3 className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-4">Core Features</h3>
                        <p className="text-2xl md:text-3xl font-display font-medium tracking-tight max-w-lg">
                            Privacy meets intelligence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-surface rounded-2xl p-8 hover:shadow-sm transition-shadow duration-300"
                            >
                                <div className={`mb-6 w-14 h-14 rounded-xl ${feature.color.iconBg} flex items-center justify-center`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color.iconText}`} />
                                </div>
                                <h4 className="text-base font-display font-semibold mb-3 tracking-tight">{feature.title}</h4>
                                <p className="text-sm text-foreground-secondary leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Product Screens */}
            <section className="py-24 px-6 md:px-14">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col gap-24 lg:gap-32">
                        {productScreens.map((screen, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                className={`flex flex-col items-center gap-10 lg:gap-16 ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                            >
                                <div className="flex-1 text-center lg:text-left space-y-4">
                                    <h4 className="text-2xl md:text-3xl font-display font-medium tracking-tight">{screen.title}</h4>
                                    <p className="text-foreground-secondary leading-relaxed max-w-sm mx-auto lg:mx-0">
                                        {screen.description}
                                    </p>
                                </div>

                                <div className="flex-1 w-full flex justify-center items-center">
                                    <div className="relative w-full max-w-[280px]">
                                        <Iphone17ProFrame>
                                            <Image
                                                src={screen.src}
                                                alt={screen.alt}
                                                fill
                                                className="object-cover"
                                            />
                                        </Iphone17ProFrame>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Outcome */}
            <section className="py-24 px-6 md:px-14 bg-deep-earth">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/[0.15] rounded-full text-accent text-xs font-medium mb-8"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Outcome
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, ease }}
                        className="text-3xl md:text-4xl font-display font-medium tracking-[-0.02em] text-[#FDFBF7] mb-5"
                    >
                        Designed for trust.
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, ease }}
                        className="text-lg text-foreground-tertiary leading-relaxed max-w-xl mx-auto"
                    >
                        Thirsty.ai proves that consumer wellness products can deliver meaningful AI personalization without compromising on user privacy or performance.
                    </motion.p>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
