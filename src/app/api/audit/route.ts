import { NextResponse, type NextRequest } from "next/server";
import { isSector, runAudit } from "@/lib/audit/run";
import { AuditError, type AuditReport, type AuditResponse } from "@/lib/audit/types";
import { normaliseUrl } from "@/lib/audit/url";

/**
 * GET /api/audit?url=… — runs the instant audit and returns the report.
 *
 * Fetching arbitrary third-party sites from the server needs a few
 * guard rails: a per-IP rate limit, a short result cache so the same
 * address is not hammered by refreshes, and hard timeouts inside the
 * engine. Both stores are in-memory: best effort on serverless, which
 * is fine for a marketing tool.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 8;
const CACHE_TTL_MS = 10 * 60_000;
const CACHE_MAX = 200;

const hits = new Map<string, number[]>();
const cache = new Map<string, { at: number; report: AuditReport }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function fromCache(key: string): AuditReport | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.report;
}

function toCache(key: string, report: AuditReport) {
  if (cache.size >= CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(key, { at: Date.now(), report });
}

function statusFor(code: AuditError["code"]): number {
  switch (code) {
    case "invalid_url":
    case "blocked_host":
      return 400;
    case "dns_failed":
    case "unreachable":
    case "http_error":
    case "not_html":
    case "too_large":
    case "too_many_redirects":
      return 422;
    case "timeout":
      return 504;
    case "rate_limited":
      return 429;
    default:
      return 500;
  }
}

function json(body: AuditResponse, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "private, no-store" },
  });
}

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("url") ?? "";
  const sectorParam = req.nextUrl.searchParams.get("sector");
  const sector = isSector(sectorParam) ? sectorParam : undefined;

  let key: string;
  try {
    key = `${normaliseUrl(input).toString()}#${sector ?? "auto"}`;
  } catch (err) {
    if (err instanceof AuditError) {
      return json({ ok: false, error: { code: err.code, message: err.message } }, statusFor(err.code));
    }
    return json({ ok: false, error: { code: "invalid_url", message: "That does not look like a website address." } }, 400);
  }

  const cached = fromCache(key);
  if (cached) return json({ ok: true, report: cached });

  if (rateLimited(clientIp(req))) {
    return json(
      {
        ok: false,
        error: {
          code: "rate_limited",
          message: "That is a lot of audits in one minute. Give it a moment and try again.",
        },
      },
      429
    );
  }

  try {
    const report = await runAudit(input, { sector });
    toCache(key, report);
    return json({ ok: true, report });
  } catch (err) {
    if (err instanceof AuditError) {
      return json(
        { ok: false, error: { code: err.code, message: err.message, status: err.status } },
        statusFor(err.code)
      );
    }
    console.error("[audit] unexpected failure", err);
    return json(
      {
        ok: false,
        error: {
          code: "internal",
          message: "Something went wrong running the audit. Try again, or ask for the written review instead.",
        },
      },
      500
    );
  }
}
