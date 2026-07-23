import type { Metadata } from "next";
import { GpPageHero, GpSection } from "@/components/demos/gp/GpShell";
import { practiceInfo } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Practice information" };

export default function PracticeInformationPage() {
  return (
    <>
      <GpPageHero
        title="Practice information"
        lede="How the practice works, your rights as a patient, and the policies we hold ourselves to — in plain English."
      />

      <GpSection className="max-w-[860px]">
        <div className="space-y-4">
          {practiceInfo.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-6 rounded-md border border-[var(--dgp-line)] bg-white p-6"
            >
              <h2 className="text-[18px] font-bold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
                {section.copy}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-6 text-[14px] leading-relaxed text-[var(--dgp-ink-soft)]">
          Full policy documents — including our privacy notice and complaints
          procedure — are available from reception in print and large print.
        </p>
      </GpSection>
    </>
  );
}
