/**
 * The homepage hero's instant check: one request to the audit API and a
 * short summary of the report for the hero card. The full report stays
 * at /audit; the API caches each result for a few minutes, so following
 * "See the full report" usually opens straight away.
 */

import type { AuditFailure, AuditReport, AuditResponse, Grade } from "@/lib/audit/types";
import { auditHref } from "./audit-links";

export const HERO_AUDIT_TIMEOUT_MS = 70_000;

export type HeroAuditSummary = {
  host: string;
  score: number;
  grade: Grade;
  verdict: string;
  /** Only categories that could be scored, in report order. */
  categories: { name: string; score: number }[];
  /** The first three fixes, most important first. */
  topFixes: string[];
  /** Failing and warning checks in the whole report. */
  issueCount: number;
  reportHref: string;
};

/** The one thing the check needs from `fetch`, so tests can stand in for it. */
export type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;

export function summariseReport(report: AuditReport): HeroAuditSummary {
  return {
    host: report.page.host,
    score: report.score,
    grade: report.grade,
    verdict: report.verdict,
    categories: report.categories.flatMap((c) => (c.score === null ? [] : [{ name: c.name, score: c.score }])),
    topFixes: report.priorities.slice(0, 3).map((c) => c.title),
    issueCount: report.totals.fail + report.totals.warn,
    reportHref: auditHref(report.page.requestedUrl),
  };
}

function failure(code: AuditFailure["error"]["code"], message: string): AuditFailure {
  return { ok: false, error: { code, message } };
}

/**
 * Runs the audit for `url`. Always resolves: with the API's own body,
 * with a plain failure for network or timeout problems, or with
 * "aborted" when the caller cancelled (so it can be ignored).
 */
export async function requestAudit(
  url: string,
  {
    signal,
    fetchImpl = (url, init) => fetch(url, init),
    timeoutMs = HERO_AUDIT_TIMEOUT_MS,
  }: { signal?: AbortSignal; fetchImpl?: Fetcher; timeoutMs?: number } = {}
): Promise<AuditResponse | "aborted"> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onCallerAbort = () => controller.abort();
  signal?.addEventListener("abort", onCallerAbort);

  try {
    const res = await fetchImpl(`/api/audit?${new URLSearchParams({ url }).toString()}`, {
      signal: controller.signal,
    });
    const body = (await res.json().catch(() => null)) as AuditResponse | null;
    if (!body || typeof body.ok !== "boolean") {
      return failure("internal", "The check could not be completed. Try again in a moment.");
    }
    return body;
  } catch {
    if (timedOut) {
      return failure("timeout", "The check took too long. The site may be very slow or blocking automated visits.");
    }
    if (signal?.aborted) return "aborted";
    return failure("internal", "The check could not be completed. Check your connection and try again.");
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onCallerAbort);
  }
}
