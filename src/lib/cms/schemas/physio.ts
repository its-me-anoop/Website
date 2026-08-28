import { z } from "zod";
import { isoDate, ukPhone } from "./shared";

/**
 * Collection schemas for the Forbury Physiotherapy demo site. One schema
 * per content file under content/physio-clinic/ — the schema is the
 * contract a clinic manager's edits are validated against at build time.
 */

const text = z.string().min(1);
const copy = z.string().min(1);

/** Every collection records when its content was last reviewed. */
const reviewed = isoDate;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** Kebab-case slug, used as an anchor and a route fragment. */
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "expected a kebab-case slug");

/** ASA/CAP-safe copy: physiotherapy outcomes are assessed and managed,
    never promised, cured or guaranteed — the schema enforces the claim,
    not just the house style guide. */
const asaSafeCopy = copy.refine(
  (value) => !/\b(cures?|cured|curing|guarantee[sd]?)\b/i.test(value),
  'avoid outcome-guarantee language ("cure", "guaranteed") — describe assessment and management instead'
);

/** "Chartered" is a Chartered Society of Physiotherapy title that
    attaches to an individual member, never to a clinic's whole-practice
    identity — a genuine CSP brand-guideline rule, enforced structurally
    so a careless content edit can't reintroduce it. */
const nonCharteredIdentity = text.refine(
  (value) => !/chartered/i.test(value),
  '"Chartered" is a per-practitioner CSP title — it must not appear in the clinic\'s name or strapline'
);

const stepSchema = z.object({ title: text, copy });

export const physioClinicSchema = z.object({
  reviewed,
  name: nonCharteredIdentity,
  strap: nonCharteredIdentity,
  phone: ukPhone,
  email: z.email(),
  address: text,
  access: z.array(text).min(1),
  bookingCopy: copy,
  nhsPositioningLine: copy,
  insurersCopy: copy,
  openingTimes: z
    .array(z.object({ day: z.enum(DAYS), hours: text }))
    .refine(
      (times) => new Set(times.map((t) => t.day)).size === DAYS.length,
      "opening times must cover all seven days exactly once"
    )
    .refine((times) => times.length === DAYS.length, "one entry per day"),
});

export const physioHomeSchema = z.object({
  reviewed,
  hero: z.object({ title: text, copy }),
  primaryTasks: z
    .array(z.object({ title: text, copy, href: text }))
    .min(3, "the home page leads with book, prices and first-visit tasks"),
  /** `slug` is an explicit reference to a `physioConditionsSchema` entry
      (cross-checked in physio.ts, since one collection's schema can't see
      another's data) — deep-linking the home page's condition index to
      its anchor on /conditions. Omit `slug` for a teaser line that
      compresses more than one condition (e.g. "Knee, hip and ankle
      problems"); it then links to the plain index instead of guessing an
      anchor from title text. */
  conditionsTeaser: z.array(z.object({ label: text, slug: slug.optional() })).min(3),
});

export const physioConditionsSchema = z.object({
  reviewed,
  conditions: z
    .array(
      z.object({
        slug,
        title: text,
        plainSummary: asaSafeCopy,
        whatWeAssess: asaSafeCopy,
        typicalApproach: asaSafeCopy,
      })
    )
    .min(8, "the standard MSK taxonomy covers at least eight condition groups"),
});

export const physioTreatmentsSchema = z.object({
  reviewed,
  approaches: z
    .array(z.object({ title: text, copy: asaSafeCopy, whoItHelps: asaSafeCopy }))
    .min(4),
});

export const physioFirstAppointmentSchema = z.object({
  reviewed,
  duration: text,
  beats: z
    .array(z.object({ title: text, copy }))
    .length(4, "the first appointment follows exactly four beats"),
  whatToWear: z.array(z.object({ bodyArea: text, suggestion: text })).min(1),
  whatToBring: z.array(text).min(1),
  selfPay: z.object({ steps: z.array(stepSchema).min(2) }),
  insured: z.object({
    steps: z.array(stepSchema).min(2),
    preAuthCopy: copy,
    excessCopy: copy,
    gpReferralCopy: copy,
  }),
});

export const physioPricingSchema = z.object({
  reviewed,
  sessions: z
    .array(
      z.object({ type: text, duration: text, price: text, includes: copy })
    )
    .min(2, "the price table covers at least an initial assessment and a follow-up"),
  courseLengthCopy: copy,
  insuranceNotes: z.array(text).min(1),
  cancellation: z.object({
    noticeHours: z.number().int().positive(),
    policyCopy: copy,
    insurerNote: copy,
  }),
});

export const physioTeamSchema = z.object({
  reviewed,
  practitioners: z
    .array(
      z.object({
        name: text,
        title: text,
        hcpcNumber: z
          .string()
          .regex(/^PH\d{6}$/, "expected an HCPC number like PH123456"),
        hcpcSampleNote: copy,
        /** Sits on the person, not the clinic — structurally encodes the
            CSP brand rule that "Chartered" is an individual title. */
        cspMember: z.boolean(),
        qualifications: z
          .array(
            z.object({
              award: text,
              institution: text,
              year: z.number().int().gte(1980),
            })
          )
          .min(1),
        specialInterests: z.array(text).min(1),
        bio: copy,
      })
    )
    .min(2),
});

export const physioTrustSchema = z.object({
  reviewed,
  blocks: z
    .array(z.object({ title: text, copy }))
    .min(5, "protected title, HCPC-not-CQC, CSP, indemnity, DBS and data protection"),
  verifyRegisterCopy: copy,
});

/** The statutory accessibility-statement sections (PSBAR Reg 7 + GDS structure). */
export const physioAccessibilitySchema = z.object({
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

export type PhysioClinic = z.infer<typeof physioClinicSchema>;
export type PhysioHome = z.infer<typeof physioHomeSchema>;
export type PhysioConditions = z.infer<typeof physioConditionsSchema>;
export type PhysioTreatments = z.infer<typeof physioTreatmentsSchema>;
export type PhysioFirstAppointment = z.infer<typeof physioFirstAppointmentSchema>;
export type PhysioPricing = z.infer<typeof physioPricingSchema>;
export type PhysioTeam = z.infer<typeof physioTeamSchema>;
export type PhysioTrust = z.infer<typeof physioTrustSchema>;
export type PhysioAccessibility = z.infer<typeof physioAccessibilitySchema>;
