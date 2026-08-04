/**
 * Public CMS API — pages import from here, never from raw JSON.
 * Content lives in content/<site>/*.json; the Zod schemas in
 * schemas/ are the contract and a bad edit fails the build.
 */
export { loadGpContent, type GpContent } from "./gp";
export { loadCareContent, type CareContent } from "./care";
export { formatDate } from "./schemas/shared";
