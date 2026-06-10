"use client";

import Link from "next/link";
import { m as motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { Marquee } from "@/components/ui/Marquee";
import { site } from "@/lib/site";

const details = [
  { k: "Email", v: site.email, href: `mailto:${site.email}` },
  { k: "Phone", v: site.phoneDisplay, href: "tel:+447780580534" },
  { k: "GitHub", v: "@its-me-anoop", href: site.social.github, external: true },
  { k: "LinkedIn", v: "Anoop Jose", href: site.social.linkedin, external: true },
];

/**
 * Contact finale — the oversized Noir sign-off: a marquee invitation, a
 * giant stroke-outline call to action that fills on hover, and a rail of
 * direct contact channels.
 */
export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="brief"
      className="grain relative overflow-hidden bg-night pb-20 pt-24 text-night-ink md:pt-32"
      aria-labelledby="contact-heading"
    >
      {/* Invitation marquee */}
      <Marquee duration={26} className="select-none border-b border-white/10 pb-10">
        {["Got a project in mind?", "Let's talk", "Got a project in mind?", "Let's talk"].map(
          (t, i) => (
            <span key={i} className="flex items-center gap-6 pr-6">
              <span
                className={`font-display text-[clamp(20px,2.6vw,34px)] font-medium uppercase tracking-[-0.01em] ${
                  i % 2 ? "text-accent" : "text-white/60"
                }`}
              >
                {t}
              </span>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          )
        )}
      </Marquee>

      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* Giant CTA */}
        <h2 id="contact-heading" className="mt-14 md:mt-20">
          <Link
            href={`mailto:${site.email}`}
            className="group block font-display font-semibold uppercase leading-[0.9] tracking-[-0.03em]"
            aria-label={`Start a project — email ${site.email}`}
          >
            <RevealText className="text-[clamp(52px,11vw,160px)] text-night-ink">
              Let&rsquo;s work
            </RevealText>
            <RevealText delay={0.08} className="text-[clamp(52px,11vw,160px)]">
              <span className="text-stroke transition-all duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke:1.5px_var(--accent)]">
                Together
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-3 inline-block h-[0.55em] w-[0.55em] align-baseline text-accent transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2"
              />
            </RevealText>
          </Link>
        </h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-[460px] text-[15px] leading-[1.75] text-white/55"
        >
          I only take a handful of projects a year, so not every fit is the
          right fit. Write anyway — if I can&rsquo;t help, I&rsquo;ll usually
          know someone who can.
        </motion.p>

        {/* Channels */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--r-md)] border border-white/10 bg-white/10 md:grid-cols-4">
          {details.map((d, i) => (
            <motion.li
              key={d.k}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="bg-night"
            >
              <Link
                href={d.href}
                target={d.external ? "_blank" : undefined}
                rel={d.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col gap-6 p-5 transition-colors duration-300 hover:bg-white/[0.04] md:p-6"
              >
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {d.k}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </span>
                <span className="font-display text-[15px] font-medium tracking-tight text-white/85 transition-colors duration-300 group-hover:text-white">
                  {d.v}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
