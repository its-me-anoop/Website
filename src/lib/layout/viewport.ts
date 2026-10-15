/**
 * Viewport conditions the layout adapts to, kept in one place. Each is
 * also a Tailwind variant of the same name in globals.css (a unit test
 * keeps the two in step), so components can write `roomy:…` in markup
 * and reuse the exact query where code needs it, such as image `sizes`.
 *
 * Foldables: Safari on a folding iPhone is expected to see only a
 * resize, so the layout responds to width, aspect ratio and orientation.
 * The viewport-segment query is a bonus for browsers that report the
 * fold; everywhere else it simply never matches.
 */
export const viewportQueries = {
  /** A finger rather than a mouse: tap targets grow to 44px. */
  touch: "(pointer: coarse)",
  /** Wide enough and square enough for a two-column hero: an unfolded
      foldable, a tablet, or a phone on its side. Folded phones stay single-column. */
  roomy: "(min-width: 600px) and (min-aspect-ratio: 2/3)",
  /** Landscape with room for three packages side by side. */
  wideLandscape: "(orientation: landscape) and (min-width: 860px)",
  /** A phone on its side: little height, so the hero trims its padding. */
  short: "(orientation: landscape) and (max-height: 540px)",
  /** The page spans both halves of a foldable with a reported fold. */
  spanning: "(horizontal-viewport-segments: 2)",
} as const;

/** `sizes` for the hero butterfly: 540px on desktop, about half the
    width in the roomy two-column hero, most of the width when stacked. */
export const heroArtSizes = `(min-width: 1024px) 540px, ${viewportQueries.roomy} 45vw, 90vw`;
