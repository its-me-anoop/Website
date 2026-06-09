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

/** About — the person behind the work: quote, story, meta facts, portrait. */
export default function About() {
  return (
    <section
      id="studio"
      className="relative bg-canvas px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="studio-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHeader
          eyebrow="About"
          headingId="studio-heading"
          dot="var(--orange)"
          title={
            <>
              One engineer,
              <br />
              <em>a few trusted hands.</em>
            </>
          }
          lede="I run Flutterly, a UK-registered product studio, founded in 2024 after a decade shipping inside larger teams."
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
                className="relative m-0 rounded-[var(--r-lg)] bg-canvas-2 p-7 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-3 select-none font-display text-[60px] font-semibold leading-none text-accent/25"
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
                className="mt-8 max-w-[480px] space-y-4 text-[15.5px] leading-[1.7] text-ink-3"
              >
                <p className="m-0">
                  I stay small on purpose. A handful of engagements a year so I
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
                  className="flex flex-col gap-1.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {m.k}
                  </span>
                  <span className="font-display text-[16.5px] font-semibold tracking-tight text-ink">
                    {m.v}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.figure
            className="group relative m-0 cursor-default overflow-hidden rounded-[var(--r-xl)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]"
            style={{ aspectRatio: "4/5" }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01 }}
          >
            <Image
              src="/anoop-jose.jpg"
              alt="Anoop Jose, developer and designer, founder of Flutterly"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            />
            <figcaption className="absolute inset-x-7 bottom-7 z-[2] text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-green" />
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
