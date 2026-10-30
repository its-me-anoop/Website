import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { services } from "@/lib/marketing/services";
import { BriefBuilder } from "./BriefBuilder";

function brief() {
  return screen.getByRole("region", { name: /your brief/i });
}

describe("BriefBuilder", () => {
  it("asks three questions as native, labelled groups", () => {
    render(<BriefBuilder />);
    const needs = screen.getByRole("group", { name: /what needs sorting/i });
    expect(within(needs).getAllByRole("checkbox").map((c) => c.closest("label")?.textContent)).toEqual(
      services.map((s) => s.name)
    );
    expect(within(screen.getByRole("radiogroup", { name: /where are you now/i })).getAllByRole("radio")).toHaveLength(3);
    expect(within(screen.getByRole("radiogroup", { name: /when/i })).getAllByRole("radio")).toHaveLength(3);
  });

  it("starts with the plain booking link and a prompt in the brief", () => {
    render(<BriefBuilder />);
    expect(within(brief()).getByText(/pick what needs sorting/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Book a 15-minute call/i })).toHaveAttribute("href", "/book");
  });

  it("writes the brief as choices are made and carries it to the booking page", () => {
    render(<BriefBuilder />);
    fireEvent.click(screen.getByRole("checkbox", { name: "Apps" }));
    fireEvent.click(screen.getByRole("radio", { name: "Starting from scratch" }));
    fireEvent.click(screen.getByRole("radio", { name: "As soon as possible" }));

    expect(within(brief()).getByText("I need help with an app.")).toBeInTheDocument();
    expect(within(brief()).getByText("We're starting from scratch.")).toBeInTheDocument();

    const book = screen.getByRole("link", { name: /Book a call with this brief/i });
    expect(book).toHaveAttribute("href", "/book?needs=apps&stage=new&timing=now");
    expect(screen.getByRole("link", { name: /Email this brief/i }).getAttribute("href")).toMatch(/^mailto:/);
  });

  it("announces brief changes politely to screen readers", () => {
    render(<BriefBuilder />);
    expect(brief().querySelector("[aria-live='polite']")).not.toBeNull();
  });

  it("points an existing website that needs fixing to the free audit first", () => {
    render(<BriefBuilder />);
    expect(screen.queryByText(/start with the free audit/i)).toBeNull();
    fireEvent.click(screen.getByRole("checkbox", { name: "Websites" }));
    fireEvent.click(screen.getByRole("radio", { name: "Have one, it needs fixing" }));
    const tip = within(brief()).getByText(/start with the free audit/i);
    expect(tip.closest("a") ?? within(brief()).getByRole("link", { name: /free audit/i })).toHaveAttribute(
      "href",
      "#audit"
    );
  });

  it("goes back to the plain booking link when every need is cleared", () => {
    render(<BriefBuilder />);
    const box = screen.getByRole("checkbox", { name: "SEO" });
    fireEvent.click(box);
    fireEvent.click(box);
    expect(screen.getByRole("link", { name: /Book a 15-minute call/i })).toHaveAttribute("href", "/book");
  });
});
