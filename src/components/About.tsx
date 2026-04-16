"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-border bg-background px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 border-b border-border pb-8 sm:mb-20"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            № 04 · The Studio
          </p>
          <h2
            id="about-heading"
            className="max-w-4xl font-display text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
          >
            One person,{" "}
            <span className="italic text-foreground-secondary">
              a few trusted collaborators,
            </span>{" "}
            and a very short client list.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Pull quote + body */}
          <div className="lg:col-span-7">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-1 -top-8 font-display text-[8rem] leading-none text-accent/30 sm:text-[11rem]"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-2xl font-light italic leading-[1.25] tracking-[-0.01em] text-foreground sm:text-3xl md:text-[2.25rem] md:leading-[1.22]">
                I started Flutterly because I was tired of handing off work to
                people who didn&rsquo;t care about it as much as I did. So I
                stopped handing it off.
              </p>
              <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-tertiary">
                — Anoop Jose, Founder
              </footer>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-10 space-y-5 border-t border-border pt-8 text-base leading-relaxed text-foreground-secondary sm:text-[17px]"
            >
              <p>
                Flutterly is a UK-registered product studio, founded in 2024
                after a decade of shipping inside larger teams. We&rsquo;re
                small on purpose. We take on a handful of engagements a year so
                we can write the code, draw the pixels, and answer the email —
                usually in that order.
              </p>
              <p>
                We&rsquo;re at our best with founders sketching the first
                version, teams redesigning something their users secretly hate,
                and companies who want a partner — not a vendor — for the long
                run.
              </p>
            </motion.div>

            {/* Meta ledger */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4"
            >
              {[
                { label: "Founded", value: "2024" },
                { label: "Based", value: "Reading, UK" },
                { label: "Headcount", value: "1 + friends" },
                { label: "Reply time", value: "Within a day" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                    {m.label}
                  </dt>
                  <dd className="font-display text-lg text-foreground">
                    {m.value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground-secondary transition-colors hover:border-foreground-tertiary hover:text-foreground"
                >
                  <social.icon size={14} strokeWidth={1.5} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                    {social.label}
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="group relative aspect-[4/5] overflow-hidden">
              <Image
                src="/anoop-jose.jpg"
                alt="Portrait of Anoop Jose, founder of Flutterly"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale transition-all duration-[1.2s] ease-out group-hover:grayscale-0 group-hover:scale-[1.02]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                    Founder · Lead Engineer
                  </p>
                  <p className="mt-1 font-display text-xl text-foreground">
                    Anoop Jose
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                  ↓ Hover
                </p>
              </div>
            </div>
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
              Photographed in the studio, Reading · 2025
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
