import { z } from "zod";
import { isoDate, ukPhone } from "./shared";

/**
 * Collection schemas for a mixed NHS/private dental practice website.
 * One schema per content file under content/dental-practice/ — the
 * schema is the contract a practice manager's edits are validated
 * against at build time.
 */

const text = z.string().min(1);
const copy = z.string().min(1);

/** Every collection records when its content was last reviewed. */
const reviewed = isoDate;

/** GBP amount as displayed on the site: no "call for a quote", no POA —
    GDC Standard 2.4 requires prices visible without asking. */
export const gbpAmount = z
  .string()
  .regex(/^£\d{1,3}(,\d{3})*(\.\d{2})?$/, "expected a GBP amount like £27.90 or £2,500");

/** Register-style GDC number, always shown with an adjacent sample note. */
const gdcNumber = z
  .string()
  .regex(/^GDC \d{6}$/, "expected a GDC number like GDC 123456");

const kebabId = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case id");

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const dentalPracticeSchema = z.object({
  reviewed,
  name: text,
  strap: text,
  phone: ukPhone,
  emergencyPhone: ukPhone,
  address: text,
  openingTimes: z
    .array(z.object({ day: z.enum(DAYS), hours: text }))
    .refine(
      (times) => new Set(times.map((t) => t.day)).size === DAYS.length,
      "opening times must cover all seven days exactly once"
    )
    .refine((times) => times.length === DAYS.length, "one entry per day"),
  access: z.array(text).min(1),
  nhsAndPrivate: copy,
  acceptingNhsPatients: z.boolean(),
  cqc: z.object({
    status: text,
    ratingText: text,
    reportUrl: z.url(),
    sampleNote: text,
  }),
  outOfHoursCopy: copy,
});

export const dentalFeesNhsSchema = z.object({
  reviewed,
  effectiveFrom: isoDate,
  bands: z
    .array(z.object({ band: text, price: gbpAmount, covers: copy }))
    .min(3, "the NHS fee table needs Band 1, 2 and 3"),
  urgentPrice: gbpAmount,
  rules: z
    .array(z.object({ title: text, copy }))
    .min(2, "state at least the one-charge-per-course and free-repeat rules"),
  alwaysFreeItems: z.array(text).min(1),
  exemptionsSummary: copy,
  exemptionsLink: z.url(),
  englandOnlyNote: copy,
});

export const dentalFeesPrivateSchema = z.object({
  reviewed,
  items: z
    .array(
      z.object({
        treatment: text,
        priceFrom: gbpAmount,
        priceTo: gbpAmount,
        note: text.optional(),
      })
    )
    .min(1),
  guaranteeCopy: copy,
  planCopy: copy.optional(),
});

export const dentalTreatmentsSchema = z.object({
  reviewed,
  treatments: z
    .array(
      z.object({
        slug: kebabId,
        title: text,
        category: z.enum(["nhs", "private", "both"]),
        summary: copy,
        whatHappens: copy,
        priceFrom: gbpAmount,
        priceTo: gbpAmount,
        priceNote: text.optional(),
      })
    )
    .min(1),
});

export const dentalNewPatientsSchema = z.object({
  reviewed,
  journeySteps: z.array(z.object({ title: text, copy })).min(2),
  whatToBring: z.array(text).min(1),
  newPatientOffer: z.object({
    title: text,
    price: gbpAmount,
    includes: z.array(text).min(1),
  }),
  nervousPatients: z.object({
    intro: copy,
    accommodations: z
      .array(text)
      .min(2, "name at least two concrete accommodations, not a generic reassurance"),
    sedationCopy: copy,
  }),
});

export const dentalUrgentSchema = z.object({
  reviewed,
  sameDayPolicy: copy,
  whenWeAreClosed: copy,
  urgentBandPrice: gbpAmount,
  goToAeIf: z.array(text).min(1),
});

export const dentalTeamSchema = z.object({
  reviewed,
  groups: z
    .array(
      z.object({
        group: text,
        members: z
          .array(
            z.object({
              name: text,
              role: text,
              qualifications: text,
              countryOfQualification: text,
              gdcNumber,
              gdcSampleNote: text,
            })
          )
          .min(1),
      })
    )
    .min(1),
});

export const dentalComplaintsSchema = z.object({
  reviewed,
  intro: copy,
  practiceStep: copy,
  nhsRoute: z.object({
    steps: z.array(text).min(1),
    escalation: copy,
  }),
  privateRoute: z.object({
    steps: z.array(text).min(1),
    escalation: copy,
  }),
  gdcNote: copy,
});

/** The statutory accessibility-statement sections (PSBAR Reg 7 + GDS structure). */
export const dentalAccessibilitySchema = z.object({
  reviewed,
  compliance: copy,
  features: z.array(text).min(1),
  nonAccessible: z.array(text).min(1),
  testing: copy,
  reporting: z.object({ copy, email: z.email() }),
  enforcement: copy,
  thirdParty: copy,
  noOverlay: copy,
});

export type DentalPractice = z.infer<typeof dentalPracticeSchema>;
export type DentalFeesNhs = z.infer<typeof dentalFeesNhsSchema>;
export type DentalFeesPrivate = z.infer<typeof dentalFeesPrivateSchema>;
export type DentalTreatments = z.infer<typeof dentalTreatmentsSchema>;
export type DentalNewPatients = z.infer<typeof dentalNewPatientsSchema>;
export type DentalUrgent = z.infer<typeof dentalUrgentSchema>;
export type DentalTeam = z.infer<typeof dentalTeamSchema>;
export type DentalComplaints = z.infer<typeof dentalComplaintsSchema>;
export type DentalAccessibility = z.infer<typeof dentalAccessibilitySchema>;
