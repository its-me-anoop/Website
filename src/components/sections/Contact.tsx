"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import { AppleButton } from "@/components/ui/AppleButton";

const details = [
  {
    icon: Mail,
    k: "Email",
    v: "anoop@flutterly.co.uk",
    href: "mailto:anoop@flutterly.co.uk",
  },
  {
    icon: Phone,
    k: "Phone",
    v: "+44 7780 580 534",
    href: "tel:+447780580534",
  },
  { icon: MapPin, k: "Office", v: "Reading, UK" },
  { icon: Clock, k: "Reply", v: "Within 48 hours" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="brief"
      className="relative overflow-hidden border-t border-white/[0.04] pt-32 pb-24 md:pt-40"
      aria-labelledby="contact-heading"
    >
      {/* Top gradient line */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1px]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, #6366f1 35%, #a855f7 50%, #ec4899 65%, transparent 90%)",
        }}
      />

      {/* Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.06) 35%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-tight text-ink-3 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
          Get in touch
        </motion.span>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(48px,9vw,120px)] font-black leading-[0.92] tracking-[-0.04em] text-white"
        >
          Let&rsquo;s build
          <br />
          something <span className="text-gradient">great.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid items-start gap-10 md:grid-cols-2 md:gap-16"
        >
          <p className="max-w-[440px] text-[16px] leading-[1.7] text-ink-3">
            We only take a handful of projects a year, so not every fit is the right
            fit. Write anyway — if we can&rsquo;t help, we&rsquo;ll usually know someone
            who can.
          </p>

          <div className="flex flex-col items-start gap-5">
            <Link
              href="mailto:anoop@flutterly.co.uk"
              className="group inline-flex items-center gap-3 border-b border-white/10 pb-2 font-display text-[clamp(22px,3vw,36px)] font-bold tracking-tight text-white transition-all duration-400 hover:border-brand hover:text-brand-hover"
              aria-label="Email anoop@flutterly.co.uk"
            >
              anoop@flutterly.co.uk
              <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-hover" />
            </Link>

            <Link href="mailto:anoop@flutterly.co.uk" aria-label="Start a project brief">
              <AppleButton variant="primary" size="lg" className="group">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </AppleButton>
            </Link>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-24 grid gap-4 border-t border-white/[0.06] pt-10 md:grid-cols-4"
        >
          {details.map((d) => {
            const Icon = d.icon;
            const Inner = (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-brand transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
                    {d.k}
                  </span>
                  <span className="mt-0.5 font-display text-[14.5px] font-semibold tracking-tight text-ink-2 transition-colors duration-300 group-hover:text-white">
                    {d.v}
                  </span>
                </div>
              </>
            );

            const className =
              "group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 backdrop-blur transition-all duration-400 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04]";

            return (
              <motion.div key={d.k} variants={itemVariants}>
                {d.href ? (
                  <Link href={d.href} className={className}>
                    {Inner}
                  </Link>
                ) : (
                  <div className={className}>{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
