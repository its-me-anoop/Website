"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#fbfbfd]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#0071e3]/[0.04] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-[980px] mx-auto px-6 relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[#0071e3] text-lg md:text-xl font-semibold mb-4 tracking-tight">
            Flutterly Ltd
          </p>

          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight leading-[1.05] text-[#1d1d1f] mb-6">
            Digital experiences{" "}
            <br className="hidden sm:block" />
            crafted to perfection.
          </h1>

          <p className="text-lg md:text-xl text-[#86868b] max-w-[600px] mx-auto mb-10 leading-relaxed font-normal">
            High-performance websites, native mobile apps, and enterprise solutions.
            Built with precision and purpose.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0071e3] text-white text-base font-medium hover:bg-[#0077ed] transition-colors duration-200"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[#0071e3] text-base font-medium hover:bg-[#0071e3]/[0.06] transition-colors duration-200"
            >
              View our work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 pb-12"
        >
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {[
              "React",
              "Next.js",
              "Flutter",
              "SwiftUI",
              "React Native",
              "Node.js",
            ].map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium text-[#86868b]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
