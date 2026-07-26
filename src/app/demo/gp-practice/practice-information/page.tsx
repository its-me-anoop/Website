import type { Metadata } from "next";
import Image from "next/image";
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

      <GpSection className="max-w-[900px]">
        <Image
          src="/demos/gp/gp-waiting.jpg"
          alt="The surgery's bright waiting room with comfortable chairs"
          width={1920}
          height={1280}
          className="max-h-[300px] w-full rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)]"
        />

        <div className="mt-4 divide-y divide-[var(--dgp-line)]">
          {practiceInfo.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-6 py-7">
              <h2 className="text-[20px] font-bold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                {section.copy}
              </p>
            </section>
          ))}
        </div>
        <p className="border-t border-[var(--dgp-line)] pt-6 text-sm leading-relaxed text-[var(--dgp-ink-soft)]">
          Full policy documents — including our privacy notice and complaints
          procedure — are available from reception in print and large print.
        </p>
      </GpSection>
    </>
  );
}
