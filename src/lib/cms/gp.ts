import { DEFAULT_ROOT, readCollection } from "./load";
import {
  gpAccessibilitySchema,
  gpAppointmentsSchema,
  gpFaqsSchema,
  gpHomeSchema,
  gpNewsSchema,
  gpPracticeInfoSchema,
  gpPracticeSchema,
  gpPrescriptionsSchema,
  gpRegisterSchema,
  gpServicesSchema,
  gpTeamSchema,
} from "./schemas/gp";
import { formatDate, isStale, phoneToTel } from "./schemas/shared";

export interface LoadOptions {
  /** Content root override for tests; defaults to <repo>/content. */
  root?: string;
  /** ISO date used for freshness rules; defaults to the current date. */
  today?: string;
}

const SITE = "gp-practice";

/** Replace {phone}/{name}/{address} placeholders throughout a collection. */
function fillPlaceholders<T>(value: T, facts: Record<string, string>): T {
  if (typeof value === "string") {
    return value.replace(/\{(phone|name|address)\}/g, (_, key) => facts[key]) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => fillPlaceholders(item, facts)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, fillPlaceholders(item, facts)])
    ) as T;
  }
  return value;
}

/**
 * Load the full validated GP site bundle with derived data: tel: hrefs,
 * display dates, date-sorted news, and expired alerts dropped.
 */
export function loadGpContent(options: LoadOptions = {}) {
  const root = options.root ?? DEFAULT_ROOT;
  const today = options.today ?? new Date().toISOString().slice(0, 10);

  const reviewedDates: Record<string, string> = {};
  const practice = readCollection(SITE, "practice", gpPracticeSchema, root);
  reviewedDates.practice = practice.reviewed;

  const facts = { phone: practice.phone, name: practice.name, address: practice.address };
  const load = <T extends { reviewed: string },>(
    name: string,
    schema: Parameters<typeof readCollection<T>>[2]
  ) => {
    const collection = fillPlaceholders(readCollection(SITE, name, schema, root), facts);
    reviewedDates[name] = collection.reviewed;
    return collection;
  };

  const home = load("home", gpHomeSchema);
  const news = load("news", gpNewsSchema);

  const alertLive =
    home.alert && (!home.alert.expires || home.alert.expires >= today);

  const bundle = {
    practice: { ...practice, phoneHref: phoneToTel(practice.phone) },
    home: { ...home, alert: alertLive ? home.alert : null },
    news: {
      ...news,
      items: [...news.items]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((item) => ({ ...item, display: formatDate(item.date) })),
    },
    team: load("team", gpTeamSchema),
    services: load("services", gpServicesSchema),
    practiceInfo: load("practice-info", gpPracticeInfoSchema),
    faqs: load("faqs", gpFaqsSchema),
    appointments: load("appointments", gpAppointmentsSchema),
    prescriptions: load("prescriptions", gpPrescriptionsSchema),
    register: load("register", gpRegisterSchema),
    accessibility: load("accessibility", gpAccessibilitySchema),
  };

  return {
    ...bundle,
    stale: Object.keys(reviewedDates)
      .filter((name) => isStale(reviewedDates[name], today))
      .sort(),
  };
}

export type GpContent = ReturnType<typeof loadGpContent>;
