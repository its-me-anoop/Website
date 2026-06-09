"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const details = [
  { icon: Mail, k: "Email", v: site.email, href: `mailto:${site.email}` },
  { icon: Phone, k: "Phone", v: site.phoneDisplay, href: "tel:+447780580534" },
  { icon: MapPin, k: "Office", v: "Reading, UK" },
  { icon: Clock, k: "Reply", v: "Within 48 hours" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Contact finale — a full-bleed black band (Apple "pro" contrast moment)
 * with an oversized invitation, a direct email link, and detail cards.
 */
export function Contact() {
  return (
    <section
      id="brief"
      className="relative overflow-hidden bg-night px-[var(--gutter)] pb-28 pt-32 text-night-ink md:pt-40"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50"
        >
          <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-accent" />
          Get in touch
        </motion.span>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mt-6 font-display text-[clamp(48px,9vw,120px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
        >
          Let&rsquo;s build
          <br />
          something <span className="text-accent-gradient">great.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-12 grid items-start gap-10 md:grid-cols-2 md:gap-16"
        >
          <p className="max-w-[440px] text-[16.5px] leading-[1.7] text-white/60">
            I only take a handful of projects a year, so not every fit is the right
            fit. Write anyway — if I can&rsquo;t help, I&rsquo;ll usually know someone
            who can.
          </p>

          <div className="flex flex-col items-start gap-5">
            <Link
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 border-b border-white/20 pb-2 font-display text-[clamp(22px,3vw,36px)] font-semibold tracking-tight text-white transition-colors duration-300 hover:border-accent hover:text-accent"
              aria-label={`Email ${site.email}`}
            >
              {site.email}
              <ArrowUpRight className="h-6 w-6 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>

            <Link href={`mailto:${site.email}`} aria-label="Start a project brief">
              <Button variant="primary" size="lg" className="group">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-24 grid gap-4 border-t border-white/10 pt-10 md:grid-cols-4"
        >
          {details.map((d) => {
            const Icon = d.icon;
            const inner = (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-accent transition-colors duration-300 group-hover:bg-accent/15">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {d.k}
                  </span>
                  <span className="mt-0.5 font-display text-[15px] font-semibold tracking-tight text-white/85 transition-colors duration-300 group-hover:text-white">
                    {d.v}
                  </span>
                </div>
              </>
            );
            const cls =
              "group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]";
            return (
              <motion.div key={d.k} variants={staggerItem}>
                {d.href ? (
                  <Link href={d.href} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
