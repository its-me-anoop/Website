import { AuditError } from "./types";

/**
 * URL handling for the audit. Two jobs: turn whatever a visitor typed
 * ("ourpractice.nhs.uk", "www.example.co.uk/about") into a fetchable
 * https URL, and refuse anything that would make the server request a
 * private or local address (SSRF). IP classification is pure so it can
 * be unit-tested; DNS resolution lives in `guard.ts`.
 */

const MAX_URL_LENGTH = 2048;

export function normaliseUrl(input: string): URL {
  const raw = input.trim();
  if (!raw) throw new AuditError("invalid_url", "Enter a website address to audit.");
  if (raw.length > MAX_URL_LENGTH) {
    throw new AuditError("invalid_url", "That address is too long to be a website.");
  }
  if (/\s/.test(raw)) {
    throw new AuditError("invalid_url", "A website address cannot contain spaces.");
  }

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new AuditError("invalid_url", "That does not look like a website address.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new AuditError("invalid_url", "Only http and https websites can be audited.");
  }
  if (url.username || url.password) {
    throw new AuditError("invalid_url", "Addresses with a username or password are not supported.");
  }

  const host = url.hostname.toLowerCase();
  if (!host || host === "localhost" || host.endsWith(".localhost")) {
    throw new AuditError("blocked_host", "Local addresses cannot be audited.");
  }
  if (!isIpLiteral(host) && !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host.replace(/\.$/, ""))) {
    throw new AuditError(
      "invalid_url",
      "Enter a full domain name, such as yourpractice.nhs.uk."
    );
  }

  url.hash = "";
  url.hostname = host;
  return url;
}

/** Bare host plus path for display; drops the scheme and trailing slash. */
export function displayUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname === "/" ? "" : u.pathname;
    return `${u.host}${path}${u.search}`;
  } catch {
    return url;
  }
}

export function isIpLiteral(host: string): boolean {
  return isIPv4(host) || isIPv6(host.replace(/^\[|\]$/g, ""));
}

export function isIPv4(host: string): boolean {
  const parts = host.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
}

export function isIPv6(host: string): boolean {
  return host.includes(":") && /^[0-9a-f:.]+$/i.test(host);
}

/**
 * True when an address is loopback, link-local, private, multicast,
 * unspecified, or otherwise not a public internet host. Covers IPv4,
 * IPv6, and IPv4-mapped IPv6.
 */
export function isPrivateAddress(address: string): boolean {
  const ip = address.replace(/^\[|\]$/g, "").toLowerCase();

  if (isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 0) return true; // 0.0.0.0/8 "this network"
    if (a === 10) return true; // 10/8
    if (a === 127) return true; // loopback
    if (a === 169 && b === 254) return true; // link-local / cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16/12
    if (a === 192 && b === 168) return true; // 192.168/16
    if (a === 100 && b >= 64 && b <= 127) return true; // shared address space
    if (a === 192 && b === 0) return true; // 192.0.0/24 and 192.0.2/24 test-net
    if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
    if (a === 198 && b === 51) return true; // test-net-2
    if (a === 203 && b === 0) return true; // test-net-3
    if (a >= 224) return true; // multicast + reserved + broadcast
    return false;
  }

  if (ip.includes(":")) {
    if (ip === "::" || ip === "::1") return true;
    // IPv4-mapped (::ffff:a.b.c.d) — classify the embedded IPv4.
    const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateAddress(mapped[1]);
    // Also handle ::ffff:XXXX:XXXX hex form.
    const mappedHex = ip.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
    if (mappedHex) {
      const hi = parseInt(mappedHex[1], 16);
      const lo = parseInt(mappedHex[2], 16);
      return isPrivateAddress(`${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`);
    }
    if (ip.startsWith("fe8") || ip.startsWith("fe9") || ip.startsWith("fea") || ip.startsWith("feb")) {
      return true; // link-local fe80::/10
    }
    if (ip.startsWith("fc") || ip.startsWith("fd")) return true; // unique local fc00::/7
    if (ip.startsWith("ff")) return true; // multicast
    if (ip.startsWith("2001:db8")) return true; // documentation
    if (ip.startsWith("64:ff9b")) return true; // NAT64 well-known prefix
    if (ip.startsWith("::")) return true; // other IPv4-compatible / reserved
    return false;
  }

  // Not an IP literal at all: caller should resolve DNS first.
  return false;
}

/** Hostnames that are never public, regardless of what DNS says. */
export function isBlockedHostname(host: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, "");
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h.endsWith(".local") || h.endsWith(".internal") || h.endsWith(".lan")) return true;
  if (h.endsWith(".home.arpa") || h.endsWith(".in-addr.arpa") || h.endsWith(".ip6.arpa")) return true;
  if (h === "metadata.google.internal" || h === "instance-data") return true;
  return false;
}
