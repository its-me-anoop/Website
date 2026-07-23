import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {serviceGroups.map((group, i) => (
              <div
                key={group.title}
                className={i === 0 ? "" : "mt-8 border-t border-[var(--dgp-line)] pt-8"}
              >
                <h2 className="text-lg font-bold">{group.title}</h2>
                <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-base leading-relaxed text-[var(--dgp-ink-soft)] sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 fill-none stroke-[var(--dgp-green)] stroke-[2.5]"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <figure className="hidden lg:block">
            <Image
              src="/demos/gp/gp-nurse.jpg"
              alt="A practice nurse checking a patient's blood pressure in a clinic room"
              width={760}
              height={507}
              className="rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)]"
            />
            <figcaption className="mt-2 text-sm text-[var(--dgp-ink-soft)]">
              Nurse-led clinics run every weekday.
            </figcaption>
          </figure>
        </div>
        <p className="mt-8 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Clinic appointments are booked the same way as any other —{" "}
          <Link href="/demo/gp-practice/appointments" className="text-[var(--dgp-blue)] underline">
            online, by phone or through the NHS App
          </Link>
          . We will invite you by text when a review or screening is due.
        </p>
      </GpSection>

      {/* Direct-access services */}
      <div className="bg-[var(--dgp-tint)]">
        <GpSection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">
            Help you can get without a GP appointment
          </h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            You can refer yourself directly to these services — often faster
            than waiting to see a GP first.
          </p>
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[380px_1fr]">
            <figure className="hidden lg:block">
              <Image
                src="/demos/gp/gp-physio.jpg"
                alt="A physiotherapist assessing a patient's leg during a session"
                width={760}
                height={507}
                className="rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)]"
              />
              <figcaption className="mt-2 text-sm text-[var(--dgp-ink-soft)]">
                Joint or muscle problem? Book the physiotherapist directly.
              </figcaption>
            </figure>
            <div className="divide-y divide-[var(--dgp-line)]">
              {selfReferral.map((service) => (
                <div key={service.title} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="mt-1 max-w-[620px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    {service.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm text-[var(--dgp-ink-soft)]">
            Reception can give you the contact details for each of these — or
            find them on the NHS website.
          </p>
        </GpSection>
      </div>

      <GpSection>
        <GpCallout title="Not sure which service you need?">
          Tell us your symptoms online or call reception — our care navigators
          are trained to get you to the right person or service first time,
          which is often not a GP.
        </GpCallout>
      </GpSection>
    </>
  );
}
