"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const principles = [
    {
        number: "01",
        title: "One brief at a time.",
        body: "We run one engagement at full depth at a time. You get our attention, not our availability. It keeps the work honest and the calendar clear.",
    },
    {
        number: "02",
        title: "Friday ships.",
        body: "We commit to weekly shippable progress — something real you can click, tap, or show a teammate. If we can’t demo by Friday, we change the plan, not the deadline.",
    },
    {
        number: "03",
        title: "Design at the code.",
        body: "Design decisions happen in the editor, not in pixel-perfect Figma handoffs. Figma is a sketchpad; the browser is the studio. It’s faster, and the details are actually real.",
    },
    {
        number: "04",
        title: "Yours to own.",
        body: "You own everything — code, credentials, domains, runbooks. When we’re done, you could hire any other team to keep going. No vendor lock-in, not even a little.",
    },
];

const stack = [
    { label: "Web", items: "Next.js · React · TypeScript · Tailwind · Astro" },
    { label: "Mobile", items: "Swift · SwiftUI · Flutter · React Native · Kotlin" },
    { label: "Backend", items: "Node · Postgres · GraphQL · Supabase · AWS" },
    { label: "Tooling", items: "Figma · Linear · GitHub · Vercel · Sentry" },
];

export function Services() {
    return (
        <section
            id="practice"
            aria-labelledby="practice-heading"
            className="relative border-t border-border bg-background-secondary px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36"
        >
            <div className="mx-auto max-w-[1200px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease }}
                    className="mb-14 grid grid-cols-1 items-end gap-6 border-b border-border pb-8 sm:mb-20 md:grid-cols-12"
                >
                    <div className="md:col-span-7">
                        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                            № 03 · The Practice
                        </p>
                        <h2
                            id="practice-heading"
                            className="font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
                        >
                            Four working rules
                            <br />
                            <span className="italic text-foreground-secondary">we don’t break.</span>
                        </h2>
                    </div>
                    <div className="md:col-span-5">
                        <p className="text-pretty text-[15px] leading-relaxed text-foreground-secondary">
                            We don’t have a glossy methodology. We have four rules we’ve
                            earned the hard way. They’re the reason our clients come back.
                        </p>
                    </div>
                </motion.div>

                {/* Principles — editorial two-column list */}
                <ol
                    role="list"
                    className="grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2"
                >
                    {principles.map((p, i) => (
                        <motion.li
                            key={p.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: i * 0.08, ease }}
                            className="group relative border-t border-border py-8 sm:py-10"
                        >
                            {/* Hover rule accent */}
                            <span
                                aria-hidden
                                className="absolute left-0 top-0 h-[1px] w-0 bg-accent transition-all duration-500 group-hover:w-full"
                            />
                            <div className="flex items-start gap-6 sm:gap-8">
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
                                    {p.number}
                                </span>
                                <div className="flex-1">
                                    <h3 className="mb-3 font-display text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
                                        {p.title}
                                    </h3>
                                    <p className="text-pretty text-[15px] leading-relaxed text-foreground-secondary sm:text-base">
                                        {p.body}
                                    </p>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ol>

                {/* Stack — tabular footnote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease, delay: 0.2 }}
                    className="mt-20 border-t border-border pt-10 sm:mt-24"
                >
                    <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-foreground-tertiary">
                        Appendix · The tools on the bench
                    </p>
                    <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-12 md:grid-cols-4 md:gap-x-8">
                        {stack.map((row) => (
                            <div
                                key={row.label}
                                className="flex flex-col gap-1 border-t border-border/50 py-4 sm:border-t-0 sm:py-0"
                            >
                                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                                    {row.label}
                                </dt>
                                <dd className="text-sm leading-relaxed text-foreground-secondary">
                                    {row.items}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>
            </div>
        </section>
    );
}
