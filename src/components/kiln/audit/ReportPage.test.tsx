import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import type { AuditReport, AuditResponse } from "@/lib/audit/types";
import { buildCategories, prioritise } from "@/lib/audit/score";
import type { Check } from "@/lib/audit/types";

let search = "";
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(search),
  usePathname: () => "/audit",
}));

import { ReportPage } from "./ReportPage";

function renderPage() {
  return render(
    <LazyMotion features={domMax} strict>
      <ReportPage />
    </LazyMotion>
  );
}

function check(partial: Partial<Check> & Pick<Check, "id" | "category" | "status" | "impact">): Check {
  return { title: partial.id, detail: `detail for ${partial.id}`, fix: partial.status === "pass" ? undefined : `fix for ${partial.id}`, ...partial };
}

function fakeReport(): AuditReport {
  const checks: Check[] = [
    check({ id: "a11y-lang", category: "accessibility", status: "pass", impact: "high", title: "Page declares its language" }),
    check({ id: "a11y-img-alt", category: "accessibility", status: "fail", impact: "high", title: "Images have alternative text" }),
    check({ id: "perf-ttfb", category: "performance", status: "warn", impact: "high", title: "Server responds quickly" }),
    check({ id: "seo-title", category: "seo", status: "pass", impact: "high", title: "Page has a descriptive title" }),
    check({ id: "content-contact", category: "content", status: "fail", impact: "high", title: "Phone number easy to find" }),
    check({ id: "mobile-viewport", category: "mobile", status: "pass", impact: "high", title: "Configured for mobile screens" }),
    check({ id: "sec-https", category: "security", status: "pass", impact: "high", title: "Served over HTTPS" }),
    check({ id: "local-schema", category: "local", status: "info", impact: "high", title: "Organisation described for Google" }),
  ];
  const categories = buildCategories(checks);
  return {
    version: 1,
    generatedAt: "2026-09-03T12:00:00.000Z",
    page: {
      requestedUrl: "https://www.example-surgery.nhs.uk/",
      finalUrl: "https://www.example-surgery.nhs.uk/",
      host: "www.example-surgery.nhs.uk",
      status: 200,
      redirects: [],
      title: "Example Surgery",
      description: null,
      lang: "en",
      ttfbMs: 900,
      totalMs: 1200,
      htmlBytes: 51200,
      wordCount: 420,
      imageCount: 6,
      scriptCount: 12,
      stylesheetCount: 3,
      externalDomains: ["fonts.googleapis.com"],
      platform: { name: "WordPress with Elementor", kind: "page-builder" },
      https: true,
      clientRendered: false,
      crossSiteRedirect: false,
    },
    sector: "gp-practice",
    detectedSector: "gp-practice",
    score: 58,
    grade: "D",
    verdict: "Significant problems across several areas.",
    categories,
    priorities: prioritise(checks),
    totals: { checks: 8, pass: 4, warn: 1, fail: 2, info: 1 },
  };
}

function mockFetch(body: AuditResponse, status = 200) {
  const fn = vi.fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>(
    async () => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } })
  );
  vi.stubGlobal("fetch", fn);
  return fn;
}

