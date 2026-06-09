"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Check,
  ChevronRight,
  CloudRain,
  Command,
  Droplets,
  Heart,
  Leaf,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Watch,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { LiftCard } from "@/components/ui/LiftCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/sipli-water-tracker/id6758851574";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Shared building blocks ─────────────────────────────── */

function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <Link
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
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

/** A phone screenshot floating on a soft aqua tint. */
function PhoneShot({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-[260px] flex-shrink-0 md:w-[290px] ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: "var(--accent-soft)",
          filter: "blur(64px)",
          transform: "scale(0.85)",
        }}
        aria-hidden="true"
      />
      <Image
        src={src}
        alt={alt}
        width={1320}
        height={2868}
        priority={priority}
        className="relative h-auto w-full rounded-[var(--r-xl)]"
        style={{ filter: "drop-shadow(0 28px 56px rgba(12,42,51,0.22))" }}
      />
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export function SipliLanding() {
  const reduce = useReducedMotion();

  const heroStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const heroItem: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease },
        },
      };

  // Scroll-scrub: the hero phone settles into place as it enters the viewport.
  const phoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: phoneRef,
    offset: ["start end", "center center"],
  });
  const phoneScale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [36, 0]);

  return (
    <main className="sipli-theme min-h-screen overflow-x-hidden bg-background text-ink">
      <Navbar />

      {/* ── HERO ── */}
      <header className="relative isolate overflow-hidden px-[var(--gutter)] pb-20 pt-36 md:pt-44">
        <div
          className="pointer-events-none absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full"
          style={{ background: "var(--accent-soft)", filter: "blur(120px)" }}
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

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroStagger}
            className="mx-auto flex max-w-[760px] flex-col items-center text-center"
          >
            <motion.div
              variants={heroItem}
              className="mb-7 flex flex-wrap justify-center gap-2"
            >
              <Eyebrow>
                <Droplets className="h-3 w-3 text-accent" aria-hidden="true" />
                Version 3.0 · Free
              </Eyebrow>
              <Eyebrow>
                <Watch className="h-3 w-3 text-accent" aria-hidden="true" />
                New on Apple Watch
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-[clamp(56px,9vw,104px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
            >
              Sipli
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-4 font-display text-[clamp(22px,3vw,32px)] font-semibold leading-snug tracking-[-0.02em] text-accent"
            >
              Stay Hydrated, Effortlessly.
            </motion.p>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[17px]"
            >
              Adaptive goals that flex with your body, weather, and workouts.
              Now on Apple Watch — log a sip in one tap from your wrist. 35+
              beverages, on-device AI coaching, and reminders that think with
              you, not at you.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
            >
              <AppStoreBadge />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-accent text-accent"
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 text-sm text-ink-3">
                  Free on the App Store
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll-scrubbed hero device */}
          <motion.div
            ref={phoneRef}
            style={reduce ? undefined : { scale: phoneScale, y: phoneY }}
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mt-16 flex justify-center md:mt-20"
          >
            <PhoneShot
              src="/images/sipli/iphone/01-hero-1320x2868.png"
              alt="Sipli app — home screen"
              priority
              className="md:w-[320px]"
            />
          </motion.div>
        </div>
      </header>

      {/* ── FEATURE STRIP ── */}
      <section
        className="border-y border-line bg-surface px-[var(--gutter)] py-14"
        aria-label="Sipli highlights"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { icon: Watch, label: "Apple Watch", desc: "One-tap logging on your wrist" },
            { icon: Sparkles, label: "AI Coaching", desc: "On-device Apple Intelligence" },
            { icon: Droplets, label: "35+ Beverages", desc: "Science-backed hydration factors" },
            { icon: Heart, label: "HealthKit Sync", desc: "Two-way Apple Health sync" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="flex flex-col items-center gap-3 rounded-[var(--r-md)] bg-surface-2 px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-0.5 text-sm font-semibold text-ink">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── APPLE WATCH ── */}
      <section
        className="relative overflow-hidden px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="watch-heading"
      >
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-6">
              <Eyebrow>
                <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" /> New in 3.0
              </Eyebrow>
            </div>
            <h2
              id="watch-heading"
              className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Sipli on <span className="text-accent">your wrist.</span>
            </h2>
            <p className="mb-8 mt-5 max-w-[440px] text-[15.5px] leading-[1.7] text-ink-3">
              A brand-new Apple Watch app. Log a sip in one tap, glance at your
              progress ring from any watch face, and celebrate goal-met
              trophies right where you&apos;ll see them.
            </p>
            <ul className="space-y-3.5">
              <CheckItem>One-tap logging for water, coffee, tea — whatever you&apos;re drinking</CheckItem>
              <CheckItem>Live progress ring complication on your watch face</CheckItem>
              <CheckItem>Smart Stack widgets in small, medium, and large</CheckItem>
              <CheckItem>Full two-way sync with iPhone and Apple Health — instant</CheckItem>
              <CheckItem>Goal-met trophy on your wrist, right when you hit it</CheckItem>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <WatchMock reduce={!!reduce} />
          </Reveal>
        </div>
      </section>

      {/* ── EARTH WEEK ── */}
      <section
        className="relative overflow-hidden bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="earth-week-heading"
      >
        <div className="relative mx-auto w-full max-w-[1200px]">
          <Reveal blur>
            <div
              className="relative overflow-hidden rounded-[var(--r-xl)] p-10 shadow-[var(--shadow-lg)] md:p-14 lg:p-16"
              style={{
                background:
                  "linear-gradient(135deg, rgb(56,158,107) 0%, rgb(20,115,77) 55%, rgb(10,77,56) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)", filter: "blur(60px)" }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full"
                style={{ background: "rgba(0,0,0,0.18)", filter: "blur(80px)" }}
                aria-hidden="true"
              />
              <div className="relative max-w-[640px]">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  <Leaf className="h-3 w-3" aria-hidden="true" />
                  Earth Week 2026 · Apr 20–26
                </span>
                <h2
                  id="earth-week-heading"
                  className="text-[clamp(36px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
                >
                  Every sip,{" "}
                  <span className="font-light italic text-white/90">
                    less plastic.
                  </span>
                </h2>
                <p className="mb-8 mt-5 max-w-[480px] text-[15.5px] leading-[1.7] text-white/85">
                  From April 20 to 26, Sipli joins Earth Week with a quiet
                  in-app moment for the refill habit — a shareable Refill
                  Pledge, a leaf-green home banner, and an Insights tile that
                  counts every sip you log during the week.
                </p>
                <blockquote className="mb-9 border-l-2 border-white/40 pl-5">
                  <p className="font-display text-[clamp(18px,2vw,22px)] italic leading-snug text-white">
                    &ldquo;I pledge to refill, not rebuy, this Earth Week.&rdquo;
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                    The Sipli Refill Pledge
                  </p>
                </blockquote>
                <AppStoreBadge />
              </div>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {[
              {
                title: "Refill Pledge",
                desc: "A shareable pledge card — exported straight from your device. No accounts, no cloud.",
              },
              {
                title: "Earth Week banner",
                desc: "A leaf-green card on the Dashboard from April 20 through the 26th, dismissible any time.",
              },
              {
                title: "Sips this Earth Week",
                desc: "A dedicated Insights tile that quietly counts every drink you log during the week.",
              },
              {
                title: "Why reusable bottles",
                desc: "Year-round in Settings — the honest case for tap water, reusable bottles, and habit over hype.",
              },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="rounded-[var(--r-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow)]"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(56,158,107,0.14)" }}
                  >
                    <Leaf className="h-4 w-4" style={{ color: "rgb(34,124,80)" }} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-display text-base font-semibold tracking-tight text-ink">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-3">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal>
            <p className="mx-auto mt-8 max-w-[520px] text-center text-xs leading-relaxed text-muted">
              Sipli doesn&rsquo;t count bottles saved or fabricate eco-metrics.
              It just helps you notice each sip — and noticing is usually what
              makes a habit stick.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── AI COACH ── */}
      <section
        className="relative overflow-hidden px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="coach-heading"
      >
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <PhoneShot
              src="/images/sipli/iphone/02-coach-1320x2868.png"
              alt="Sipli AI Coach screen"
            />
          </Reveal>
          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="mb-6">
              <Eyebrow>
                <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" /> AI Coach
              </Eyebrow>
            </div>
            <h2
              id="coach-heading"
              className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Your personal{" "}
              <span className="text-accent">hydration coach.</span>
            </h2>
            <p className="mb-8 mt-5 max-w-[420px] text-[15.5px] leading-[1.7] text-ink-3">
              Powered by on-device Apple Intelligence, the AI Coach analyzes
              your habits and delivers personalized tips — privately, without
              ever leaving your device.
            </p>
            <ul className="space-y-3.5">
              <CheckItem>Context-aware advice based on your actual data</CheckItem>
              <CheckItem>Understands your beverage mix, streak, and schedule</CheckItem>
              <CheckItem>Completely private — processed on-device only</CheckItem>
              <CheckItem>Smart nudges when you fall behind your daily goal</CheckItem>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── BEVERAGES ── */}
      <section
        className="relative overflow-hidden border-y border-line bg-surface px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="beverages-heading"
      >
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-6">
              <Eyebrow>
                <Droplets className="h-3 w-3 text-accent" aria-hidden="true" /> Beverages
              </Eyebrow>
            </div>
            <h2
              id="beverages-heading"
              className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Not just water —{" "}
              <span className="text-accent">every sip counts.</span>
            </h2>
            <p className="mb-7 mt-5 max-w-[420px] text-[15.5px] leading-[1.7] text-ink-3">
              Track 35+ drinks with science-backed hydration factors —
              specialty coffees, teas, matcha, kombucha, plant milks, juices,
              sports drinks, and more. Caffeine and alcohol are accounted for,
              so a cold brew doesn&apos;t count like water.
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="flex flex-wrap gap-2"
            >
              {[
                { name: "Water", pct: "100%" },
                { name: "Sparkling", pct: "100%" },
                { name: "Herbal Tea", pct: "100%" },
                { name: "Coconut Water", pct: "95%" },
                { name: "Matcha", pct: "90%" },
                { name: "Kombucha", pct: "90%" },
                { name: "Plant Milk", pct: "90%" },
                { name: "Green Tea", pct: "90%" },
                { name: "Cold Brew", pct: "80%" },
                { name: "Cappuccino", pct: "80%" },
                { name: "Sports Drink", pct: "80%" },
                { name: "+ 25 more", pct: "" },
              ].map((b) => (
                <motion.li
                  key={b.name}
                  variants={staggerItem}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-line-2"
                >
                  {b.name}
                  {b.pct && <span className="font-bold text-accent">{b.pct}</span>}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <Reveal delay={0.08} className="flex justify-center lg:justify-end">
            <PhoneShot
              src="/images/sipli/iphone/03-beverages-1320x2868.png"
              alt="Sipli beverages screen"
            />
          </Reveal>
        </div>
      </section>

      {/* ── INSIGHTS (iPad) ── */}
      <section
        className="relative overflow-hidden px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="insights-heading"
      >
        <div className="relative mx-auto w-full max-w-[1200px]">
          <SectionHeader
            align="center"
            eyebrow="Insights"
            headingId="insights-heading"
            title={
              <>
                Understand your <em>habits.</em>
              </>
            }
            lede="Weekly charts, hydration heatmaps, beverage breakdowns, and streak tracking — everything you need to stay consistent."
          />

          <Reveal blur className="mb-14 flex justify-center">
            <div className="relative w-full max-w-[620px]">
              <div
                className="pointer-events-none absolute inset-0 rounded-[var(--r-xl)]"
                style={{
                  background: "var(--accent-soft)",
                  filter: "blur(70px)",
                  transform: "scale(0.9)",
                }}
                aria-hidden="true"
              />
              <Image
                src="/images/sipli/ipad/02-ipad-insights-1668x2388.png"
                alt="Sipli insights on iPad"
                width={1668}
                height={2388}
                className="relative h-auto w-full rounded-[var(--r-xl)]"
                style={{ filter: "drop-shadow(0 36px 70px rgba(12,42,51,0.25))" }}
              />
            </div>
          </Reveal>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mx-auto grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-3"
          >
            {[
              "Weekly & monthly bar charts",
              "Hydration heatmap calendar",
              "Current & longest streaks",
              "Week-over-week trends",
              "Beverage breakdown chart",
              "AI coaching tips",
            ].map((feat) => (
              <motion.li
                key={feat}
                variants={staggerItem}
                className="flex items-center gap-2.5 rounded-[var(--r-sm)] border border-line bg-surface p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-xs text-ink-2">{feat}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── DIARY ── */}
      <section
        className="relative overflow-hidden border-y border-line bg-surface px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="diary-heading"
      >
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-6">
              <Eyebrow>
                <Calendar className="h-3 w-3 text-accent" aria-hidden="true" /> Diary
              </Eyebrow>
            </div>
            <h2
              id="diary-heading"
              className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Every day, <span className="text-accent">captured.</span>
            </h2>
            <p className="mb-8 mt-5 max-w-[420px] text-[15.5px] leading-[1.7] text-ink-3">
              Go back any day in your hydration history. See exactly what you
              drank, when you drank it, and how close you got to your goal —
              perfect for spotting patterns.
            </p>
            <ul className="space-y-3.5">
              <CheckItem>Browse any past date with a single tap</CheckItem>
              <CheckItem>Full log of every beverage and time of day</CheckItem>
              <CheckItem>See goal progress and completion for any date</CheckItem>
              <CheckItem>Syncs seamlessly with Apple Health history</CheckItem>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="flex justify-center lg:justify-end">
            <PhoneShot
              src="/images/sipli/iphone/06-diary-1320x2868.jpg"
              alt="Sipli diary screen"
            />
          </Reveal>
        </div>
      </section>

      {/* ── WIDGETS ── */}
      <section
        className="relative overflow-hidden px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="widgets-heading"
      >
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <PhoneShot
              src="/images/sipli/iphone/07-widgets-1320x2868.jpg"
              alt="Sipli widgets"
            />
          </Reveal>
          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="mb-6">
              <Eyebrow>
                <Smartphone className="h-3 w-3 text-accent" aria-hidden="true" /> Widgets
              </Eyebrow>
            </div>
            <h2
              id="widgets-heading"
              className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Always within <span className="text-accent">reach.</span>
            </h2>
            <p className="mb-8 mt-5 max-w-[420px] text-[15.5px] leading-[1.7] text-ink-3">
              Log a drink or check progress without opening the app. Home screen
              and lock screen widgets keep your hydration goal front and center
              at all times.
            </p>
            <ul className="space-y-3.5">
              <CheckItem>Home screen widgets in small, medium, and large</CheckItem>
              <CheckItem>Lock screen widgets for instant glanceable data</CheckItem>
              <CheckItem>Tap-to-log quick-add from your home screen</CheckItem>
              <CheckItem>Live progress ring updates in real time</CheckItem>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        className="overflow-hidden bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="gallery-heading"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal className="mb-14 text-center">
            <h2
              id="gallery-heading"
              className="text-[clamp(24px,3vw,36px)] font-semibold tracking-tight text-ink"
            >
              Beautifully crafted,{" "}
              <span className="text-accent">every screen.</span>
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="flex items-end justify-center gap-4 md:gap-8"
          >
            <motion.div
              variants={staggerItem}
              className="mb-10 flex-shrink-0"
              style={{ width: "clamp(120px, 14vw, 180px)" }}
            >
              <Image
                src="/images/sipli/iphone/04-insights-1320x2868.png"
                alt="Sipli insights"
                width={1320}
                height={2868}
                className="h-auto w-full rounded-[var(--r-lg)]"
                style={{ filter: "drop-shadow(0 18px 36px rgba(12,42,51,0.18))" }}
              />
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="relative flex-shrink-0"
              style={{ width: "clamp(150px, 18vw, 230px)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: "var(--accent-soft)",
                  filter: "blur(54px)",
                  transform: "scale(0.8)",
                }}
                aria-hidden="true"
              />
              <Image
                src="/images/sipli/iphone/01-hero-1320x2868.png"
                alt="Sipli home"
                width={1320}
                height={2868}
                className="relative h-auto w-full rounded-[var(--r-lg)]"
                style={{ filter: "drop-shadow(0 26px 52px rgba(12,42,51,0.22))" }}
              />
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="mb-10 flex-shrink-0"
              style={{ width: "clamp(120px, 14vw, 180px)" }}
            >
              <Image
                src="/images/sipli/iphone/05-breakdown-1320x2868.jpg"
                alt="Sipli breakdown"
                width={1320}
                height={2868}
                className="h-auto w-full rounded-[var(--r-lg)]"
                style={{ filter: "drop-shadow(0 18px 36px rgba(12,42,51,0.18))" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section
        className="px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2
              id="features-heading"
              className="text-[clamp(30px,4vw,48px)] font-semibold tracking-[-0.02em] text-ink"
            >
              Everything you <span className="text-accent">need.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-[15.5px] leading-[1.7] text-ink-3">
              Smart reminders, weather-adjusted goals, HealthKit sync, and a
              design crafted to delight.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Bell,
                title: "Smart Reminders",
                desc: "Rebuilt in 3.0. Pauses when you're ahead, nudges when you drift — no 2 a.m. buzzes, no pestering.",
              },
              {
                icon: Heart,
                title: "Apple Health Sync",
                desc: "Two-way HealthKit sync. Reads workouts to adjust your goal, writes hydration data back automatically.",
              },
              {
                icon: Shield,
                title: "Privacy First",
                desc: "No accounts, no cloud servers, no tracking. Your data stays on your device and only talks to Apple services.",
              },
              {
                icon: CloudRain,
                title: "Weather Adjusted",
                desc: "On hot, humid days your goal automatically increases. Powered by WeatherKit — always accurate.",
              },
              {
                icon: Smartphone,
                title: "iPhone, iPad & Watch",
                desc: "Full native support across iPhone, iPad, and Apple Watch with layouts optimised for every screen size.",
              },
              {
                icon: Zap,
                title: "Dark & Light Mode",
                desc: "Follow your system theme or set a preference. Both modes are crafted with equal precision and care.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={staggerItem}>
                  <LiftCard className="h-full">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mb-2.5 font-display text-base font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-3">
                      {item.desc}
                    </p>
                  </LiftCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── REFILL PLEDGE ── */}
      <section
        className="relative overflow-hidden border-t border-line bg-surface px-[var(--gutter)] py-[var(--space-section)]"
        aria-labelledby="pledge-heading"
      >
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="mb-6">
              <Eyebrow>The Refill Pledge · Earth Week</Eyebrow>
            </div>
            <h2
              id="pledge-heading"
              className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              Refill, <span className="text-accent">not rebuy.</span>
            </h2>
            <p className="mb-8 mt-5 max-w-[420px] text-[15.5px] leading-[1.7] text-ink-3">
              Every April, Sipli joins Earth Week with the Refill Pledge — a
              simple idea: track each refill and watch a quiet daily habit keep
              plastic bottles out of your hand.
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: Droplets,
                  label: "Refill Counter",
                  desc: "Every reusable fill adds up over the week",
                },
                {
                  icon: Command,
                  label: "Shortcuts Support",
                  desc: "On the roadmap — automate logging with Siri",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-[var(--r-md)] border border-line bg-surface-2 p-4 transition-colors hover:border-line-2"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-muted" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex justify-center lg:justify-end">
            <PhoneShot
              src="/images/sipli/iphone/08-more-1320x2868.jpg"
              alt="Sipli — more features"
            />
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA · dark contrast band ── */}
      <section
        className="relative overflow-hidden bg-night px-[var(--gutter)] py-[var(--space-section)] text-night-ink"
        aria-labelledby="cta-heading"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "rgba(48,176,199,0.12)", filter: "blur(130px)" }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[640px] text-center">
          <Droplets className="mx-auto mb-6 h-12 w-12 text-teal" aria-hidden="true" />
          <h2
            id="cta-heading"
            className="text-[clamp(40px,6vw,64px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
          >
            Start your hydration{" "}
            <span className="text-teal">journey.</span>
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Free on the App Store. iPhone, iPad, and Apple Watch.
          </p>
          <div className="mt-10 flex justify-center">
            <AppStoreBadge />
          </div>
          <p className="mt-8 text-xs text-white/40">
            Requires iOS 17.0 or later. Works on iPhone, iPad, and Apple Watch.
          </p>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}

/* ── Apple Watch mock (decorative) ──────────────────────── */

function WatchMock({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative" aria-hidden="true">
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: "var(--accent-soft)",
          filter: "blur(70px)",
          transform: "scale(0.95)",
        }}
      />
      <div
        className="relative flex items-center justify-center rounded-[56px] border-[6px] border-[#3a3a3e]"
        style={{
          width: "260px",
          height: "310px",
          background: "linear-gradient(145deg, #0b0b0d 0%, #1c1c1f 100%)",
          boxShadow:
            "0 30px 60px rgba(12,42,51,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute right-[-8px] top-12 h-16 w-3 rounded-r-md"
          style={{ background: "linear-gradient(90deg, #3a3a3e, #55555a)" }}
        />
        <div
          className="absolute bottom-12 right-[-6px] h-10 w-2.5 rounded-r-md"
          style={{ background: "linear-gradient(90deg, #3a3a3e, #55555a)" }}
        />
        <div className="relative flex h-[240px] w-[200px] flex-col items-center justify-center">
          <div className="relative mb-3 h-[150px] w-[150px]">
            <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90">
              <circle
                cx="75"
                cy="75"
                r="62"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="10"
              />
              <circle
                cx="75"
                cy="75"
                r="62"
                fill="none"
                stroke="var(--teal)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="389"
                strokeDashoffset="97"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplets className="mb-1 h-7 w-7 text-teal" />
              <div className="font-display text-xl font-semibold leading-none text-white">
                1.9L
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                of 2.4L
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
            <span
              className={`h-1 w-1 rounded-full bg-teal ${reduce ? "" : "animate-pulse"}`}
            />
            <span className="text-[9px] font-semibold uppercase tracking-widest text-teal">
              12 day streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
