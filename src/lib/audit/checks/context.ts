import type { FetchedPage } from "../fetch";
import type { ParsedPage } from "../page";
import type { CategoryId, Check, CheckStatus, Impact } from "../types";

/** Everything a check module may read. Supporting fetches are optional. */
export type AuditContext = {
  page: ParsedPage;
  robots: FetchedPage | null;
  sitemap: FetchedPage | null;
  /** Plain-http probe of the same host, unfollowed, to see if it redirects to https. */
  httpProbe: FetchedPage | null;
  /** HEAD of /favicon.ico when no icon link was declared. */
  favicon: FetchedPage | null;
};

export type CheckModule = (ctx: AuditContext) => Check[];

type CheckSpec = {
  id: string;
  title: string;
  status: CheckStatus;
  impact: Impact;
  detail: string;
  fix?: string;
  evidence?: string[];
};

export function checker(category: CategoryId) {
  return (spec: CheckSpec): Check => ({
    category,
    ...spec,
    evidence: spec.evidence?.filter(Boolean).slice(0, 5),
    fix: spec.status === "pass" ? undefined : spec.fix,
  });
}

export function plural(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}

/** Verb or pronoun agreement for a count: agree(n, "has", "have"). */
export function agree(n: number, one: string, many: string) {
  return n === 1 ? one : many;
}

export function trim(s: string, max = 80) {
  const clean = s.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}
