"use client";

import { motion, type Variants } from "framer-motion";
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
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const pillars = [
  {
    icon: Camera,
    title: "Capture in the moment",
    description:
      "Save drawings from the camera, photo library, or document scanner before they disappear into a cabinet.",
    accent: "#F2784B",
    glow: "rgba(242,120,75,0.18)",
  },
  {
    icon: Mic,
    title: "Keep the story attached",
    description:
      "Add dates, tags, favourites, and voice notes so every piece carries the memory around it, not just the image.",
    accent: "#76B699",
    glow: "rgba(118,182,153,0.18)",
  },
  {
    icon: Clock3,
    title: "Relive the years beautifully",
    description:
      "Browse a living timeline, celebrate milestones, and surface \"On This Day\" moments without extra work.",
    accent: "#6FAFD1",
    glow: "rgba(111,175,209,0.18)",
  },
];

const featureCards = [
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

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[760px]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9C6A55]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-medium leading-[1.05] tracking-[-0.03em] text-[#2F211D]">
        {title}
      </h2>
      <p className="mt-5 max-w-[640px] text-[15px] leading-7 text-[#715B51] md:text-[17px]">
        {description}
      </p>
    </div>
  );
}

function PillarCard({
  icon: Icon,
  title,
  description,
  accent,
  glow,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  glow: string;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6, transition: { duration: 0.18, ease } }}
      className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/72 p-7 shadow-[0_24px_80px_rgba(69,40,28,0.08)] backdrop-blur-sm"
    >
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
        style={{ background: glow }}
        aria-hidden="true"
      />
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[18px]"
        style={{ backgroundColor: `${accent}18` }}
      >
        <Icon className="h-6 w-6" style={{ color: accent }} />
      </div>
      <h3 className="mt-6 text-xl font-display font-semibold tracking-tight text-[#2F211D]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#715B51]">{description}</p>
    </motion.article>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      variants={fadeInUp}
      className="rounded-[28px] border border-[#EBD9CF] bg-[#FFFDF9] p-6 shadow-[0_18px_60px_rgba(92,63,51,0.06)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#FCE6D8] text-[#F2784B]">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-display font-semibold tracking-tight text-[#2F211D]">
          {title}
        </h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-[#715B51]">{description}</p>
    </motion.article>
  );
}

