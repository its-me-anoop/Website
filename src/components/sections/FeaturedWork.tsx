"use client";

import Link from "next/link";
import Image from "next/image";
import { m as motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiftCard } from "@/components/ui/LiftCard";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const projects = [
  {
    href: "/projects/sipli",
    tag: "iOS · watchOS",
    title: "Sipli",
    subtitle: "AI-powered hydration on iPhone and Apple Watch.",
    description:
      "On-device intelligence, predictive coaching, and a SwiftUI architecture tuned for 120hz scrolling.",
    image: "/images/sipli/iphone/01-hero-1320x2868.jpg",
    year: "2026",
    badge: "Live",
    bg: "linear-gradient(165deg,#e9f3fd 0%,#eceefe 100%)",
    tint: "#0071e3",
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
    bg: "linear-gradient(165deg,#fdf2e3 0%,#fdeae2 100%)",
    tint: "#e07a1f",
  },
  {
    href: "#brief",
    tag: "Brand · Web",
    title: "Greenmead",
    subtitle: "Brand and marketing site for a wellness practice.",
    description: "Editorial typography, fluid animations, and a custom booking flow.",
    year: "2024",
    badge: "Case",
    bg: "linear-gradient(165deg,#e8f7ef 0%,#ecfaf1 100%)",
    tint: "#34c759",
  },
  {
    href: "#brief",
    tag: "Commerce",
    title: "JJ Paper",
    subtitle: "A custom paper-goods storefront with print-on-demand pipeline.",
    description: "Headless commerce on Next.js, Stripe-checkout, Shopify integration.",
    year: "2024",
    badge: "Case",
    bg: "linear-gradient(165deg,#edf3fa 0%,#eef0fc 100%)",
    tint: "#5e5ce6",
  },
  {
    href: "#brief",
    tag: "Hospitality",
    title: "Sandbourne",
    subtitle: "A high-throughput reservations engine for boutique hotels.",
    description: "Real-time inventory, multi-property bookings, and a calm operator UI.",
    year: "2024",
    badge: "Case",
    bg: "linear-gradient(165deg,#f0eefb 0%,#f5ecf8 100%)",
    tint: "#af52de",
  },
];

/**
 * Selected work — an Apple-style grid of pastel product tiles. The featured
 * Sipli tile is full-width with a parallaxed device screenshot; the rest sit
 * in a two-up grid. Each tile lifts softly and tilts toward the cursor.
 */
export function FeaturedWork() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="work"
      className="relative bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHeader
          eyebrow="Selected work"
          headingId="work-heading"
          title={
            <>
              Recent projects,
              <br />
              <em>built to last.</em>
            </>
          }
          lede="A short catalogue of client products and original apps. Every line of code shipped here passes through my keyboard."
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
              <LiftCard tilt={1.5} parallax={14} className="h-[460px] w-full overflow-hidden border-transparent p-0 md:h-[540px]">
                {({ px, py }) => (
                  <>
                    <div className="absolute inset-0" style={{ background: featured.bg }} />
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-10 right-[6%] hidden h-[105%] w-[34%] overflow-hidden rounded-[44px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.35)] md:block"
                      style={{ x: px, y: py, rotate: 3 }}
                    >
                      <Image
                        src={featured.image!}
                        alt={`${featured.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 0px, 420px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </motion.div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2 backdrop-blur">
                          {featured.tag}
                        </span>
                        <span className="font-mono text-[11px] text-ink-3">{featured.year}</span>
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                          style={{ background: featured.tint }}
                        >
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
                          {featured.badge}
                        </span>
                      </div>

                      <div className="max-w-[60%]">
                        <h3 className="font-display text-[38px] font-semibold tracking-tight text-ink md:text-[60px]">
                          {featured.title}
                        </h3>
                        <p className="mt-3 max-w-md text-[16px] leading-[1.55] text-ink-2 md:text-[18px]">
                          {featured.subtitle}
                        </p>
                        <p className="mt-3 max-w-md text-[13.5px] leading-[1.6] text-ink-3">
                          {featured.description}
                        </p>
                        <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-4.5 py-2.5 text-[13px] font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                          View case study
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </LiftCard>
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Link href={p.href} className="group block" aria-label={`${p.title} case`}>
                  <LiftCard tilt={2} parallax={10} className="h-[300px] overflow-hidden border-transparent p-0">
                    {({ px, py }) => (
                      <>
                        <div className="absolute inset-0" style={{ background: p.bg }} />
                        {p.image && (
                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-3 top-8 w-[110px] md:w-[140px]"
                            style={{ x: px, y: py, rotate: 6 }}
                          >
                            <Image
                              src={p.image}
                              alt=""
                              width={140}
                              height={196}
                              sizes="140px"
                              className="w-full opacity-90 drop-shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                            />
                          </motion.div>
                        )}

                        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-2 backdrop-blur">
                              {p.tag}
                            </span>
                            <span className="font-mono text-[11px] text-ink-3">{p.year}</span>
                          </div>

                          <div className="max-w-[70%]">
                            <h3 className="font-display text-[27px] font-semibold tracking-tight text-ink md:text-[31px]">
                              {p.title}
                            </h3>
                            <p className="mt-2 text-[14px] leading-[1.55] text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                              {p.subtitle}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span
                              className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                              style={{ background: p.tint }}
                            >
                              {p.badge}
                            </span>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-3 shadow-sm backdrop-blur transition-all duration-300 group-hover:bg-ink group-hover:text-white">
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </LiftCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-10 text-[13.5px] text-muted">
          A few clients I work with remain under NDA. Happy to walk you through
          them on a brief.
        </p>
      </div>
    </section>
  );
}
