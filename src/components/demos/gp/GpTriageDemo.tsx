"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { practice } from "./data";

/* ─────────────────────────────────────────────────────────────
   A working online-consultation form.

   Practices are sold triage tooling on the promise that patients
   will use it, and then shown a screenshot. This is the actual
   journey — the shape every supplier's form takes: what do you
   need, who is it for, tell us about it, here is what happens
   next. It submits nothing and stores nothing.

   Accessibility is the point of the exercise, so: one question
   per step in a real fieldset, focus moved to the new legend on
   every change, the step count announced politely, a back button
   that never loses an answer, and no time limit.
   ───────────────────────────────────────────────────────────── */

const needs = [
  {
    id: "medical",
    label: "A new or ongoing health problem",
    hint: "Symptoms, a condition that has changed, or something you are worried about",
  },
  {
    id: "fit-note",
    label: "A sick (fit) note",
    hint: "For your employer, or to extend one you already have",
  },
  {
    id: "results",
    label: "A test result",
    hint: "To ask what a result means, or when one is due",
  },
  {
    id: "medication",
    label: "Something about my medication",
    hint: "A question for the pharmacist, or a change to a repeat",
  },
  {
    id: "admin",
    label: "Admin — a letter, form or referral",
    hint: "Including hospital letters and insurance forms",
  },
] as const;

const whoFor = [
  { id: "me", label: "Me", hint: "You are registered at the practice" },
  {
    id: "child",
    label: "My child",
    hint: "Under 16 and registered here",
  },
  {
    id: "someone",
    label: "Someone I care for",
    hint: "You have their permission to contact us on their behalf",
  },
] as const;

const durations = [
  "Today",
  "Less than a week",
  "One to four weeks",
  "More than a month",
] as const;

type Answers = {
  need?: string;
  who?: string;
  duration?: string;
  detail: string;
};

const TOTAL = 3;

