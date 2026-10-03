"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Gem,
  Hammer,
  Hospital,
  Moon,
  Shield,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { LiftCard } from "@/components/ui/LiftCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Little Lifeline is a Unity game for iPhone and iPad. The App Store ID,
 * support page and privacy policy are the ones in the game's own
 * docs/appstore listing; the privacy policy is published from the support
 * repository, so this page links to it rather than restating it.
 */
const APP_STORE_URL = "https://apps.apple.com/us/app/little-lifeline/id6786840477";
const PRIVACY_URL =
  "https://github.com/its-me-anoop/gravitile-support/blob/main/privacy.md";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Hospital,
    title: "Start with one desk",
    description:
      "Begin with a reception desk and a first-aid room. Your first payment hires the first nurse, and every patient after that pays for the next improvement.",
  },
  {
    icon: Stethoscope,
    title: "Follow the whole visit",
    description:
      "Patients arrive by car or taxi, check in, wait, see a doctor, collect medication, pay and drive home. Queues and seats show where the clinic needs help.",
  },
  {
    icon: Hammer,
    title: "Grow one room at a time",
    description:
      "Renovate rooms, train staff and upgrade equipment. Rooms visibly rebuild while existing services keep working.",
  },
];

const featureCards: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Hammer,
    title: "Twenty pieces of equipment per room",
    description:
      "Each piece has ten versions, from basic to advanced, and every upgrade shows in the room and shortens check-ins, treatments and waits.",
  },
  {
    icon: Users,
    title: "A second, larger clinic",
    description:
      "Fully upgrade the starter clinic and open the doctors clinic: private consultations, pharmacy dispensing and a taxi stand, on a shared wallet.",
  },
  {
    icon: Target,
    title: "Goals and a gentle guide",
    description:
      "A short guide shows your next best step. Three fresh goals arrive every day, and a login streak builds toward bigger rewards.",
  },
  {
    icon: Gem,
    title: "Free gems for milestones",
    description:
      "Spend gems to finish a renovation now, double your collections or let staff earn for longer while you are away.",
  },
  {
    icon: Moon,
    title: "Offline earnings",
    description:
      "Staff keep earning for up to eight hours while you are away, and construction continues for the whole absence.",
  },
  {
    icon: Shield,
    title: "Comfortable by default",
    description:
      "Separate Music and Effects controls, haptics and a Less motion setting, with body text set in Atkinson Hyperlegible.",
  },
];

const trustPoints = [
  "Native 3D game for iPhone and iPad, iOS 18 or later",
  "No account to create and no advertisements",
  "No subscriptions, random paid rewards or leaderboards",
  "Progress saves on your device, with a recoverable backup",
  "No advertising or tracking SDK",
];

const freePoints = [
  "Every room, upgrade and clinic can be earned by playing",
  "Free to download, with no account",
  "Works offline",
  "Gems earned free from milestones and daily goals",
];

const optionalPoints = [
  "Four optional gem packs",
  "An optional Second Builder, so two rooms build at once",
  "Purchases are handled by Apple through the App Store",
  "Nothing is exclusive: gems buy no items or income",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

function AppStoreBadge() {
  return (
    <Link
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Little Lifeline on the App Store"
      className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-sans text-accent-ink shadow-[0_12px_28px_-12px_var(--accent)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="text-left">
        <span className="block text-[10px] leading-tight opacity-75">Download on the</span>
        <span className="block text-base font-semibold leading-tight">App Store</span>
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
      <span className="text-[14.5px] leading-relaxed text-ink-2">{children}</span>
    </li>
  );
}

export function LittleLifelineLanding() {
  const reduce = useReducedMotion();

  return (
    <main id="main-content" className="bg-canvas text-ink">
      <Navbar />
      <header className="relative overflow-hidden px-[var(--gutter)] pb-[var(--space-section)] pt-28 md:pt-36">
        <div className="mx-auto grid w-full max-w-[1200px] gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={reduce ? undefined : staggerItem} className="flex flex-wrap gap-2">
              <Eyebrow>Now on the App Store</Eyebrow>
              <Eyebrow>iPhone &amp; iPad · Free</Eyebrow>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : staggerItem}
              className="mt-7 max-w-[16ch] text-[clamp(40px,6vw,76px)] font-semibold leading-[1.0] tracking-[-0.035em] text-ink"
            >
              A miniature 3D clinic you{" "}
              <span className="text-accent">grow one room at a time.</span>
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : staggerItem}
              className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[18px]"
            >
              Little Lifeline is an idle management game. Patients check in,
              wait, receive care and find their way home, and the money they
              leave pays for your next improvement.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : staggerItem}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <AppStoreBadge />
              <Link href="#features" aria-label="Explore features">
                <Button variant="outline" size="lg" className="group">
                  Explore features
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </motion.div>

            <p className="mt-4 text-sm text-ink-3">
              Free, with optional in-app purchases. Requires iOS 18 or later.{" "}
              <Link
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line-2 underline-offset-4 transition-colors hover:text-accent"
              >
                Read the privacy policy
              </Link>
              .
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mx-auto w-full max-w-[360px]"
          >
            <Image
              src="/projects/little-lifeline/app-icon.png"
              alt="Little Lifeline app icon"
              width={512}
              height={512}
              priority
              className="h-auto w-full rounded-[22%] shadow-[var(--shadow)]"
            />
          </motion.div>
        </div>
      </header>

      <section
        id="features"
        className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="promise-heading"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            eyebrow="The game"
            headingId="promise-heading"
            title={
              <>
                Small beginnings, <em>a busy clinic.</em>
              </>
            }
            lede="Little Lifeline is a fictional management game. It is about queues, rooms and small decisions about what to improve next, and it does not provide medical advice."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="grid gap-5 lg:grid-cols-3"
          >
            {pillars.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={staggerItem}>
                <LiftCard className="h-full p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{description}</p>
                </LiftCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="inside-heading"
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="mb-5">
              <Eyebrow>What’s inside</Eyebrow>
            </div>
            <h2
              id="inside-heading"
              className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Plenty to build, <span className="text-accent">no ads in the way.</span>
            </h2>
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
            {featureCards.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="rounded-[var(--r-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-3">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            align="center"
            eyebrow="Honest pricing"
            headingId="pricing-heading"
            title={
              <>
                Earn everything by <em>playing.</em>
              </>
            }
            lede="Little Lifeline is free. Optional purchases only save time: they never lock content, and there are no advertisements, subscriptions or random paid rewards."
          />

          <div className="mx-auto grid max-w-[960px] gap-5 md:grid-cols-2">
            <Reveal className="rounded-[var(--r-xl)] border border-line bg-surface-2 p-8 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Free</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                The whole game
              </h3>
              <ul className="mt-6 space-y-3.5">
                {freePoints.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.08}
              className="rounded-[var(--r-xl)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] md:p-10"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Optional</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                A little faster
              </h3>
              <ul className="mt-6 space-y-3.5">
                {optionalPoints.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-night px-[var(--gutter)] py-[var(--space-section)] text-night-ink"
        aria-labelledby="project-cta-heading"
      >
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
                Your first patient is{" "}
                <span className="text-orange">at reception.</span>
              </h2>
              <p className="mt-5 max-w-[660px] text-[15.5px] leading-[1.7] text-white/60">
                Little Lifeline is free on the App Store for iPhone and iPad,
                iOS 18 or later. Progress stays on your device and the game
                includes no advertising or tracking SDK.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <AppStoreBadge />
              <Link
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read the Little Lifeline privacy policy"
              >
                <Button variant="outline">Privacy policy</Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
