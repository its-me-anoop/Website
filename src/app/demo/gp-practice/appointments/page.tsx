import type { Metadata } from "next";
import Image from "next/image";
import {
  GpAction,
  GpCallout,
  GpCareCard,
  GpPageHero,
  GpSampleNote,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { practice } from "@/components/demos/gp/data";

export const metadata: Metadata = { title: "Appointments" };

const routes = [
  {
    title: "Book online",
    copy: "Use the NHS App or NHS website to book routine appointments at a time that suits you — no phone queue, available day and night.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 16h4"
      />
    ),
  },
  {
    title: "Call the surgery",
    copy: `Call ${practice.phone} from 8:00am. Tell reception briefly what the problem is — they will make sure the most suitable person sees you.`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5c0 8.3 6.7 15 15 15l2-4-4.5-2-2 2c-2.8-1.4-5.1-3.7-6.5-6.5l2-2L8 3 4 5Z"
      />
    ),
  },
  {
    title: "Tell us your symptoms online",
    copy: "Fill in a short online form and a doctor or nurse will review it and reply within one working day with the right next step.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16v11H8l-4 4V5Zm4 4h8m-8 3h5"
      />
    ),
  },
] as const;

export default function AppointmentsPage() {
  return (
    <>
      <GpPageHero
        title="Appointments"
        lede="Three ways to get care — choose whichever suits you. Every request is reviewed so you are seen by the right person, first time."
      />

      <GpSection>
        <h2 className="sr-only">Ways to get an appointment</h2>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-[var(--dgp-line)]">
            {routes.map((route) => (
              <div key={route.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mt-1 h-8 w-8 shrink-0 fill-none stroke-[var(--dgp-blue)] stroke-[1.75]"
                >
                  {route.icon}
                </svg>
                <div>
                  <h3 className="text-lg font-bold">{route.title}</h3>
                  <p className="mt-1.5 max-w-[560px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    {route.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Image
            src="/demos/gp/gp-consultation.jpg"
            alt="A GP talking through notes with a patient in a consulting room"
            width={760}
            height={507}
            className="hidden rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)] lg:block"
          />
        </div>
        <div className="mt-8">
          <GpAction href="https://www.nhs.uk/nhs-app/">
            Book with the NHS App
          </GpAction>
        </div>
      </GpSection>

      {/* Urgent care, in the NHS care-card hierarchy */}
      <GpSection pad="flush">
        <h2 className="text-2xl font-bold tracking-tight">
          Urgent appointments for today
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Call us on{" "}
          <a href={practice.phoneHref} className="font-semibold text-[var(--dgp-blue)] underline">
            {practice.phone}
          </a>{" "}
          at 8:00am. Urgent requests are looked at first, and we keep
          appointments free every day for problems that cannot wait.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <GpCareCard variant="urgent" title="Ask for an urgent appointment today if:">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>a baby or young child is unwell and you are worried</li>
              <li>you have new pain that is getting rapidly worse</li>
              <li>a long-term condition has suddenly worsened</li>
              <li>you have a temperature that will not come down</li>
            </ul>
          </GpCareCard>
          <GpCareCard variant="emergency" title="Call 999 or go to A&E now if:">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>you have signs of a heart attack or stroke</li>
              <li>you have severe difficulty breathing</li>
              <li>you have heavy bleeding that will not stop</li>
              <li>someone has seriously injured themselves or taken an overdose</li>
            </ul>
          </GpCareCard>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <div id="online" className="scroll-mt-6 rounded-md bg-[var(--dgp-tint)] p-6 sm:p-8">
          <h2 className="text-[20px] font-bold tracking-tight">
            Request an appointment online
          </h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            Not sure you need an appointment? Describe your symptoms online and
            we will point you to the right care — an appointment, a pharmacy,
            self-care advice or a prescription. Forms submitted before 3:00pm
            on a working day are reviewed the same day.
          </p>
          <div className="mt-4 max-w-[680px]">
            <GpCareCard variant="urgent" title="Urgent problems: do not use the online form">
              Call us on{" "}
              <a href={practice.phoneHref} className="font-semibold text-[var(--dgp-blue)] underline">
                {practice.phone}
              </a>
              , contact NHS 111 when we are closed, or call 999 in a
              life-threatening emergency.
            </GpCareCard>
          </div>
          <GpSampleNote>
            Sample site — on a live build this links to the practice&rsquo;s
            online consultation form.
          </GpSampleNote>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <div className="grid gap-8 lg:grid-cols-2">
          <div id="results" className="scroll-mt-6">
            <h2 className="text-[20px] font-bold tracking-tight">
              Test results
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              Results appear in the NHS App as soon as they are checked. If a
              result needs a follow-up, we will contact you — you do not need
              to call. If you would still like to talk a result through, book
              a telephone appointment.
            </p>
          </div>
          <div id="fit-note" className="scroll-mt-6">
            <h2 className="text-[20px] font-bold tracking-tight">
              Sick (fit) notes
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              If you have been off work for more than seven days, request a
              sick note online without booking an appointment. First-time
              requests for an ongoing problem may need a telephone review
              first.
            </p>
          </div>
        </div>
      </GpSection>

      <GpSection pad="flush">
        <GpCallout title="Can't make your appointment?">
          Please cancel as early as you can — online, or by calling{" "}
          {practice.phone}. Every cancelled slot is offered to another patient
          the same day.
        </GpCallout>
      </GpSection>
    </>
  );
}
