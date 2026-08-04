import type { Metadata } from "next";
import { DentalPageHero, DentalReviewDate, DentalSection } from "@/components/demos/dental/DentalShell";
import { earlierReviewedDate, loadDentalContent } from "@/lib/cms/dental";

export const metadata: Metadata = { title: "About, team & complaints" };

export default function AboutPage() {
  const { practice, team, complaints } = loadDentalContent();

  return (
    <>
      <DentalPageHero
        title="About, team & complaints"
        lede={`${practice.name} is a mixed NHS and private practice at ${practice.address}. Here's who treats you, how we're regulated, and what to do if something goes wrong.`}
        crumb="About & team"
      />

      {/* Team */}
      <DentalSection>
        <h2 className="text-2xl font-bold tracking-tight">Our team</h2>
        <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          Every dentist and dental care professional in the UK must be
          registered with the General Dental Council (GDC). You can verify
          any registrant yourself on the GDC&rsquo;s public register — the numbers
          below are samples for this demonstration site.
        </p>
        <div className="mt-8 space-y-10">
          {team.groups.map((group) => (
            <div key={group.group}>
              <h3 className="text-lg font-bold">{group.group}</h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {group.members.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-5"
                  >
                    <p className="text-lg font-bold">{member.name}</p>
                    <p className="text-base text-[var(--ddt-ink-soft)]">{member.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ddt-ink-soft)]">
                      {member.qualifications} — qualified in {member.countryOfQualification}
                    </p>
                    <p className="mt-2 text-sm text-[var(--ddt-ink-soft)]">
                      {member.gdcNumber} <span className="italic">({member.gdcSampleNote})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DentalSection>

      {/* Regulation & ratings */}
      <div className="bg-[var(--ddt-sand)]">
        <DentalSection pad="spacious">
          <h2 className="text-2xl font-bold tracking-tight">Regulation & ratings</h2>
          <div className="mt-5 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold">General Dental Council</h3>
              <p className="mt-1.5 max-w-[45ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                We are regulated by the General Dental Council (GDC), the UK
                regulator for dental professionals. Every clinician listed
                above holds current GDC registration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Care Quality Commission</h3>
              <p className="mt-1.5 max-w-[45ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
                {practice.cqc.ratingText}. You can search the CQC&rsquo;s public
                register for any dental practice.{" "}
                <span className="italic">({practice.cqc.sampleNote})</span>
              </p>
              <p className="mt-2">
                <a
                  href={practice.cqc.reportUrl}
                  className="text-base font-semibold text-[var(--ddt-petrol)] underline"
                >
                  cqc.org.uk
                </a>
              </p>
            </div>
          </div>
        </DentalSection>
      </div>

      {/* Complaints */}
      <DentalSection pad="spacious">
        <h2 className="text-2xl font-bold tracking-tight">How to complain</h2>
        <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          {complaints.intro}
        </p>
        <p className="mt-4 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          {complaints.practiceStep}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-6">
            <h3 className="text-lg font-bold">If your treatment was on the NHS</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {complaints.nhsRoute.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {complaints.nhsRoute.escalation}
            </p>
          </div>
          <div className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-6">
            <h3 className="text-lg font-bold">If your treatment was private</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {complaints.privateRoute.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
              {complaints.privateRoute.escalation}
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-[70ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
          {complaints.gdcNote}
        </p>

        <DentalReviewDate reviewed={earlierReviewedDate(team.reviewed, complaints.reviewed)} />
      </DentalSection>
    </>
  );
}