describe("ReportPage", () => {
  beforeEach(() => {
    search = "";
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the entry form when no address is given", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /Check any website in seconds/ })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox", { name: /your website address/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /run the free website audit/i }).length).toBeGreaterThan(0);
  });

  it("calls the API with the address and sector, then renders the report", async () => {
    search = "url=example-surgery.nhs.uk&sector=care-home";
    const fetchMock = mockFetch({ ok: true, report: fakeReport() });
    renderPage();

    expect(screen.getByRole("list", { name: /audit progress/i })).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole("heading", { level: 1, name: "www.example-surgery.nhs.uk" })).toBeInTheDocument());
    const calledWith = String(fetchMock.mock.calls[0]?.[0]);
    expect(calledWith).toContain("/api/audit?url=example-surgery.nhs.uk");
    expect(calledWith).toContain("sector=care-home");

    expect(screen.getByRole("img", { name: /overall score 58 out of 100, grade d/i })).toBeInTheDocument();
    expect(screen.getByText("Built on WordPress with Elementor")).toBeInTheDocument();

    /* Seven category rows, in the report's order. */
    const rows = screen.getAllByRole("heading", { level: 2 });
    expect(rows.some((h) => /area by/.test(h.textContent ?? ""))).toBe(true);
    ["Accessibility", "Speed", "Search", "Content and signposting", "Mobile experience", "Security", "Local presence"].forEach((name) => {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    });

    /* Fix-first list leads with the failing high-impact checks. */
    const fixFirst = screen.getByRole("region", { name: /changes that would help/i });
    expect(fixFirst).toBeInTheDocument();
    const items = fixFirst.querySelectorAll("ol > li");
    expect(items.length).toBe(3);
    expect(items[0].textContent).toMatch(/Images have alternative text|Phone number easy to find/);

    /* The sell: weakest areas, suggested package, prefilled written-audit email. */
    expect(screen.getByRole("heading", { name: /same list before launch/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Standard" })).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: /send me the written audit/i });
    const href = decodeURIComponent(mail.getAttribute("href") ?? "");
    expect(href.startsWith("mailto:sales@flutterly.co.uk")).toBe(true);
    expect(href).toContain("Score 58/100 (grade D)");
    expect(href).toContain("Images have alternative text");
    const pitch = screen.getByRole("region", { name: /same list before launch/i });
    expect(within(pitch).getByRole("link", { name: /book a 15-minute call/i })).toHaveAttribute("href", "/book");
  });

  it("opens every collapsed area for printing and restores them afterwards", async () => {
    search = "url=example-surgery.nhs.uk";
    mockFetch({ ok: true, report: fakeReport() });
    renderPage();
    await waitFor(() => expect(screen.getByRole("heading", { level: 1, name: "www.example-surgery.nhs.uk" })).toBeInTheDocument());

    const closed = () => document.querySelectorAll("details:not([open])").length;
    const before = closed();
    expect(before).toBeGreaterThan(0);

    window.dispatchEvent(new Event("beforeprint"));
    expect(closed()).toBe(0);
    /* Chrome fires beforeprint again from its own print pipeline. */
    window.dispatchEvent(new Event("beforeprint"));
    window.dispatchEvent(new Event("afterprint"));
    expect(closed()).toBe(before);

    /* Scroll-reveal wrappers are marked so print CSS can force them visible. */
    expect(document.querySelectorAll("[data-rise]").length).toBeGreaterThan(0);
    /* Interactive controls give way to a printable contact line. */
    const printLine = document.querySelector("#next-steps .k-print-only");
    expect(printLine?.textContent).toMatch(/Email sales@flutterly.co.uk with this report/);
  });

  it("tells a strong site to keep what it has and suggests Essentials", async () => {
    search = "url=example-surgery.nhs.uk";
    const report = fakeReport();
    report.score = 92;
    report.grade = "A";
    report.page.platform = null;
    mockFetch({ ok: true, report });
    renderPage();

    await waitFor(() => expect(screen.getByRole("heading", { name: /keep what you have/i })).toBeInTheDocument());
    expect(screen.getByRole("heading", { level: 3, name: "Essentials" })).toBeInTheDocument();
  });

  it("renders a plain-English error with a route to the written audit", async () => {
    search = "url=localhost";
    mockFetch({ ok: false, error: { code: "blocked_host", message: "Local addresses cannot be audited." } }, 400);
    renderPage();

    await waitFor(() => expect(screen.getByRole("heading", { level: 1, name: /cannot be audited/i })).toBeInTheDocument());
    expect(screen.getByText("Local addresses cannot be audited.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /written audit instead/i }).getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.queryByRole("button", { name: /try again/i })).toBeNull();
  });

  it("offers a retry for transient failures", async () => {
    search = "url=slow.example";
    mockFetch({ ok: false, error: { code: "timeout", message: "The site took too long to respond." } }, 504);
    renderPage();
    await waitFor(() => expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument());
  });
});
