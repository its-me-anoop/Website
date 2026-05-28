"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BellDot,
  Camera,
  Clock3,
  Cloud,
  FileText,
  Mic,
  Search,
  Shield,
  Share2,
  Sparkles,
  Star,
  Tags,
  WandSparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    icon: Camera,
    title: "Capture in the moment",
    description:
      "Save drawings from the camera, photo library, or document scanner before they disappear into a cabinet.",
  },
  {
    icon: Mic,
    title: "Keep the story attached",
    description:
      "Add dates, tags, favourites, and voice notes so every piece carries the memory around it, not just the image.",
  },
  {
    icon: Clock3,
    title: "Relive the years beautifully",
    description:
      'Browse a living timeline, celebrate milestones, and surface "On This Day" moments without extra work.',
  },
];

const featureCards: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Share2,
    title: "Family sharing",
    description:
      "Invite another parent or guardian into a shared profile without turning the archive into a group chat.",
  },
  {
    icon: Sparkles,
    title: "AI captions",
    description:
      "Generate warm titles and captions from the artwork itself when you want help labeling a busy week.",
  },
  {
    icon: Search,
    title: "Search and filter",
    description:
      "Jump back to animals, school projects, favourite pieces, or a specific child in seconds.",
  },
  {
    icon: Star,
    title: "Milestones and memories",
    description:
      "Track creative streaks, badge-worthy moments, and anniversary resurfacing without building another routine.",
  },
  {
    icon: FileText,
    title: "Export-ready keepsakes",
    description:
      "Turn a child’s growing gallery into a polished PDF portfolio when you want something tangible to share.",
  },
  {
    icon: BellDot,
    title: "Gentle reminders",
    description:
      "Use local reminders to revisit old work or nudge yourself when the archive has been quiet for a while.",
  },
];

const trustPoints = [
  "SwiftUI experience built for iPhone and iPad",
  "Core library stored locally with cloud support for synced families",
  "No advertising SDKs or noisy growth loops",
  "Clear in-app account deletion and privacy access",
];

const reasons = [
  "Capture first, organise later",
  "Search by child, tag, or favourite",
  "Share a profile without a photo-dump thread",
  "Revisit memories through time, not folders",
];

