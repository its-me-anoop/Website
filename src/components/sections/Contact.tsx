"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const briefFits = [
  "Early-stage products with rough edges that need shaping.",
  "Internal tools that your own team secretly hates using.",
  "Ambitious mobile apps where the details really matter.",
  "Websites for people who care about craft and performance.",
];

const details = [
  {
    label: "Write",
    value: "anoop@flutterly.co.uk",
    href: "mailto:anoop@flutterly.co.uk",
  },
  {
    label: "Ring",
    value: "+44 7780 580 534",
    href: "tel:+447780580534",
  },
  {
    label: "Visit",
    value: "Reading, Berkshire, UK",
    href: null,
  },
  {
    label: "Usual reply",
    value: "Within a working day",
    href: null,
  },
];

export function Contact() {
  return (
    <section
      id="brief"
      aria-labelledby="brief-heading"
      className="relative overflow-hidden border-t border-border bg-background-secondary px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 border-b border-border pb-8 sm:mb-20"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            № 05 · The Brief
          </p>
          <h2
            id="brief-heading"
            className="font-display text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.92] tracking-[-0.03em] text-foreground"
          >
            Got a brief{" "}
            <span className="italic text-foreground-secondary">worth</span>
            <br />
            building?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: What fits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-7"
          >
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-foreground-secondary sm:text-xl">
              We only take on a handful of projects a year, so not every fit is
              the right fit. Here&rsquo;s what tends to click:
            </p>

            <ul className="mt-10 space-y-0 border-t border-border">
              {briefFits.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="flex items-baseline gap-5 border-b border-border py-5 sm:gap-7 sm:py-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    0{i + 1}
                  </span>
                  <span className="text-[15px] leading-relaxed text-foreground sm:text-base">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-foreground-tertiary">
              Doesn&rsquo;t quite match? Write anyway. If we can&rsquo;t help,
              we&rsquo;ll usually know someone who can.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-10"
            >
              <Link
                href="mailto:anoop@flutterly.co.uk?subject=Brief%20for%20Flutterly"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-xs font-bold uppercase tracking-[0.22em] text-background transition-colors hover:bg-accent-hover"
              >
                <span>Send a brief</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Details ledger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-5"
          >
            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground-tertiary">
                Contact card
              </p>
              <dl className="divide-y divide-border">
                {details.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-3 gap-4 py-4 first:pt-0 last:pb-0 sm:py-5"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:text-[11px]">
                      {row.label}
                    </dt>
                    <dd className="col-span-2 text-right font-display text-base text-foreground sm:text-lg">
                      {row.href ? (
                        <Link
                          href={row.href}
                          className="transition-colors hover:text-accent"
                        >
                          {row.value}
                        </Link>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
              Signed, the studio.
            </p>
            <p className="mt-1 font-display text-2xl italic text-foreground-secondary">
              — A. Jose
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
