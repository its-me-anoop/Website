import { DEFAULT_ROOT, readCollection } from "./load";
import {
  careCareersSchema,
  careCareSchema,
  careFamiliesSchema,
  careHomeSchema,
  careLifeSchema,
} from "./schemas/care";
import { phoneToTel } from "./schemas/shared";
import type { LoadOptions } from "./gp";

const SITE = "care-home";

/** Load the validated care-home bundle with derived data. */
export function loadCareContent(options: LoadOptions = {}) {
  const root = options.root ?? DEFAULT_ROOT;
  const home = readCollection(SITE, "home", careHomeSchema, root);

  return {
    home: { ...home, phoneHref: phoneToTel(home.phone) },
    care: readCollection(SITE, "care", careCareSchema, root),
    life: readCollection(SITE, "life", careLifeSchema, root),
    families: readCollection(SITE, "families", careFamiliesSchema, root),
    careers: readCollection(SITE, "careers", careCareersSchema, root),
  };
}

export type CareContent = ReturnType<typeof loadCareContent>;
