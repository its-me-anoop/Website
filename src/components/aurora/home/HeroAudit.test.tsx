import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { sampleReport } from "@/lib/marketing/hero-audit.fixture";
import { Hero } from "./Hero";

function mockFetch(body: unknown, status = 200) {
  const fn = vi.fn(async () => new Response(JSON.stringify(body), { status }));
  vi.stubGlobal("fetch", fn);
  return fn;
}

afterEach(() => vi.unstubAllGlobals());

function address() {
  return screen.getByRole("textbox", { name: /your website address/i });
}

function submit(value: string) {
  fireEvent.change(address(), { target: { value } });
  fireEvent.submit(address().closest("form")!);
}

describe("Hero instant audit", () => {
  it("offers the check as a GET form to /audit, so it works without JavaScript", () => {
    render(<Hero />);
    const form = address().closest("form")!;
    expect(form).toHaveAttribute("action", "/audit");
    expect(form.getAttribute("method")?.toLowerCase()).toBe("get");
    expect(address()).toHaveAttribute("name", "url");
  });

  it("does nothing on an empty address", () => {
    const fetchFn = mockFetch({});
    render(<Hero />);
    submit("   ");
    expect(fetchFn).not.toHaveBeenCalled();
    expect(screen.getByRole("img", { name: "The Flutterly butterfly" })).toBeInTheDocument();
  });

  it("scores the site in place of the butterfly and offers the next steps", async () => {
    const fetchFn = mockFetch({ ok: true, report: sampleReport });
    render(<Hero />);
    submit("example.co.uk");

    expect(fetchFn).toHaveBeenCalledWith("/api/audit?url=example.co.uk", expect.anything());
    expect(screen.getByRole("region", { name: /instant website check/i })).toHaveTextContent(/checking example\.co\.uk/i);
    expect(screen.queryByRole("img", { name: "The Flutterly butterfly" })).toBeNull();

    const score = await screen.findByRole("img", { name: /overall score 62 out of 100, grade C/i });
    expect(score).toBeInTheDocument();
    ["Fix a", "Fix b", "Fix c"].forEach((fix) => expect(screen.getByText(fix)).toBeInTheDocument());
    expect(screen.getByText("Accessibility")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /see the full report/i })).toHaveAttribute(
      "href",
      "/audit?url=https%3A%2F%2Fexample.co.uk%2F"
    );
    expect(screen.getByRole("link", { name: /book a call about these fixes/i })).toHaveAttribute("href", "/book");
  });

  it("announces progress and the result to screen readers", async () => {
    mockFetch({ ok: true, report: sampleReport });
    const { container } = render(<Hero />);
    submit("example.co.uk");
    const live = container.querySelector("[aria-live='polite'][data-hero-audit-status]")!;
    expect(live).toHaveTextContent(/checking example\.co\.uk/i);
    await screen.findByRole("img", { name: /overall score 62/i });
    expect(live).toHaveTextContent(/scored 62 out of 100/i);
  });

  it("explains a failure in plain words and lets the visitor try again", async () => {
    mockFetch({ ok: false, error: { code: "dns_failed", message: "We could not find that website." } }, 422);
    render(<Hero />);
    submit("nope.invalid");
    expect(await screen.findByText("We could not find that website.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ask for a written audit/i }).getAttribute("href")).toMatch(
      /^mailto:.*nope\.invalid/
    );
    fireEvent.click(screen.getByRole("button", { name: /check another site/i }));
    expect(screen.getByRole("img", { name: "The Flutterly butterfly" })).toBeInTheDocument();
    expect(address()).toHaveFocus();
  });

  it("returns to the butterfly when the visitor checks another site", async () => {
    mockFetch({ ok: true, report: sampleReport });
    render(<Hero />);
    submit("example.co.uk");
    await screen.findByRole("img", { name: /overall score 62/i });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /check another site/i }));
    });
    expect(screen.getByRole("img", { name: "The Flutterly butterfly" })).toBeInTheDocument();
  });
});
