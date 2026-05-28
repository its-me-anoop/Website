"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const meta = [
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Reading, UK" },
  { k: "Team", v: "1 + collaborators" },
  { k: "Reply time", v: "<48 hours" },
];

export default function About() {
  return (
    <section
      id="studio"
      className="relative border-t border-line px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="studio-heading"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader
          eyebrow="The studio"
          headingId="studio-heading"
          dot="var(--plum)"
          title={
            <>
              One engineer,
              <br />
              <em>a few trusted hands.</em>
            </>
          }
          lede="Flutterly is a UK-registered product studio, founded in 2024 after a decade shipping inside larger teams."
        />

        <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          {/* Story */}
          <div className="flex h-full flex-col justify-between">
            <div>
              <motion.blockquote
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative m-0 rounded-[var(--r-lg)] border border-line bg-white/[0.02] p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-2 select-none font-display text-[60px] font-semibold leading-none text-signal/30"
                >
                  &ldquo;
                </span>
                <p className="relative ml-6 font-display text-[clamp(18px,2.4vw,26px)] font-semibold italic leading-[1.4] tracking-tight text-ink">
                  I started Flutterly because I was tired of handing off work to
                  people who didn&rsquo;t care about it as much as I did. So I stopped
                  handing it off.
                </p>
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-12 grid grid-cols-2 gap-5 border-t border-line pt-8 md:grid-cols-4"
            >
              {meta.map((m) => (
                <motion.div
                  key={m.k}
                  variants={staggerItem}
                  className="group flex flex-col gap-1.5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-ink-3">
                    {m.k}
                  </span>
                  <span className="font-display text-[16px] font-semibold tracking-tight text-ink-2 transition-colors group-hover:text-ink">
                    {m.v}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.figure
            className="group relative m-0 cursor-default overflow-hidden rounded-[var(--r-xl)] border border-line shadow-2xl"
            style={{ aspectRatio: "4/5" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.012 }}
          >
            <Image
              src="/anoop-jose.jpg"
              alt="Anoop Jose, founder and lead engineer of Flutterly"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent"
            />
            <figcaption className="absolute inset-x-7 bottom-7 z-[2] text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-signal" />
                Founder · Lead Engineer
              </div>
              <div className="mt-2.5 font-display text-[28px] font-semibold tracking-tight">
                Anoop Jose
              </div>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
