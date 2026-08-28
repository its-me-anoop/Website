import type { Metadata } from "next";
import {
  PhysioHeading,
  PhysioPageHero,
  PhysioSection,
} from "@/components/demos/physio/PhysioShell";
import { loadPhysioContent } from "@/lib/cms/physio";

export const metadata: Metadata = { title: "Conditions & treatments" };

export default function ConditionsPage() {
  const { conditions, treatments } = loadPhysioContent();

  return (
    <>
      <PhysioPageHero
        eyebrow="What we see"
        title="Conditions & treatments"
        lede="The problems we assess and manage every week, and the treatment approaches we use to get you moving again."
      />

      <PhysioSection>
        <h2 className="sr-only">Conditions we assess and manage</h2>
        <ol className="divide-y divide-[var(--dpy-line)]">
          {conditions.conditions.map((condition, index) => (
            <li key={condition.slug} id={condition.slug} className="scroll-mt-24 py-6">
              <div className="flex items-start gap-5 sm:gap-8">
                <span
                  aria-hidden
                  className="dpy-display shrink-0 text-[clamp(1.6rem,3.6vw,2.2rem)] font-bold leading-none text-[var(--dpy-coral)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="dpy-display text-xl font-bold leading-tight">
                    {condition.title}
                  </h3>
                  <p className="mt-2 max-w-[640px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                    {condition.plainSummary}
                  </p>
                  <details className="group mt-3">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--dpy-coral)] underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                      What we assess &amp; how we typically help
                    </summary>
                    <dl className="mt-3 max-w-[640px] space-y-3 text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                      <div>
                        <dt className="font-semibold text-[var(--dpy-ink)]">What we assess</dt>
                        <dd className="mt-0.5">{condition.whatWeAssess}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[var(--dpy-ink)]">Typical approach</dt>
                        <dd className="mt-0.5">{condition.typicalApproach}</dd>
                      </div>
                    </dl>
                  </details>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </PhysioSection>

      <div className="bg-[var(--dpy-tint)]">
        <PhysioSection pad="spacious">
          <PhysioHeading eyebrow="How we treat">Treatment approaches</PhysioHeading>
          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {treatments.approaches.map((approach) => (
              <div key={approach.title}>
                <h3 className="text-lg font-bold text-[var(--dpy-ink)]">{approach.title}</h3>
                <p className="mt-1.5 max-w-[440px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                  {approach.copy}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[var(--dpy-ink-soft)]">
                  Helps with: {approach.whoItHelps}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[640px] text-sm leading-relaxed text-[var(--dpy-ink-soft)]">
            This list doesn&rsquo;t include injections, scans or diagnostic imaging — for
            those, your GP or an NHS clinic is the right place to start.
          </p>
        </PhysioSection>
      </div>
    </>
  );
}
