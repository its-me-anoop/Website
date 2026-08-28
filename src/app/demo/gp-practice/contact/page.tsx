import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GpPageHero,
  GpReviewDate,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { loadGpContent } from "@/lib/cms";

export const metadata: Metadata = { title: "Contact & opening times" };

export default function ContactPage() {
  const { practice } = loadGpContent();

  return (
    <>
      <GpPageHero
        title="Contact & opening times"
        lede="How to reach us, when we're open, and how to find the surgery."
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
                  (lines open 8am to 6:30pm, Monday to Friday)
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
              {practice.access.map((note) => (
                <li key={note}>{note}</li>
              ))}
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
                {practice.openingTimes.map(({ day, hours }) => (
                  <tr key={day} className="border-b border-[var(--dgp-line)]">
                    <th scope="row" className="py-2.5 pr-4 text-left font-semibold">
                      {day}
                    </th>
                    <td className="py-2.5 text-[var(--dgp-ink-soft)]">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-6 text-lg font-bold">
              Evening and Saturday appointments
            </h3>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              {practice.enhancedAccess}
            </p>

            <h3 className="mt-6 text-lg font-bold">When we are closed</h3>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              {practice.outOfHours}
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
            Joining the surgery takes about ten minutes online — no proof of
            address, no ID, no visit needed. Check you live in our practice
            area and start on the registration page.
          </p>
          <p className="mt-3">
            <Link
              href="/demo/gp-practice/register"
              className="text-base font-semibold text-[var(--dgp-blue)] underline"
            >
              Register with the surgery
            </Link>
          </p>
        </div>
        <GpReviewDate reviewed={practice.reviewed} />
      </GpSection>
    </>
  );
}
