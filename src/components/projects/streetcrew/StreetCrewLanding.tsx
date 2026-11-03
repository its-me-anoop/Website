"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Camera, Compass, Map, Route, Shield, Users } from "lucide-react";
import { ProductShell } from "@/components/aurora/layout/ProductShell";
import { Button } from "@/components/ui/Button";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { LiftCard } from "@/components/ui/LiftCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { storeStatus, streetcrew, type StreetCrewContent } from "@/lib/projects/streetcrew";
import { serviceHref } from "@/lib/marketing/services";

const ease = [0.16, 1, 0.3, 1] as const;

/** One icon per listing group, in the listing's order. */
const groupIcons: Record<string, LucideIcon> = {
  Record: Route,
  Explore: Compass,
  Plan: Map,
  Remember: Camera,
  "Share, if you want to": Users,
};

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

const appleGlyph = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

/**
 * The store call to action. Before launch it is a plain label, so the
 * page never links to a listing that does not exist yet.
 */
function StoreBadge({ appStoreUrl }: { appStoreUrl: string | null }) {
  const status = storeStatus(appStoreUrl);
  if (status.kind === "coming-soon") {
    return (
      <span className="inline-flex items-center gap-3 rounded-full border border-line-2 bg-surface px-7 py-3.5 text-ink">
        {appleGlyph}
        <span className="text-left">
          <span className="block text-[10px] leading-tight text-ink-3">Coming soon to the</span>
          <span className="block text-base font-semibold leading-tight">App Store</span>
        </span>
        <span className="sr-only">: StreetCrew is coming soon to the App Store</span>
      </span>
    );
  }
  return (
    <Link
      href={status.url}
      {...externalLink}
      aria-label="Download StreetCrew on the App Store"
      className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-accent-ink shadow-[0_12px_28px_-12px_var(--accent)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
    >
      {appleGlyph}
      <span className="text-left">
        <span className="block text-[10px] leading-tight opacity-75">Download on the</span>
        <span className="block text-base font-semibold leading-tight">App Store</span>
      </span>
    </Link>
  );
}

/* A fixed pattern of explored squares on a 10 × 8 grid, so the art is
   the same on every render (no hydration mismatch). */
const explored = new Set([
  "1,5", "2,5", "2,4", "3,4", "3,3", "4,3", "4,2", "5,2", "5,3", "6,3", "6,4", "7,4",
  "7,5", "6,5", "5,5", "4,5", "4,6", "3,6", "8,4", "8,3", "2,6", "1,6",
]);
const freshThisWeek = new Set(["7,4", "8,4", "8,3", "7,5"]);
const route = "M 30 230 L 70 230 L 70 190 L 110 190 L 110 150 L 150 150 L 150 110 L 190 110 L 190 70 L 230 70 L 230 130 L 270 130 L 270 170 L 310 170 L 350 170 L 350 130";

/**
 * Decorative: how the Explore map looks as squares light up. Drawn in
 * SVG rather than a screenshot until the App Store screenshots are on
 * file; hidden from assistive tech because the copy says the same.
 */
function ExploredMap({ className }: { className?: string }) {
  const cells = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 8; y++) {
      const key = `${x},${y}`;
      const fill = freshThisWeek.has(key)
        ? "var(--sc-signal)"
        : explored.has(key)
          ? "var(--sc-street-lit)"
          : "transparent";
      cells.push(
        <rect
          key={key}
          x={x * 40 + 2}
          y={y * 40 + 2}
          width={36}
          height={36}
          rx={4}
          fill={fill}
          opacity={freshThisWeek.has(key) ? 0.55 : 1}
        />
      );
    }
  }
  return (
    <svg
      viewBox="0 0 400 320"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-explored-map
    >
      <rect width="400" height="320" rx="20" fill="var(--sc-street-ink)" />
      {cells}
      {[...Array(11)].map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={320} stroke="var(--sc-street)" strokeWidth={1.5} />
      ))}
      {[...Array(9)].map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 40} x2={400} y2={i * 40} stroke="var(--sc-street)" strokeWidth={1.5} />
      ))}
      <path d={route} fill="none" stroke="var(--sc-signal)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={30} cy={230} r={9} fill="#fff" stroke="var(--sc-signal)" strokeWidth={4} />
      <circle cx={350} cy={130} r={9} fill="var(--sc-signal)" stroke="#fff" strokeWidth={4} />
    </svg>
  );
}

