"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const meta = [
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Reading, UK" },
  { k: "Headcount", v: "1 + friends" },
  { k: "Reply time", v: "Within a day" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
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
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
    },
  },
};

/**
 * About section with Apple-style fluid animations and polished micro-interactions.
 */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="studio"
      className="relative border-t border-white/[0.04] bg-transparent py-[130px] text-white overflow-hidden"
    >
      {/* Background ambient light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-1/3 h-[600px] w-[600px] rounded-full bg-blue-500/[0.03] blur-[160px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section Header */}
        <motion.div 
          className="mb-16 grid items-end gap-10 md:grid-cols-2 md:gap-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div 
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              № 05 · The studio
            </motion.div>
            <motion.h2 
              className="mt-3 font-sans text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              One person,{" "}
              <span className="text-zinc-500 font-light block md:inline">
                a few trusted collaborators,
              </span>{" "}
              a short client list.
            </motion.h2>
          </div>
          <motion.p 
            className="max-w-[420px] text-[15px] leading-[1.65] text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Flutterly is a UK-registered product studio, founded in 2024 after a
            decade of shipping inside larger teams.
          </motion.p>
        </motion.div>

        {/* Body grid */}
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24 items-start">
          {/* Studio Narrative & Stats */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <motion.blockquote 
                className="relative m-0 border-l-2 border-[var(--accent)] pl-6 font-sans text-[clamp(20px,2.8vw,32px)] font-bold italic leading-[1.3] tracking-tight text-white"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-zinc-500 leading-normal">&ldquo;</span>I started Flutterly because I was tired of handing off work to people who didn&rsquo;t care about it as much as I did. So I stopped handing it off.
              </motion.blockquote>

              <motion.div 
                className="mt-8 max-w-[480px] text-[15px] leading-[1.7] text-zinc-400 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="m-0">
                  We&rsquo;re small on purpose. We take on a handful of engagements a year so we can write the code, draw the pixels, and answer the email — usually in that order.
                </p>
                <p className="m-0">
                  We&rsquo;re at our best with founders sketching the first version, teams redesigning something their users secretly hate, and companies who want a partner — not a vendor — for the long run.
                </p>
              </motion.div>
            </div>

            {/* Spec Sheet Meta Grid */}
            <motion.div 
              className="mt-14 grid grid-cols-2 gap-6 border-t border-white/[0.04] pt-8 md:grid-cols-4"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {meta.map((m, index) => (
                <motion.div
                  key={m.k}
                  className="group flex flex-col gap-1.5 transition-all duration-400 hover:translate-y-[-2px]"
                  variants={itemVariants}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold transition-colors duration-300 group-hover:text-zinc-400">
                    {m.k}
                  </span>
                  <span className="font-sans text-[16px] font-bold text-zinc-200 tracking-tight transition-colors duration-300 group-hover:text-white">
                    {m.v}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Portrait Framed Showcase */}
          <motion.figure
            className="relative m-0 overflow-hidden rounded-[24px] border border-white/[0.04] bg-[#0a0a0a]/80 shadow-2xl group cursor-pointer"
            style={{ aspectRatio: "4/5" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ 
              duration: 1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ 
              scale: 1.015,
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <Image
              src="/anoop-jose.jpg"
              alt="Portrait of Anoop Jose"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority
            />
            {/* Elegant dark gradient overlay for figure caption */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-[1] transition-opacity duration-500"
            />
            <motion.figcaption 
              className="absolute inset-x-6 bottom-6 z-[2] text-white"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400 font-bold">
                Founder · Lead Engineer
              </div>
              <div className="mt-1 font-sans text-2xl font-bold tracking-tight">
                Anoop Jose
              </div>
            </motion.figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
