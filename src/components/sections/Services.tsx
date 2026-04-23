"use client";

import { motion } from "framer-motion";
import { Code2, Layers3, Rocket, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: Sparkles,
    title: "Make the idea clear.",
    body: "We define the product promise, map the core flow, and remove anything that makes the first version harder to understand.",
  },
  {
    icon: Layers3,
    title: "Design the experience.",
    body: "Screens, states, motion, and copy are shaped together so the product feels obvious before it feels feature-rich.",
  },
  {
    icon: Code2,
    title: "Build it properly.",
    body: "Next.js, SwiftUI, Flutter, and TypeScript are used with clean boundaries, measurable performance, and ownership in mind.",
  },
  {
    icon: Rocket,
    title: "Ship and refine.",
    body: "We launch, watch the real usage, tune the rough edges, and leave you with code and runbooks your team can keep improving.",
  },
];

const capabilities = [
  "Web apps",
  "iOS apps",
  "Flutter apps",
  "Product redesigns",
  "Internal tools",
  "Launch systems",
];

export function Services() {
  return (
    <section
      id="practice"
      aria-labelledby="practice-heading"
      className="bg-background-secondary px-5 py-20 text-foreground sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xl font-semibold text-foreground-secondary">
            Process
          </p>
          <h2
            id="practice-heading"
            className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl"
          >
            From first thought to first release.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-foreground-secondary">
            A small studio means fewer handoffs. Strategy, design, engineering,
            and launch decisions stay close enough to feel coherent.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.06, ease }}
              className="rounded-[8px] bg-background p-7"
            >
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-accent-muted text-accent">
                <step.icon size={20} aria-hidden />
              </div>
              <h3 className="text-2xl font-semibold leading-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-foreground-secondary">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-8 rounded-[8px] bg-[#111113] px-6 py-10 text-white sm:px-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-lg font-semibold text-white/60">
                What we make
              </p>
              <h3 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
                Products people can trust from the first tap.
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-white/12 bg-white/8 px-4 py-4 text-center text-sm font-medium text-white/86"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
