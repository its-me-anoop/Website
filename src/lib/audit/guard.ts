import { lookup } from "node:dns/promises";
import { AuditError } from "./types";
import { isBlockedHostname, isIpLiteral, isPrivateAddress } from "./url";

/**
 * Resolves a hostname and refuses to continue if any of its addresses is
 * private, loopback or otherwise non-public. Called for the visitor's URL
 * and again for every redirect hop, so a public host cannot bounce the
 * auditor onto an internal service.
 */
export async function assertPublicHost(host: string): Promise<void> {
  const bare = host.replace(/^\[|\]$/g, "");

  if (isBlockedHostname(bare)) {
    throw new AuditError("blocked_host", "That address is not a public website.");
  }

  if (isIpLiteral(bare)) {
    if (isPrivateAddress(bare)) {
      throw new AuditError("blocked_host", "Private network addresses cannot be audited.");
    }
    return;
  }

  let records: { address: string }[];
  try {
    records = await lookup(bare, { all: true, verbatim: true });
  } catch {
    throw new AuditError(
      "dns_failed",
      "That domain could not be found. Check the spelling and try again."
    );
  }

  if (records.length === 0) {
    throw new AuditError("dns_failed", "That domain does not point anywhere yet.");
  }

  if (records.some((r) => isPrivateAddress(r.address))) {
    throw new AuditError("blocked_host", "That address resolves to a private network.");
  }
}
