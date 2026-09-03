/**
 * Shared types for the instant website audit. The engine (server) builds
 * an `AuditReport`; the report page (client) renders it. Keep this file
 * free of Node imports so both sides can share it.
 */

export const categoryIds = [
  "accessibility",
  "performance",
  "seo",
  "content",
  "mobile",
  "security",
  "local",
] as const;

export type CategoryId = (typeof categoryIds)[number];

export type CheckStatus = "pass" | "warn" | "fail" | "info";

/** How much a failing check matters to a visitor or to the organisation. */
export type Impact = "high" | "medium" | "low";

export type Check = {
  id: string;
  category: CategoryId;
  /** Short, plain-English name, e.g. "Images have alt text". */
  title: string;
  status: CheckStatus;
  impact: Impact;
  /** What was found, in one or two sentences. */
  detail: string;
  /** What to do about it. Omitted when the check passes. */
  fix?: string;
  /** Up to a handful of concrete examples (URLs, selectors, text). */
  evidence?: string[];
};

export type CategoryScore = {
  id: CategoryId;
  name: string;
  /** 0–100, or null when nothing in the category could be scored. */
  score: number | null;
  /** Weighting used for the overall score, as a percentage. */
  weight: number;
  summary: string;
  counts: { pass: number; warn: number; fail: number; info: number };
  checks: Check[];
};

export type Grade = "A" | "B" | "C" | "D" | "E";

export type Sector =
  | "gp-practice"
  | "care-home"
  | "dental-practice"
  | "pharmacy"
  | "physio-clinic"
  | "other";

export type Platform = {
  name: string;
  /** e.g. "WordPress 6.4" when a version was disclosed. */
  version?: string;
  /** Marketing-relevant classification. */
  kind: "page-builder" | "cms" | "framework" | "unknown";
};

export type PageFacts = {
  /** The address the visitor typed, normalised. */
  requestedUrl: string;
  /** Where the redirects landed. */
  finalUrl: string;
  host: string;
  status: number;
  redirects: string[];
  title: string | null;
  description: string | null;
  lang: string | null;
  /** Milliseconds to first byte of the final response. */
  ttfbMs: number;
  /** Milliseconds from first request to the end of the HTML body. */
  totalMs: number;
  htmlBytes: number;
  wordCount: number;
  imageCount: number;
  scriptCount: number;
  stylesheetCount: number;
  externalDomains: string[];
  platform: Platform | null;
  https: boolean;
  /** The HTML was an empty shell; the content is drawn by JavaScript. */
  clientRendered: boolean;
  /** The address redirected to a different website. */
  crossSiteRedirect: boolean;
};

export type AuditReport = {
  version: 1;
  generatedAt: string;
  page: PageFacts;
  sector: Sector;
  score: number;
  grade: Grade;
  verdict: string;
  categories: CategoryScore[];
  /** Failing and warning checks, most important first. */
  priorities: Check[];
  totals: { checks: number; pass: number; warn: number; fail: number; info: number };
};

export type AuditErrorCode =
  | "invalid_url"
  | "blocked_host"
  | "dns_failed"
  | "unreachable"
  | "timeout"
  | "http_error"
  | "not_html"
  | "too_large"
  | "too_many_redirects"
  | "rate_limited"
  | "internal";

export type AuditFailure = {
  ok: false;
  error: { code: AuditErrorCode; message: string; status?: number };
};

export type AuditSuccess = { ok: true; report: AuditReport };

export type AuditResponse = AuditSuccess | AuditFailure;

export class AuditError extends Error {
  code: AuditErrorCode;
  status?: number;
  constructor(code: AuditErrorCode, message: string, status?: number) {
    super(message);
    this.name = "AuditError";
    this.code = code;
    this.status = status;
  }
}
