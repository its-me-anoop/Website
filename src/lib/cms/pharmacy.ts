import { DEFAULT_ROOT, readCollection } from "./load";
import type { LoadOptions } from "./gp";
import {
  pharmacyAccessibilitySchema,
  pharmacyFeedbackSchema,
  pharmacyFirstSchema,
  pharmacyHomeSchema,
  pharmacyPrescriptionsSchema,
  pharmacySchema,
  pharmacyServicesSchema,
  pharmacyTeamSchema,
} from "./schemas/pharmacy";
import { isStale, phoneToTel } from "./schemas/shared";

const SITE = "pharmacy";

/**
 * Load the full validated Willowbrook Pharmacy site bundle with derived
 * data: the tel: href, and expired seasonal alerts dropped.
 */
export function loadPharmacyContent(options: LoadOptions = {}) {
  const root = options.root ?? DEFAULT_ROOT;
  const today = options.today ?? new Date().toISOString().slice(0, 10);

  const reviewedDates: Record<string, string> = {};
  const load = <T extends { reviewed: string },>(
    name: string,
    schema: Parameters<typeof readCollection<T>>[2]
  ) => {
    const collection = readCollection(SITE, name, schema, root);
    reviewedDates[name] = collection.reviewed;
    return collection;
  };

  const pharmacy = load("pharmacy", pharmacySchema);
  const home = load("home", pharmacyHomeSchema);

  const alertLive = home.alert && (!home.alert.expires || home.alert.expires >= today);

  const bundle = {
    pharmacy: { ...pharmacy, phoneHref: phoneToTel(pharmacy.phone) },
    home: { ...home, alert: alertLive ? home.alert : null },
    pharmacyFirst: load("pharmacy-first", pharmacyFirstSchema),
    services: load("services", pharmacyServicesSchema),
    prescriptions: load("prescriptions", pharmacyPrescriptionsSchema),
    team: load("team", pharmacyTeamSchema),
    feedback: load("feedback", pharmacyFeedbackSchema),
    accessibility: load("accessibility", pharmacyAccessibilitySchema),
  };

  return {
    ...bundle,
    stale: Object.keys(reviewedDates)
      .filter((name) => isStale(reviewedDates[name], today))
      .sort(),
  };
}

export type PharmacyContent = ReturnType<typeof loadPharmacyContent>;
