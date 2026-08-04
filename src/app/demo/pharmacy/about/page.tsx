import type { Metadata } from "next";
import Link from "next/link";
import {
  PharmacyPageHero,
  PharmacyReviewDate,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export const metadata: Metadata = { title: "About & our team" };

export default function AboutPage() {
  const { pharmacy, team } = loadPharmacyContent();

  return (
    <>
      <PharmacyPageHero
        title="About & our team"
        lede={pharmacy.establishedCopy}
      />

      <PharmacySection>
        <h2 className="text-2xl font-bold tracking-tight">Our team</h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          Willowbrook Pharmacy is registered with the General Pharmaceutical
          Council (GPhC), the regulator for pharmacies and pharmacy
          professionals across Great Britain. Every member of our team named
          below works under that registration, and you can check any
          pharmacy professional&rsquo;s status on the GPhC&rsquo;s public
          register at any time — we&rsquo;d always rather you checked than
          took our word for it.
        </p>

        <div className="mt-8 divide-y divide-[var(--dph-line)] rounded-xl border border-[var(--dph-line)] bg-white">
          {team.members.map((member) => (
            <div key={member.name} className="p-5">
              <p className="text-base font-bold">
                {member.name}
                {member.gphcNumber ? (
                  <span className="ml-2 font-normal text-sm text-[var(--dph-ink-soft)]">
                    GPhC {member.gphcNumber} (sample)
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-base font-semibold text-[var(--dph-green)]">
                {member.role}
              </p>
              <p className="mt-1.5 max-w-[620px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </PharmacySection>

      <div className="bg-[var(--dph-mint)]">
        <PharmacySection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">Our consultation room</h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
            {pharmacy.consultationRoomCopy}
          </p>
        </PharmacySection>
      </div>

      <PharmacySection>
        <h2 className="text-2xl font-bold tracking-tight">
          What is the Responsible Pharmacist?
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          {team.responsiblePharmacistExplainer}
        </p>
        <p className="mt-4 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          We work closely with{" "}
          <Link href="/demo/gp-practice" className="text-[var(--dph-green)] underline">
            Willowbrook Surgery
          </Link>{" "}
          two doors along — many of our regulars are nominated straight to
          us the moment their GP issues a repeat.
        </p>
        <PharmacyReviewDate reviewed={team.reviewed} />
      </PharmacySection>
    </>
  );
}
