import { afterEach, describe, expect, it, vi } from "vitest";
import { safeFetch } from "./fetch";
import { AuditError } from "./types";

/* No network and no DNS: the host guard passes everything, and fetch is a stub. */
vi.mock("./guard", () => ({ assertPublicHost: vi.fn(async () => undefined) }));

afterEach(() => {
  vi.unstubAllGlobals();
});

function redirectTo(location: string) {
  return new Response(null, { status: 302, headers: { location } });
}

describe("safeFetch port policy", () => {
  it("refuses to follow a redirect onto a non-standard port", async () => {
    const fetchMock = vi.fn(async () => redirectTo("http://example.com:6379/"));
    vi.stubGlobal("fetch", fetchMock);

    const error = await safeFetch("https://example.com/").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(AuditError);
    expect((error as AuditError).code).toBe("blocked_host");
    // The first hop is fetched; the :6379 hop never is.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("refuses a non-standard port on the first request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(safeFetch("http://example.com:8080/")).rejects.toMatchObject({ code: "blocked_host" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("still follows ordinary redirects between the default ports", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(redirectTo("https://www.example.com:443/"))
      .mockResolvedValueOnce(new Response("<!doctype html><title>ok</title>", { status: 200, headers: { "content-type": "text/html" } }));
    vi.stubGlobal("fetch", fetchMock);

    const page = await safeFetch("http://example.com/");
    expect(page.status).toBe(200);
    expect(page.finalUrl).toBe("https://www.example.com/");
    expect(page.redirects).toEqual(["https://www.example.com/"]);
  });
});
