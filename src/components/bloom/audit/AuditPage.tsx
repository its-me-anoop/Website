"use client";

import { FileSearch, MailCheck, Send } from "lucide-react";
import { site } from "@/lib/site";
import { BloomShell } from "../BloomShell";
import { CtaBand } from "../CtaBand";
import { auditChecks } from "../data";
import {
  BtnLink,
  CheckItem,
  Rise,
  RevealWords,
  SectionHead,
} from "../primitives";

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
    <BloomShell>
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="bl-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-20">
          <Rise>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-teal">
              Free website audit
            </p>
          </Rise>
          <RevealWords
            as="h1"
            delay={0.08}
            className="mx-auto mt-4 max-w-[720px] text-[clamp(2.2rem,5.6vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
            segments={[
              { text: "Find out how your website" },
              { text: "really performs.", tone: "teal" },
            ]}
          />
          <Rise delay={0.2}>
            <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-bl-ink-soft">
              A written review of your current site against the standards that
              matter for GP practices and care homes — accessibility, speed,
              mobile experience, content and local search. Free, honest and
              yours to keep.
            </p>
          </Rise>
          <Rise delay={0.3} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <BtnLink href={auditMailto} tone="teal" arrow>
              Request your free audit
            </BtnLink>
            <BtnLink href="/packages" tone="outline">
              See packages
            </BtnLink>
          </Rise>
        </div>
      </section>

      <section className="border-t border-bl-line bg-bl-band-2">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            eyebrow="What gets checked"
            title={[
              { text: "Six areas," },
              { text: "no stone unturned.", tone: "muted" },
            ]}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {auditChecks.map((check, i) => (
              <Rise key={check.title} delay={(i % 3) * 0.08}>
                <article className="h-full rounded-[24px] border border-bl-line bg-bl-surface p-6 sm:p-7">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bl-teal-soft text-[13px] font-semibold tabular-nums text-bl-teal">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-[17px] font-medium tracking-tight text-bl-ink">
                    {check.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-bl-ink-soft">
                    {check.copy}
                  </p>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          eyebrow="How it works"
          title={[
            { text: "Three steps," },
            { text: "one email.", tone: "teal" },
          ]}
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <Rise delay={i * 0.1} className="h-full rounded-[24px] border border-bl-line bg-bl-surface p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bl-teal-soft text-bl-teal">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[17px] font-medium tracking-tight text-bl-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-bl-ink-soft">
                    {step.copy}
                  </p>
                </Rise>
              </li>
            );
          })}
        </ol>

        <Rise className="mx-auto mt-12 max-w-[720px]">
          <div className="bl-card rounded-[26px] border border-bl-line bg-bl-surface p-8 sm:p-9">
            <h2 className="text-[19px] font-medium tracking-tight text-bl-ink">
              The audit promise
            </h2>
            <ul className="mt-5 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
              {promises.map((promise) => (
                <CheckItem key={promise}>{promise}</CheckItem>
              ))}
            </ul>
          </div>
        </Rise>
      </section>

      <CtaBand
        title="Two minutes now, a clear picture within a week"
        copy="Send your website address and Flutterly will do the rest — a written, scored review with the fixes that matter most, whoever ends up making them."
        id="contact"
      />
    </BloomShell>
  );
}