function ArtlingPhoneMockup() {
  const galleryCards = [
    {
      title: "Rainbow House",
      meta: "Saved today",
      palette: "from-[#FFE8D8] via-[#FFF4EA] to-[#FFD5BE]",
      rotation: "-rotate-[2deg]",
    },
    {
      title: "Tiger Parade",
      meta: "Shared with Dad",
      palette: "from-[#FFEED9] via-[#FFF8EE] to-[#E4F3EA]",
      rotation: "rotate-[2deg]",
    },
    {
      title: "Rocket Garden",
      meta: "Favourite",
      palette: "from-[#EAF6FF] via-[#FFF7F1] to-[#FFDCCE]",
      rotation: "rotate-[-1.5deg]",
    },
    {
      title: "Ocean Parade",
      meta: "2 years ago",
      palette: "from-[#E7F4FF] via-[#FFF7F1] to-[#FDE6D6]",
      rotation: "rotate-[1.5deg]",
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#FFF8F0_0%,#FFF1E7_46%,#FFEBDD_100%)] px-5 pb-5 pt-6 text-[#2F211D]">
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(242,120,75,0.18),transparent_70%)]" />
      <div className="absolute -right-10 top-24 h-32 w-32 rounded-full bg-[#F7C7A8]/40 blur-3xl" />
      <div className="absolute -left-8 bottom-32 h-28 w-28 rounded-full bg-[#A8D1B6]/35 blur-3xl" />

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
                ? "bg-[#F2784B] text-white"
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
            className={`rounded-[24px] border border-white/80 bg-gradient-to-br ${card.palette} p-3 shadow-[0_12px_28px_rgba(96,67,54,0.10)] ${card.rotation}`}
          >
            <div className="rounded-[18px] bg-white/70 p-2">
              <div className="aspect-[0.95/1] rounded-[14px] bg-[radial-gradient(circle_at_30%_25%,rgba(242,120,75,0.28),transparent_34%),radial-gradient(circle_at_72%_32%,rgba(111,175,209,0.22),transparent_32%),radial-gradient(circle_at_54%_72%,rgba(118,182,153,0.22),transparent_28%),linear-gradient(180deg,#FFF8F1_0%,#FBE6D8_100%)]" />
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
          <Clock3 className="h-4 w-4 text-[#F2784B]" />
          On This Day
        </div>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#2F211D]">
          Maya made “Ocean Parade” two years ago. Artling keeps the memory right next to the art.
        </p>
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-[26px] bg-[#2F211D] px-5 py-4 text-white shadow-[0_20px_44px_rgba(47,33,29,0.28)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Quick capture
            </p>
            <p className="mt-1 text-sm font-semibold">
              Camera, gallery, or scanner
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2784B] shadow-[0_10px_24px_rgba(242,120,75,0.35)]">
            <Camera className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArtlingLanding() {
  return (
    <main className="min-h-screen bg-[#FFF7F1] text-[#2F211D]">
      <Navbar />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#2A1A17_0%,#3A251F_48%,#4B3229_100%)] px-6 pb-20 pt-28 md:px-14 md:pb-28 md:pt-36">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 15% 12%, rgba(242,120,75,0.22), transparent 28%), radial-gradient(circle at 82% 18%, rgba(118,182,153,0.16), transparent 24%), radial-gradient(circle at 72% 72%, rgba(111,175,209,0.18), transparent 30%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(255,247,241,0.12))]" />

        <div className="relative mx-auto max-w-[1220px]">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease }}
            className="mb-10"
          >
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#DDBAA7] transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD6BF] backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-[#F9B085]" />
                  Art archive for busy families
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mt-7 max-w-[720px] text-[clamp(2.9rem,6vw,5.6rem)] font-display font-medium leading-[0.98] tracking-[-0.05em] text-white"
              >
                Turn fridge masterpieces into a living family gallery.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-[620px] text-[16px] leading-8 text-[#F4D7C8] md:text-[19px]"
              >
                Artling helps parents capture artwork fast, keep the story around each piece,
                and revisit a child’s creative growth through timelines, milestones, sharing, and
                AI-assisted captions.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Link
                  href="#features"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#F2784B] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Explore Features
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects/artling/privacy-policy"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:bg-white/12"
                >
                  Read Privacy Policy
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap gap-3"
              >
                {["Timeline + milestones", "PDF export", "Family sharing", "AI captions"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-[#F4D7C8]"
                    >
                      {item}
                    </span>
                  )
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="relative mx-auto w-full max-w-[600px]"
            >
              <div className="absolute -left-2 top-12 hidden max-w-[180px] rounded-[28px] border border-white/12 bg-white/10 p-4 text-[#FFE3D2] shadow-[0_24px_50px_rgba(0,0,0,0.16)] backdrop-blur-md lg:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFBD97]">
                  Memory-rich
                </p>
                <p className="mt-3 text-sm leading-6">
                  Save the picture, the title, the tags, and the voice that explains why it mattered.
                </p>
              </div>

              <div className="absolute -right-1 bottom-18 hidden max-w-[190px] rounded-[28px] border border-white/12 bg-[#2F211D]/85 p-4 text-white shadow-[0_28px_60px_rgba(0,0,0,0.22)] lg:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F7B58D]">
                  Family-ready
                </p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Share a child profile, surface anniversaries, and build a keepsake archive that grows with them.
                </p>
              </div>

              <div className="relative z-10 mx-auto max-w-[360px]">
                <Iphone17ProFrame>
                  <ArtlingPhoneMockup />
                </Iphone17ProFrame>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-8 right-6 z-20 w-[152px] sm:w-[172px]"
              >
                <Image
                  src="/projects/artling/fox-painter.png"
                  alt="Artling fox mascot"
                  width={806}
                  height={1129}
                  className="h-auto w-full drop-shadow-[0_26px_40px_rgba(0,0,0,0.28)]"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="px-6 py-20 md:px-14 md:py-28"
      >
        <div className="mx-auto max-w-[1220px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionHeading
              eyebrow="The Promise"
              title="Built for the messy, magical middle of family life."
              description="Artling is less about storing files and more about preserving context. It gives busy parents one place to collect artwork, track growth over time, and turn everyday creations into memories that stay easy to revisit."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mt-12 grid gap-6 lg:grid-cols-3"
          >
            {pillars.map((pillar) => (
              <PillarCard key={pillar.title} {...pillar} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-14 md:pb-28">
        <div className="mx-auto max-w-[1220px] rounded-[40px] border border-[#EEDFD6] bg-[linear-gradient(180deg,#FFFDF9_0%,#FFF5EC_100%)] px-6 py-10 shadow-[0_26px_90px_rgba(89,58,45,0.08)] md:px-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
          >
            <div>
              <SectionHeading
                eyebrow="What’s Inside"
                title="A family archive that stays calm, even as it grows."
                description="The product combines capture, organisation, memory resurfacing, and sharing in one workflow, so nothing needs to move through separate photo albums, notes apps, or folders."
              />

              <div className="mt-8 space-y-3">
                {trustPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] bg-white/75 px-4 py-3 text-sm text-[#5E4A42]"
                  >
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#F2784B]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {featureCards.map((card) => (
                <FeatureCard key={card.title} {...card} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.75, ease }}
            className="relative overflow-hidden rounded-[36px] bg-[#2F211D] p-8 text-white md:p-10"
          >
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 10% 20%, rgba(242,120,75,0.24), transparent 22%), radial-gradient(circle at 78% 18%, rgba(111,175,209,0.18), transparent 28%), radial-gradient(circle at 70% 80%, rgba(118,182,153,0.16), transparent 26%)",
              }}
            />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7B58D]">
                Why It Lands
              </p>
              <h2 className="mt-4 max-w-[540px] text-3xl font-display font-medium tracking-[-0.03em] text-white md:text-4xl">
                Artling feels less like storage and more like a gentle family ritual.
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] leading-7 text-white/72">
                The experience is intentionally warm, tactile, and low-friction. Instead of
                building another productivity system for parents to maintain, it quietly turns
                capturing and revisiting artwork into something they will actually keep up with.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  "Capture first, organise later",
                  "Search by child, tag, or favourite",
                  "Share a profile without a photo-dump thread",
                  "Revisit memories through time, not folders",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-4 text-sm text-white/84 backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
            className="rounded-[36px] border border-[#EEDFD6] bg-[#FFFDF9] p-8 shadow-[0_24px_70px_rgba(90,61,48,0.07)] md:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9C6A55]">
              Privacy
            </p>
            <h2 className="mt-4 text-3xl font-display font-medium tracking-[-0.03em] text-[#2F211D] md:text-4xl">
              Clear data practices, not vague reassurance.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#715B51]">
              Artling stores its core library on device and uses cloud services where account,
              sync, AI, or sharing features require them. The public privacy policy reflects the
              real app architecture, including Firebase authentication, optional Sign in with Apple,
              StoreKit purchases, notifications, and AI caption processing.
            </p>

            <div className="mt-8 space-y-3">
              {[
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
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-[22px] bg-[#FFF4EA] px-4 py-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-white text-[#F2784B] shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2F211D]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#715B51]">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/projects/artling/privacy-policy"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#2F211D] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Read the Artling Privacy Policy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-14 md:pb-32">
        <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#F2784B_0%,#D96C43_42%,#B75734_100%)] px-8 py-10 text-white shadow-[0_30px_100px_rgba(183,87,52,0.28)] md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Project Page
              </p>
              <h2 className="mt-4 max-w-[660px] text-3xl font-display font-medium tracking-[-0.03em] md:text-5xl">
                Artling is ready for a public-facing home that feels as thoughtful as the app.
              </h2>
              <p className="mt-5 max-w-[660px] text-[15px] leading-7 text-white/84">
                Need the App Store listing, screenshots, or launch assets carried through in the
                same visual direction? The page structure is now in place to extend cleanly.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects/artling/privacy-policy"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/25 bg-white/12 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/16"
              >
                Privacy Policy
              </Link>
              <Link
                href="mailto:anoop@flutterly.co.uk"
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#B75734] transition-transform hover:-translate-y-0.5"
              >
                Enquire About the App
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
