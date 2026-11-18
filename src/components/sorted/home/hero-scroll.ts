/*
 * How the hero's sticker wall follows the scroll. One number, `q`, runs
 * from 0 (everything as found) through one unit per sticker (the dot
 * lands on sticker n during unit n and it straightens) and then
 * `LETTERS` more, while the letters of "sorted." settle. CSS reads `q`
 * as `--q` and works out each sticker's own progress from it.
 */

/** Units of `q`, after the last sticker, in which the headline's letters settle. */
export const LETTERS = 1.5;

/** Share of the scroll distance in which the sorting happens; the rest holds the finished wall. */
const ACTIVE = 0.9;

/** `q` for a hero scrolled `scrolled` pixels of the `distance` its scene lasts, with `count` stickers showing. */
export function scrollQ(scrolled: number, distance: number, count: number): number {
  const end = count + LETTERS;
  if (distance <= 0) return end;
  const progress = Math.max(0, Math.min(1, scrolled / (distance * ACTIVE)));
  return progress * end;
}

/** The sticker being fixed at `q`, or null before the first and after the last. */
export function activePiece(q: number, count: number): number | null {
  if (q <= 0 || q >= count) return null;
  return Math.floor(q);
}

export type HeroState = "mess" | "sorting" | "sorted";

export function heroState(q: number, count: number): HeroState {
  if (q <= 0) return "mess";
  return q >= count + LETTERS ? "sorted" : "sorting";
}
