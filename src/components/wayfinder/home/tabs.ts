/**
 * Roving-focus index for the keys the WAI-ARIA tabs pattern expects:
 * arrows move and wrap, Home and End jump to the ends. Anything else
 * returns null so the key keeps its default behaviour.
 */
export function nextTabIndex(key: string, current: number, count: number): number | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
