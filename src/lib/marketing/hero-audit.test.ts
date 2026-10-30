import { describe, expect, it, vi } from "vitest";
import { sampleReport } from "./hero-audit.fixture";
import { requestAudit, summariseReport } from "./hero-audit";

describe("summariseReport", () => {
  it("keeps the headline facts, the scored categories and the top three fixes", () => {
    expect(summariseReport(sampleReport)).toEqual({
      host: "www.example.co.uk",
      score: 62,
      grade: "C",
      verdict: "Solid in places, with a few things holding it back.",
      categories: [
        { name: "Accessibility", score: 55 },
        { name: "Speed", score: 80 },
      ],
      topFixes: ["Fix a", "Fix b", "Fix c"],
      issueCount: 10,
      reportHref: "/audit?url=https%3A%2F%2Fexample.co.uk%2F",
    });
  });
});

describe("requestAudit", () => {
  const okBody = { ok: true, report: sampleReport };

  it("calls the audit API with the address and returns its body", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(okBody), { status: 200 }));
    await expect(requestAudit("example.co.uk", { fetchImpl })).resolves.toEqual(okBody);
    expect(fetchImpl).toHaveBeenCalledWith("/api/audit?url=example.co.uk", expect.anything());
  });

  it("passes API failures through, with their own message", async () => {
    const body = { ok: false, error: { code: "dns_failed", message: "We could not find that website." } };
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(body), { status: 422 }));
    await expect(requestAudit("nope.invalid", { fetchImpl })).resolves.toEqual(body);
  });

  it("turns a network error or a non-JSON reply into a plain failure", async () => {
    const thrown = vi.fn(async () => {
      throw new TypeError("offline");
    });
    await expect(requestAudit("a.co.uk", { fetchImpl: thrown })).resolves.toMatchObject({
      ok: false,
      error: { code: "internal" },
    });
    const html = vi.fn(async () => new Response("<html>", { status: 502 }));
    await expect(requestAudit("a.co.uk", { fetchImpl: html })).resolves.toMatchObject({
      ok: false,
      error: { code: "internal" },
    });
  });

  it("gives up with a timeout failure when the API takes too long", async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn(
      (_: string, init?: RequestInit) =>
        new Promise<Response>((_, reject) =>
          init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")))
        )
    );
    const pending = requestAudit("slow.co.uk", { fetchImpl, timeoutMs: 1000 });
    await vi.advanceTimersByTimeAsync(1000);
    await expect(pending).resolves.toMatchObject({ ok: false, error: { code: "timeout" } });
    vi.useRealTimers();
  });

  it("reports a cancelled request as aborted, so the caller can ignore it", async () => {
    const controller = new AbortController();
    const fetchImpl = vi.fn(
      (_: string, init?: RequestInit) =>
        new Promise<Response>((_, reject) =>
          init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")))
        )
    );
    const pending = requestAudit("a.co.uk", { fetchImpl, signal: controller.signal });
    controller.abort();
    await expect(pending).resolves.toBe("aborted");
  });
});
