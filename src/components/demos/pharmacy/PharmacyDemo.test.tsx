import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PharmacyShell } from "./PharmacyShell";
import PharmacyDemoHome from "@/app/demo/pharmacy/page";
import PharmacyFirstPage from "@/app/demo/pharmacy/pharmacy-first/page";
import ServicesPage from "@/app/demo/pharmacy/services/page";
import PrescriptionsPage from "@/app/demo/pharmacy/prescriptions/page";
import AboutPage from "@/app/demo/pharmacy/about/page";
import ContactPage from "@/app/demo/pharmacy/contact/page";
import AccessibilityPage from "@/app/demo/pharmacy/accessibility/page";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

/* PharmacyNav uses usePathname; pin it to the demo home for shell tests. */
vi.mock("next/navigation", () => ({
  usePathname: () => "/demo/pharmacy",
}));

const { pharmacy, team } = loadPharmacyContent();

describe("PharmacyShell", () => {
  it("renders masthead with phone number and the Pharmacy First CTA", () => {
    render(<PharmacyShell>content</PharmacyShell>);

    expect(
      screen.getAllByRole("link", { name: new RegExp(pharmacy.phone) }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /nhs pharmacy first/i })
    ).toHaveAttribute("href", "/demo/pharmacy/pharmacy-first");
  });

  it("marks the current page in the main navigation", () => {
    render(<PharmacyShell>content</PharmacyShell>);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("aria-current", "page");
    expect(
      within(nav).getByRole("link", { name: "Services" })
    ).not.toHaveAttribute("aria-current");
  });

  it("carries the mandatory footer regulatory block on every page", () => {
    render(<PharmacyShell>content</PharmacyShell>);

    expect(screen.getByText(/GPhC premises no\. 9000001 \(sample\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/Superintendent pharmacist: .+, GPhC 2000001 \(sample\)/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Willowbrook Pharmacy \(Reading\) Ltd/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`company no\\. ${pharmacy.legal.companyNumber}`, "i"))).toBeInTheDocument();
  });

  it("flags the site as a fictional pharmacy in the footer", () => {
    render(<PharmacyShell>content</PharmacyShell>);
    expect(screen.getAllByText(/fictional/i).length).toBeGreaterThan(0);
  });

  it("cross-references the Willowbrook Surgery GP demo", () => {
    render(<PharmacyShell>content</PharmacyShell>);
    expect(
      screen.getByRole("link", { name: /willowbrook surgery/i })
    ).toHaveAttribute("href", "/demo/gp-practice");
  });
});

