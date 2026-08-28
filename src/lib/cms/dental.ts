import { DEFAULT_ROOT, readCollection } from "./load";
import type { LoadOptions } from "./gp";
import {
  dentalAccessibilitySchema,
  dentalComplaintsSchema,
  dentalFeesNhsSchema,
  dentalFeesPrivateSchema,
  dentalNewPatientsSchema,
  dentalPracticeSchema,
  dentalTeamSchema,
  dentalTreatmentsSchema,
  dentalUrgentSchema,
  type DentalPractice,
} from "./schemas/dental";
import { formatDate, isStale, phoneToTel } from "./schemas/shared";

const SITE = "dental-practice";

/** Weekdays covered by the footer/hero opening-hours summary. Saturday
    and Sunday are surfaced separately via outOfHoursCopy, never folded
    into this range. */
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export type WeekdayHoursSegment = { label: string; hours: string };

/**
 * Group Monday–Friday opening hours into contiguous day-ranges that
 * share identical hours text — e.g. "Monday to Thursday" plus a
 * separate "Friday" line when Friday closes earlier. Looks each day up
 * by name rather than assuming array order, so a reordered
 * openingTimes array in the content file can't silently mislabel a
 * day's hours.
 */
export function summariseWeekdayHours(
  openingTimes: DentalPractice["openingTimes"]
): WeekdayHoursSegment[] {
  const hoursByDay = new Map(openingTimes.map((entry) => [entry.day, entry.hours]));
  const weekdayHours = WEEKDAYS.map((day) => {
    const hours = hoursByDay.get(day);
    if (hours === undefined) {
      throw new Error(`summariseWeekdayHours: missing opening hours for ${day}`);
    }
    return hours;
  });

  const segments: WeekdayHoursSegment[] = [];
  let start = 0;
  for (let i = 1; i <= weekdayHours.length; i++) {
    if (i === weekdayHours.length || weekdayHours[i] !== weekdayHours[start]) {
      segments.push({
        label: i - start === 1 ? WEEKDAYS[start] : `${WEEKDAYS[start]} to ${WEEKDAYS[i - 1]}`,
        hours: weekdayHours[start],
      });
      start = i;
    }
  }
  return segments;
}

/** The earlier of two ISO review dates. Used where a page renders more
    than one CMS collection and its freshness indicator must reflect
    the least-recently-reviewed content actually shown, not just
    whichever collection happens to be passed first. */
export function earlierReviewedDate(a: string, b: string): string {
  return a <= b ? a : b;
}

/** Load the validated Kennet Bridge Dental bundle with derived data:
    tel: hrefs, a display date for the NHS fee uprating, and a list of
    collections due for their annual content review. */
export function loadDentalContent(options: LoadOptions = {}) {
  const root = options.root ?? DEFAULT_ROOT;
  const today = options.today ?? new Date().toISOString().slice(0, 10);

  const practice = readCollection(SITE, "practice", dentalPracticeSchema, root);
  const feesNhs = readCollection(SITE, "fees-nhs", dentalFeesNhsSchema, root);
  const feesPrivate = readCollection(SITE, "fees-private", dentalFeesPrivateSchema, root);
  const treatments = readCollection(SITE, "treatments", dentalTreatmentsSchema, root);
  const newPatients = readCollection(SITE, "new-patients", dentalNewPatientsSchema, root);
  const urgent = readCollection(SITE, "urgent", dentalUrgentSchema, root);
  const team = readCollection(SITE, "team", dentalTeamSchema, root);
  const complaints = readCollection(SITE, "complaints", dentalComplaintsSchema, root);
  const accessibility = readCollection(SITE, "accessibility", dentalAccessibilitySchema, root);

  const reviewedDates: Record<string, string> = {
    practice: practice.reviewed,
    feesNhs: feesNhs.reviewed,
    feesPrivate: feesPrivate.reviewed,
    treatments: treatments.reviewed,
    newPatients: newPatients.reviewed,
    urgent: urgent.reviewed,
    team: team.reviewed,
    complaints: complaints.reviewed,
    accessibility: accessibility.reviewed,
  };

  return {
    practice: {
      ...practice,
      phoneHref: phoneToTel(practice.phone),
      emergencyPhoneHref: phoneToTel(practice.emergencyPhone),
      weekdayHours: summariseWeekdayHours(practice.openingTimes),
    },
    feesNhs: { ...feesNhs, effectiveFromDisplay: formatDate(feesNhs.effectiveFrom) },
    feesPrivate,
    treatments,
    newPatients,
    urgent,
    team,
    complaints,
    accessibility,
    stale: Object.keys(reviewedDates)
      .filter((name) => isStale(reviewedDates[name], today))
      .sort(),
  };
}

export type DentalContent = ReturnType<typeof loadDentalContent>;
