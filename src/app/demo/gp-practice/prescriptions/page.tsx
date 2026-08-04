import type { Metadata } from "next";
import Image from "next/image";
import {
  GpAction,
  GpCallout,
  GpPageHero,
  GpReviewDate,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { loadGpContent } from "@/lib/cms";

export const metadata: Metadata = { title: "Repeat prescriptions" };

export default function PrescriptionsPage() {
  const { prescriptions, practice } = loadGpContent();

  return (
    <>
      <GpPageHero
        title="Repeat prescriptions"
        lede="Order in under a minute with the NHS App — no phone queue, and your request goes straight to the right person."
      />

      <GpSection>
        <h2 className="sr-only">How repeat prescriptions work</h2>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          <ol className="divide-y divide-[var(--dgp-line)]">
            {prescriptions.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dgp-blue)] text-lg font-bold text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="pt-1 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1.5 max-w-[560px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Image
            src="/demos/gp/gp-pharmacy.jpg"
            alt="Blister packs of prescription tablets"
            width={760}
            height={507}
            className="hidden rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)] lg:block"
          />
        </div>
        <div className="mt-8">
          <GpAction href="https://www.nhs.uk/nhs-app/">
            Order in the NHS App
          </GpAction>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight">
              Medicine reviews
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              Most repeat medicines need a review once a year. When yours is
              due, a message appears with your prescription and we will invite
              you to book — usually a telephone appointment with the practice
              pharmacist.
            </p>
          </div>
          <div>
            <h2 className="text-[20px] font-bold tracking-tight">
              Urgent requests
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              If you have run out of essential medicine, call the surgery on{" "}
              <a href={practice.phoneHref} className="font-semibold text-[var(--dgp-blue)] underline">
                {practice.phone}
              </a>{" "}
              before 3pm. When the surgery is closed, NHS 111 can arrange an
              emergency supply.
            </p>
          </div>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <GpCallout title="Going away?">
          Order no more than seven days before you travel and tell us the date
          you leave — we will make sure the prescription is ready in time.
        </GpCallout>
        <GpReviewDate reviewed={prescriptions.reviewed} />
      </GpSection>
    </>
  );
}
