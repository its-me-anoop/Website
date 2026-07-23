import type { Metadata } from "next";
import Image from "next/image";
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
        <figure>
          <Image
            src="/demos/gp/gp-team.jpg"
            alt="Doctors and nurses from a practice team standing together in a corridor"
            width={1580}
            height={1280}
            className="max-h-[340px] w-full rounded-md object-cover object-[50%_22%] shadow-[0_2px_0_var(--dgp-line)]"
          />
          <figcaption className="mt-2 text-sm text-[var(--dgp-ink-soft)]">
            Illustrative photograph — not the people named below. A real
            build uses your own staff photography.
          </figcaption>
        </figure>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {team.map((group) => (
            <section key={group.group}>
              <h2 className="border-b-2 border-[var(--dgp-blue)] pb-2 text-lg font-bold">
                {group.group}
              </h2>
              <ul className="divide-y divide-[var(--dgp-line)]">
                {group.members.map(([name, role]) => (
                  <li key={name} className="py-3">
                    <p className="text-base font-semibold">{name}</p>
                    <p className="mt-0.5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                      {role}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </GpSection>

      <GpSection pad="flush">
        <div className="rounded-md bg-[var(--dgp-tint)] p-6 sm:p-8">
          <h2 className="text-[20px] font-bold tracking-tight">
            Why you might not see a GP
          </h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            Our reception team are trained care navigators. When you tell them
            briefly what you need, they can book you with the physiotherapist
            for joint pain, the pharmacist for medication questions, or the
            nursing team for reviews — usually sooner than a GP appointment,
            and with the person best qualified to help. Anything they hear is
            treated with the same confidentiality as the consulting room.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            See what each service covers on our{" "}
            <Link href="/demo/gp-practice/services" className="text-[var(--dgp-blue)] underline">
              services &amp; clinics
            </Link>{" "}
            page.
          </p>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <h2 className="text-[20px] font-bold tracking-tight">
          GP average earnings
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          NHS England requires practices to publish the mean earnings of GPs
          working here. For the last financial year this was £74,600 for the
          practice&rsquo;s GPs (sample figure for demonstration — a real site
          publishes the practice&rsquo;s actual declaration).
        </p>
      </GpSection>
    </>
  );
}
