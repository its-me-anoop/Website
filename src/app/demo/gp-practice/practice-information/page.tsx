import type { Metadata } from "next";
import Image from "next/image";
import { GpCareCard, GpPageHero, GpSection } from "@/components/demos/gp/GpShell";
import {
  accessibleInfo,
  cqc,
  practiceInfo,
  publications,
} from "@/components/demos/gp/data";

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
          className="max-h-[300px] w-full rounded-[var(--dgp-radius)] object-cover shadow-[0_2px_0_var(--dgp-line)]"
        />

        {/* The inspection rating is a publication requirement, so it
            gets its own place rather than a line in a policy. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--dgp-radius)] border border-[var(--dgp-line)] bg-[var(--dgp-tint)] p-5">
          <span className="rounded-[var(--dgp-radius)] bg-[var(--dgp-green)] px-3 py-1.5 text-base font-bold text-white">
            CQC rating: {cqc.rating}
          </span>
          <p className="text-base text-[var(--dgp-ink-soft)]">
            {cqc.date}.{" "}
            <a href={cqc.href} className="text-[var(--dgp-blue)] underline">
              Read the full inspection report
            </a>
            .
          </p>
        </div>

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
      </GpSection>

      {/* Communication needs get their own section: the Accessible
          Information Standard is a duty, and it only works if patients
          know to tell us in the first place. */}
      <div className="bg-[var(--dgp-tint)]">
        <GpSection className="max-w-[900px]">
          <h2 id="communication" className="scroll-mt-6 text-2xl font-bold tracking-tight">
            Tell us how you need us to communicate
          </h2>
          <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            If you have a disability, impairment or sensory loss, we must find
            out what you need, record it, and make sure you get it — every
            time. That is the Accessible Information Standard, and it is not
            something you should have to ask for twice.
          </p>
          <ul className="mt-5 space-y-3">
            {accessibleInfo.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mt-1 h-5 w-5 shrink-0 fill-none stroke-[var(--dgp-green)] stroke-[2.5]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 max-w-[70ch]">
            <GpCareCard variant="non-urgent" title="Ask once, and we will remember">
              Tell reception, put it in an online request, or mention it at any
              appointment. It is added to your record and travels with your
              hospital referrals, so you should not need to explain it again.
            </GpCareCard>
          </div>
        </GpSection>
      </div>

      {/* Contractual publications: the things a practice website is
          required to carry, gathered in one place. */}
      <GpSection className="max-w-[900px]">
        <h2 className="text-2xl font-bold tracking-tight">
          What we have to publish
        </h2>
        <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Every NHS practice must make this information public. It is here
          rather than buried in a PDF.
        </p>
        <div className="mt-5 divide-y divide-[var(--dgp-line)] rounded-[var(--dgp-radius)] border border-[var(--dgp-line)] bg-white">
          {publications.map((item) => (
            <section key={item.id} id={item.id} className="scroll-mt-6 p-5 sm:p-6">
              <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                {item.copy}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-6 border-t border-[var(--dgp-line)] pt-6 text-sm leading-relaxed text-[var(--dgp-ink-soft)]">
          Full policy documents — including our privacy notice and complaints
          procedure — are available from reception in print and large print,
          and in easy read or another language on request.
        </p>
      </GpSection>
    </>
  );
}
