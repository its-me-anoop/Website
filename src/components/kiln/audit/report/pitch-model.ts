import { aSector, sectorAudience } from "@/lib/audit/score";
import type { AuditReport, CategoryId, CategoryScore } from "@/lib/audit/types";
import { packages } from "../../data";
import { auditMailto } from "../../primitives";

/** What a Flutterly build does about each area, in the studio's own commitments. */
export const promise: Record<CategoryId, string> = {
  accessibility:
    "WCAG 2.2 AA designed in from the first wireframe, tested with keyboards and screen readers, and shipped with a published accessibility statement.",
  performance:
    "Static-first Next.js with self-hosted fonts and no page builder, so pages stay fast on a poor mobile signal.",
  seo: "Titles, descriptions, canonical addresses, social previews and structured data generated from the content, on every page.",
  content:
    "Plain-English content design: the top tasks answered above the fold, so reception spends less time repeating them on the phone.",
  mobile: "Built mobile-first for the phones patients and families actually use, with tap-to-call and readable type throughout.",
  security: "No plugin stack to patch. HTTPS, HSTS and hardening headers on every response, hosted in the UK with daily backups.",
  local: "Organisation, address, opening hours and phone as structured data, kept consistent with your Google Business Profile.",
};

export function summaryForEmail(report: AuditReport): string {
  const lines = [
    `Score ${report.score}/100 (grade ${report.grade}) as ${aSector(report.sector)}.`,
    ...report.categories.map((c) => `- ${c.name}: ${c.score ?? "n/a"} — ${c.summary}`),
  ];
  const top = report.priorities.slice(0, 5);
  if (top.length) {
    lines.push("", "Top fixes:");
    top.forEach((p, i) => lines.push(`${i + 1}. ${p.title}`));
  }
  return lines.join("\n");
}

export type PitchModel = {
  /** The audience the sector serves: patients, families, customers. */
  who: string;
  /** The three lowest-scoring areas, weakest first. */
  weakest: CategoryScore[];
  /** True when the honest advice is to keep the current site. */
  keep: boolean;
  recommended: (typeof packages)[number];
  /** Prefilled written-audit email. */
  mailto: string;
};

/**
 * The sell, kept honest and shared between the on-screen section and the
 * printed report: weakest areas, a package suggested from the score, and
 * the free written audit as the next step.
 */
export function pitchModel(report: AuditReport): PitchModel {
  const weakest = [...report.categories]
    .filter((c) => c.score !== null)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 3);
  return {
    who: sectorAudience(report.sector),
    weakest,
    keep: report.score >= 85,
    recommended: report.score < 60 || report.page.platform?.kind === "page-builder" ? packages[1] : packages[0],
    mailto: auditMailto(report.page.finalUrl, summaryForEmail(report)),
  };
}
