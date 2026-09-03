import {
  categoryIds,
  type CategoryId,
  type CategoryScore,
  type Check,
  type Grade,
  type Impact,
  type Sector,
} from "./types";

/**
 * Scoring. Each check earns 1 (pass), 0.5 (warn) or 0 (fail) of its
 * impact weight; info checks are shown but never scored. Category
 * scores roll up into the overall score using the weights below, which
 * reflect what matters most for the visitors these sites serve.
 */

export const categoryMeta: Record<CategoryId, { name: string; weight: number; blurb: string }> = {
  accessibility: {
    name: "Accessibility",
    weight: 20,
    blurb: "Can every visitor use it: older people, screen-reader users, anyone on a bad day?",
  },
  performance: {
    name: "Speed",
    weight: 17,
    blurb: "How quickly it appears on a mid-range phone with a patchy signal.",
  },
  seo: {
    name: "Search",
    weight: 15,
    blurb: "Whether search engines can find, understand and present the site.",
  },
  content: {
    name: "Content and signposting",
    weight: 18,
    blurb: "Can visitors complete their task without phoning you?",
  },
  mobile: {
    name: "Mobile experience",
    weight: 12,
    blurb: "Does it behave on the screens most people actually use?",
  },
  security: {
    name: "Security",
    weight: 10,
    blurb: "Encryption, protective headers and nothing leaking that should not.",
  },
  local: {
    name: "Local presence",
    weight: 8,
    blurb: "How clearly the site tells Google who you are and where.",
  },
};

const impactWeight: Record<Impact, number> = { high: 3, medium: 2, low: 1 };
const statusValue = { pass: 1, warn: 0.5, fail: 0 } as const;

export function scoreChecks(checks: Check[]): number | null {
  let earned = 0;
  let possible = 0;
  for (const check of checks) {
    if (check.status === "info") continue;
    const w = impactWeight[check.impact];
    possible += w;
    earned += w * statusValue[check.status];
  }
  if (possible === 0) return null;
  return Math.round((earned / possible) * 100);
}

function summarise(counts: CategoryScore["counts"], score: number | null): string {
  const issues = counts.fail + counts.warn;
  if (score === null) return "Nothing here could be checked automatically.";
  if (issues === 0) return "Every check passed.";
  if (counts.fail === 0) return `${issues} ${issues === 1 ? "thing" : "things"} to improve, nothing critical.`;
  return `${counts.fail} ${counts.fail === 1 ? "issue needs" : "issues need"} fixing${counts.warn ? `, ${counts.warn} to improve` : ""}.`;
}

export function buildCategories(checks: Check[]): CategoryScore[] {
  return categoryIds.map((id) => {
    const own = checks.filter((c) => c.category === id);
    const counts = { pass: 0, warn: 0, fail: 0, info: 0 };
    for (const c of own) counts[c.status]++;
    const score = scoreChecks(own);
    return {
      id,
      name: categoryMeta[id].name,
      weight: categoryMeta[id].weight,
      score,
      summary: summarise(counts, score),
      counts,
      checks: own.sort((a, b) => statusOrder(a) - statusOrder(b) || impactWeight[b.impact] - impactWeight[a.impact]),
    };
  });
}

function statusOrder(c: Check): number {
  return { fail: 0, warn: 1, info: 3, pass: 2 }[c.status];
}

export function overallScore(categories: CategoryScore[]): number {
  let weighted = 0;
  let totalWeight = 0;
  for (const cat of categories) {
    if (cat.score === null) continue;
    weighted += cat.score * cat.weight;
    totalWeight += cat.weight;
  }
  return totalWeight ? Math.round(weighted / totalWeight) : 0;
}

export function gradeFor(score: number): Grade {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "E";
}

export function verdictFor(score: number, sector: Sector): string {
  const who = sectorAudience(sector);
  if (score >= 90) return `A strong site. The remaining points are polish, and ${who} are well served.`;
  if (score >= 75) return `A sound site with a handful of fixable gaps that ${who} will notice.`;
  if (score >= 60) return `Working, but with real friction for ${who}. The fixes below would make a visible difference.`;
  if (score >= 45) return `Significant problems across several areas. ${capitalise(who)} are likely turning to the phone instead.`;
  return `The site is holding the organisation back. ${capitalise(who)} struggle to use it, and search engines struggle to find it.`;
}

export function sectorAudience(sector: Sector): string {
  switch (sector) {
    case "gp-practice":
      return "patients";
    case "care-home":
      return "families";
    case "dental-practice":
    case "physio-clinic":
      return "patients";
    case "pharmacy":
      return "customers";
    default:
      return "visitors";
  }
}

export function sectorLabel(sector: Sector): string {
  switch (sector) {
    case "gp-practice":
      return "GP practice";
    case "care-home":
      return "care home";
    case "dental-practice":
      return "dental practice";
    case "pharmacy":
      return "pharmacy";
    case "physio-clinic":
      return "physiotherapy clinic";
    default:
      return "organisation";
  }
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Failing and warning checks, worst first: fails before warns, high impact first. */
export function prioritise(checks: Check[]): Check[] {
  return checks
    .filter((c) => c.status === "fail" || c.status === "warn")
    .sort((a, b) => {
      const s = statusOrder(a) - statusOrder(b);
      if (s !== 0) return s;
      const i = impactWeight[b.impact] - impactWeight[a.impact];
      if (i !== 0) return i;
      return categoryMeta[b.category].weight - categoryMeta[a.category].weight;
    });
}
