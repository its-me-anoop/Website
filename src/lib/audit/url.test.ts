import { describe, expect, it } from "vitest";
import { AuditError } from "./types";
import { displayUrl, isBlockedHostname, isPrivateAddress, normaliseUrl } from "./url";

describe("normaliseUrl", () => {
  it("adds https to a bare domain and lower-cases the host", () => {
    expect(normaliseUrl("WWW.Example.co.uk").toString()).toBe("https://www.example.co.uk/");
    expect(normaliseUrl("  example.com/about  ").toString()).toBe("https://example.com/about");
  });

  it("keeps an explicit http scheme, path and query, and drops the hash", () => {
    expect(normaliseUrl("http://example.com/a?b=1#c").toString()).toBe("http://example.com/a?b=1");
  });

  it.each(["", "   ", "not a url", "example", "ftp://example.com", "https://user:pw@example.com", "javascript:alert(1)"])(
    "rejects %j",
    (input) => {
      expect(() => normaliseUrl(input)).toThrow(AuditError);
    }
  );

  it("rejects local hosts before any network activity", () => {
    expect(() => normaliseUrl("localhost")).toThrow(/local/i);
    expect(() => normaliseUrl("http://app.localhost:3000")).toThrow(/local/i);
  });

  it("accepts IP literals so the guard can classify them", () => {
    expect(normaliseUrl("http://8.8.8.8/").hostname).toBe("8.8.8.8");
  });
});

describe("isPrivateAddress", () => {
  it.each([
    "127.0.0.1",
    "10.1.2.3",
    "172.16.0.1",
    "172.31.255.255",
    "192.168.1.1",
    "169.254.169.254",
    "0.0.0.0",
    "100.64.0.1",
    "224.0.0.1",
    "255.255.255.255",
    "::1",
    "::",
    "fe80::1",
    "fd12:3456::1",
    "fc00::1",
    "::ffff:127.0.0.1",
    "::ffff:10.0.0.1",
    "::ffff:7f00:1",
    "64:ff9b::a00:1",
  ])("treats %s as private", (ip) => {
    expect(isPrivateAddress(ip)).toBe(true);
  });

  it.each(["8.8.8.8", "1.1.1.1", "172.32.0.1", "172.15.0.1", "192.169.0.1", "2606:4700:4700::1111", "2a00:1450:4009:81f::200e"])(
    "treats %s as public",
    (ip) => {
      expect(isPrivateAddress(ip)).toBe(false);
    }
  );
});

describe("isBlockedHostname", () => {
  it.each(["localhost", "foo.localhost", "printer.local", "db.internal", "router.lan", "metadata.google.internal"])(
    "blocks %s",
    (host) => expect(isBlockedHostname(host)).toBe(true)
  );
  it("allows ordinary public hosts", () => {
    expect(isBlockedHostname("www.nhs.uk")).toBe(false);
    expect(isBlockedHostname("localhost.example.com")).toBe(false);
  });
});

describe("displayUrl", () => {
  it("drops the scheme and a bare trailing slash", () => {
    expect(displayUrl("https://www.example.co.uk/")).toBe("www.example.co.uk");
    expect(displayUrl("https://example.com/about?x=1")).toBe("example.com/about?x=1");
  });
});
