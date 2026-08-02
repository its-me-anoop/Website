export const cmsSections = [
  "overview",
  "pages",
  "services",
  "people",
  "notices",
  "media",
  "practice",
  "access",
] as const;

export type CmsSectionName = (typeof cmsSections)[number];
