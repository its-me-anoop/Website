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
import RegisterPage from "@/app/demo/gp-practice/register/page";
import PracticeInfoPage from "@/app/demo/gp-practice/practice-information/page";
import AccessibilityPage from "@/app/demo/gp-practice/accessibility/page";
import { loadGpContent } from "@/lib/cms";

/* GpNav uses usePathname; pin it to the demo home for shell tests. */
vi.mock("next/navigation", () => ({
  usePathname: () => "/demo/gp-practice",
}));

const { practice } = loadGpContent();

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

  it("puts registration in the primary navigation", () => {
    render(<GpShell>content</GpShell>);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(within(nav).getByRole("link", { name: "Register" })).toHaveAttribute(
      "href",
      "/demo/gp-practice/register"
    );
  });

  it("flags the site as a sample and signposts urgent help in the footer", () => {
    render(<GpShell>content</GpShell>);

    expect(screen.getAllByText(/fictional/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/NHS 111/).length).toBeGreaterThan(0);
  });

  it("links the You and Your General Practice charter — contractual from Oct 2025", () => {
    render(<GpShell>content</GpShell>);

    expect(
      screen.getByRole("link", { name: /you and your general practice/i })
    ).toHaveAttribute(
      "href",
      "https://www.england.nhs.uk/publication/you-and-your-general-practice/"
    );
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
    ["register", RegisterPage],
    ["practice information", PracticeInfoPage],
    ["accessibility", AccessibilityPage],
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
      "Join the surgery",
      "Get test results",
      "Get a fit note (sick note)",
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

  it("home tells patients about evening and Saturday appointments", () => {
    render(<GpDemoHome />);

    expect(
      screen.getByRole("heading", { name: /evening and saturday appointments/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /join the surgery online/i })
    ).toHaveAttribute("href", "/demo/gp-practice/register");
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

  it("care cards carry hidden urgency prefixes for screen readers", () => {
    render(<AppointmentsPage />);

    expect(
      screen.getByRole("heading", { name: /urgent advice:\s*ask for an urgent appointment/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /immediate action required:\s*call 999/i })
    ).toBeInTheDocument();
  });

  it("appointments page explains home visits — a statutory leaflet item", () => {
    render(<AppointmentsPage />);

    expect(screen.getByRole("heading", { name: /home visits/i })).toBeInTheDocument();
    expect(screen.getByText(/before 10:30am/i)).toBeInTheDocument();
  });

  it("prescriptions page explains the three ordering steps as an ordered list", () => {
    render(<PrescriptionsPage />);

    ["Order", "We process it", "Collect"].forEach((step) => {
      const heading = screen.getByRole("heading", { level: 3, name: step });
      expect(heading.closest("ol")).not.toBeNull();
    });
  });

  it("self-referral services link directly instead of dead-ending at reception", () => {
    render(<ServicesPage />);

    expect(
      screen.getByRole("link", { name: /refer yourself to NHS talking therapies/i })
    ).toHaveAttribute("href", expect.stringContaining("nhs.uk"));
    expect(
      screen.getByRole("link", { name: /stop-smoking support/i })
    ).toBeInTheDocument();
  });

  it("register page walks through steps and needs no documents", () => {
    render(<RegisterPage />);

    const steps = screen.getByRole("heading", { level: 3, name: /online registration form/i });
    expect(steps.closest("ol")).not.toBeNull();
    expect(
      screen.getAllByText(/do not need proof of address/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { level: 2, name: /our practice area/i })
    ).toBeInTheDocument();
  });

  it("practice information publishes CQC rating, FFT results and the ICB", () => {
    render(<PracticeInfoPage />);

    expect(screen.getByRole("heading", { name: /our CQC rating/i })).toBeInTheDocument();
    expect(screen.getByText(/would recommend this surgery/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /who we answer to/i })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /on this page/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /your named GP/i })).toBeInTheDocument();
  });

  it("accessibility statement carries the statutory sections", () => {
    render(<AccessibilityPage />);

    [
      /compliance status/i,
      /content that is not fully accessible/i,
      /how this statement was prepared/i,
      /enforcement procedure/i,
    ].forEach((heading) => {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    });
    expect(screen.getByText(/EASS/)).toBeInTheDocument();
  });

  it("inner pages show the NHS review-date pattern", () => {
    for (const Page of [AppointmentsPage, PrescriptionsPage, RegisterPage]) {
      const { unmount } = render(<Page />);
      expect(screen.getByText(/page last reviewed/i)).toBeInTheDocument();
      expect(screen.getByText(/next review due/i)).toBeInTheDocument();
      unmount();
    }
  });

  it("team page never captions photos with a fictional clinician's name", () => {
    const { container } = render(<TeamPage />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("alt")).not.toMatch(/Dr |Patel|Okafor|Osei|Bradley/);
  });
});
