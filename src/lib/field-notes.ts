/** Buyer-journey routes that render inside RedesignShell (see DESIGN.md).
 *  `/book/[eventType]` uses Studio + Cal.com when configured, else Bloom.
 *  `/book/manage` stays Bloom. */
export const FIELD_NOTES_PATHS = [
  "/",
  "/gp-websites",
  "/care-home-websites",
  "/packages",
  "/about",
  "/contact",
  "/services",
  "/book",
] as const;

export function isFieldNotesPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return (FIELD_NOTES_PATHS as readonly string[]).includes(path);
}
