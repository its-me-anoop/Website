"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const meta = [
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Reading, UK" },
  { k: "Team", v: "1 + collaborators" },
  { k: "Reply time", v: "<48 hours" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="studio"
      className="relative border-t border-white/[0.04] py-24 md:py-32"
      aria-labelledby="studio-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 grid items-end gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-tight text-ink-3 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              The studio
            </motion.span>
            <motion.h2
              id="studio-heading"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
            >
              One engineer,
              <br />
              <span className="text-gradient">a few trusted hands.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[440px] text-[15.5px] leading-[1.65] text-ink-3"
          >
            Flutterly is a UK-registered product studio, founded in 2024 after a
            decade shipping inside larger teams.
          </motion.p>
        </motion.div>

        <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          {/* Story */}
          <div className="flex h-full flex-col justify-between">
            <div>
              <motion.blockquote
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative m-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-2 font-display text-[60px] font-extrabold leading-none text-brand/30 select-none"
                >
                  &ldquo;
                </span>
                <p className="relative ml-6 font-display text-[clamp(18px,2.4vw,26px)] font-bold italic leading-[1.4] tracking-tight text-white">
                  I started Flutterly because I was tired of handing off work to
                  people who didn&rsquo;t care about it as much as I did. So I stopped
                  handing it off.
                </p>
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-[480px] space-y-4 text-[15px] leading-[1.7] text-ink-3"
              >
                <p className="m-0">
                  We&rsquo;re small on purpose. A handful of engagements a year so we
                  can write the code, draw the pixels, and answer the email — usually
                  in that order.
                </p>
                <p className="m-0">
                  Best fit: founders sketching v1, teams redesigning something their
                  users secretly hate, and companies who want a partner — not a vendor —
                  for the long run.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="mt-12 grid grid-cols-2 gap-5 border-t border-white/[0.06] pt-8 md:grid-cols-4"
            >
              {meta.map((m) => (
                <motion.div
                  key={m.k}
                  variants={itemVariants}
                  className="group flex flex-col gap-1.5 transition-transform duration-400 hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-ink-3">
                    {m.k}
                  </span>
                  <span className="font-display text-[16px] font-bold tracking-tight text-ink-2 transition-colors group-hover:text-white">
                    {m.v}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.figure
            className="relative m-0 overflow-hidden rounded-[28px] border border-white/[0.06] shadow-2xl group cursor-default"
            style={{ aspectRatio: "4/5" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.012, borderColor: "rgba(255,255,255,0.12)" }}
          >
            <Image
              src="/anoop-jose.jpg"
              alt="Anoop Jose, founder and lead engineer of Flutterly"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              priority
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent"
            />
            <motion.figcaption
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute inset-x-7 bottom-7 z-[2] text-white"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-mint" />
                Founder · Lead Engineer
              </div>
              <div className="mt-2.5 font-display text-[28px] font-extrabold tracking-tight">
                Anoop Jose
              </div>
            </motion.figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
