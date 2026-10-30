"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { requestAudit, summariseReport, type HeroAuditSummary } from "@/lib/marketing/hero-audit";

export type InstantAuditState =
  | { kind: "idle" }
  | { kind: "running"; host: string }
  | { kind: "done"; summary: HeroAuditSummary }
  | { kind: "error"; host: string; message: string };

/** "https://www.x.co.uk/path" → "www.x.co.uk", for the progress line. */
export function hostOf(input: string): string {
  return input.trim().replace(/^[a-z]+:\/\//i, "").split(/[/?#]/)[0] || input.trim();
}

/**
 * State for the hero's instant check. Starting a new check cancels the
 * one in flight, and unmounting cancels too, so a late reply never
 * lands on a newer state.
 */
export function useInstantAudit() {
  const [state, setState] = useState<InstantAuditState>({ kind: "idle" });
  const current = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    current.current?.abort();
    current.current = null;
  }, []);

  const start = useCallback(
    async (url: string) => {
      cancel();
      const controller = new AbortController();
      current.current = controller;
      const host = hostOf(url);
      setState({ kind: "running", host });
      const result = await requestAudit(url.trim(), { signal: controller.signal });
      if (result === "aborted" || current.current !== controller) return;
      current.current = null;
      setState(
        result.ok
          ? { kind: "done", summary: summariseReport(result.report) }
          : { kind: "error", host, message: result.error.message }
      );
    },
    [cancel]
  );

  const reset = useCallback(() => {
    cancel();
    setState({ kind: "idle" });
  }, [cancel]);

  useEffect(() => cancel, [cancel]);

  return { state, start, reset };
}
