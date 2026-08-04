import type { Metadata } from "next";
import { PhysioPageHero, PhysioSection } from "@/components/demos/physio/PhysioShell";
import { loadPhysioContent } from "@/lib/cms/physio";

export const metadata: Metadata = { title: "Our team" };

export default function TeamPage() {
  const { team } = loadPhysioContent();

  return (
    <>
      <PhysioPageHero
        eyebrow="Meet the clinicians"
        title="Our team"
        lede="Every clinician here is HCPC-registered — you can verify anyone on the HCPC register. Sample registration numbers are marked for this demo."
      />

      <PhysioSection>
        <ul className="divide-y divide-[var(--dpy-line)]">
          {team.practitioners.map((practitioner) => (
            <li key={practitioner.hcpcNumber} className="grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
              <div>
                <h2 className="dpy-display text-2xl font-bold leading-tight">
                  {practitioner.name}
                </h2>
                <p className="mt-1 text-base font-semibold text-[var(--dpy-coral)]">
                  {practitioner.title}
                </p>
                {practitioner.cspMember ? (
                  <p className="mt-2 text-sm font-semibold text-[var(--dpy-ink)]">
                    Chartered member of the Chartered Society of Physiotherapy (CSP)
                  </p>
                ) : null}
                <p className="mt-2 text-sm text-[var(--dpy-ink-soft)]">
                  HCPC {practitioner.hcpcNumber} <span className="italic">(sample)</span>
                </p>
                <p className="mt-1 max-w-[260px] text-sm leading-relaxed text-[var(--dpy-ink-soft)]">
                  {practitioner.hcpcSampleNote}
                </p>
              </div>
              <div>
                <p className="max-w-[560px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                  {practitioner.bio}
                </p>
                <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--dpy-ink)]">
                  Qualifications
                </h3>
                <ul className="mt-2 space-y-1 text-base text-[var(--dpy-ink-soft)]">
                  {practitioner.qualifications.map((q) => (
                    <li key={q.award}>
                      {q.award}, {q.institution}, {q.year}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--dpy-ink)]">
                  Special interests
                </h3>
                <ul className="mt-2 space-y-1 text-base text-[var(--dpy-ink-soft)]">
                  {practitioner.specialInterests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </PhysioSection>
    </>
  );
}