describe("Pharmacy demo pages", () => {
  const pages = [
    ["home", PharmacyDemoHome],
    ["pharmacy first", PharmacyFirstPage],
    ["services", ServicesPage],
    ["prescriptions", PrescriptionsPage],
    ["about", AboutPage],
    ["contact", ContactPage],
    ["accessibility", AccessibilityPage],
  ] as const;

  it.each(pages)("%s page renders exactly one h1", (_name, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("every demo image (if any) carries descriptive alt text — this demo ships none", () => {
    for (const [, Page] of pages) {
      const { unmount, container } = render(<Page />);
      for (const img of Array.from(container.querySelectorAll("img"))) {
        expect(img.getAttribute("alt"), img.getAttribute("src") ?? "").toBeTruthy();
        expect(img.getAttribute("alt")!.length).toBeGreaterThan(10);
      }
      unmount();
    }
  });

  it("home leads with the two primary tasks: Pharmacy First and repeat prescriptions", () => {
    render(<PharmacyDemoHome />);

    expect(
      screen.getByRole("heading", { level: 3, name: /nhs pharmacy first/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /order a repeat prescription/i })
    ).toBeInTheDocument();
  });

  it("home names all seven Pharmacy First conditions right on the page", () => {
    render(<PharmacyDemoHome />);

    [
      "Acute otitis media",
      "Impetigo",
      "Infected insect bites",
      "Shingles",
      "Sinusitis",
      "Sore throat",
      "Uncomplicated urinary tract infection",
    ].forEach((condition) => {
      expect(screen.getByText(new RegExp(condition, "i"))).toBeInTheDocument();
    });
  });

  it("home shows opening times as a real table and an illustrative map", () => {
    render(<PharmacyDemoHome />);

    expect(
      screen.getByRole("table", { name: /opening times/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /illustrative map/i })
    ).toBeInTheDocument();
  });

  it("home cross-references Willowbrook Surgery and nominating us for prescriptions", () => {
    render(<PharmacyDemoHome />);

    expect(
      screen.getAllByRole("link", { name: /willowbrook surgery/i }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: "NHS App" })
    ).toHaveAttribute("href", "/demo/pharmacy/prescriptions");
  });

  it("pharmacy first page lists all seven conditions in a real table with age eligibility", () => {
    render(<PharmacyFirstPage />);

    const table = screen.getByRole("table", { name: /pharmacy first conditions/i });
    const rows = within(table).getAllByRole("row");
    // seven condition rows plus the header row
    expect(rows.length).toBeGreaterThanOrEqual(8);
    expect(within(table).getByText(/16 to 64/)).toBeInTheDocument();
    expect(screen.getByText(/free on the nhs/i)).toBeInTheDocument();
  });

  it("pharmacy first page explains how it works as an ordered list", () => {
    render(<PharmacyFirstPage />);

    const heading = screen.getByRole("heading", {
      level: 3,
      name: /ask at the counter, or arrive by referral/i,
    });
    expect(heading.closest("ol")).not.toBeNull();
  });

  it("services page badges every service NHS-free or Private-paid", () => {
    render(<ServicesPage />);

    expect(screen.getAllByText(/nhs · free/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/private · paid/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { level: 3, name: /new medicine service/i })
    ).toBeInTheDocument();
  });

  it("services page never names a prescription-only weight-loss medicine", () => {
    const { container } = render(<ServicesPage />);
    const text = container.textContent!.toLowerCase();
    ["ozempic", "wegovy", "mounjaro"].forEach((brand) => {
      expect(text).not.toContain(brand);
    });
  });

  it("prescriptions page walks through NHS App nomination as an ordered list", () => {
    render(<PrescriptionsPage />);

    const heading = screen.getByRole("heading", {
      level: 3,
      name: /open the nhs app and sign in/i,
    });
    expect(heading.closest("ol")).not.toBeNull();
    expect(screen.getByText(/two working days/i)).toBeInTheDocument();
  });

  it("about page names the superintendent pharmacist with a sample GPhC number", () => {
    render(<AboutPage />);

    expect(screen.getByText(pharmacy.superintendent.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`GPhC ${pharmacy.superintendent.gphcNumber}.*sample`, "i"))
    ).toBeInTheDocument();
  });

  it("about page marks each team member's GPhC number with the crisp (sample) marker used in the footer, not the full sentence", () => {
    render(<AboutPage />);

    const registered = team.members.filter((member) => member.gphcNumber);
    expect(registered.length).toBeGreaterThan(1);
    registered.forEach((member) => {
      expect(
        screen.getByText(new RegExp(`GPhC ${member.gphcNumber} \\(sample\\)`))
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByText(/Sample GPhC registration number for this demonstration site\./)
    ).not.toBeInTheDocument();
  });

  it("about page explains the consultation room and the responsible pharmacist", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { name: /consultation room/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /responsible pharmacist/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/GPhC.*(public )?register/i)).toBeInTheDocument();
  });

  it("about page never captions a photo with a fictional team member's name — this demo ships no photos", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("contact page states the structural lunch closure and bank-holiday policy", () => {
    render(<ContactPage />);

    const table = screen.getByRole("table", { name: /opening times/i });
    expect(within(table).getByRole("columnheader", { name: /morning/i })).toBeInTheDocument();
    expect(within(table).getByRole("columnheader", { name: /afternoon/i })).toBeInTheDocument();
    expect(screen.getByText(/bank holidays/i)).toBeInTheDocument();
  });

  it("contact page carries a real feedback and complaints section", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", { name: /feedback.*complaints/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/yellow card/i)).toBeInTheDocument();
  });

  it("inner pages show the NHS-style review-date pattern", () => {
    for (const Page of [PharmacyFirstPage, PrescriptionsPage, ContactPage]) {
      const { unmount } = render(<Page />);
      expect(screen.getByText(/page last reviewed/i)).toBeInTheDocument();
      expect(screen.getByText(/next review due/i)).toBeInTheDocument();
      unmount();
    }
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
});
