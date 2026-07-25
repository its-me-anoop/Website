import type { Metadata } from "next";
import Link from "next/link";
import {
  GpCareCard,
  GpPageHero,
  GpSampleNote,
  GpSection,
} from "@/components/demos/gp/GpShell";
import { GpTriageDemo } from "@/components/demos/gp/GpTriageDemo";
import {
  digitalTools,
  practice,
  triageAlternatives,
  triageNotFor,
  triageSteps,
  triageUses,
} from "@/components/demos/gp/data";

export const metadata: Metadata = {
  title: "Get help online",
  description:
    "How to ask Willowbrook Surgery for help online: what happens to your request, how quickly we reply, and what to do instead if your problem is urgent.",
};

export default function OnlineConsultationPage() {
  return (
    <>
      <GpPageHero
        title="Get help online"
        crumb="Get help online"
        lede="Tell us what you need and a GP will read it — usually the same day. Open from 8:00am to 6:30pm every working day, so there is no need to ring at eight."
      />

      {/* The form itself, working, first: everything below explains it. */}
      <GpSection className="pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Start an online request
            </h2>
            <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              About three minutes, on a phone or a computer. You do not need an
              NHS login, and someone else can fill it in for you.
            </p>
            <div className="mt-5">
              <GpTriageDemo />
            </div>
          </div>

          <aside className="rounded-[var(--dgp-radius)] border border-[var(--dgp-line)] bg-[var(--dgp-tint)] p-5 sm:p-6">
            <p className="flex flex-wrap items-center gap-x-2 text-base">
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--dgp-green)]"
              />
              <strong className="font-bold">Open now</strong>
            </p>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              Requests are accepted from 8:00am to 6:30pm, Monday to Friday —
              the whole time the surgery is open, not just first thing.
            </p>
            <hr className="my-4 border-[var(--dgp-line)]" />
            <p className="text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              There is nothing to save and come back to — each request is
              short enough to finish in one go, and nothing times out while
              you are filling it in.
            </p>
            <GpSampleNote>
              Sample site — this form sends nothing and saves nothing.
            </GpSampleNote>
          </aside>
        </div>
      </GpSection>

      {/* Urgent problems must leave this route immediately. */}
      <GpSection pad="flush">
        <GpCareCard variant="urgent" title="Do not use this form if it is urgent">
          <p>
            An online request is read during opening hours, so it is not the
            way to get help quickly. Call us on{" "}
            <a
              href={practice.phoneHref}
              className="font-semibold text-[var(--dgp-blue)] underline"
            >
              {practice.phone}
            </a>
            , or use NHS 111 when we are closed.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {triageNotFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </GpCareCard>
      </GpSection>

      {/* The journey, as an ordered list — it is a sequence. */}
      <GpSection id="how-it-works" className="scroll-mt-6" pad="flush">
        <h2 className="text-2xl font-bold tracking-tight">What happens next</h2>
        <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Every request goes to the same place, whether you send it yourself,
          ring us, or come to the desk. A clinician decides what happens — not
          a computer, and not whoever answered the phone.
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {triageSteps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-[var(--dgp-radius)] border border-[var(--dgp-line)] bg-white p-5 shadow-[0_2px_0_var(--dgp-line)]"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dgp-blue)] text-base font-bold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug">
                {step.title}
              </h3>
              <p className="mt-1.5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </GpSection>

      <GpSection pad="flush">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              What you can use it for
            </h2>
            <ul className="mt-4 space-y-2.5">
              {triageUses.map((use) => (
                <li key={use} className="flex gap-3 text-base leading-relaxed">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="mt-1 h-5 w-5 shrink-0 fill-none stroke-[var(--dgp-green)] stroke-[2.5]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div id="reply" className="scroll-mt-6">
            <h2 className="text-2xl font-bold tracking-tight">
              How we reply
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              You will get a text from the surgery, and the same message in the
              NHS App. Most people hear back the same working day, and always
              by the end of the next one.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              Some replies include a secure link — to answer a few more
              questions, to send a photo of a rash or a wound, or to book
              yourself into a clinic. The link only works for you and expires
              after a week.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              Tell us if a text will not reach you and we will phone or write
              instead.{" "}
              <Link
                href="/demo/gp-practice/contact#access"
                className="text-[var(--dgp-blue)] underline"
              >
                We record how you would like to be contacted
              </Link>
              .
            </p>
          </div>
        </div>
      </GpSection>

      {/* No-one is pushed online. */}
      <GpSection pad="flush">
        <div className="rounded-[var(--dgp-radius)] border border-[var(--dgp-line)] bg-[var(--dgp-tint)] p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            If you would rather not do this online
          </h2>
          <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            You will not wait longer and you will not be sent to the back of
            any queue. Ring{" "}
            <a
              href={practice.phoneHref}
              className="font-semibold text-[var(--dgp-blue)] underline"
            >
              {practice.phone}
            </a>{" "}
            and reception will fill in exactly the same form with you, or call
            at the desk and we will do it there — in private if you would
            prefer. A family member, friend or carer can also send a request on
            your behalf.
          </p>
        </div>
      </GpSection>

      {/* The tooling, named — patients arriving from a text need to
          recognise the name in it. */}
      <div className="bg-[var(--dgp-tint)]">
        <GpSection>
          <h2 className="text-2xl font-bold tracking-tight">
            The systems we use
          </h2>
          <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
            If you get a text from us with a link in it, this is where it comes
            from. Nothing here costs you anything, and none of it needs an app
            beyond the NHS App itself.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {digitalTools.map((tool) => (
              <li
                key={tool.name}
                className="rounded-[var(--dgp-radius)] border border-[var(--dgp-line)] bg-white p-5 shadow-[0_2px_0_var(--dgp-line)]"
              >
                <h3 className="text-lg font-bold leading-snug">
                  {tool.external ? (
                    <a
                      href={tool.href}
                      className="text-[var(--dgp-blue)] underline underline-offset-2"
                    >
                      {tool.name}
                    </a>
                  ) : (
                    <Link
                      href={tool.href}
                      className="text-[var(--dgp-blue)] underline underline-offset-2"
                    >
                      {tool.name}
                    </Link>
                  )}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[var(--dgp-ink-soft)]">
                  {tool.role}
                </p>
                <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                  {tool.copy}
                </p>
              </li>
            ))}
          </ul>
          <GpSampleNote>
            Sample site — a live build names whichever tools the practice
            actually uses: {triageAlternatives.join(", ")} and others all fit
            this same page.
          </GpSampleNote>
        </GpSection>
      </div>
    </>
  );
}
