/**
 * Best-effort per-client rate limiting for booking creation: a sliding
 * window kept in module state. Per-instance on serverless, but it still
 * makes calendar flooding slow and noisy rather than trivial.
 */

const rateWindowMs = 10 * 60_000;
const rateLimitPerWindow = 5;
const buckets = new Map<string, number[]>();

export function clientKeyFrom(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < rateWindowMs);
  if (hits.length >= rateLimitPerWindow) {
    buckets.set(key, hits);
    return true;
  }
  hits.push(now);
  // Bound the map so rotating IPs cannot grow memory without limit.
  if (buckets.size > 10_000) buckets.clear();
  buckets.set(key, hits);
  return false;
}

/** Test hook: clears the sliding-window state between cases. */
export function resetRateLimiter(): void {
  buckets.clear();
}
