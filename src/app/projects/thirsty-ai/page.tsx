"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { ArrowLeft, BellRing, BrainCircuit, Cpu, LockKeyhole, ShieldCheck, Sparkles, Droplets } from "lucide-react";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";

// Animation variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const features = [
    {
        title: "On-device Foundation AI",
        description:
            "Hydration guidance runs directly on iPhone using Apple Foundation Models. Insight generation stays fast, context-aware, and completely private.",
        icon: Cpu,
        accent: "from-blue-500/20 to-cyan-500/5",
    },
    {
        title: "Privacy by Default",
        description:
            "No cloud model calls for daily coaching. Your sensitive health patterns and personal context remain strictly on your device.",
        icon: LockKeyhole,
        accent: "from-emerald-500/20 to-teal-500/5",
    },
    {
        title: "Smart Reminder Engine",
        description:
            "Reminders adapt to your routine, activity trends, and hydration consistency to nudge you at the right moments, avoiding alert fatigue.",
        icon: BellRing,
        accent: "from-sky-500/20 to-indigo-500/5",
    },
];

const productScreens = [
    {
        title: "Hydration Intelligence",
        description:
            "A glanceable home view combining real-time progress, AI-generated coaching, and adaptive reminders into one focused surface.",
        src: "/projects/thirsty-ai/dashboard-new.png",
        alt: "Thirsty.ai hydration dashboard",
        colSpan: "lg:col-span-2",
        height: "h-[30rem] md:h-[40rem]"
    },
    {
        title: "Actionable Insights",
        description:
            "AI-generated cards translate your hydration history into timely, practical prompts that keep you engaged without being intrusive.",
        src: "/projects/thirsty-ai/insights-new.png",
        alt: "Thirsty.ai insights screen",
        colSpan: "lg:col-span-1",
        height: "h-[30rem] md:h-[40rem]"
    },
];

export default function ThirstyAiProjectPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="container relative z-10 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-12"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" animate="visible" variants={stagger}>
                            <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <Image
                                        src="/projects/thirsty-ai/app-icon.png"
                                        alt="Thirsty.ai Icon"
                                        width={48}
                                        height={48}
                                        className="rounded-xl shadow-lg"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold tracking-tight">Thirsty.ai</h1>
                                    <p className="text-zinc-400 text-sm">iOS & AI • 2024</p>
                                </div>
                            </motion.div>

                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
                                Intelligent hydration, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">privacy-first.</span>
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-8">
                                We built an iOS hydration tracker that leverages on-device Apple Foundation Models to deliver personalized guidance without ever sending health data to the cloud.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                                <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-300">SwiftUI</span>
                                <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-300">CoreML</span>
                                <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-300">HealthKit</span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="relative w-full flex items-center justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-[320px]">
                                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full scale-125" />
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

            {/* Features Grid */}
            <section className="py-24 px-6 bg-[#0A0A0A]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16 max-w-2xl"
                    >
                        <h3 className="text-3xl font-medium tracking-tight mb-4">Privacy meets Intelligence</h3>
                        <p className="text-zinc-400 text-lg">
                            We challenged the norm of cloud-dependent health apps by re-architecting the entire intelligence stack to run locally on the user's device.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="mb-6 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-zinc-100" />
                                </div>
                                <h4 className="text-xl font-medium mb-3">{feature.title}</h4>
                                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>



            {/* Visual Showcase */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 justify-items-center">
                        {productScreens.map((screen, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`group relative flex flex-col items-center ${screen.colSpan ?? "lg:col-span-1"}`}
                            >
                                <div className="relative mb-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                                    {/* Background glow for the phone */}
                                    <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />

                                    <Iphone17ProFrame>
                                        <Image
                                            src={screen.src}
                                            alt={screen.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </Iphone17ProFrame>
                                </div>

                                <div className="text-center max-w-md">
                                    <h4 className="text-xl font-medium mb-2">{screen.title}</h4>
                                    <p className="text-zinc-400 text-sm">{screen.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact / Outcome */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
                    >
                        <Sparkles className="w-4 h-4" />
                        Outcome
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-semibold tracking-tight mb-6"
                    >
                        Design for trust.
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 leading-relaxed mb-12"
                    >
                        Thirsty.ai proves that consumer wellness products can deliver deep, meaningful AI personalization without compromising on user privacy or application performance.
                    </motion.p>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
