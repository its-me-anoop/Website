import { z } from "zod";
import { isoDate, ukPhone } from "./shared";

/**
 * Collection schemas for a GP practice website. One schema per content
 * file under content/<site>/ — the schema is the contract a practice
 * manager's edits are validated against at build time.
 */

const text = z.string().min(1);
const copy = z.string().min(1);

/** Every collection records when its content was last reviewed (NHS pattern). */
const reviewed = isoDate;

const taskSchema = z.object({ title: text, copy, href: text });
const alertSchema = z.object({ title: text, copy, expires: isoDate.optional() });

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const gpPracticeSchema = z.object({
  reviewed,
  name: text,
  strap: text,
  phone: ukPhone,
  address: text,
  openingTimes: z
    .array(z.object({ day: z.enum(DAYS), hours: text }))
    .refine(
      (times) => new Set(times.map((t) => t.day)).size === DAYS.length,
      "opening times must cover all seven days exactly once"
    )
    .refine((times) => times.length === DAYS.length, "one entry per day"),
});

export const gpHomeSchema = z.object({
  reviewed,
  alert: alertSchema.nullable(),
  primaryTasks: z.array(taskSchema).length(2, "the home page leads with exactly two primary tasks"),
  moreTasks: z.array(taskSchema).min(2).max(4),
  wellbeing: z.array(taskSchema).min(1),
});

export const gpNewsSchema = z.object({
  reviewed,
  items: z.array(z.object({ date: isoDate, title: text, copy })).min(1),
});

export const gpTeamSchema = z.object({
  reviewed,
  groups: z
    .array(
      z.object({
        group: text,
        members: z.array(z.object({ name: text, role: text })).min(1),
      })
    )
    .min(1),
  gpEarningsCopy: copy,
});

export const gpServicesSchema = z.object({
  reviewed,
  groups: z.array(z.object({ title: text, items: z.array(text).min(1) })).min(1),
  selfReferral: z.array(z.object({ title: text, copy })).min(1),
});

export const gpPracticeInfoSchema = z.object({
  reviewed,
  policies: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case id (used as the anchor)"),
        title: text,
        copy,
      })
    )
    .min(1),
});

export const gpFaqsSchema = z.object({
  reviewed,
  items: z.array(z.object({ q: text, a: copy })).min(1),
});

export const gpAppointmentsSchema = z.object({
  reviewed,
  routes: z.array(z.object({ title: text, copy })).min(2),
  urgentToday: z.array(text).min(1),
  emergencyNow: z.array(text).min(1),
});

export const gpPrescriptionsSchema = z.object({
  reviewed,
  steps: z.array(z.object({ title: text, copy })).min(2),
});

export type GpPractice = z.infer<typeof gpPracticeSchema>;
export type GpHome = z.infer<typeof gpHomeSchema>;
export type GpNews = z.infer<typeof gpNewsSchema>;
export type GpTeam = z.infer<typeof gpTeamSchema>;
export type GpServices = z.infer<typeof gpServicesSchema>;
export type GpPracticeInfo = z.infer<typeof gpPracticeInfoSchema>;
export type GpFaqs = z.infer<typeof gpFaqsSchema>;
export type GpAppointments = z.infer<typeof gpAppointmentsSchema>;
export type GpPrescriptions = z.infer<typeof gpPrescriptionsSchema>;
