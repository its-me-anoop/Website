import type { Metadata } from "next";
import {
  PhysioHeading,
  PhysioPageHero,
  PhysioSection,
} from "@/components/demos/physio/PhysioShell";
import { loadPhysioContent } from "@/lib/cms/physio";

export const metadata: Metadata = { title: "Your first appointment" };

export default function FirstAppointmentPage() {
  const { firstAppointment } = loadPhysioContent();

  return (
    <>
      <PhysioPageHero
        eyebrow="Before you arrive"
        title="Your first appointment"
        lede={`Your first visit takes ${firstAppointment.duration}. Here's exactly what to expect, what to wear, and how paying for it works.`}
      />

      <PhysioSection>
        <PhysioHeading eyebrow="What happens">What happens at your first visit</PhysioHeading>
        <ol className="mt-6 grid gap-8 sm:grid-cols-2">
          {firstAppointment.beats.map((beat, index) => (
            <li key={beat.title} className="flex gap-4">
              <span
                aria-hidden
                className="dpy-display shrink-0 text-2xl font-bold leading-none text-[var(--dpy-coral)]"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--dpy-ink)]">{beat.title}</h3>
                <p className="mt-1.5 max-w-[420px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                  {beat.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </PhysioSection>

      <div className="bg-[var(--dpy-tint)]">
        <PhysioSection>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <PhysioHeading eyebrow="Practical">What to wear</PhysioHeading>
              <dl className="mt-5 space-y-3">
                {firstAppointment.whatToWear.map((item) => (
                  <div key={item.bodyArea}>
                    <dt className="text-base font-bold text-[var(--dpy-ink)]">{item.bodyArea}</dt>
                    <dd className="mt-0.5 text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                      {item.suggestion}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <PhysioHeading eyebrow="Practical">What to bring</PhysioHeading>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                {firstAppointment.whatToBring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </PhysioSection>
      </div>

      <PhysioSection pad="spacious">
        <PhysioHeading eyebrow="Paying for your care">
          Self-pay or claiming through insurance
        </PhysioHeading>
        <p className="mt-3 max-w-[640px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
          Most patients pay for their own care. If you&rsquo;re claiming through a health
          insurer, a couple of things work differently — here&rsquo;s both, side by side.
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:divide-x lg:divide-[var(--dpy-line)]">
          <div>
            <h3 className="text-xl font-bold text-[var(--dpy-ink)]">If you&rsquo;re paying yourself</h3>
            <ol className="mt-4 space-y-5">
              {firstAppointment.selfPay.steps.map((step) => (
                <li key={step.title}>
                  <h4 className="text-lg font-bold text-[var(--dpy-ink)]">{step.title}</h4>
                  <p className="mt-1 max-w-[440px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:pl-10">
            <h3 className="text-xl font-bold text-[var(--dpy-ink)]">
              If you&rsquo;re claiming through insurance
            </h3>
            <ol className="mt-4 space-y-5">
              {firstAppointment.insured.steps.map((step) => (
                <li key={step.title}>
                  <h4 className="text-lg font-bold text-[var(--dpy-ink)]">{step.title}</h4>
                  <p className="mt-1 max-w-[440px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
            <dl className="mt-6 space-y-3 border-t border-[var(--dpy-line)] pt-5 text-sm leading-relaxed text-[var(--dpy-ink-soft)]">
              <div>
                <dt className="font-semibold text-[var(--dpy-ink)]">Pre-authorisation</dt>
                <dd className="mt-0.5">{firstAppointment.insured.preAuthCopy}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--dpy-ink)]">Excess</dt>
                <dd className="mt-0.5">{firstAppointment.insured.excessCopy}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--dpy-ink)]">GP referral</dt>
                <dd className="mt-0.5">{firstAppointment.insured.gpReferralCopy}</dd>
              </div>
            </dl>
          </div>
        </div>
      </PhysioSection>
    </>
  );
}
