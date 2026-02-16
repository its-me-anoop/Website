"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: appleEase,
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: appleEase } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-28 md:pb-24 md:pt-36">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-28 left-1/2 h-[430px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#0071e3]/10 via-[#0071e3]/[0.03] to-transparent blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative z-10 mx-auto max-w-[1020px] px-6 text-center"
      >
        <motion.p variants={itemVariants} className="mb-5 text-base font-semibold tracking-tight text-[#0071e3] md:text-lg">
          Flutterly Ltd
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mx-auto max-w-[900px] text-[clamp(2.5rem,7vw,5.3rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[#1d1d1f]"
        >
          Digital experiences crafted with care and precision.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-7 max-w-[680px] text-base leading-relaxed text-[#86868b] md:text-xl md:leading-relaxed"
        >
          High-performance websites, native mobile apps, and enterprise solutions designed to scale smoothly and feel effortless.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/#contact"
            className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-[#0071e3] px-7 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#0077ed]"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full border border-[#0071e3]/20 px-7 py-3 text-base font-medium text-[#0071e3] transition-colors duration-200 hover:bg-[#0071e3]/[0.06]"
          >
            View our work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-16 max-w-[900px] rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-6"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#86868b]">
            Trusted Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {[
              "React",
              "Next.js",
              "Flutter",
              "SwiftUI",
              "React Native",
              "Node.js",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.06, duration: 0.45, ease: appleEase }}
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-[#86868b]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
