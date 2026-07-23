import type { Metadata } from "next";
import Image from "next/image";
import {
  GpPageHero,
  GpSampleNote,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { openingTimes, practice } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Contact & opening times" };

export default function ContactPage() {
  return (
    <>
      <GpPageHero
        title="Contact & opening times"
        lede="How to reach us, when we're open, and how to register with the practice."
      />

      <GpSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight">Contact us</h2>
            <ul className="mt-3 space-y-2 text-base leading-relaxed">
              <li>
                <strong>Telephone:</strong>{" "}
                <a href={practice.phoneHref} className="text-[var(--dgp-blue)] underline">
                  {practice.phone}
                </a>{" "}
                <span className="text-[var(--dgp-ink-soft)]">
                  (lines open 8:00am – 6:30pm, Monday to Friday)
                </span>
              </li>
              <li>
                <strong>Address:</strong>{" "}
                <span className="text-[var(--dgp-ink-soft)]">{practice.address}</span>
              </li>
            </ul>

            <h2 className="mt-9 text-[20px] font-bold tracking-tight">
              Getting here
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              <li>Free patient parking, including four accessible bays by the door</li>
              <li>Step-free access throughout the ground floor</li>
              <li>Hearing loop at reception — just ask</li>
              <li>The number 12 bus stops directly outside</li>
            </ul>

            <figure className="mt-8">
              <Image
                src="/demos/gp/gp-reception.jpg"
                alt="A receptionist welcoming a patient at the surgery front desk"
                width={760}
                height={507}
                className="rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)]"
              />
              <figcaption className="mt-2 text-sm text-[var(--dgp-ink-soft)]">
                Our reception team can help with anything on this page.
              </figcaption>
            </figure>
          </div>

          <div>
            <h2 className="text-[20px] font-bold tracking-tight">
              Opening times
            </h2>
            <table className="mt-3 w-full border-collapse text-base">
              <caption className="sr-only">
                Surgery opening times by day of the week
              </caption>
              <tbody>
                {openingTimes.map(([day, hours]) => (
                  <tr key={day} className="border-b border-[var(--dgp-line)]">
                    <th scope="row" className="py-2.5 pr-4 text-left font-semibold">
                      {day}
                    </th>
                    <td className="py-2.5 text-[var(--dgp-ink-soft)]">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm leading-relaxed text-[var(--dgp-ink-soft)]">
              When we are closed, call NHS 111 or visit 111.nhs.uk. In a
              life-threatening emergency, always call 999.
            </p>
          </div>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <div id="register" className="scroll-mt-6 rounded-md bg-[var(--dgp-tint)] p-6 sm:p-8">
          <h2 className="text-[20px] font-bold tracking-tight">
            Register as a new patient
          </h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            If you live in our catchment area, we would be glad to have you.
            Registration is done online in about ten minutes — you do not need
            proof of address or immigration status, and you do not need to
            visit the surgery. Your medical records transfer automatically
            from your previous practice.
          </p>
          <GpSampleNote>
            Sample site — on a live build this links to the practice&rsquo;s
            online registration form.
          </GpSampleNote>
        </div>
      </GpSection>
    </>
  );
}
