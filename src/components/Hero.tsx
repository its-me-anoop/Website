"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(41,151,255,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-[980px] mx-auto px-6 lg:px-0 relative text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-apple-blue text-base md:text-lg font-medium mb-4"
          >
            Flutterly Ltd
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-gray-100 mb-6"
          >
            Future-ready digital
            <br />
            experiences.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-xl md:text-[1.75rem] leading-[1.32] font-semibold text-gray-400 max-w-[600px] mx-auto mb-10"
          >
            High-performance websites. Native mobile apps.
            <br className="hidden md:block" /> Enterprise solutions that scale.
          </motion.p>

          {/* CTAs - Apple style with text links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1 text-xl text-apple-blue hover:underline transition-colors"
            >
              Start a project
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xl text-apple-blue hover:underline transition-colors"
            >
              View our work
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
