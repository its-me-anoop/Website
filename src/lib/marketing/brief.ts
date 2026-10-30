/**
 * The homepage brief builder: three quick choices (what needs sorting,
 * where things stand, when) written up as a plain-English brief that
 * travels to the booking page and into the Cal.com notes, or into an
 * email. Pure functions only, so the component stays a thin view.
 *
 * The brief travels as short query parameters of known values, never as
 * free text, so nothing a visitor did not choose can reach the booking
 * notes.
 */

import { site } from "@/lib/site";
import { serviceSlugs, services, type ServiceSlug } from "./services";

export type Stage = "new" | "improve" | "care";
export type Timing = "now" | "soon" | "exploring";

export type Brief = {
  needs: readonly ServiceSlug[];
  stage?: Stage;
  timing?: Timing;
};

export type Option<T extends string> = { value: T; label: string };

export const emptyBrief: Brief = { needs: [] };

/** How each service reads inside a sentence, with and without an article. */
const phrases: Record<ServiceSlug, { withArticle: string; bare: string }> = {
  websites: { withArticle: "a website", bare: "website" },
  apps: { withArticle: "an app", bare: "app" },
  "it-support": { withArticle: "IT support", bare: "IT support" },
  "social-media": { withArticle: "social media", bare: "social media" },
  seo: { withArticle: "SEO", bare: "SEO" },
};

export const needOptions: readonly Option<ServiceSlug>[] = services.map((s) => ({ value: s.slug, label: s.name }));

const stages: Record<Stage, { label: string; sentence: string }> = {
  new: { label: "Starting from scratch", sentence: "We're starting from scratch." },
  improve: {
    label: "Have one, it needs fixing",
    sentence: "We have something already, but it isn't working as it should.",
  },
  care: { label: "Need it looked after", sentence: "It's built; we need someone to look after it." },
};

const timings: Record<Timing, { label: string; sentence: string }> = {
  now: { label: "As soon as possible", sentence: "We'd like to start as soon as possible." },
  soon: { label: "In the next few months", sentence: "We're planning for the next few months." },
  exploring: { label: "Just exploring", sentence: "We're exploring options for now." },
};

const stageValues = Object.keys(stages) as Stage[];
const timingValues = Object.keys(timings) as Timing[];

export const stageOptions: readonly Option<Stage>[] = stageValues.map((value) => ({ value, label: stages[value].label }));
export const timingOptions: readonly Option<Timing>[] = timingValues.map((value) => ({
  value,
  label: timings[value].label,
}));

/** Keeps needs in the services order, whatever order they were picked in. */
function ordered(needs: Iterable<ServiceSlug>): ServiceSlug[] {
  const set = new Set(needs);
  return serviceSlugs.filter((slug) => set.has(slug));
}

export function toggleNeed(brief: Brief, need: ServiceSlug): Brief {
  const next = brief.needs.includes(need) ? brief.needs.filter((n) => n !== need) : [...brief.needs, need];
  return { ...brief, needs: ordered(next) };
}

export function isBriefStarted(brief: Brief): boolean {
  return brief.needs.length > 0;
}

/** "a, b and c" */
function listOf(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function briefLines(brief: Brief): string[] {
  if (!isBriefStarted(brief)) return [];
  const lines = [`I need help with ${listOf(brief.needs.map((n) => phrases[n].withArticle))}.`];
  if (brief.stage) lines.push(stages[brief.stage].sentence);
  if (brief.timing) lines.push(timings[brief.timing].sentence);
  return lines;
}

export function briefText(brief: Brief): string {
  return briefLines(brief).join(" ");
}

/**
 * Where to send the visitor first. An existing website (or its search
 * ranking) that is not working is best seen in the free audit report
 * before a call; everything else starts with the call.
 */
export function nextStep(brief: Brief): "audit" | "call" {
  const aboutTheSite = brief.needs.includes("websites") || brief.needs.includes("seo");
  return brief.stage === "improve" && aboutTheSite ? "audit" : "call";
}

export function bookHref(brief: Brief): string {
  if (!isBriefStarted(brief)) return "/book";
  const params = new URLSearchParams({ needs: brief.needs.join(",") });
  if (brief.stage) params.set("stage", brief.stage);
  if (brief.timing) params.set("timing", brief.timing);
  return `/book?${params.toString()}`;
}

function isStage(value: string | null): value is Stage {
  return value !== null && (stageValues as string[]).includes(value);
}

function isTiming(value: string | null): value is Timing {
  return value !== null && (timingValues as string[]).includes(value);
}

/** Reads a brief back from the booking page's query, dropping unknown values. */
export function parseBrief(params: URLSearchParams): Brief | null {
  const raw = (params.get("needs") ?? "").split(",");
  const needs = ordered(raw.filter((n): n is ServiceSlug => (serviceSlugs as readonly string[]).includes(n)));
  if (needs.length === 0) return null;
  const brief: Brief = { needs };
  const stage = params.get("stage");
  const timing = params.get("timing");
  if (isStage(stage)) brief.stage = stage;
  if (isTiming(timing)) brief.timing = timing;
  return brief;
}

export function mailtoHref(brief: Brief): string {
  const subject = `My brief: ${listOf(brief.needs.map((n) => phrases[n].bare))}`;
  const body = `Hi ${site.founder.split(" ")[0]},\n\n${briefText(brief)}\n\n`;
  /* encodeURIComponent, not URLSearchParams: mail apps show "+" literally. */
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
