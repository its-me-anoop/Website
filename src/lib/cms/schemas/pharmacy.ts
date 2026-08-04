import { z } from "zod";
import { isoDate, ukPhone } from "./shared";

/**
 * Collection schemas for the Willowbrook Pharmacy demo. One schema per
 * content file under content/pharmacy/ — the schema is the contract a
 * pharmacy manager's edits are validated against at build time.
 */

const text = z.string().min(1);
const copy = z.string().min(1);

/** Every collection records when its content was last reviewed (NHS pattern). */
const reviewed = isoDate;

const taskSchema = z.object({ title: text, copy, href: text });
const alertSchema = z.object({ title: text, copy, expires: isoDate.optional() });
const stepSchema = z.object({ title: text, copy });

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** Structural pattern for a possible lunch closure — never free-text hours. */
const openingTimeSchema = z.object({
  day: z.enum(DAYS),
  morning: text,
  afternoon: text,
});

/** Site facts and the regulatory block that feeds every page's footer. */
export const pharmacySchema = z.object({
  reviewed,
  name: text,
  strap: text,
  phone: ukPhone,
  email: z.email(),
  address: text,
  neighbourhood: text,
  establishedCopy: copy,
  openingTimes: z
    .array(openingTimeSchema)
    .refine(
      (times) => new Set(times.map((t) => t.day)).size === DAYS.length,
      "opening times must cover all seven days exactly once"
    )
    .refine((times) => times.length === DAYS.length, "one entry per day"),
  bankHolidayCopy: copy,
  deliveryOffered: z.boolean(),
  deliveryCopy: copy,
  consultationRoomCopy: copy,
  legal: z.object({
    entityName: text,
    companyNumber: text,
    gphcPremisesNumber: text,
    sampleNote: text,
  }),
  superintendent: z.object({
    name: text,
    gphcNumber: text,
    sampleNote: text,
  }),
});

export const pharmacyHomeSchema = z.object({
  reviewed,
  hero: z.object({ title: text, copy }),
  primaryTasks: z
    .array(taskSchema)
    .length(2, "the home page leads with exactly two primary tasks: Pharmacy First and repeats"),
  alert: alertSchema.nullable(),
});

export const pharmacyFirstSchema = z.object({
  reviewed,
  intro: copy,
  conditions: z
    .array(
      z.object({
        condition: text,
        plainName: text,
        ages: text,
        note: copy,
      })
    )
    .length(7, "NHS Pharmacy First covers exactly seven conditions"),
  howItWorks: z.array(stepSchema).min(2),
  referralRoutes: z.array(text).min(1),
  freeOnNhsCopy: copy,
  reviewedPathwaysNote: copy,
});

/** The load-bearing field: renders the NHS (free) vs Private (paid) badge. */
const fundingSchema = z.enum(["nhs-free", "private-paid"]);

export const pharmacyServicesSchema = z.object({
  reviewed,
  services: z
    .array(
      z.object({
        slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug (used as the anchor)"),
        title: text,
        funding: fundingSchema,
        walkIn: z.boolean(),
        usesConsultationRoom: z.boolean(),
        seasonal: z.boolean(),
        summary: copy,
        details: copy,
      })
    )
    .min(1),
});

export const pharmacyPrescriptionsSchema = z.object({
  reviewed,
  nhsAppSteps: z.array(stepSchema).min(2),
  otherWaysToOrder: z.array(stepSchema).min(1),
  readyTimescaleCopy: copy,
  deliveryCopy: copy,
  emergencySupplyCopy: copy,
});

export const pharmacyTeamSchema = z.object({
  reviewed,
  members: z
    .array(
      z.object({
        name: text,
        role: text,
        gphcNumber: text.optional(),
        sampleNote: text.optional(),
        bio: copy,
      })
    )
    .min(1),
  responsiblePharmacistExplainer: copy,
});

export const pharmacyFeedbackSchema = z.object({
  reviewed,
  howToRaise: z.array(stepSchema).min(1),
  nhsServiceComplaintsRoute: copy,
  medicineSafetyCopy: copy,
  responseCommitment: copy,
});

/** The statutory accessibility-statement sections (PSBAR Reg 7 + GDS structure). */
export const pharmacyAccessibilitySchema = z.object({
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

export type Pharmacy = z.infer<typeof pharmacySchema>;
export type PharmacyHome = z.infer<typeof pharmacyHomeSchema>;
export type PharmacyFirst = z.infer<typeof pharmacyFirstSchema>;
export type PharmacyServices = z.infer<typeof pharmacyServicesSchema>;
export type PharmacyPrescriptions = z.infer<typeof pharmacyPrescriptionsSchema>;
export type PharmacyTeam = z.infer<typeof pharmacyTeamSchema>;
export type PharmacyFeedback = z.infer<typeof pharmacyFeedbackSchema>;
export type PharmacyAccessibility = z.infer<typeof pharmacyAccessibilitySchema>;
