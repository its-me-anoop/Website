"use client";

import Image from "next/image";
import { m as motion, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";

const meta = [
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Reading, UK" },
  { k: "Team", v: "1 + collaborators" },
  { k: "Reply time", v: "<48 hours" },
];

/**
 * About — editorial split: an oversized statement and story on the left, a
 * tall portrait with a parallax-free clean crop on the right, and a meta
 * strip underneath.
 */
export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="studio"
      className="relative bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="studio-heading"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-14 md:mb-20">
          <h2
            id="studio-heading"
            className="font-display font-semibold uppercase leading-[0.92] tracking-[-0.025em]"
          >
            <RevealText className="text-[clamp(40px,7vw,96px)] text-ink">About</RevealText>
            <RevealText delay={0.08} className="text-[clamp(40px,7vw,96px)]">
              <span className="text-stroke">the studio</span>
            </RevealText>
          </h2>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16 lg:gap-24">
          {/* Story */}
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(22px,3vw,34px)] font-medium leading-[1.3] tracking-[-0.015em] text-ink"
            >
              &ldquo;I started Flutterly because I was tired of handing off work
              to people who didn&rsquo;t care about it as much as I did.{" "}
              <span className="text-accent">So I stopped handing it off.</span>&rdquo;
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-[480px] space-y-4 text-[15px] leading-[1.75] text-ink-3"
            >
              <p className="m-0">
                One engineer, a few trusted hands. I run Flutterly, a UK-registered
                product studio, founded in 2024 after a decade shipping inside
                larger teams. Small on purpose — a handful of engagements a year,
                so I can write the code, draw the pixels, and answer the email.
              </p>
              <p className="m-0">
                Best fit: founders sketching v1, teams redesigning something their
                users secretly hate, and companies who want a partner — not a
                vendor — for the long run.
              </p>
            </motion.div>

            {/* Meta strip */}
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line-2 pt-8 md:grid-cols-4">
              {meta.map((item, i) => (
                <motion.div
                  key={item.k}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex flex-col gap-1.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {item.k}
                  </dt>
                  <dd className="m-0 font-display text-[17px] font-semibold tracking-tight text-ink">
                    {item.v}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* Portrait */}
          <motion.figure
            className="relative m-0 overflow-hidden rounded-[var(--r-lg)]"
            style={{ aspectRatio: "4/5" }}
            initial={reduce ? false : { opacity: 0, clipPath: "inset(8% 8% 8% 8% round 22px)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 22px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/anoop-jose.jpg"
              alt="Anoop Jose, developer and designer, founder of Flutterly"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover grayscale-[28%] transition-[filter] duration-700 hover:grayscale-0"
            />
            <figcaption className="absolute inset-x-5 bottom-5 z-[2] flex items-center justify-between rounded-full border border-white/15 bg-black/45 px-4 py-2.5 backdrop-blur-md">
              <span className="font-display text-[15px] font-semibold tracking-tight text-white">
                Anoop Jose
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/60">
                Founder · Lead Engineer
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
