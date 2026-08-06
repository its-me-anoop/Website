import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Owner authentication for the booking admin surface: a single bearer
 * token from BOOKING_ADMIN_TOKEN. Unset means the surface is off.
 */
export function adminConfigured(): boolean {
  return Boolean(process.env.BOOKING_ADMIN_TOKEN);
}

export function isAuthorisedAdmin(request: Request): boolean {
  const token = process.env.BOOKING_ADMIN_TOKEN;
  if (!token) return false;
  const header = request.headers.get("authorization") ?? "";
  const presented = header.replace(/^Bearer\s+/i, "");
  const a = createHash("sha256").update(presented).digest();
  const b = createHash("sha256").update(token).digest();
  return timingSafeEqual(a, b);
}
