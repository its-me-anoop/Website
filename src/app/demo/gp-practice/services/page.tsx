import type { Metadata } from "next";
import Link from "next/link";
import {
  GpCallout,
  GpPageHero,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { selfReferral, serviceGroups } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Services & clinics" };

export default function ServicesPage() {
  return (
    <>
      <GpPageHero
        title="Services & clinics"
        lede="Most of the care you need happens right here at the surgery — run by our nursing team, clinical pharmacist and wider practice team alongside the GPs."
      />

      <GpSection>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-md border border-[var(--dgp-line)] bg-white p-5"
            >
              <h2 className="text-[17px] font-bold">{group.title}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-[680px] text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
          Clinic appointments are booked the same way as any other —{" "}
          <Link href="/demo/gp-practice/appointments" className="text-[var(--dgp-blue)] underline">
            online, by phone or through the NHS App
          </Link>
          . We will invite you by text when a review or screening is due.
        </p>
      </GpSection>

      {/* Direct-access services */}
      <div className="bg-[var(--dgp-tint)]">
        <GpSection>
          <h2 className="text-[22px] font-bold tracking-tight">
            Help you can get without a GP appointment
          </h2>
          <p className="mt-2 max-w-[680px] text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
            You can refer yourself directly to these services — often faster
            than waiting to see a GP first.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {selfReferral.map((service) => (
              <div
                key={service.title}
                className="rounded-md border border-[var(--dgp-line)] bg-white p-5"
              >
                <h3 className="text-[16.5px] font-bold text-[var(--dgp-blue)]">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
                  {service.copy}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-[var(--dgp-ink-soft)]">
            Reception can give you the contact details for each of these — or
            find them on the NHS website.
          </p>
        </GpSection>
      </div>

      <GpSection>
        <GpCallout title="Not sure which service you need?">
          Tell us your symptoms online or call reception — our care navigators
          are trained to get you to the right clinician or service first time,
          which is often not a GP.
        </GpCallout>
      </GpSection>
    </>
  );
}
