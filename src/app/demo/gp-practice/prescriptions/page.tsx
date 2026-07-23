import type { Metadata } from "next";
import {
  GpAction,
  GpCallout,
  GpPageHero,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { practice } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Repeat prescriptions" };

const steps = [
  {
    title: "1. Order",
    copy: "Order through the NHS App, or drop your repeat slip into the box at reception. We do not take orders by phone — it keeps the lines free for people who need to talk to us.",
  },
  {
    title: "2. We process it",
    copy: "Allow two full working days. Your usual GP reviews anything unusual before it is signed off.",
  },
  {
    title: "3. Collect",
    copy: "Collect from your nominated pharmacy. You can change your nomination at any time in the NHS App.",
  },
] as const;

export default function PrescriptionsPage() {
  return (
    <>
      <GpPageHero
        title="Repeat prescriptions"
        lede="Order in under a minute with the NHS App — no phone queue, and your request goes straight to the right person."
      />

      <GpSection>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.title}
              className="rounded-md border border-[var(--dgp-line)] bg-white p-5"
            >
              <h2 className="text-[17px] font-bold text-[var(--dgp-blue)]">
                {step.title}
              </h2>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <GpAction href="https://www.nhs.uk/nhs-app/">
            Order in the NHS App
          </GpAction>
        </div>
      </GpSection>

      <GpSection className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight">
              Medication reviews
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
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
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
              If you have run out of essential medicine, call the surgery on{" "}
              <a href={practice.phoneHref} className="font-semibold text-[var(--dgp-blue)] underline">
                {practice.phone}
              </a>{" "}
              before 3:00pm. When the surgery is closed, NHS 111 can arrange an
              emergency supply.
            </p>
          </div>
        </div>
      </GpSection>

      <GpSection className="pt-0">
        <GpCallout title="Going away?">
          Order no more than seven days before you travel and tell us the date
          you leave — we will make sure the prescription is ready in time.
        </GpCallout>
      </GpSection>
    </>
  );
}