const privacyPoints: { icon: LucideIcon; label: string; copy: string }[] = [
  {
    icon: Cloud,
    label: "Cloud-ready",
    copy: "Profiles, sync metadata, and premium cloud content use Firebase services.",
  },
  {
    icon: WandSparkles,
    label: "AI explained",
    copy: "Caption generation and validation can process artwork through Firebase AI / Google AI when used.",
  },
  {
    icon: Tags,
    label: "Family controls",
    copy: "Permissions, notifications, sharing, and account deletion are all documented plainly.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  );
}

function ArtlingPhoneMockup() {
  const galleryCards = [
    { title: "Rainbow House", meta: "Saved today" },
    { title: "Tiger Parade", meta: "Shared with Dad" },
    { title: "Rocket Garden", meta: "Favourite" },
    { title: "Ocean Parade", meta: "2 years ago" },
  ];

  return (
    <div
      className="relative h-full w-full overflow-hidden px-5 pb-5 pt-6 text-[#2F211D]"
      style={{
        background: "linear-gradient(180deg,#FFF8F0 0%,#FFF1E7 46%,#FFEBDD 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,157,87,0.22),transparent_70%)]" />

      <div className="relative flex items-center justify-between pt-9">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A46B53]">
            Artling
          </p>
          <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.03em]">
            Gallery
          </h3>
        </div>
        <div className="rounded-full border border-[#ECD9CF] bg-white/80 px-3 py-2 text-[10px] font-semibold text-[#6E574D] shadow-sm">
          2 children
        </div>
      </div>

      <div className="relative mt-4 flex gap-2 overflow-hidden">
        {["All", "Maya", "Noah", "Add"].map((chip, index) => (
          <span
            key={chip}
            className={`rounded-full px-3 py-2 text-[10px] font-semibold shadow-sm ${
              index === 0
                ? "bg-[#FF9D57] text-white"
                : "border border-[#ECD9CF] bg-white/75 text-[#6E574D]"
            }`}
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3">
        {galleryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[24px] border border-white/80 bg-white/70 p-3 shadow-[0_12px_28px_rgba(96,67,54,0.10)]"
          >
            <div className="rounded-[18px] bg-white/70 p-2">
              <div className="aspect-[0.95/1] rounded-[14px] bg-[radial-gradient(circle_at_30%_25%,rgba(255,157,87,0.3),transparent_34%),radial-gradient(circle_at_72%_32%,rgba(111,175,209,0.22),transparent_32%),radial-gradient(circle_at_54%_72%,rgba(118,182,153,0.22),transparent_28%),linear-gradient(180deg,#FFF8F1_0%,#FBE6D8_100%)]" />
            </div>
            <p className="mt-3 text-[11px] font-semibold text-[#35251E]">
              {card.title}
            </p>
            <p className="mt-1 text-[10px] text-[#7F665C]">{card.meta}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 rounded-[24px] border border-[#ECD9CF] bg-white/85 p-4 shadow-[0_18px_34px_rgba(96,67,54,0.08)]">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A46B53]">
          <Clock3 className="h-4 w-4 text-[#FF9D57]" />
          On This Day
        </div>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#2F211D]">
          Maya made “Ocean Parade” two years ago. Artling keeps the memory right
          next to the art.
        </p>
      </div>

      <div className="absolute inset-x-4 bottom-4 rounded-[26px] bg-[#2F211D] px-5 py-4 text-white shadow-[0_20px_44px_rgba(47,33,29,0.28)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Quick capture
            </p>
            <p className="mt-1 text-sm font-semibold">
              Camera, gallery, or scanner
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF9D57] shadow-[0_10px_24px_rgba(255,157,87,0.35)]">
            <Camera className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArtlingLanding() {
  const reduce = useReducedMotion();

  return (
    <main className="artling-theme min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <header className="relative isolate overflow-hidden px-[var(--gutter)] pb-20 pt-36 md:pt-40">
        <div
          className="pointer-events-none absolute right-[-8%] top-[6%] h-[600px] w-[600px] rounded-full"
          style={{ background: "var(--signal-glow)", filter: "blur(140px)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[-6%] left-[-6%] h-[420px] w-[420px] rounded-full"
          style={{ background: "var(--signal-faint)", filter: "blur(110px)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1280px]">
          <Link
            href="/"
            className="group mb-12 inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-3 transition-colors hover:text-signal"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={
                reduce
                  ? undefined
                  : { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
              }
            >
              <motion.div
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Eyebrow>
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Art archive for busy families
                </Eyebrow>
              </motion.div>

              <motion.h1
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }}
                className="mt-7 max-w-[16ch] text-[clamp(40px,6vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
              >
                Turn fridge masterpieces into a{" "}
                <span className="text-signal">living family gallery.</span>
              </motion.h1>

              <motion.p
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
                className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[18px]"
              >
                Artling helps parents capture artwork fast, keep the story around
                each piece, and revisit a child’s creative growth through
                timelines, milestones, sharing, and AI-assisted captions.
              </motion.p>

              <motion.div
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Link href="#features" aria-label="Explore features">
                  <Button variant="signal" size="lg" className="group">
                    Explore Features
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link
                  href="/projects/artling/privacy-policy"
                  aria-label="Read privacy policy"
                >
                  <Button variant="outline" size="lg">
                    Read Privacy Policy
                  </Button>
                </Link>
              </motion.div>

              <motion.ul
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                className="mt-10 flex flex-wrap gap-2"
              >
                {["Timeline + milestones", "PDF export", "Family sharing", "AI captions"].map(
                  (item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-ink-2"
                    >
                      {item}
                    </li>
                  )
                )}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 34 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="relative mx-auto w-full max-w-[600px]"
            >
              <div className="absolute -left-2 top-12 hidden max-w-[180px] rounded-[var(--r-lg)] border border-line bg-surface/70 p-4 shadow-[var(--shadow)] backdrop-blur-md lg:block">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">
                  Memory-rich
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-2">
                  Save the picture, the title, the tags, and the voice that
                  explains why it mattered.
                </p>
              </div>

              <div className="absolute -right-1 bottom-16 hidden max-w-[190px] rounded-[var(--r-lg)] border border-line bg-surface/70 p-4 shadow-[var(--shadow)] backdrop-blur-md lg:block">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">
                  Family-ready
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-2">
                  Share a child profile, surface anniversaries, and build a
                  keepsake archive that grows with them.
                </p>
              </div>

              <div className="relative z-10 mx-auto max-w-[320px]">
                <PhoneFrame>
                  <ArtlingPhoneMockup />
                </PhoneFrame>
              </div>

              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-8 right-6 z-20 w-[152px] sm:w-[172px]"
              >
                <Image
                  src="/projects/artling/fox-painter.png"
                  alt="Artling fox mascot"
                  width={806}
                  height={1129}
                  className="h-auto w-full drop-shadow-[0_26px_40px_rgba(0,0,0,0.4)]"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── PROMISE / PILLARS ── */}
      <section
        id="features"
        className="border-t border-line px-[var(--gutter)] py-[var(--space-section)]"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <Reveal className="max-w-[760px]">
            <div className="mb-5">
              <Eyebrow>The Promise</Eyebrow>
            </div>
            <h2 className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
              Built for the messy, magical{" "}
              <span className="text-signal">middle of family life.</span>
            </h2>
            <p className="mt-5 max-w-[640px] text-[15.5px] leading-[1.7] text-ink-3">
              Artling is less about storing files and more about preserving
              context. It gives busy parents one place to collect artwork, track
              growth over time, and turn everyday creations into memories that
              stay easy to revisit.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={staggerItem}>
                  <SpotlightCard glow="var(--signal-faint)" className="h-full">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-2 bg-white/[0.04] text-signal">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-3">
                      {pillar.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="border-t border-line px-[var(--gutter)] py-[var(--space-section)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="mb-5">
              <Eyebrow>What’s Inside</Eyebrow>
            </div>
            <h2 className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
              A family archive that stays calm,{" "}
              <span className="text-signal">even as it grows.</span>
            </h2>
            <p className="mt-5 max-w-[560px] text-[15.5px] leading-[1.7] text-ink-3">
              The product combines capture, organisation, memory resurfacing, and
              sharing in one workflow, so nothing needs to move through separate
              photo albums, notes apps, or folders.
            </p>

            <ul className="mt-8 space-y-3">
              {trustPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[var(--r-md)] border border-line bg-surface/50 px-4 py-3 text-sm text-ink-2"
                >
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={staggerItem}
                  className="rounded-[var(--r-lg)] border border-line bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-line-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-line-2 bg-white/[0.04] text-signal">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-3">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── WHY IT LANDS + PRIVACY ── */}
      <section className="border-t border-line px-[var(--gutter)] py-[var(--space-section)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal blur className="relative overflow-hidden rounded-[var(--r-xl)] border border-line bg-surface/60 p-8 backdrop-blur-xl md:p-10">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
              style={{ background: "var(--signal-glow)", filter: "blur(60px)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mb-4">
                <Eyebrow>Why It Lands</Eyebrow>
              </div>
              <h2 className="max-w-[540px] text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                Artling feels less like storage and more like a{" "}
                <span className="text-signal">gentle family ritual.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] leading-[1.7] text-ink-3">
                The experience is intentionally warm, tactile, and low-friction.
                Instead of building another productivity system for parents to
                maintain, it quietly turns capturing and revisiting artwork into
                something they will actually keep up with.
              </p>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {reasons.map((item) => (
                  <li
                    key={item}
                    className="rounded-[var(--r-md)] border border-line bg-white/[0.03] px-4 py-4 text-sm text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[var(--r-xl)] border border-line bg-surface/50 p-8 backdrop-blur-sm md:p-10">
            <div className="mb-4">
              <Eyebrow>Privacy</Eyebrow>
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              Clear data practices,{" "}
              <span className="text-signal">not vague reassurance.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-ink-3">
              Artling stores its core library on device and uses cloud services
              where account, sync, AI, or sharing features require them. The
              public privacy policy reflects the real app architecture, including
              Firebase authentication, optional Sign in with Apple, StoreKit
              purchases, notifications, and AI caption processing.
            </p>

            <div className="mt-8 space-y-3">
              {privacyPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-[var(--r-md)] border border-line bg-white/[0.03] px-4 py-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-line-2 bg-white/[0.04] text-signal">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-ink-3">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                href="/projects/artling/privacy-policy"
                aria-label="Read the Artling privacy policy"
              >
                <Button variant="outline" className="group">
                  Read the Artling Privacy Policy
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-line px-[var(--gutter)] py-[var(--space-section)]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "var(--signal-glow)", filter: "blur(150px)" }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto w-full max-w-[1280px]">
          <div className="rounded-[var(--r-xl)] border border-line bg-surface/60 p-8 backdrop-blur-xl md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4">
                  <Eyebrow>Project Page</Eyebrow>
                </div>
                <h2 className="max-w-[660px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                  Artling is ready for a public-facing home that feels as{" "}
                  <span className="text-signal">thoughtful as the app.</span>
                </h2>
                <p className="mt-5 max-w-[660px] text-[15.5px] leading-[1.7] text-ink-3">
                  Need the App Store listing, screenshots, or launch assets
                  carried through in the same visual direction? The page
                  structure is now in place to extend cleanly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects/artling/privacy-policy"
                  aria-label="Privacy policy"
                >
                  <Button variant="outline">Privacy Policy</Button>
                </Link>
                <Link
                  href="mailto:anoop@flutterly.co.uk"
                  aria-label="Enquire about the app"
                >
                  <Button variant="signal">Enquire About the App</Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
