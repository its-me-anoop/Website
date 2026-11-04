"use client";

import Image from "next/image";
import Link from "next/link";
import { m as motion, useReducedMotion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import { ProductShell } from "@/components/aurora/layout/ProductShell";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sipli, type SipliSection, type StoreImage } from "@/lib/projects/sipli";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function AppStoreBadge() {
  return (
    <Link
      href={sipli.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Sipli on the App Store"
      className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-sans text-accent-ink shadow-[0_12px_28px_-12px_var(--accent)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
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

/** One App Store screenshot, shown as Apple publishes it. */
function StoreShot({ image, priority = false, className }: { image: StoreImage; priority?: boolean; className?: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes="(min-width: 1024px) 300px, 60vw"
      className={cn("h-auto w-full rounded-[22px] shadow-[0_28px_56px_rgba(12,42,51,0.18)]", className)}
    />
  );
}

/** A listing section: copy on one side, its App Store screenshots on the other. */
function FeatureSection({ section, flip, tinted }: { section: SipliSection; flip: boolean; tinted: boolean }) {
  const headingId = `${section.id}-heading`;
  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={cn("px-[var(--gutter)] py-[var(--space-section)]", tinted && "bg-canvas-2")}
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={cn(flip && "lg:order-2")}>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <h2
            id={headingId}
            className="mt-5 text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
          >
            {section.title}
          </h2>
          <p className="mt-5 max-w-[520px] text-[16px] leading-[1.7] text-ink-3">{section.body}</p>
          {section.points ? (
            <ul className="mt-7 space-y-3">
              {section.points.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
          ) : null}
        </Reveal>
        <div className={cn("mx-auto flex w-full max-w-[560px] justify-center gap-4 sm:gap-6", flip && "lg:order-1")}>
          {section.images.map((image, i) => (
            <Reveal key={image.src} delay={i * 0.08} className={cn(section.images.length > 1 ? "w-1/2" : "w-[62%] sm:w-1/2", i === 1 && "mt-10")}>
              <StoreShot image={image} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SipliLanding() {
  const reduce = useReducedMotion();

  return (
    <ProductShell mainClassName="sipli-theme min-h-screen overflow-x-hidden bg-background text-ink">
      <header className="relative overflow-hidden px-[var(--gutter)] pb-[var(--space-section)] pt-28 md:pt-36">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={reduce ? false : "hidden"} animate="visible" variants={staggerContainer}>
            <motion.div variants={reduce ? undefined : staggerItem} className="flex items-center gap-3">
              <Image src={sipli.mark.src} alt={sipli.mark.alt} width={56} height={56} priority className="h-14 w-14" />
              <span className="text-[22px] font-semibold tracking-tight text-ink">{sipli.name}</span>
            </motion.div>
            <motion.div variants={reduce ? undefined : staggerItem} className="mt-6 flex flex-wrap gap-2">
              <Eyebrow>Version {sipli.version} · Free to start</Eyebrow>
              <Eyebrow>{sipli.platforms}</Eyebrow>
            </motion.div>
            <motion.h1
              variants={reduce ? undefined : staggerItem}
              className="mt-7 max-w-[14ch] text-[clamp(40px,6vw,76px)] font-semibold leading-[1.0] tracking-[-0.035em] text-ink"
            >
              See what&apos;s left <span className="text-accent">to drink.</span>
            </motion.h1>
            <motion.p
              variants={reduce ? undefined : staggerItem}
              className="mt-6 max-w-[540px] text-[16px] leading-[1.7] text-ink-3 md:text-[18px]"
            >
              {sipli.intro}
            </motion.p>
            <motion.div variants={reduce ? undefined : staggerItem} className="mt-9 flex flex-wrap items-center gap-3">
              <AppStoreBadge />
            </motion.div>
            <p className="mt-4 text-sm text-ink-3">
              Free to download, with optional Sipli Premium. {sipli.requirement}.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mx-auto w-[min(320px,72vw)]"
          >
            <StoreShot image={sipli.hero} priority />
          </motion.div>
        </div>
      </header>

      {sipli.sections.map((section, i) => (
        <FeatureSection key={section.id} section={section} flip={i % 2 === 1} tinted={i % 2 === 0} />
      ))}

      <section className="bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]" aria-labelledby="pricing-heading">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeader
            align="center"
            eyebrow="Free & Premium"
            headingId="pricing-heading"
            title={
              <>
                Free to start. <em>Premium when you want more.</em>
              </>
            }
            lede="The essentials are free with no time limit. Sipli Premium is an optional subscription."
          />
          <div className="mx-auto grid max-w-[960px] gap-5 md:grid-cols-2">
            <Reveal className="rounded-[var(--r-xl)] border border-line bg-surface-2 p-8 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Free</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">Everything to build the habit</h3>
              <ul className="mt-6 space-y-3.5">
                {sipli.free.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[var(--r-xl)] border border-line bg-surface p-8 shadow-[var(--shadow-sm)] md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Optional</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">Sipli Premium</h3>
              <ul className="mt-6 space-y-3.5">
                {sipli.premium.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </Reveal>
          </div>
          <p className="mx-auto mt-8 max-w-[760px] text-center text-[13px] leading-relaxed text-ink-3">{sipli.billing}</p>
        </div>
      </section>

      <section className="px-[var(--gutter)] py-[var(--space-section)]" aria-labelledby="privacy-heading">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Eyebrow>Private by default</Eyebrow>
            <h2 id="privacy-heading" className="mt-5 text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              Your data stays <span className="text-accent">yours.</span>
            </h2>
            <ul className="mt-8 space-y-3">
              {sipli.privacy.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[var(--r-md)] border border-line bg-surface px-4 py-3 text-sm text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-3">
              {sipli.disclaimer}{" "}
              <Link href={sipli.privacyPolicy} className="underline decoration-line-2 underline-offset-4 hover:text-accent">
                Read the privacy policy
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mx-auto w-[min(420px,86vw)]">
            <StoreShot image={sipli.ipad} />
            <p className="mt-4 text-center text-sm text-ink-3">Sipli on iPad</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-night px-[var(--gutter)] py-[var(--space-section)] text-night-ink" aria-labelledby="cta-heading">
        <Reveal className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="cta-heading" className="max-w-[640px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Start your hydration habit.
            </h2>
            <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.7] text-white/70">
              Free to download on the App Store, with an optional Sipli Premium subscription. {sipli.requirement}. Works on{" "}
              {sipli.platforms}.
            </p>
          </div>
          <AppStoreBadge />
        </Reveal>
      </section>
    </ProductShell>
  );
}
