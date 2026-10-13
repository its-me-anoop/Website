/**
 * Pure maths behind the cursor and the ember shader, kept apart from
 * the DOM and WebGL code so it can be tested on its own.
 */

/** A coordinate as the cursor readout shows it: four digits, never negative. */
export function padCoord(n: number): string {
  const v = Math.max(0, Math.round(n));
  return String(v).padStart(4, "0").slice(-4);
}

/**
 * What the tag beside the cursor says: the hovered element's label with
 * an arrow, or the pointer's page position.
 */
export function cursorReadout(x: number, y: number, scrollY: number, label: string): string {
  return label ? `${label}  ↗` : `X ${padCoord(x)}   Y ${padCoord(y + scrollY)}`;
}

/**
 * Where a magnetic button should drift towards: a share of the pointer's
 * offset from the button's centre, fading to nothing at the edge of a
 * radius a little larger than the button.
 */
export function magneticTarget(
  dx: number,
  dy: number,
  width: number,
  height: number,
  active: boolean
): { x: number; y: number } {
  const radius = Math.max(width, height) * 0.9 + 30;
  const distance = Math.hypot(dx, dy);
  const pull = active && distance < radius ? 1 - distance / radius : 0;
  return { x: dx * 0.28 * pull, y: dy * 0.4 * pull };
}

/** Eases `from` towards `to` by `factor` of the remaining distance. */
export function approach(from: number, to: number, factor: number): number {
  return from + (to - from) * factor;
}

/**
 * Backing-store size for the shader canvas: half the displayed width,
 * capped, with the height following the box's aspect ratio. Never below
 * 2 × 2, which WebGL needs to draw at all.
 */
export function shaderSize(
  boxWidth: number,
  boxHeight: number,
  scale = 0.5,
  maxWidth = 760
): { width: number; height: number } {
  const width = Math.max(2, Math.round(Math.min(boxWidth * scale, maxWidth)));
  const height = Math.max(2, Math.round((width * boxHeight) / Math.max(1, boxWidth)));
  return { width, height };
}

/** Frame gate for a capped frame rate (33ms ≈ 30fps). */
export function frameDue(now: number, last: number, interval = 33): boolean {
  return now - last >= interval;
}
