import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { site } from "@/lib/site";
import { BookPage } from "./BookPage";

/* The real embed injects Cal's script and an iframe, neither of which
   jsdom can run. Stand in a marker div and a recording `cal` function. */
const calUi = vi.fn();
vi.mock("@calcom/embed-react", () => ({
  default: (props: { calLink: string }) => (
    <div data-testid="cal-inline" data-cal-link={props.calLink} />
  ),
  getCalApi: vi.fn(async () => calUi),
}));

function renderBook() {
  return render(
    <LazyMotion features={domMax} strict>
      <BookPage />
    </LazyMotion>
  );
}

describe("BookPage", () => {
  it("renders the booking heading and the inline Cal embed", async () => {
    renderBook();

    expect(
      screen.getByRole("heading", { level: 1, name: /Book a short discovery call\./ })
    ).toBeInTheDocument();

    const embed = screen.getByTestId("cal-inline");
    expect(embed).toHaveAttribute("data-cal-link", site.booking.calLink);

    /* The UI call runs after `getCalApi` resolves. */
    await vi.waitFor(() => expect(calUi).toHaveBeenCalled());
    expect(calUi).toHaveBeenCalledWith(
      "ui",
      expect.objectContaining({
        theme: "light",
        layout: "month_view",
        cssVarsPerTheme: expect.objectContaining({
          light: { "cal-brand": "#bf3a15" },
        }),
      })
    );
  });

  it("offers a plain fallback link to the public Cal.com page", () => {
    renderBook();

    const fallback = screen.getByRole("link", { name: /Open the booking page on Cal\.com/i });
    expect(fallback).toHaveAttribute("href", site.booking.url);
    expect(fallback).toHaveAttribute("target", "_blank");
    expect(fallback.getAttribute("rel")).toContain("noopener");
  });

  it("keeps the email route and the free audit alongside the booker", () => {
    renderBook();

    expect(
      screen.getAllByRole("link", { name: new RegExp(site.email, "i") }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link").filter((a) => a.getAttribute("href") === "/free-audit").length
    ).toBeGreaterThan(0);
  });

  it("does not point the closing band back at itself", () => {
    renderBook();

    /* The nav's "Book a call" action is the only /book link on this page. */
    const bookLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/book");
    expect(bookLinks.length).toBeGreaterThan(0);
    bookLinks.forEach((a) => expect(a).toHaveTextContent(/Book a call/));
  });
});
