"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const details = [
  {
    k: "Write",
    v: (
      <Link
        href="mailto:anoop@flutterly.co.uk"
        className="transition-colors duration-300 hover:text-[var(--accent)] font-semibold"
      >
        anoop@flutterly.co.uk
      </Link>
    ),
  },
  {
    k: "Ring",
    v: (
      <Link
        href="tel:+447780580534"
        className="transition-colors duration-300 hover:text-[var(--accent)] font-semibold"
      >
        +44 7780 580 534
      </Link>
    ),
  },
  { k: "Visit", v: "Reading, UK" },
  { k: "Usual reply", v: "Within a working day" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

/**
 * Contact section with Apple-style fluid animations and polished interactions.
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="brief"
      className="relative overflow-hidden border-t border-white/[0.04] bg-transparent pb-[130px] pt-[150px] text-white"
    >
      {/* Animated top line divider */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1px]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, var(--accent) 50%, transparent 90%)",
        }}
      />

      {/* Background radial glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[160px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        <motion.div 
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)] font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          № 06 · The brief
        </motion.div>

        <motion.h2 
          className="mt-6 font-sans font-black leading-[0.92] tracking-[-0.04em] text-white text-[clamp(52px,9vw,120px)]"
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ 
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Got a brief
          <br />
          <span className="italic font-light text-[var(--accent)]">worth</span> building?
        </motion.h2>

        <motion.div 
          className="mt-14 grid items-end gap-10 border-t border-white/[0.04] pt-10 md:grid-cols-2 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-zinc-400">
            We only take a handful of projects a year, so not every fit is the
            right fit. Write anyway — if we can&rsquo;t help, we&rsquo;ll usually
            know someone who can.
          </p>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link
              href="mailto:anoop@flutterly.co.uk"
              className="group inline-flex items-center gap-3 self-start border-b border-white/10 pb-2 font-sans text-[clamp(20px,3vw,32px)] font-bold tracking-tight text-white transition-all duration-400 hover:border-[var(--accent)] hover:text-[var(--accent)] md:self-end"
            >
              anoop@flutterly.co.uk
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 22 22"
                className="text-zinc-500 transition-all duration-300 group-hover:text-[var(--accent)]"
                aria-hidden="true"
                whileHover={{ x: 3, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  d="M5 17 17 5M8 5h9v9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Details Grid */}
        <motion.div 
          className="mt-28 grid gap-7 border-t border-white/[0.04] pt-10 md:grid-cols-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {details.map((d, index) => (
            <motion.div
              key={d.k}
              className="group flex flex-col gap-1.5 transition-all duration-400 hover:translate-y-[-2px]"
              variants={itemVariants}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold transition-colors duration-300 group-hover:text-zinc-400">
                {d.k}
              </span>
              <span className="font-sans text-[16px] text-zinc-300 font-medium tracking-tight transition-colors duration-300 group-hover:text-white">
                {d.v}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
