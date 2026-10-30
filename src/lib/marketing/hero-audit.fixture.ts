import type { AuditReport, Check, CategoryScore } from "@/lib/audit/types";

/** A small, hand-built report for the hero audit tests. */
function check(id: string, status: Check["status"]): Check {
  return { id, category: "seo", title: `Fix ${id}`, status, impact: "high", detail: "" };
}

function category(id: CategoryScore["id"], name: string, score: number | null): CategoryScore {
  return { id, name, score, weight: 10, summary: "", counts: { pass: 0, warn: 0, fail: 0, info: 0 }, checks: [] };
}

export const sampleReport = {
  version: 1,
  generatedAt: "2026-10-30T20:00:00Z",
  page: { requestedUrl: "https://example.co.uk/", finalUrl: "https://www.example.co.uk/", host: "www.example.co.uk" },
  sector: "other",
  detectedSector: "other",
  score: 62,
  grade: "C",
  verdict: "Solid in places, with a few things holding it back.",
  categories: [
    category("accessibility", "Accessibility", 55),
    category("performance", "Speed", 80),
    category("local", "Local", null),
  ],
  priorities: [check("a", "fail"), check("b", "fail"), check("c", "warn"), check("d", "warn")],
  totals: { checks: 30, pass: 20, warn: 6, fail: 4, info: 0 },
} as unknown as AuditReport;

