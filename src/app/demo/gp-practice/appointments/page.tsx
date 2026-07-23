import type { Metadata } from "next";
import {
  GpAction,
  GpCallout,
  GpPageHero,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { practice } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Appointments" };

const routes = [
  {
    title: "Book online",
    copy: "Use the NHS App or NHS website to book routine appointments at a time that suits you — no phone queue, available day and night.",
  },
  {
    title: "Call the surgery",
    copy: `Call ${practice.phone} from 8:00am. Urgent same-day appointments are triaged by a clinician, so please tell reception briefly what the problem is.`,
  },
  {
    title: "Tell us your symptoms online",
    copy: "Fill in a short online form and a clinician will review it and reply within one working day with the right next step.",
  },
] as const;

export default function AppointmentsPage() {
  return (
    <>
      <GpPageHero
        title="Appointments"
        lede="Three ways to get care — choose whichever suits you. Every request is reviewed by a clinician so you are seen by the right person, first time."
      />

      <GpSection>
        <div className="grid gap-4 md:grid-cols-3">
          {routes.map((route) => (
            <div
              key={route.title}
              className="rounded-md border border-[var(--dgp-line)] bg-white p-5"
            >
              <h2 className="text-[17px] font-bold">{route.title}</h2>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
                {route.copy}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <GpAction href="https://www.nhs.uk/nhs-app/">
            Book with the NHS App
          </GpAction>
        </div>
      </GpSection>

      <GpSection className="pt-0">
        <div id="online" className="scroll-mt-6 rounded-md bg-[var(--dgp-tint)] p-6 sm:p-8">
          <h2 className="text-[20px] font-bold tracking-tight">
            Online consultations
          </h2>
          <p className="mt-2 max-w-[680px] text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
            Not sure you need an appointment? Describe your symptoms online and
            we will point you to the right care — an appointment, a pharmacy,
            self-care advice or a prescription. Forms submitted before 3:00pm
            on a working day are reviewed the same day.
          </p>
          <p className="mt-3 max-w-[680px] rounded-md border-l-8 border-[var(--dgp-red)] bg-white p-4 text-[15px] font-semibold leading-relaxed">
            Do not use the online form for urgent problems. Call us on{" "}
            <a href={practice.phoneHref} className="text-[var(--dgp-blue)] underline">
              {practice.phone}
            </a>
            , contact NHS 111 when we are closed, or call 999 in a
            life-threatening emergency.
          </p>
          <p className="mt-3 text-[14px] text-[var(--dgp-ink-soft)]">
            (This is a sample website, so the form itself is not live.)
          </p>
        </div>
      </GpSection>

      <GpSection className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div id="results" className="scroll-mt-6">
            <h2 className="text-[20px] font-bold tracking-tight">
              Test results
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
              Results appear in the NHS App as soon as they are checked. If a
              result needs a follow-up, we will contact you — you do not need
              to call. If you would still like to talk a result through, book
              a telephone appointment.
            </p>
          </div>
          <div id="fit-note" className="scroll-mt-6">
            <h2 className="text-[20px] font-bold tracking-tight">Fit notes</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
              If you have been off work for more than seven days, request a fit
              note online without booking an appointment. First-time requests
              for an ongoing problem may need a telephone review first.
            </p>
          </div>
        </div>
      </GpSection>

      <GpSection className="pt-0">
        <GpCallout title="Can't make your appointment?">
          Please cancel as early as you can — online, or by calling{" "}
          {practice.phone}. Every cancelled slot is offered to another patient
          the same day.
        </GpCallout>
      </GpSection>
    </>
  );
}
