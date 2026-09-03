import { AuditError } from "./types";
import { assertPublicHost } from "./guard";

/**
 * A careful fetch for untrusted third-party sites: manual redirects with
 * a per-hop public-host check, a hard timeout, a body size cap, and
 * timing that the performance checks read. Never throws anything but
 * `AuditError` for expected conditions.
 */

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 FlutterlyAudit/1.0 (+https://www.flutterly.co.uk/free-audit)";

const MAX_REDIRECTS = 6;

export type FetchedPage = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  headers: Headers;
  body: string;
  bytes: number;
  redirects: string[];
  ttfbMs: number;
  totalMs: number;
  truncated: boolean;
};

export type SafeFetchOptions = {
  timeoutMs?: number;
  maxBytes?: number;
  /** Follow redirects (default true). */
  follow?: boolean;
  method?: "GET" | "HEAD";
  accept?: string;
};

async function readCapped(
  res: Response,
  maxBytes: number
): Promise<{ text: string; bytes: number; truncated: boolean }> {
  if (!res.body) return { text: "", bytes: 0, truncated: false };
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      received += value.byteLength;
      if (received > maxBytes) {
        chunks.push(value.subarray(0, value.byteLength - (received - maxBytes)));
        truncated = true;
        await reader.cancel().catch(() => undefined);
        break;
      }
      chunks.push(value);
    }
  }
  const merged = new Uint8Array(Math.min(received, maxBytes));
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const charset = /charset=([\w-]+)/i.exec(res.headers.get("content-type") ?? "")?.[1];
  let text: string;
  try {
    text = new TextDecoder(charset ?? "utf-8", { fatal: false }).decode(merged);
  } catch {
    text = new TextDecoder("utf-8").decode(merged);
  }
  return { text, bytes: Math.min(received, maxBytes), truncated };
}

export async function safeFetch(
  input: string,
  {
    timeoutMs = 15000,
    maxBytes = 2 * 1024 * 1024,
    follow = true,
    method = "GET",
    accept = "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  }: SafeFetchOptions = {}
): Promise<FetchedPage> {
  const started = performance.now();
  const deadline = started + timeoutMs;
  const redirects: string[] = [];
  let current = new URL(input);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(current.hostname);

    const remaining = deadline - performance.now();
    if (remaining <= 0) throw new AuditError("timeout", "The site took too long to respond.");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), remaining);

    let res: Response;
    let ttfbMs: number;
    try {
      const hopStart = performance.now();
      res = await fetch(current.toString(), {
        method,
        redirect: "manual",
        signal: controller.signal,
        cache: "no-store",
        headers: {
          "user-agent": USER_AGENT,
          accept,
          "accept-language": "en-GB,en;q=0.9",
          "accept-encoding": "gzip, deflate, br",
        },
      });
      ttfbMs = Math.round(performance.now() - hopStart);
    } catch (err) {
      clearTimeout(timer);
      if ((err as Error)?.name === "AbortError") {
        throw new AuditError("timeout", "The site took too long to respond.");
      }
      const cause = (err as { cause?: { code?: string } })?.cause?.code ?? "";
      if (cause === "ENOTFOUND" || cause === "EAI_AGAIN") {
        throw new AuditError("dns_failed", "That domain could not be found.");
      }
      if (cause.startsWith("ERR_TLS") || cause === "CERT_HAS_EXPIRED" || cause === "DEPTH_ZERO_SELF_SIGNED_CERT" || cause === "UNABLE_TO_VERIFY_LEAF_SIGNATURE") {
        throw new AuditError(
          "unreachable",
          "The site's security certificate is invalid or expired, so browsers will warn visitors away."
        );
      }
      throw new AuditError("unreachable", "The site could not be reached.");
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      await res.body?.cancel().catch(() => undefined);
      clearTimeout(timer);
      if (!location) {
        throw new AuditError("http_error", `The site answered with a redirect (${res.status}) but no destination.`, res.status);
      }
      if (!follow) {
        return {
          requestedUrl: input,
          finalUrl: current.toString(),
          status: res.status,
          headers: res.headers,
          body: "",
          bytes: 0,
          redirects: [new URL(location, current).toString()],
          ttfbMs,
          totalMs: Math.round(performance.now() - started),
          truncated: false,
        };
      }
      let next: URL;
      try {
        next = new URL(location, current);
      } catch {
        throw new AuditError("http_error", "The site redirected to an invalid address.", res.status);
      }
      if (next.protocol !== "http:" && next.protocol !== "https:") {
        throw new AuditError("http_error", "The site redirected to a non-web address.", res.status);
      }
      redirects.push(next.toString());
      current = next;
      if (hop === MAX_REDIRECTS) {
        throw new AuditError("too_many_redirects", "The site redirected too many times.");
      }
      continue;
    }

    try {
      const { text, bytes, truncated } =
        method === "HEAD" ? { text: "", bytes: 0, truncated: false } : await readCapped(res, maxBytes);
      return {
        requestedUrl: input,
        finalUrl: current.toString(),
        status: res.status,
        headers: res.headers,
        body: text,
        bytes,
        redirects,
        ttfbMs,
        totalMs: Math.round(performance.now() - started),
        truncated,
      };
    } catch (err) {
      if ((err as Error)?.name === "AbortError") {
        throw new AuditError("timeout", "The page took too long to download.");
      }
      throw new AuditError("unreachable", "The page could not be downloaded.");
    } finally {
      clearTimeout(timer);
    }
  }

  throw new AuditError("too_many_redirects", "The site redirected too many times.");
}

/** Best-effort fetch of a supporting resource; returns null on any failure. */
export async function tryFetch(
  url: string,
  opts: SafeFetchOptions = {}
): Promise<FetchedPage | null> {
  try {
    return await safeFetch(url, { timeoutMs: 6000, maxBytes: 256 * 1024, ...opts });
  } catch {
    return null;
  }
}
