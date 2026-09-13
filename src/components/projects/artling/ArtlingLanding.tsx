"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Clock3,
  Cloud,
  Command,
  FileText,
  Mic,
  Presentation,
  Search,
  Shield,
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
import { LiftCard } from "@/components/ui/LiftCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Little Artist is the product's display name on this site and on the App
 * Store. The route stays at /projects/artling and the component/file names
 * keep the earlier "Artling" working title.
 */
const APP_STORE_URL =
  "https://apps.apple.com/gb/app/little-artist/id6759450819";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    icon: Camera,
    title: "Capture in seconds",
    description:
      "Scan artwork with edge-detecting document capture, snap it with the camera, or import a whole school-bag batch from your photo library.",
  },
  {
    icon: Mic,
    title: "Keep the story attached",
    description:
      "Add dates, tags, favourites, and a short voice memo of your child describing their own work, so every piece carries the memory around it.",
  },
  {
    icon: Clock3,
    title: "Relive the years beautifully",
    description:
      'Browse a living timeline, celebrate milestones, and let "On This Day" resurface past masterpieces without extra work.',
  },
];

const featureCards: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Sparkles,
    title: "AI titles and captions",
    description:
      "On-device Apple Intelligence suggests playful storybook titles and warm captions, so the gallery reads as a curated collection rather than a photo dump.",
  },
  {
    icon: Presentation,
    title: "Exhibition Mode",
    description:
      "A full-screen slideshow of a child’s work for family gatherings, grandparents’ visits, and end-of-term moments.",
  },
  {
    icon: Search,
    title: "Timeline, search, and tags",
    description:
      "Jump back to a medium, a theme, a favourite, or a specific child in seconds, without folders to maintain.",
  },
  {
    icon: Star,
    title: "Milestones and On This Day",
    description:
      "Confetti-worthy achievements mark the first masterpiece, a year of art, and every medium explored, while past pieces resurface on their anniversaries.",
  },
  {
    icon: FileText,
    title: "PDF keepsake portfolios",
    description:
      "Turn a growing gallery into a polished PDF portfolio to print, or to share with family who want something tangible.",
  },
  {
    icon: Command,
    title: "Siri Shortcuts",
    description:
      "Hands-free capture when your hands are covered in paint, plus gentle local reminders to revisit older work.",
  },
];

const trustPoints = [
  "Native SwiftUI app for iPhone and iPad, iOS and iPadOS 26 or later",
  "An archive for parents, not a drawing or colouring toy for children",
  "Everything stored on device and synced through your own private iCloud",
  "No advertising SDKs, no analytics, no noisy growth loops",
  "No accounts or sign-in — your data never touches our servers",
];

const reasons = [
  "Capture first, organise later",
  "Search by child, medium, tag, or favourite",
  "Show off a masterpiece without a photo-dump thread",
  "Revisit memories through time, not folders",
];

const freeTier = [
  "One artist profile",
  "A limited gallery — about a school term’s worth of artwork",
  "Scan, camera, and photo-library capture",
  "Timeline, search, tags, and On This Day",
  "iCloud sync across your devices",
  "No time limits and no surprise charges",
];

const premiumTier = [
  "Unlimited artist profiles",
  "Unlimited artwork",
  "AI titles and captions",
  "Voice memos",
  "PDF keepsake portfolios",
  "Monthly, yearly, or once forever",
];

