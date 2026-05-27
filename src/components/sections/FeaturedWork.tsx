"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TiltParallaxCard } from "@/components/ui/TiltParallaxCard";

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
    badgeTone: "from-brand to-violet",
    bgGradient: "linear-gradient(165deg,#0a1226 0%,#100a26 100%)",
    glow: "rgba(99, 102, 241, 0.22)",
    featured: true,
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
    badgeTone: "from-amber to-fuchsia",
    bgGradient: "linear-gradient(165deg,#221406 0%,#2c1216 100%)",
    glow: "rgba(236, 72, 153, 0.20)",
    featured: false,
  },
  {
    href: "#brief",
    tag: "Brand · Web",
    title: "Greenmead",
    subtitle: "Brand and marketing site for a wellness practice.",
    description: "Editorial typography, fluid animations, and a custom booking flow.",
    year: "2024",
    badge: "Case",
    badgeTone: "from-mint to-cyan",
    bgGradient: "linear-gradient(165deg,#06231a 0%,#0a261c 100%)",
    glow: "rgba(16, 185, 129, 0.20)",
    featured: false,
  },
  {
    href: "#brief",
    tag: "Commerce",
    title: "JJ Paper",
    subtitle: "A custom paper-goods storefront with print-on-demand pipeline.",
    description: "Headless commerce on Next.js, Stripe-checkout, Shopify integration.",
    year: "2024",
    badge: "Case",
    badgeTone: "from-cyan to-violet",
    bgGradient: "linear-gradient(165deg,#0c1622 0%,#0e1226 100%)",
    glow: "rgba(34, 211, 238, 0.20)",
    featured: false,
  },
  {
    href: "#brief",
    tag: "Hospitality",
    title: "Sandbourne",
    subtitle: "A high-throughput reservations engine for boutique hotels.",
    description: "Real-time inventory, multi-property bookings, and a calm operator UI.",
    year: "2024",
    badge: "Case",
    badgeTone: "from-violet to-fuchsia",
    bgGradient: "linear-gradient(165deg,#0a111e 0%,#160a26 100%)",
    glow: "rgba(168, 85, 247, 0.20)",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.8 },
  },
};

export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [featured, ...rest] = projects;

  return (
    <section
      ref={ref}
      id="work"
      className="relative border-t border-white/[0.04] py-24 md:py-32"
      aria-labelledby="work-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 grid items-end gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-tight text-ink-3 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              Selected work
            </motion.span>
            <motion.h2
              id="work-heading"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
            >
              Recent projects,
              <br />
              <span className="text-fade">built to last.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[440px] text-[15.5px] leading-[1.65] text-ink-3"
          >
            A short catalogue of client products and original apps. Every line of
            code shipped under the Flutterly name passes through one engineer&rsquo;s
            keyboard.
          </motion.p>
        </motion.div>

        {/* Featured project — full width */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-5">
            <Link
              href={featured.href}
              className="group relative block"
              aria-label={`${featured.title} case study`}
            >
              <TiltParallaxCard
                glowColor={featured.glow}
                className="h-[440px] w-full overflow-hidden border-white/[0.06] p-0 md:h-[520px]"
                maxTilt={3}
                maxParallax={14}
              >
                {({ xOffsetInverse, yOffsetInverse }) => (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ background: featured.bgGradient }}
                    />
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-12 -right-6 h-[88%] w-[44%] overflow-hidden rounded-[40px] border border-white/[0.10] shadow-2xl md:-bottom-16 md:-right-10 md:h-[110%] md:w-[38%]"
                      style={{
                        x: xOffsetInverse,
                        y: yOffsetInverse,
                        rotate: 4,
                      }}
                    >
                      {featured.image && (
                        <Image
                          src={featured.image}
                          alt={`${featured.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </motion.div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3 backdrop-blur">
                          {featured.tag}
                        </span>
                        <span className="font-mono text-[11px] text-muted">
                          {featured.year}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${featured.badgeTone} px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          {featured.badge}
                        </span>
                      </div>

                      <div className="max-w-[58%]">
                        <h3 className="font-display text-[36px] font-extrabold tracking-tight text-white md:text-[56px]">
                          {featured.title}
                        </h3>
                        <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-ink-2 md:text-[17px]">
                          {featured.subtitle}
                        </p>
                        <p className="mt-3 max-w-md text-[13px] leading-[1.6] text-muted">
                          {featured.description}
                        </p>

                        <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-black transition-transform duration-300 group-hover:translate-x-1">
                          View case study
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </TiltParallaxCard>
            </Link>
          </motion.div>

          {/* Project grid */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {rest.map((p) => (
              <motion.div key={p.title} variants={itemVariants}>
                <Link
                  href={p.href}
                  className="group block"
                  aria-label={`${p.title} case`}
                >
                  <TiltParallaxCard
                    glowColor={p.glow}
                    className="h-[280px] overflow-hidden border-white/[0.06] p-0"
                    maxTilt={4}
                    maxParallax={10}
                  >
                    {({ xOffset, yOffset }) => (
                      <>
                        <div className="absolute inset-0" style={{ background: p.bgGradient }} />
                        {p.image && (
                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-4 top-6 w-[110px] md:top-10 md:w-[140px]"
                            style={{ x: xOffset, y: yOffset, rotate: 6 }}
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
                            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3 backdrop-blur">
                              {p.tag}
                            </span>
                            <span className="font-mono text-[11px] text-muted">{p.year}</span>
                          </div>

                          <div className="max-w-[68%]">
                            <h3 className="font-display text-[26px] font-extrabold tracking-tight text-white md:text-[30px]">
                              {p.title}
                            </h3>
                            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-3 transition-colors duration-300 group-hover:text-ink-2">
                              {p.subtitle}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${p.badgeTone} px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-white`}
                            >
                              {p.badge}
                            </span>
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-ink-3 transition-all duration-300 group-hover:border-white/[0.18] group-hover:bg-white group-hover:text-black">
                              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </TiltParallaxCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-[13px] text-muted"
        >
          A few clients we work with remain under NDA. Happy to walk you through
          them on a brief.
        </motion.p>
      </div>
    </section>
  );
}
