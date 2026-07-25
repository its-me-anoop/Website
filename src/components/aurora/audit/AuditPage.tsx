"use client";

import { FileSearch, MailCheck, Send } from "lucide-react";
import { site } from "@/lib/site";
import {
  GlassCard,
  Reveal,
  Stagger,
  StaggerItem,
  TextReveal,
} from "@/components/fx";
import { Shell } from "../Shell";
import { CtaBand } from "../CtaBand";
import { auditChecks } from "../data";
import { Btn, CheckItem, Eyebrow, Section, SectionHead } from "../primitives";

/* One prefilled email, no backend form — the studio replies personally. */
const auditMailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Free website audit request"
)}&body=${encodeURIComponent(
  [
    "Hi Anoop,",
    "",
    "Please audit our website.",
    "",
    "Website address: ",
    "Organisation (GP practice / care home / other): ",
    "Anything you'd like the audit to focus on: ",
    "",
    "Thanks,",
  ].join("\n")
)}`;

const steps = [
  {
    icon: Send,
    title: "Send your website address",
    copy: "One email is all it takes — no forms, no calls unless you want one. Just say who you are and where the site lives.",
  },
  {
    icon: FileSearch,
    title: "Flutterly reviews it properly",
    copy: "Automated checks plus a manual review of accessibility, speed, mobile experience, content and local search — the same lens used on paid projects.",
  },
  {
    icon: MailCheck,
    title: "You get a written report",
    copy: "A scored, plain-English review with prioritised recommendations, usually within a week. Yours to act on with anyone — no obligation.",
  },
] as const;

const promises = [
  "Written in plain English — no jargon-wrapped sales pitch",
  "Prioritised fixes you can hand to any developer",
  "Includes “keep what you have” when that is the honest answer",
  "Free, with no follow-up pressure",
] as const;

export function AuditPage() {
  return (
    <Shell>
      <section id="top" className="relative px-5 pb-12 pt-14 text-center sm:px-8 sm:pt-20">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[760px] max-w-full -translate-x-1/2 rounded-full bg-au-sky/12 blur-[120px]"
        />
        <div className="relative mx-auto w-full max-w-[1240px]">
          <Reveal y={14} blur={4}>
            <Eyebrow className="justify-center">Free website audit</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            delay={0.1}
            className="mx-auto mt-6 max-w-[760px] text-[clamp(2.3rem,5.8vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.04em]"
            segments={[
              { text: "Find out how your website" },
              { text: "really performs.", tone: "gradient" },
            ]}
          />
          <Reveal delay={0.24}>
            <p className="mx-auto mt-6 max-w-[580px] text-[16.5px] leading-relaxed text-au-ink-2">
              A written review of your current site against the standards that
              matter for GP practices and care homes — accessibility, speed,
              mobile experience, content and local search. Free, honest and
              yours to keep.
            </p>
          </Reveal>
          <Reveal delay={0.34} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Btn href={auditMailto} tone="primary" arrow>
              Request your free audit
            </Btn>
            <Btn href="/packages" tone="glass">
              See packages
            </Btn>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="What gets checked"
          title={[
            { text: "Six areas," },
            { text: "no stone unturned.", tone: "muted" },
          ]}
        />
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.06}>
          {auditChecks.map((check, i) => (
            <StaggerItem key={check.title} className="h-full">
              <GlassCard as="article" className="h-full p-6 sm:p-7">
                <span className="au-mono relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-au-teal/25 bg-au-teal/10 text-[12px] font-medium tabular-nums text-au-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-5 text-[17.5px] font-medium tracking-tight text-au-ink">
                  {check.title}
                </h3>
                <p className="relative mt-2.5 text-[14px] leading-relaxed text-au-ink-2">
                  {check.copy}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How it works"
          title={[{ text: "Three steps," }, { text: "one email.", tone: "muted" }]}
        />
        <Stagger as="ol" className="mt-16 grid gap-5 md:grid-cols-3" delay={0.08}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.title} as="li" className="h-full">
                <GlassCard className="h-full p-7 sm:p-8">
                  <span
                    aria-hidden
                    className="au-mono absolute right-6 top-6 text-[11px] tracking-[0.2em] text-white/15"
                  >
                    0{i + 1}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-au-teal/20 bg-gradient-to-br from-au-teal/22 to-au-sky/5 text-au-teal">
                    <Icon size={21} aria-hidden />
                  </span>
                  <h3 className="relative mt-6 text-[17.5px] font-medium tracking-tight text-au-ink">
                    {step.title}
                  </h3>
                  <p className="relative mt-2.5 text-[14px] leading-relaxed text-au-ink-2">
                    {step.copy}
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-[760px]">
          <GlassCard strong className="p-8 sm:p-9" interactive={false}>
            <h2 className="text-[19px] font-medium tracking-tight text-au-ink">
              The audit promise
            </h2>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {promises.map((promise) => (
                <CheckItem key={promise}>{promise}</CheckItem>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </Section>

      <CtaBand
        title="Two minutes now, a clear picture within a week"
        copy="Send your website address and Flutterly will do the rest — a written, scored review with the fixes that matter most, whoever ends up making them."
        id="contact"
      />
    </Shell>
  );
}
