import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { GpShell } from "./GpShell";
import GpDemoHome from "@/app/demo/gp-practice/page";
import AppointmentsPage from "@/app/demo/gp-practice/appointments/page";
import PrescriptionsPage from "@/app/demo/gp-practice/prescriptions/page";
import ServicesPage from "@/app/demo/gp-practice/services/page";
import TeamPage from "@/app/demo/gp-practice/team/page";
import ContactPage from "@/app/demo/gp-practice/contact/page";
import { practice } from "./data";

/* GpNav uses usePathname; pin it to the demo home for shell tests. */
vi.mock("next/navigation", () => ({
  usePathname: () => "/demo/gp-practice",
}));

describe("GpShell", () => {
  it("renders masthead with phone number and book CTA", () => {
    render(<GpShell>content</GpShell>);

    expect(
      screen.getAllByRole("link", { name: new RegExp(practice.phone) }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /book an appointment/i })
    ).toHaveAttribute("href", "/demo/gp-practice/appointments");
  });

  it("marks the current page in the main navigation", () => {
    render(<GpShell>content</GpShell>);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("aria-current", "page");
    expect(
      within(nav).getByRole("link", { name: "Appointments" })
    ).not.toHaveAttribute("aria-current");
  });

  it("flags the site as a sample and signposts urgent help in the footer", () => {
    render(<GpShell>content</GpShell>);

    expect(screen.getAllByText(/fictional/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/NHS 111/).length).toBeGreaterThan(0);
  });
});

describe("GP demo pages", () => {
  const pages = [
    ["home", GpDemoHome],
    ["appointments", AppointmentsPage],
    ["prescriptions", PrescriptionsPage],
    ["services", ServicesPage],
    ["team", TeamPage],
    ["contact", ContactPage],
  ] as const;

  it.each(pages)("%s page renders exactly one h1", (_name, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("home surfaces the top patient tasks with the two primary tiles first", () => {
    render(<GpDemoHome />);

    [
      "Book or cancel an appointment",
      "Order a repeat prescription",
      "Get help for your symptoms",
      "Register as a new patient",
      "Get test results",
      "Get a sick (fit) note",
    ].forEach((task) => {
      expect(
        screen.getByRole("heading", { level: 3, name: task })
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("link", { name: /NHS 111/i })
    ).toHaveAttribute("href", "https://111.nhs.uk/");
  });

  it("home shows opening times as a real table and an illustrative map", () => {
    render(<GpDemoHome />);

    expect(
      screen.getByRole("table", { name: /opening times/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /illustrative map/i })
    ).toBeInTheDocument();
  });

  it("every demo photo carries descriptive alt text", () => {
    for (const [, Page] of pages) {
      const { unmount, container } = render(<Page />);
      for (const img of Array.from(container.querySelectorAll("img"))) {
        expect(img.getAttribute("alt"), img.getAttribute("src") ?? "").toBeTruthy();
        expect(img.getAttribute("alt")!.length).toBeGreaterThan(10);
      }
      unmount();
    }
  });

  it("appointments page signposts urgent care with NHS care cards", () => {
    render(<AppointmentsPage />);

    expect(
      screen.getByRole("heading", { name: /urgent appointments for today/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /call 999 or go to A&E now if:/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /request an appointment online/i })
    ).toBeInTheDocument();
  });

  it("prescriptions page explains the three ordering steps as an ordered list", () => {
    render(<PrescriptionsPage />);

    ["Order", "We process it", "Collect"].forEach((step) => {
      const heading = screen.getByRole("heading", { level: 3, name: step });
      expect(heading.closest("ol")).not.toBeNull();
    });
  });

  it("team page never captions photos with a fictional clinician's name", () => {
    const { container } = render(<TeamPage />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("alt")).not.toMatch(/Dr |Patel|Okafor|Osei|Bradley/);
  });
});
