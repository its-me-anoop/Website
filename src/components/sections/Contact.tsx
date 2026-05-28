"use client";

import Link from "next/link";
import { m } from "framer-motion";
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

export function Contact() {
  return (
    <section
      id="brief"
      className="relative overflow-hidden border-t border-line px-[var(--gutter)] pb-24 pt-32 md:pt-40"
      aria-labelledby="contact-heading"
    >
      {/* Top gradient line */}
      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-center"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, var(--signal) 50%, transparent 90%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px]">
        <m.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-ring" />
          Get in touch
        </m.span>

        <m.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mt-6 font-display text-[clamp(48px,9vw,120px)] font-semibold leading-[0.92] tracking-[-0.04em] text-ink"
        >
          Let&rsquo;s build
          <br />
          something <span className="text-signal">great.</span>
        </m.h2>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-12 grid items-start gap-10 md:grid-cols-2 md:gap-16"
        >
          <p className="max-w-[440px] text-[16px] leading-[1.7] text-ink-3">
            We only take a handful of projects a year, so not every fit is the right
            fit. Write anyway — if we can&rsquo;t help, we&rsquo;ll usually know someone
            who can.
          </p>

          <div className="flex flex-col items-start gap-5">
            <Link
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 border-b border-line-2 pb-2 font-display text-[clamp(22px,3vw,36px)] font-semibold tracking-tight text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
              aria-label={`Email ${site.email}`}
            >
              {site.email}
              <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
            </Link>

            <Link href={`mailto:${site.email}`} aria-label="Start a project brief">
              <Button variant="signal" size="lg" className="group">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </m.div>

        {/* Details */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-24 grid gap-4 border-t border-line pt-10 md:grid-cols-4"
        >
          {details.map((d) => {
            const Icon = d.icon;
            const inner = (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-signal transition-all duration-300 group-hover:border-signal/40 group-hover:bg-signal/10">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {d.k}
                  </span>
                  <span className="mt-0.5 font-display text-[14.5px] font-semibold tracking-tight text-ink-2 transition-colors duration-300 group-hover:text-ink">
                    {d.v}
                  </span>
                </div>
              </>
            );
            const cls =
              "group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-3.5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:bg-white/[0.04]";
            return (
              <m.div key={d.k} variants={staggerItem}>
                {d.href ? (
                  <Link href={d.href} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
