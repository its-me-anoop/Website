import type { Metadata } from "next";
import {
  GpAction,
  GpPageHero,
  GpReviewDate,
  GpSampleNote,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { loadGpContent } from "@/lib/cms";

export const metadata: Metadata = { title: "Register with the surgery" };

export default function RegisterPage() {
  const { register, practice } = loadGpContent();

  return (
    <>
      <GpPageHero
        title="Register with the surgery"
        lede={register.lede}
        crumb="Register"
      />

      <GpSection className="max-w-[900px]">
        <h2 className="text-2xl font-bold tracking-tight">
          Our practice area
        </h2>
        <p className="mt-3 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          {register.catchment.copy}
        </p>
        <GpSampleNote>{register.catchment.checkNote}</GpSampleNote>
      </GpSection>

      <GpSection pad="flush" className="max-w-[900px]">
        <h2 className="text-2xl font-bold tracking-tight">How to register</h2>
        <ol className="mt-5 divide-y divide-[var(--dgp-line)]">
          {register.steps.map((step, i) => (
            <li key={step.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dgp-blue)] text-lg font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="pt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                  {step.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <GpAction href="https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/">
            Register with the surgery online
          </GpAction>
        </div>
        <GpSampleNote>
          Sample site — on a live build this button opens the practice&rsquo;s
          own Register with a GP surgery service.
        </GpSampleNote>
      </GpSection>

      <GpSection pad="flush" className="max-w-[900px]">
        <h2 className="text-2xl font-bold tracking-tight">Good to know</h2>
        <div className="mt-2 divide-y divide-[var(--dgp-line)]">
          {register.notes.map((note) => (
            <section key={note.title} className="py-6">
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="mt-1.5 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                {note.copy}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Questions about registering? Call us on{" "}
          <a href={practice.phoneHref} className="font-semibold text-[var(--dgp-blue)] underline">
            {practice.phone}
          </a>{" "}
          and reception will talk you through it.
        </p>
        <GpReviewDate reviewed={register.reviewed} />
      </GpSection>
    </>
  );
}
