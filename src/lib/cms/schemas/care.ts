import { z } from "zod";
import { isoDate, ukPhone } from "./shared";

/** Collection schemas for the care-home demo site. */

const text = z.string().min(1);
const copy = z.string().min(1);
const reviewed = isoDate;

export const careHomeSchema = z.object({
  reviewed,
  name: text,
  strap: text,
  phone: ukPhone,
  address: text,
  email: z.email(),
  manager: text,
});

export const careCareSchema = z.object({
  reviewed,
  careTypes: z
    .array(z.object({ title: text, copy, tone: z.enum(["sage", "terra", "cream"]) }))
    .min(1),
  inspection: z.object({
    rating: text,
    note: copy,
    areas: z.array(z.object({ area: text, rating: text })).min(1),
  }),
});

export const careLifeSchema = z.object({
  reviewed,
  moments: z.array(z.object({ title: text, copy })).min(1),
});

export const careFamiliesSchema = z.object({
  reviewed,
  steps: z.array(z.object({ title: text, copy })).min(2),
  faqs: z.array(z.object({ q: text, a: copy })).min(1),
});

export const careCareersSchema = z.object({
  reviewed,
  roles: z.array(z.object({ title: text, detail: text, copy })).min(1),
});

export type CareHome = z.infer<typeof careHomeSchema>;
export type CareCare = z.infer<typeof careCareSchema>;
export type CareLife = z.infer<typeof careLifeSchema>;
export type CareFamilies = z.infer<typeof careFamiliesSchema>;
export type CareCareers = z.infer<typeof careCareersSchema>;
