import type { Metadata } from "next";
import Image from "next/image";
import { GpPageHero, GpReviewDate, GpSection } from "@/components/demos/gp/GpShell";
import { loadGpContent } from "@/lib/cms";

export const metadata: Metadata = { title: "About the surgery" };

export default function PracticeInformationPage() {
  const { practiceInfo, practice } = loadGpContent();

  const contents = [
    { id: "cqc", title: "Our CQC rating" },
    { id: "fft", title: "What patients say about us" },
    ...practiceInfo.policies.map((policy) => ({ id: policy.id, title: policy.title })),
    { id: "icb", title: "Who we answer to" },
  ];

  return (
    <>
      <GpPageHero
        title="About the surgery"
        lede="How the surgery works, your rights as a patient, and the policies we hold ourselves to — in plain English."
      />

      <GpSection className="max-w-[900px]">
        <Image
          src="/demos/gp/gp-waiting.jpg"
          alt="The surgery's bright waiting room with comfortable chairs"
          width={1920}
          height={1280}
          className="max-h-[300px] w-full rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)]"
        />

        <nav aria-label="On this page" className="mt-8">
          <h2 className="text-base font-bold">On this page</h2>
          <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {contents.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="inline-block py-0.5 text-base text-[var(--dgp-blue)] underline"
                >
                  {entry.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <section
            id="cqc"
            className="scroll-mt-6 rounded-md border border-[var(--dgp-line)] bg-white p-6"
          >
            <h2 className="text-[20px] font-bold tracking-tight">Our CQC rating</h2>
            <p className="mt-3 inline-block rounded-md bg-[var(--dgp-green)] px-3 py-1 text-base font-bold text-white">
              {practiceInfo.cqc.rating}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              {practiceInfo.cqc.copy}
            </p>
          </section>
          <section
            id="fft"
            className="scroll-mt-6 rounded-md border border-[var(--dgp-line)] bg-white p-6"
          >
            <h2 className="text-[20px] font-bold tracking-tight">
              What patients say about us
            </h2>
            <p className="mt-3 text-lg font-bold">{practiceInfo.fft.headline}</p>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              {practiceInfo.fft.copy}
            </p>
          </section>
        </div>

        <div className="mt-4 divide-y divide-[var(--dgp-line)]">
          {practiceInfo.policies.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-6 py-7">
              <h2 className="text-[20px] font-bold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                {section.copy}
              </p>
            </section>
          ))}
          <section id="icb" className="scroll-mt-6 py-7">
            <h2 className="text-[20px] font-bold tracking-tight">Who we answer to</h2>
            <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              {practice.icb.copy}
            </p>
          </section>
        </div>
        <p className="border-t border-[var(--dgp-line)] pt-6 text-sm leading-relaxed text-[var(--dgp-ink-soft)]">
          Full policy documents — including our privacy notice and complaints
          procedure — are available from reception in print and large print.
        </p>
        <GpReviewDate reviewed={practiceInfo.reviewed} />
      </GpSection>
    </>
  );
}