const privacyPoints: { icon: LucideIcon; label: string; copy: string }[] = [
  {
    icon: Cloud,
    label: "Private iCloud sync",
    copy: "Your library syncs through Apple's CloudKit private database — accessible only to you, never to us.",
  },
  {
    icon: WandSparkles,
    label: "AI explained",
    copy: "Captions come from Apple Intelligence on device or Apple's Private Cloud Compute — never third-party AI.",
  },
  {
    icon: Tags,
    label: "Parent controls",
    copy: "Camera, photos, microphone, and notification permissions are optional and documented plainly.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <Link
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Little Artist on the App Store"
      className={`inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-sans text-accent-ink shadow-[0_12px_28px_-12px_var(--accent)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-accent-hover ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="text-left">
        <span className="block text-[10px] leading-tight opacity-75">
          Download on the
        </span>
        <span className="block text-base font-semibold leading-tight">
          App Store
        </span>
      </span>
    </Link>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft">
        <Check className="h-3 w-3 text-accent" aria-hidden="true" />
      </span>
      <span className="text-[14.5px] leading-relaxed text-ink-2">
        {children}
      </span>
    </li>
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d4a33]">
            Little Artist
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
                ? "bg-[#FF9D57] text-[#4a2b10]"
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
            <p className="mt-1 text-[10px] text-[#6a544a]">{card.meta}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 rounded-[24px] border border-[#ECD9CF] bg-white/85 p-4 shadow-[0_18px_34px_rgba(96,67,54,0.08)]">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7d4a33]">
          <Clock3 className="h-4 w-4 text-[#FF9D57]" />
          On This Day
        </div>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#2F211D]">
          Maya made “Ocean Parade” two years ago. Little Artist keeps the
          memory right next to the art.
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
    <main id="main" className="artling-theme min-h-screen overflow-x-hidden bg-background text-ink">
      <Navbar />

      {/* ── HERO ── */}
      <header className="relative isolate overflow-hidden px-[var(--gutter)] pb-24 pt-36 md:pt-44">
        <div
          className="pointer-events-none absolute right-[-10%] top-[-6%] h-[520px] w-[520px] rounded-full"
          style={{ background: "var(--accent-soft)", filter: "blur(110px)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1200px]">
          <Link
            href="/"
            className="group mb-12 inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-3 transition-colors hover:text-accent"
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
                <div className="flex flex-wrap gap-2">
                  <Eyebrow>
                    <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" />
                    Now on the App Store
                  </Eyebrow>
                  <Eyebrow>iPhone &amp; iPad · Free to start</Eyebrow>
                </div>
              </motion.div>

              <motion.h1
                variants={
                  reduce
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: { duration: 0.9, ease },
                        },
                      }
                }
                className="mt-7 max-w-[16ch] text-[clamp(40px,6vw,76px)] font-semibold leading-[1.0] tracking-[-0.035em] text-ink"
              >
                Turn fridge masterpieces into a{" "}
                <span className="text-accent">living family gallery.</span>
              </motion.h1>

              <motion.p
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
                className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[18px]"
              >
                Your child’s art never leaves your family. Little Artist archives
                every drawing, painting, and craft privately — on your iPhone
                and in your own iCloud — with on-device AI titles, a living
                timeline, milestones, voice memos, and keepsake portfolios.
              </motion.p>

              <motion.div
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <AppStoreBadge />
                <Link href="#features" aria-label="Explore features">
                  <Button variant="outline" size="lg" className="group">
                    Explore Features
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                variants={reduce ? undefined : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, ease } } }}
                className="mt-4 text-sm text-ink-3"
              >
                Free on the App Store, with an optional Premium upgrade.
                Requires iOS or iPadOS 26 or later.{" "}
                <Link
                  href="/projects/artling/privacy-policy"
                  className="underline decoration-line-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  Read the privacy policy
                </Link>
                .
              </motion.p>

              <motion.ul
                variants={reduce ? undefined : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                className="mt-10 flex flex-wrap gap-2"
              >
                {[
                  "Scan, snap, or import",
                  "On-device AI titles",
                  "On This Day",
                  "Exhibition Mode",
                  "PDF portfolios",
                  "Private iCloud sync",
                ].map(
                  (item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
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
              <div className="absolute -left-2 top-12 hidden max-w-[180px] rounded-[var(--r-lg)] border border-line bg-surface p-4 shadow-[var(--shadow)] lg:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d4508]">
                  Memory-rich
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-2">
                  Save the picture, the title, the tags, and the voice that
                  explains why it mattered.
                </p>
              </div>

              <div className="absolute -right-1 bottom-16 hidden max-w-[190px] rounded-[var(--r-lg)] border border-line bg-surface p-4 shadow-[var(--shadow)] lg:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d4508]">
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
                  alt="Little Artist fox mascot"
                  width={806}
                  height={1129}
                  className="h-auto w-full drop-shadow-[0_22px_36px_rgba(43,26,16,0.3)]"
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
        className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="promise-heading"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            eyebrow="The Promise"
            headingId="promise-heading"
            title={
              <>
                Built for the messy, magical{" "}
                <em>middle of family life.</em>
              </>
            }
            lede="Little Artist is a parent’s archive, not a drawing app for children. It is less about storing files and more about preserving context: one place to collect artwork, track growth over time, and turn everyday creations into memories that stay easy to revisit — with AI that runs on your device, not in someone else’s cloud."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="grid gap-5 lg:grid-cols-3"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={staggerItem}>
                  <LiftCard className="h-full p-7">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-3">
                      {pillar.description}
                    </p>
                  </LiftCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section
        className="px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="inside-heading"
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="mb-5">
              <Eyebrow>What’s Inside</Eyebrow>
            </div>
            <h2
              id="inside-heading"
              className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              A family archive that stays calm,{" "}
              <span className="text-accent">even as it grows.</span>
            </h2>
            <p className="mt-5 max-w-[560px] text-[15.5px] leading-[1.7] text-ink-3">
              Little Artist combines capture, organisation, memory resurfacing, and
              keepsakes in one workflow, so nothing needs to move through
              separate photo albums, notes apps, or folders.
            </p>

            <ul className="mt-8 space-y-3">
              {trustPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[var(--r-md)] border border-line bg-surface px-4 py-3 text-sm text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
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
                  className="rounded-[var(--r-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-accent-soft text-accent">
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
      <section
        className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="why-heading"
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal blur className="relative overflow-hidden rounded-[var(--r-xl)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] md:p-10">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
              style={{ background: "var(--accent-soft)", filter: "blur(50px)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mb-4">
                <Eyebrow>Why It Lands</Eyebrow>
              </div>
              <h2
                id="why-heading"
                className="max-w-[540px] text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
              >
                Little Artist feels less like storage and more like a{" "}
                <span className="text-accent">gentle family ritual.</span>
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
                    className="rounded-[var(--r-md)] bg-surface-2 px-4 py-4 text-sm text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[var(--r-xl)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] md:p-10">
            <div className="mb-4">
              <Eyebrow>Privacy</Eyebrow>
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              Clear data practices,{" "}
              <span className="text-accent">not vague reassurance.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-ink-3">
              Little Artist stores its library on device and syncs through your own
              private iCloud. There are no accounts, no developer servers, and
              no third-party SDKs. The public privacy policy reflects the
              shipped app, including StoreKit purchases, local notifications,
              and on-device AI caption processing.
            </p>

            <div className="mt-8 space-y-3">
              {privacyPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-[var(--r-md)] bg-surface-2 px-4 py-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-surface text-accent shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
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
                aria-label="Read the Little Artist privacy policy"
              >
                <Button variant="outline" className="group">
                  Read the Little Artist Privacy Policy
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FREE & PREMIUM ── */}
      <section
        className="px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            align="center"
            eyebrow="Honest pricing"
            headingId="pricing-heading"
            title={
              <>
                The free tier is yours <em>forever.</em>
              </>
            }
            lede="Start with one artist profile and a school term’s worth of artwork, with no time limits and no surprise charges. Premium unlocks the rest, monthly, yearly, or once forever, and you can cancel any time."
          />

          <div className="mx-auto grid max-w-[960px] gap-5 md:grid-cols-2">
            <Reveal className="rounded-[var(--r-xl)] border border-line bg-surface-2 p-8 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                Free
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                Everything a first gallery needs
              </h3>
              <ul className="mt-6 space-y-3.5">
                {freeTier.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.08}
              className="relative overflow-hidden rounded-[var(--r-xl)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] md:p-10"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
                style={{ background: "var(--accent-soft)", filter: "blur(50px)" }}
                aria-hidden="true"
              />
              <p className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Premium
              </p>
              <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                For the whole family, for good
              </h3>
              <ul className="relative mt-6 space-y-3.5">
                {premiumTier.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <p className="mx-auto mt-8 max-w-[560px] text-center text-xs leading-relaxed text-muted">
              Purchases are handled entirely by Apple through the App Store.
              Subscriptions renew automatically unless cancelled at least 24
              hours before the end of the current period, and can be managed in
              Settings &rarr; Apple Account &rarr; Subscriptions. Little Artist
              Premium unlocks the same features on every plan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA · dark contrast band ── */}
      <section
        className="relative overflow-hidden bg-night px-[var(--gutter)] py-[var(--space-section)] text-night-ink"
        aria-labelledby="project-cta-heading"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "rgba(255,149,0,0.1)", filter: "blur(130px)" }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto w-full max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
                Available now
              </span>
              <h2
                id="project-cta-heading"
                className="max-w-[660px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
              >
                Start the gallery before the next{" "}
                <span className="text-orange">school-bag masterpiece.</span>
              </h2>
              <p className="mt-5 max-w-[660px] text-[15.5px] leading-[1.7] text-white/60">
                Little Artist is free to download on the App Store. iPhone and
                iPad, iOS or iPadOS 26 or later. No account to create, and
                nothing leaves your family.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <AppStoreBadge />
              <Link
                href="/projects/artling/privacy-policy"
                aria-label="Read the Little Artist privacy policy"
              >
                <Button variant="outline">Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
