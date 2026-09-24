/**
 * Simulated viewing conditions for the homepage vision lens. Each one
 * maps to a CSS backdrop filter in globals.css (`.s-lens[data-condition]`).
 * These are approximations for illustration, and the copy says so.
 */

export type ConditionId = "none" | "blur" | "cataract" | "sunlight" | "mono";

export type Condition = {
  id: ConditionId;
  label: string;
  description: string;
};

export const conditions: readonly Condition[] = [
  { id: "none", label: "As designed", description: "The page as it was designed." },
  {
    id: "blur",
    label: "Blurred vision",
    description: "Uncorrected short sight, or reading glasses left at home.",
  },
  {
    id: "cataract",
    label: "Cataracts",
    description: "Clouded, yellowed and lower in contrast, common in older patients.",
  },
  {
    id: "sunlight",
    label: "Phone in sunlight",
    description: "Glare washes out contrast, as it does in a car park at midday.",
  },
  {
    id: "mono",
    label: "No colour",
    description: "Colour carries no meaning here, so nothing should depend on it.",
  },
] as const;

export function conditionById(id: string): Condition {
  return conditions.find((c) => c.id === id) ?? conditions[0];
}

type Point = { x: number; y: number };
type Box = { width: number; height: number };

/**
 * Top-left of a square lens of `size` centred on `pointer`, clamped so
 * at most half of it hangs outside the box.
 */
export function lensPosition(pointer: Point, box: Box, size: number): Point {
  const half = size / 2;
  const clamp = (v: number, max: number) => Math.min(Math.max(v, 0), max);
  return { x: clamp(pointer.x, box.width) - half, y: clamp(pointer.y, box.height) - half };
}
