"use client";

import { m as motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
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
import { ProductCover, StoreLink } from "../ProductCover";
import { ProductShell } from "@/components/sorted/layout/ProductShell";
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

export function ArtlingLanding() {

  return (
    <ProductShell mainClassName="artling-theme min-h-screen overflow-x-hidden bg-background text-ink">

      {/* ── HERO ── */}
      <ProductCover
        variant="paper"
        name="Little Artist"
        category="Family archive"
        title={<>A home for every drawing.</>}
        description="Save a picture and the little voice explaining it. Little Artist keeps drawings, paintings and school-bag discoveries together on your device and in your family’s private iCloud."
        platform="iPhone and iPad · iOS 26 or later"
        availability="Free to start, with optional Premium."
        store={APP_STORE_URL}
        policy="/projects/artling/privacy-policy"
        sections={[[ "#features", "How it works" ], [ "#inside-heading", "Features" ], [ "#pricing-heading", "Pricing" ]]}
      >
        <Image src="/projects/artling/fox-painter.png" alt="The Little Artist fox holding a paintbrush" width={600} height={840} sizes="(max-width: 760px) 54vw, 30vw" priority />
      </ProductCover>

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
                className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
                aria-label="Read the Little Artist privacy policy"
              >
                Read the Little Artist privacy policy <ArrowRight className="h-4 w-4" aria-hidden />
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
              <StoreLink name="Little Artist" href={APP_STORE_URL} />
              <Link
                href="/projects/artling/privacy-policy"
                className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
                aria-label="Read the Little Artist privacy policy"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </ProductShell>
  );
}