export function StreetCrewLanding({ content = streetcrew }: { content?: StreetCrewContent }) {
  const reduce = useReducedMotion();
  const live = content.appStoreUrl !== null;
  const policyLink = (
    <Link
      href={content.links.privacy}
      {...externalLink}
      className="underline decoration-line-2 underline-offset-4 transition-colors hover:text-accent"
    >
      Read the privacy policy
    </Link>
  );

  return (
    <ProductShell mainClassName="streetcrew-theme min-h-screen overflow-x-hidden bg-background text-ink">
      <header className="relative overflow-hidden px-[var(--gutter)] pb-[var(--space-section)] pt-28 md:pt-36">
        <div className="mx-auto grid w-full max-w-[1200px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={reduce ? false : "hidden"} animate="visible" variants={staggerContainer}>
            <motion.div variants={reduce ? undefined : staggerItem} className="flex flex-wrap gap-2">
              <Eyebrow>{live ? "Now on the App Store" : "Coming soon"}</Eyebrow>
              <Eyebrow>{content.platforms} · Free</Eyebrow>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : staggerItem}
              className="mt-7 max-w-[15ch] text-[clamp(40px,6vw,76px)] font-semibold leading-[1.0] tracking-[-0.035em] text-ink"
            >
              Light up every street{" "}
              <span className="text-accent">you explore.</span>
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : staggerItem}
              className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[18px]"
            >
              {content.name} turns every run, walk and hike into exploration. Each
              street you cover fills in on your map, so your next outing is a
              chance to find somewhere new.
            </motion.p>

            <motion.div variants={reduce ? undefined : staggerItem} className="mt-9 flex flex-wrap items-center gap-3">
              <StoreBadge appStoreUrl={content.appStoreUrl} />
              <Link href="#features" aria-label="Explore features">
                <Button variant="outline" size="lg" className="group">
                  Explore features
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </motion.div>

            <p className="mt-4 text-sm text-ink-3">
              {content.price}. {policyLink}.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <ExploredMap className="h-auto w-full rounded-[20px] shadow-[var(--shadow)]" />
            <Image
              src="/projects/streetcrew/app-icon.png"
              alt="StreetCrew app icon"
              width={1024}
              height={1024}
              priority
              sizes="120px"
              className="absolute -bottom-6 left-3 h-auto sm:-left-4 w-[96px] rounded-[22%] shadow-[var(--shadow)] sm:w-[120px]"
            />
          </motion.div>
        </div>
      </header>

      <section id="features" className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]" aria-labelledby="features-heading">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            eyebrow="The app"
            headingId="features-heading"
            title={
              <>
                Record, explore, <em>go somewhere new.</em>
              </>
            }
            lede={`${content.subtitle}. Your map fills in square by square, and the nearest place you have never been is always one tap away.`}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {content.featureGroups.map(({ title, points }) => {
              const Icon = groupIcons[title] ?? Compass;
              return (
                <motion.div key={title} variants={staggerItem}>
                  <LiftCard className="h-full p-7">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">{title}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-3">
                      {points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </LiftCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-[var(--gutter)] py-[var(--space-section)]" aria-labelledby="privacy-heading">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="mb-5">
              <Eyebrow>Private by design</Eyebrow>
            </div>
            <h2
              id="privacy-heading"
              className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Your routes stay <span className="text-accent">yours.</span>
            </h2>
            <p className="mt-5 max-w-[480px] text-[15.5px] leading-[1.7] text-ink-3">
              Location is what the app runs on, so it is also what it protects
              most. Friends, leaderboards and events are optional, for people
              aged 18 and over, and use Sign in with Apple.
            </p>
          </Reveal>

          <ul className="space-y-3">
            {content.privacyPoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-[var(--r-md)] border border-line bg-surface px-4 py-3 text-sm text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]" aria-labelledby="craft-heading">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            eyebrow="How it is built"
            headingId="craft-heading"
            title={
              <>
                Designed and built <em>by Flutterly.</em>
              </>
            }
            lede="StreetCrew is one of our own apps. The same people who build client apps designed it, wrote it and look after it."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {content.craft.map(({ title, description }, i) => (
              <Reveal
                key={title}
                delay={i * 0.06}
                className="rounded-[var(--r-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-sm)]"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{description}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-[15px] text-ink-2">
            Planning an app of your own?{" "}
            <Link
              href={serviceHref("apps")}
              className="font-medium text-accent underline decoration-line-2 underline-offset-4 hover:text-accent-hover"
            >
              See how we build apps
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-night px-[var(--gutter)] py-[var(--space-section)] text-night-ink"
        aria-labelledby="project-cta-heading"
      >
        <Reveal className="relative mx-auto w-full max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
                {live ? "Available now" : "Coming soon to the App Store"}
              </span>
              <h2
                id="project-cta-heading"
                className="max-w-[660px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
              >
                The nearest street you have never walked is <span className="text-orange">closer than you think.</span>
              </h2>
              <p className="mt-5 max-w-[660px] text-[15.5px] leading-[1.7] text-white/70">
                {content.name} is free for {content.platforms}, with no ads and
                no in-app purchases. Questions about the app go to its support
                page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {live ? <StoreBadge appStoreUrl={content.appStoreUrl} /> : null}
              <Link href={content.links.support} {...externalLink} aria-label="StreetCrew support (opens in a new tab)">
                <Button variant="outline">Support</Button>
              </Link>
              <Link href={content.links.privacy} {...externalLink} aria-label="Read the StreetCrew privacy policy">
                <Button variant="outline">Privacy policy</Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </ProductShell>
  );
}
