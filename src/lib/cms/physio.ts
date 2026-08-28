import { DEFAULT_ROOT, readCollection } from "./load";
import type { LoadOptions } from "./gp";
import {
  physioAccessibilitySchema,
  physioClinicSchema,
  physioConditionsSchema,
  physioFirstAppointmentSchema,
  physioHomeSchema,
  physioPricingSchema,
  physioTeamSchema,
  physioTreatmentsSchema,
  physioTrustSchema,
  type PhysioConditions,
  type PhysioHome,
} from "./schemas/physio";
import { isStale, phoneToTel } from "./schemas/shared";

const SITE = "physio-clinic";

/**
 * Each collection is validated against its own schema in isolation, so a
 * reference from one file into another — home.json's conditionsTeaser
 * slugs into conditions.json's condition slugs — can't be caught there.
 * Check it here instead, once both are loaded, so a slug that drifts out
 * of sync fails the build with the same file-naming convention as a
 * schema error rather than silently falling back to a lower-quality link.
 */
function assertConditionTeaserSlugsResolve(home: PhysioHome, conditions: PhysioConditions): void {
  const validSlugs = new Set(conditions.conditions.map((condition) => condition.slug));
  home.conditionsTeaser.forEach((teaser, index) => {
    if (teaser.slug && !validSlugs.has(teaser.slug)) {
      throw new Error(
        `content/${SITE}/home.json: conditionsTeaser.${index}.slug "${teaser.slug}" does not ` +
          `match any condition slug in content/${SITE}/conditions.json`
      );
    }
  });
}

/**
 * Load the full validated Forbury Physiotherapy site bundle with derived
 * data: the clinic's tel: href, and collections older than a year
 * flagged stale.
 */
export function loadPhysioContent(options: LoadOptions = {}) {
  const root = options.root ?? DEFAULT_ROOT;
  const today = options.today ?? new Date().toISOString().slice(0, 10);

  const reviewedDates: Record<string, string> = {};
  const load = <T extends { reviewed: string }>(
    name: string,
    schema: Parameters<typeof readCollection<T>>[2]
  ) => {
    const collection = readCollection(SITE, name, schema, root);
    reviewedDates[name] = collection.reviewed;
    return collection;
  };

  const clinic = load("clinic", physioClinicSchema);
  const home = load("home", physioHomeSchema);
  const conditions = load("conditions", physioConditionsSchema);
  assertConditionTeaserSlugsResolve(home, conditions);

  const bundle = {
    clinic: { ...clinic, phoneHref: phoneToTel(clinic.phone) },
    home,
    conditions,
    treatments: load("treatments", physioTreatmentsSchema),
    firstAppointment: load("first-appointment", physioFirstAppointmentSchema),
    pricing: load("pricing", physioPricingSchema),
    team: load("team", physioTeamSchema),
    trust: load("trust", physioTrustSchema),
    accessibility: load("accessibility", physioAccessibilitySchema),
  };

  return {
    ...bundle,
    stale: Object.keys(reviewedDates)
      .filter((name) => isStale(reviewedDates[name], today))
      .sort(),
  };
}

export type PhysioContent = ReturnType<typeof loadPhysioContent>;
