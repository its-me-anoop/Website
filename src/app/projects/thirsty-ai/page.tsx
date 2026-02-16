import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { ArrowLeft, BellRing, BrainCircuit, Cpu, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Thirsty.ai | Flutterly Projects",
    description:
        "Case study for Thirsty.ai, a privacy-first iOS hydration tracker powered by on-device Apple Foundation Models.",
};

const features = [
    {
        title: "On-device Foundation AI",
        description:
            "Hydration guidance runs directly on iPhone using Apple Foundation Models, so insight generation stays fast, context-aware, and private.",
        icon: Cpu,
        accent: "from-blue-500/20 to-cyan-500/5",
    },
    {
        title: "Privacy by Default",
        description:
            "No cloud model calls are required for daily coaching. Sensitive patterns and personal health context remain on-device.",
        icon: LockKeyhole,
        accent: "from-emerald-500/20 to-teal-500/5",
    },
    {
        title: "Smart Reminder Engine",
        description:
            "Reminders adapt to routine, activity trends, and hydration consistency to nudge users at the right moments, not random times.",
        icon: BellRing,
        accent: "from-sky-500/20 to-indigo-500/5",
    },
];

const productScreens = [
    {
        title: "Hydration Intelligence Dashboard",
        description:
            "A clear, glanceable home view that combines hydration progress, AI-generated coaching, and adaptive reminders into one focused daily surface.",
        src: "/projects/thirsty-ai/dashboard.png",
        alt: "Thirsty.ai hydration dashboard screen with daily insights and progress tracking.",
        containerClass: "lg:col-span-7",
        aspectClass: "aspect-[16/10]",
    },
    {
        title: "Seamless Onboarding Flow",
        description:
            "A structured onboarding experience that captures habits and goals early, allowing Thirsty.ai to deliver relevant recommendations from the first session.",
        src: "/projects/thirsty-ai/onboarding.png",
        alt: "Thirsty.ai onboarding sequence on iPhone introducing personalization setup.",
        containerClass: "lg:col-span-5",
        aspectClass: "aspect-[4/5]",
    },
];

export default function ThirstyAiProjectPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />

            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0">
                    <div className="absolute top-20 -left-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_65%)]" />
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <Link
                        href="/projects"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>

                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <div className="max-w-4xl">
                                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
                                    <BrainCircuit className="h-4 w-4" />
                                    iOS AI Product Showcase
                                </span>

                                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                                    Thirsty.ai helps people stay hydrated with{" "}
                                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                        private on-device intelligence
                                    </span>
                                    .
                                </h1>

                                <p className="max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
                                    We built a privacy-first hydration tracker for iOS that transforms daily intake data into
                                    personalized recommendations and reminders using Apple Foundation Models running directly on-device.
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <p className="mb-2 text-sm text-gray-400">AI Stack</p>
                                    <p className="text-xl font-semibold">Apple Foundation Models</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <p className="mb-2 text-sm text-gray-400">Platform</p>
                                    <p className="text-xl font-semibold">Native iOS Experience</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                    <p className="mb-2 text-sm text-gray-400">Core Promise</p>
                                    <p className="text-xl font-semibold">Personalization without Cloud Exposure</p>
                                </div>
                            </div>
                        </div>

                        <article className="relative mx-auto w-full max-w-sm lg:max-w-none">
                            <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/25 via-blue-500/10 to-indigo-500/20 blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#061524]/70 shadow-[0_35px_90px_-35px_rgba(34,211,238,0.55)]">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent" />
                                <div className="relative aspect-[9/16] w-full">
                                    <Image
                                        src="/projects/thirsty-ai/hero.png"
                                        alt="Thirsty.ai hero iOS screen showcasing hydration assistant and personalized AI guidance."
                                        fill
                                        priority
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-400">
                                Hero experience designed for fast daily hydration check-ins.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="mb-10 max-w-3xl">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Feature Highlights</h2>
                        <p className="text-gray-400">
                            Thirsty.ai combines personalized machine intelligence with clear product UX principles: privacy, utility,
                            and consistency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {features.map((feature) => (
                            <article
                                key={feature.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                                <div className="relative">
                                    <div className="mb-4 inline-flex rounded-xl border border-white/15 bg-black/30 p-3">
                                        <feature.icon className="h-6 w-6 text-cyan-300" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-semibold">{feature.title}</h3>
                                    <p className="leading-relaxed text-gray-300">{feature.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="mb-10 max-w-3xl">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Product Experience</h2>
                        <p className="text-gray-400">
                            Key screens from Thirsty.ai that show the complete journey from onboarding through ongoing, adaptive
                            hydration coaching.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {productScreens.map((screen) => (
                            <article
                                key={screen.title}
                                className={`${screen.containerClass} group overflow-hidden rounded-3xl border border-white/10 bg-white/5`}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <div className={`relative ${screen.aspectClass}`}>
                                        <Image
                                            src={screen.src}
                                            alt={screen.alt}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className="border-t border-white/10 p-6">
                                    <h3 className="mb-2 text-2xl font-semibold">{screen.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{screen.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <article className="rounded-2xl border border-orange-400/20 bg-orange-500/5 p-8">
                            <h2 className="mb-4 text-3xl font-bold">The Challenge</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Hydration apps are often generic, noisy, and disconnected from user context. The core challenge was to
                                create truly personalized guidance while protecting sensitive health behavior from unnecessary cloud
                                processing.
                            </p>
                        </article>

                        <article className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-8">
                            <h2 className="mb-4 text-3xl font-bold">The Solution</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We architected Thirsty.ai around on-device Apple Foundation Models, then layered a clean iOS experience
                                on top: adaptive reminder logic, habit-aware hydration insights, and privacy-first defaults across the
                                product.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-8 md:p-12">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-3xl">
                                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">
                                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                                    Product Outcome
                                </span>
                                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Intelligent hydration coaching, designed for trust</h2>
                                <p className="text-gray-300">
                                    Thirsty.ai demonstrates how consumer wellness products can deliver meaningful AI personalization
                                    without compromising user privacy or app responsiveness.
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/15 px-5 py-3 text-cyan-100">
                                <Sparkles className="h-4 w-4" />
                                Privacy-first AI in production
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
        </main>
    );
}
