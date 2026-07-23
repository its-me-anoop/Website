import type { Metadata } from "next";
import Link from "next/link";
import { GpPageHero, GpSection } from "@/components/demos/gp/GpShell";
import { team } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Our team" };

export default function TeamPage() {
  return (
    <>
      <GpPageHero
        title="Our team"
        lede="General practice is a team effort. Alongside our GPs, a wider clinical team means you are often seen faster — by the person best placed to help."
      />

      <GpSection>
        <div className="grid gap-4 md:grid-cols-2">
          {team.map((group) => (
            <div
              key={group.group}
              className="rounded-md border border-[var(--dgp-line)] bg-white p-5"
            >
              <h2 className="text-[17px] font-bold">{group.group}</h2>
              <ul className="mt-3 space-y-3">
                {group.members.map(([name, role]) => (
                  <li key={name} className="border-b border-[var(--dgp-line)] pb-3 last:border-b-0 last:pb-0">
                    <p className="text-[15.5px] font-semibold">{name}</p>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-[var(--dgp-ink-soft)]">
                      {role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-[680px] text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
          (Team members shown are fictional — on a real site this page carries
          photographs and the practice&rsquo;s actual staff.)
        </p>
      </GpSection>

      <GpSection className="pt-0">
        <div className="rounded-md bg-[var(--dgp-tint)] p-6 sm:p-8">
          <h2 className="text-[20px] font-bold tracking-tight">
            Why you might not see a GP
          </h2>
          <p className="mt-2 max-w-[680px] text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
            Our reception team are trained care navigators. When you tell them
            briefly what you need, they can book you with the physiotherapist
            for joint pain, the pharmacist for medication questions, or the
            nursing team for reviews — usually sooner than a GP appointment,
            and with the person best qualified to help. Anything they hear is
            treated with the same confidentiality as the consulting room.
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
            See what each service covers on our{" "}
            <Link href="/demo/gp-practice/services" className="text-[var(--dgp-blue)] underline">
              services &amp; clinics
            </Link>{" "}
            page.
          </p>
        </div>
      </GpSection>

      <GpSection className="pt-0">
        <h2 className="text-[20px] font-bold tracking-tight">
          GP average earnings
        </h2>
        <p className="mt-2 max-w-[680px] text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
          NHS England requires practices to publish the mean earnings of GPs
          working here. For the last financial year this was £74,600 for the
          practice&rsquo;s GPs (sample figure for demonstration — a real site
          publishes the practice&rsquo;s actual declaration).
        </p>
      </GpSection>
    </>
  );
}
