"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const projects = [
  {
    href: "/projects/sipli",
    tag: "iOS · watchOS",
    title: "Sipli",
    subtitle: "AI-powered hydration on iPhone and Apple Watch.",
    description:
      "On-device intelligence, predictive coaching, and a SwiftUI architecture tuned for 120hz scrolling.",
    image: "/images/sipli/iphone/01-hero-1320x2868.png",
    year: "2026",
    badge: "Live",
    bg: "linear-gradient(165deg,#0a1226 0%,#100a26 100%)",
    glow: "rgba(124,155,255,0.16)",
  },
  {
    href: "/projects/artling",
    tag: "iOS",
    title: "Artling",
    subtitle: "A visual archive for children’s milestones.",
    description:
      "Beautifully animated, privacy-first archive. iCloud sync, Live Activities, and a calming illustrated identity.",
    image: "/projects/artling/fox-painter.png",
    year: "2025",
    badge: "Shipped",
    bg: "linear-gradient(165deg,#221406 0%,#2c1216 100%)",
    glow: "rgba(255,138,115,0.16)",
  },
  {
    href: "#brief",
    tag: "Brand · Web",
    title: "Greenmead",
    subtitle: "Brand and marketing site for a wellness practice.",
    description: "Editorial typography, fluid animations, and a custom booking flow.",
    year: "2024",
    badge: "Case",
    bg: "linear-gradient(165deg,#06231a 0%,#0a261c 100%)",
    glow: "rgba(88,224,199,0.16)",
  },
  {
    href: "#brief",
    tag: "Commerce",
    title: "JJ Paper",
    subtitle: "A custom paper-goods storefront with print-on-demand pipeline.",
    description: "Headless commerce on Next.js, Stripe-checkout, Shopify integration.",
    year: "2024",
    badge: "Case",
    bg: "linear-gradient(165deg,#0c1622 0%,#0e1226 100%)",
    glow: "rgba(124,155,255,0.16)",
  },
  {
    href: "#brief",
    tag: "Hospitality",
    title: "Sandbourne",
    subtitle: "A high-throughput reservations engine for boutique hotels.",
    description: "Real-time inventory, multi-property bookings, and a calm operator UI.",
    year: "2024",
    badge: "Case",
    bg: "linear-gradient(165deg,#0a111e 0%,#160a26 100%)",
    glow: "rgba(181,140,255,0.16)",
  },
];

export function FeaturedWork() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="work"
      className="relative border-t border-line px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <SectionHeader
          eyebrow="Selected work"
          headingId="work-heading"
          dot="var(--azure)"
          title={
            <>
              Recent projects,
              <br />
              <span className="text-fade">built to last.</span>
            </>
          }
          lede="A short catalogue of client products and original apps. Every line of code shipped under the Flutterly name passes through one engineer’s keyboard."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          {/* Featured */}
          <motion.div variants={staggerItem} className="mb-5">
            <Link href={featured.href} className="group block" aria-label={`${featured.title} case study`}>
              <SpotlightCard
                glow={featured.glow}
                tilt={3}
                parallax={14}
                className="h-[440px] w-full overflow-hidden p-0 md:h-[520px]"
              >
                {({ px, py }) => (
                  <>
                    <div className="absolute inset-0" style={{ background: featured.bg }} />
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-12 -right-6 h-[88%] w-[44%] overflow-hidden rounded-[40px] border border-line-2 shadow-2xl md:-bottom-16 md:-right-10 md:h-[110%] md:w-[38%]"
                      style={{ x: px, y: py, rotate: 4 }}
                    >
                      <Image
                        src={featured.image!}
                        alt={`${featured.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full border border-line-2 bg-white/[0.05] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2 backdrop-blur">
                          {featured.tag}
                        </span>
                        <span className="font-mono text-[11px] text-ink-3">{featured.year}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-signal-ink">
                          <span className="h-1.5 w-1.5 rounded-full bg-signal-ink/70 animate-pulse" />
                          {featured.badge}
                        </span>
                      </div>

                      <div className="max-w-[58%]">
                        <h3 className="font-display text-[36px] font-semibold tracking-tight text-ink md:text-[56px]">
                          {featured.title}
                        </h3>
                        <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-ink-2 md:text-[17px]">
                          {featured.subtitle}
                        </p>
                        <p className="mt-3 max-w-md text-[13px] leading-[1.6] text-ink-3">
                          {featured.description}
                        </p>
                        <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[12px] font-bold text-obsidian transition-transform duration-300 group-hover:translate-x-1">
                          View case study
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {rest.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Link href={p.href} className="group block" aria-label={`${p.title} case`}>
                  <SpotlightCard glow={p.glow} tilt={4} parallax={10} className="h-[280px] overflow-hidden p-0">
                    {({ px, py }) => (
                      <>
                        <div className="absolute inset-0" style={{ background: p.bg }} />
                        {p.image && (
                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-4 top-6 w-[110px] md:top-10 md:w-[140px]"
                            style={{ x: px, y: py, rotate: 6 }}
                          >
                            <Image
                              src={p.image}
                              alt=""
                              width={140}
                              height={196}
                              sizes="140px"
                              className="w-full opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                            />
                          </motion.div>
                        )}

                        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full border border-line-2 bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2 backdrop-blur">
                              {p.tag}
                            </span>
                            <span className="font-mono text-[11px] text-ink-3">{p.year}</span>
                          </div>

                          <div className="max-w-[68%]">
                            <h3 className="font-display text-[26px] font-semibold tracking-tight text-ink md:text-[30px]">
                              {p.title}
                            </h3>
                            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                              {p.subtitle}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center rounded-full border border-line-2 bg-white/[0.04] px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-2">
                              {p.badge}
                            </span>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-2 bg-white/[0.03] text-ink-3 transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-ink">
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-10 text-[13px] text-muted">
          A few clients we work with remain under NDA. Happy to walk you through
          them on a brief.
        </p>
      </div>
    </section>
  );
}
