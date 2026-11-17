"use client";

import { m as motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
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
import { ProductCover, StoreLink } from "../ProductCover";
import { ProductShell } from "@/components/sorted/layout/ProductShell";
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

  return (
    <ProductShell mainClassName="bg-canvas text-ink">
      <ProductCover
        variant="clinic"
        name="Little Lifeline"
        category="Idle management game"
        title={<>A little clinic of your own.</>}
        description="One desk, one nurse, and the first patient at the door. Follow each visit through your miniature clinic and put the day’s earnings towards its next room."
        platform="iPhone and iPad · iOS 18 or later"
        availability="Free to play, with optional in-app purchases."
        store={APP_STORE_URL}
        policy={PRIVACY_URL}
        sections={[[ "#features", "How to play" ], [ "#inside-heading", "Inside the game" ], [ "#pricing-heading", "Purchases" ]]}
      >
        <Image src="/projects/little-lifeline/app-icon.png" alt="Little Lifeline app icon showing the first clinic" width={512} height={512} sizes="(max-width: 760px) 76vw, 42vw" priority />
      </ProductCover>

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
              <StoreLink name="Little Lifeline" href={APP_STORE_URL} />
              <Link
                href={PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
                aria-label="Read the Little Lifeline privacy policy"
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
