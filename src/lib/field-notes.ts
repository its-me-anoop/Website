/** Buyer-journey and Studio chrome routes (see DESIGN.md).
 *  Cookie banner is suppressed here; policy remains at /cookie-policy.
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
  "/accessibility",
  "/cookie-policy",
  "/privacy",
] as const;

export function isFieldNotesPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if ((FIELD_NOTES_PATHS as readonly string[]).includes(path)) return true;
  // Studio Cal deep links share the dark shell; keep the cookie chip off them.
  if (path.startsWith("/book/") && path !== "/book/manage") return true;
  return false;
}
