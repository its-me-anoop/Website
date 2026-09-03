"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AuditFailure, AuditReport, AuditResponse } from "@/lib/audit/types";
import { KilnShell } from "../KilnShell";
import { CtaBand } from "../CtaBand";
import { AuditBar, Display, Eyebrow, Rise } from "../primitives";
import { PrintReport } from "./print/PrintReport";
import { CategoryList } from "./report/CategoryList";
import { ErrorState } from "./report/ErrorState";
import { Pitch } from "./report/Pitch";
import { Priorities } from "./report/Priorities";
import { Progress } from "./report/Progress";
import { ReportHeader } from "./report/ReportHeader";

type Outcome =
  | { kind: "error"; failure: AuditFailure["error"] }
  | { kind: "done"; report: AuditReport };

type State = { kind: "idle" } | { kind: "loading" } | Outcome;

const CLIENT_TIMEOUT_MS = 70_000;

function hostOf(input: string): string {
  try {
    return new URL(/^[a-z]+:\/\//i.test(input) ? input : `https://${input}`).host || input;
  } catch {
    return input;
  }
}

/**
 * /audit?url=… — runs the instant audit against the API and renders
 * whichever state applies. With no address it is simply the entry form.
 */
export function ReportPage() {
  const params = useSearchParams();
  const url = (params.get("url") ?? "").trim();
  const sector = params.get("sector") ?? "";
  const [attempt, setAttempt] = useState(0);
  /* Outcomes are keyed by the request that produced them, so a change of
     address, sector or retry reads as "loading" until its own result lands. */
  const requestKey = `${url}|${sector}|${attempt}`;
  const [result, setResult] = useState<{ key: string; outcome: Outcome } | null>(null);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    if (!url) return;
    const key = requestKey;
    const controller = new AbortController();
    let cancelled = false;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, CLIENT_TIMEOUT_MS);

    const query = new URLSearchParams({ url });
    if (sector) query.set("sector", sector);

    fetch(`/api/audit?${query.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        const body = (await res.json().catch(() => null)) as AuditResponse | null;
        if (!body) throw new Error("bad response");
        if (cancelled) return;
        setResult({
          key,
          outcome: body.ok ? { kind: "done", report: body.report } : { kind: "error", failure: body.error },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setResult({
          key,
          outcome: {
            kind: "error",
            failure: timedOut
              ? { code: "timeout", message: "The audit took too long. The site may be very slow or blocking automated visits." }
              : { code: "internal", message: "The audit could not be completed. Check your connection and try again." },
          },
        });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [url, sector, requestKey]);

  const state: State = !url
    ? { kind: "idle" }
    : result && result.key === requestKey
      ? result.outcome
      : { kind: "loading" };

  return (
    <KilnShell>
      <div aria-live="polite" className="sr-only" data-audit-state={state.kind}>
        {state.kind === "loading"
          ? `Auditing ${hostOf(url)}.`
          : state.kind === "done"
            ? `Audit complete. ${state.report.page.host} scored ${state.report.score} out of 100, grade ${state.report.grade}.`
            : state.kind === "error"
              ? `The audit could not be completed. ${state.failure.message}`
              : ""}
      </div>

      {state.kind === "idle" ? (
        <section className="relative pt-32 sm:pt-40">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pb-24 text-center sm:px-8 sm:pb-32">
            <Rise>
              <Eyebrow className="text-k-muted">Instant website audit</Eyebrow>
            </Rise>
            <Rise delay={0.06}>
              <Display as="h1" size="xl" className="mt-6 max-w-[16ch] text-k-ink">
                Check any website in <em>seconds</em>.
              </Display>
            </Rise>
            <Rise delay={0.14}>
              <p className="mx-auto mt-7 max-w-[600px] text-[17.5px] leading-[1.6] text-k-ink-soft">
                Accessibility, speed, search, content, mobile, security and local presence, scored and
                explained in plain English. Free, instant, and nothing is stored.
              </p>
            </Rise>
            <Rise delay={0.24} className="mt-10 flex w-full justify-center">
              <AuditBar autoFocus hint="Enter the address and press the arrow." />
            </Rise>
          </div>
        </section>
      ) : null}

      {state.kind === "loading" ? (
        <section className="relative pt-32 sm:pt-40">
          <div className="mx-auto w-full max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
            <h1 className="sr-only">Auditing {hostOf(url)}</h1>
            <Progress host={hostOf(url)} />
          </div>
        </section>
      ) : null}

      {state.kind === "error" ? (
        <section className="relative pt-32 sm:pt-40">
          <div className="mx-auto w-full max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
            <ErrorState failure={state.failure} url={url} onRetry={retry} />
          </div>
        </section>
      ) : null}

      {state.kind === "done" ? (
        <>
          <div className="k-screen">
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
              <ReportHeader report={state.report} url={url} />
            </section>
            <CategoryList categories={state.report.categories} />
            <Priorities report={state.report} />
            <Pitch report={state.report} />
            <CtaBand
              title={
                <>
                  Audit another site, or <em>talk it through</em>.
                </>
              }
              copy="Paste a different address for another instant report, or get in touch about this one."
              id="contact"
            />
          </div>
          <PrintReport report={state.report} />
        </>
      ) : null}
    </KilnShell>
  );
}