export function GpTriageDemo() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ detail: "" });
  const [error, setError] = useState<string | null>(null);
  const legendRef = useRef<HTMLElement>(null);
  const moved = useRef(false);
  const baseId = useId();

  /* Focus follows the question. Without this a screen-reader user is
     left where the old question used to be, wondering what changed.

     It has to happen in a layout effect rather than in the click
     handler: focusing asynchronously (a rAF, a timeout) races anyone
     who starts typing straight away, and the keystrokes land in the
     element focus is about to leave. Synchronous-after-commit is the
     only version that cannot drop input. The guard keeps it from
     stealing focus when the form first mounts on the page. */
  useLayoutEffect(() => {
    if (!moved.current) return;
    legendRef.current?.focus();
  }, [step]);

  const goTo = (next: number) => {
    moved.current = true;
    setStep(next);
    setError(null);
  };

  const advance = (value: keyof Answers, chosen: string) => {
    setAnswers((prev) => ({ ...prev, [value]: chosen }));
  };

  const next = () => {
    if (step === 0 && !answers.need) {
      setError("Select what you need help with.");
      return;
    }
    if (step === 1 && !answers.who) {
      setError("Select who this request is for.");
      return;
    }
    if (step === 2 && answers.detail.trim().length < 3) {
      setError("Tell us a little about what is happening.");
      return;
    }
    goTo(step + 1);
  };

  const restart = () => {
    setAnswers({ detail: "" });
    goTo(0);
  };

  const chosenNeed = needs.find((n) => n.id === answers.need);

  return (
    <div className="rounded-[var(--dgp-radius)] border-2 border-[var(--dgp-line)] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[var(--dgp-line)] bg-[var(--dgp-tint)] px-5 py-3">
        <p className="text-base font-bold">Online request</p>
        <p aria-live="polite" className="text-sm text-[var(--dgp-ink-soft)]">
          {step < TOTAL ? `Question ${step + 1} of ${TOTAL}` : "Request complete"}
        </p>
      </div>

      {/* Progress. Decorative — the count above carries the meaning. */}
      <div aria-hidden className="flex gap-1 px-5 pt-4">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i <= step - 1 || step >= TOTAL
                ? "bg-[var(--dgp-green)]"
                : i === step
                  ? "bg-[var(--dgp-blue)]"
                  : "bg-[var(--dgp-line)]"
            }`}
          />
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {error ? (
          <p
            role="alert"
            className="mb-4 border-l-4 border-[var(--dgp-red)] bg-white py-1 pl-4 text-base font-bold text-[var(--dgp-red)]"
          >
            {error}
          </p>
        ) : null}

        {step === 0 ? (
          <fieldset className="border-0 p-0">
            <legend
              ref={legendRef as React.Ref<HTMLLegendElement>}
              tabIndex={-1}
              className="text-xl font-bold tracking-tight focus:outline-none"
            >
              What do you need help with?
            </legend>
            <div className="mt-4 space-y-2">
              {needs.map((option) => (
                <Choice
                  key={option.id}
                  name={`${baseId}-need`}
                  checked={answers.need === option.id}
                  onChange={() => advance("need", option.id)}
                  label={option.label}
                  hint={option.hint}
                />
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className="border-0 p-0">
            <legend
              ref={legendRef as React.Ref<HTMLLegendElement>}
              tabIndex={-1}
              className="text-xl font-bold tracking-tight focus:outline-none"
            >
              Who is this request for?
            </legend>
            <div className="mt-4 space-y-2">
              {whoFor.map((option) => (
                <Choice
                  key={option.id}
                  name={`${baseId}-who`}
                  checked={answers.who === option.id}
                  onChange={() => advance("who", option.id)}
                  label={option.label}
                  hint={option.hint}
                />
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div>
            <h3
              ref={legendRef as React.Ref<HTMLHeadingElement>}
              tabIndex={-1}
              className="text-xl font-bold tracking-tight focus:outline-none"
            >
              Tell us what is happening
            </h3>
            <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              In your own words. There is no word limit and nobody is scoring
              your spelling.
            </p>

            <label
              htmlFor={`${baseId}-detail`}
              className="mt-4 block text-base font-bold"
            >
              {chosenNeed ? chosenNeed.label : "Your request"}
            </label>
            <textarea
              id={`${baseId}-detail`}
              rows={5}
              value={answers.detail}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, detail: e.target.value }))
              }
              className="mt-2 w-full rounded-[var(--dgp-radius)] border-2 border-[var(--dgp-ink-soft)] p-3 text-base leading-relaxed"
            />

            <fieldset className="mt-5 border-0 p-0">
              <legend className="text-base font-bold">
                How long has this been going on?
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {durations.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-[var(--dgp-radius)] border-2 px-3.5 py-2 text-base ${
                      answers.duration === option
                        ? "border-[var(--dgp-blue)] bg-[var(--dgp-blue)] font-semibold text-white"
                        : "border-[var(--dgp-line)] hover:border-[var(--dgp-ink-soft)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${baseId}-duration`}
                      className="sr-only"
                      checked={answers.duration === option}
                      onChange={() => advance("duration", option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === TOTAL ? (
          <div>
            <h3
              ref={legendRef as React.Ref<HTMLHeadingElement>}
              tabIndex={-1}
              className="flex items-center gap-3 text-xl font-bold tracking-tight focus:outline-none"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dgp-green)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-none stroke-white stroke-[3]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
              </span>
              That is everything we need
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              On a live site your request would now be with the duty GP. You
              would get a text confirming it had arrived, and a reply with what
              happens next — usually the same working day, always by the end of
              the next one.
            </p>
            <dl className="mt-5 divide-y divide-[var(--dgp-line)] border-y border-[var(--dgp-line)] text-base">
              <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
                <dt className="font-bold">You asked about</dt>
                <dd className="text-[var(--dgp-ink-soft)]">
                  {chosenNeed?.label ?? "—"}
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
                <dt className="font-bold">For</dt>
                <dd className="text-[var(--dgp-ink-soft)]">
                  {whoFor.find((w) => w.id === answers.who)?.label ?? "—"}
                </dd>
              </div>
              {answers.duration ? (
                <div className="grid gap-1 py-3 sm:grid-cols-[190px_1fr]">
                  <dt className="font-bold">Going on for</dt>
                  <dd className="text-[var(--dgp-ink-soft)]">{answers.duration}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-[var(--dgp-ink-soft)]">
              Nothing you typed was sent or saved — this is a demonstration on
              a sample website. If you need a real GP, contact your own
              practice, or call {practice.phone} to reach the fictional one.
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--dgp-line)] pt-5">
          {step < TOTAL ? (
            <>
              <button
                type="button"
                onClick={next}
                className="rounded-[var(--dgp-radius)] bg-[var(--dgp-green)] px-6 py-3 text-base font-semibold text-white shadow-[0_3px_0_var(--dgp-green-deep)] transition-colors hover:bg-[var(--dgp-green-deep)]"
              >
                {step === TOTAL - 1 ? "Send request" : "Continue"}
              </button>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="text-base font-semibold text-[var(--dgp-blue)] underline underline-offset-2"
                >
                  Back
                </button>
              ) : null}
            </>
          ) : (
            <button
              type="button"
              onClick={restart}
              className="rounded-[var(--dgp-radius)] border-2 border-[var(--dgp-blue)] px-6 py-3 text-base font-semibold text-[var(--dgp-blue)] transition-colors hover:bg-[var(--dgp-tint)]"
            >
              Try it again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** A radio dressed as a full-width tap target, per the NHS pattern. */
function Choice({
  name,
  checked,
  onChange,
  label,
  hint,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  hint: string;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-[var(--dgp-radius)] border-2 p-4 transition-colors ${
        checked
          ? "border-[var(--dgp-blue)] bg-[var(--dgp-tint)]"
          : "border-[var(--dgp-line)] hover:border-[var(--dgp-ink-soft)]"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-5 w-5 shrink-0 accent-[var(--dgp-blue)]"
      />
      <span>
        <span className="block text-base font-bold">{label}</span>
        <span className="mt-0.5 block text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          {hint}
        </span>
      </span>
    </label>
  );
}
