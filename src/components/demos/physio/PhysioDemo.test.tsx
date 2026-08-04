import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PhysioShell } from "./PhysioShell";
import PhysioDemoHome from "@/app/demo/physio-clinic/page";
import ConditionsPage from "@/app/demo/physio-clinic/conditions/page";
import FirstAppointmentPage from "@/app/demo/physio-clinic/first-appointment/page";
import PricingPage from "@/app/demo/physio-clinic/pricing/page";
import TeamPage from "@/app/demo/physio-clinic/team/page";
import TrustPage from "@/app/demo/physio-clinic/trust/page";
import AccessibilityPage from "@/app/demo/physio-clinic/accessibility/page";
import { loadPhysioContent } from "@/lib/cms/physio";

/* PhysioNav uses usePathname; pin it to the demo home for shell tests. */
vi.mock("next/navigation", () => ({
  usePathname: () => "/demo/physio-clinic",
}));

const { clinic } = loadPhysioContent();

describe("PhysioShell", () => {
  it("renders masthead with phone number and book CTA", () => {
    render(<PhysioShell>content</PhysioShell>);

    expect(
      screen.getAllByRole("link", { name: new RegExp(clinic.phone) }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /book your first visit/i })
    ).toHaveAttribute("href", "/demo/physio-clinic/first-appointment");
  });

  it("marks the current page in the main navigation", () => {
    render(<PhysioShell>content</PhysioShell>);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("aria-current", "page");
    expect(
      within(nav).getByRole("link", { name: "Pricing" })
    ).not.toHaveAttribute("aria-current");
  });

  it("puts every sector page in the primary navigation", () => {
    render(<PhysioShell>content</PhysioShell>);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    [
      ["Conditions & treatments", "/demo/physio-clinic/conditions"],
      ["Your first appointment", "/demo/physio-clinic/first-appointment"],
      ["Pricing", "/demo/physio-clinic/pricing"],
      ["Our team", "/demo/physio-clinic/team"],
      ["Trust & regulation", "/demo/physio-clinic/trust"],
    ].forEach(([label, href]) => {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", href);
    });
  });

  it("flags the clinic as a sample and links Flutterly's sector page in the footer", () => {
    render(<PhysioShell>content</PhysioShell>);

    expect(screen.getAllByText(/fictional/i).length).toBeGreaterThan(0);
    const footerLinks = screen.getAllByRole("link", { name: "Flutterly" });
    expect(footerLinks.some((link) => link.getAttribute("href") === "/packages")).toBe(true);
  });

  it("links the accessibility statement from the footer", () => {
    render(<PhysioShell>content</PhysioShell>);

    expect(
      screen.getByRole("link", { name: /accessibility statement/i })
    ).toHaveAttribute("href", "/demo/physio-clinic/accessibility");
  });
});

describe("physio demo pages", () => {
  const pages = [
    ["home", PhysioDemoHome],
    ["conditions", ConditionsPage],
    ["first appointment", FirstAppointmentPage],
    ["pricing", PricingPage],
    ["team", TeamPage],
    ["trust", TrustPage],
    ["accessibility", AccessibilityPage],
  ] as const;

  it.each(pages)("%s page renders exactly one h1", (_name, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("no page ships a raster image — type, colour and tables only", () => {
    for (const [, Page] of pages) {
      const { unmount, container } = render(<Page />);
      expect(container.querySelectorAll("img")).toHaveLength(0);
      unmount();
    }
  });

  it("home leads with the book, prices and first-visit tasks and the NHS-positioning line", () => {
    render(<PhysioDemoHome />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Book an appointment" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "See our prices" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/appointments this week, no gp referral needed/i).length
    ).toBeGreaterThan(0);
  });

  it("home's condition index deep-links every slugged teaser to its anchor, and falls back to the plain index for a compressed summary line", () => {
    render(<PhysioDemoHome />);

    const { home } = loadPhysioContent();
    for (const teaser of home.conditionsTeaser) {
      const link = screen.getByRole("link", { name: teaser.label });
      expect(link).toHaveAttribute(
        "href",
        teaser.slug
          ? `/demo/physio-clinic/conditions#${teaser.slug}`
          : "/demo/physio-clinic/conditions"
      );
    }
    // At least one teaser intentionally has no single matching condition
    // (a compressed summary line) and falls back to the plain index.
    expect(home.conditionsTeaser.some((t) => !t.slug)).toBe(true);
  });

  it("home states the HCPC-not-CQC line and links through to the trust page", () => {
    render(<PhysioDemoHome />);

    expect(screen.getByText(/regulated by the HCPC/i)).toBeInTheDocument();
    expect(screen.getByText(/rather than the CQC/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /trust & regulation/i })
    ).toHaveAttribute("href", "/demo/physio-clinic/trust");
  });

  it("conditions page covers the standard MSK taxonomy without cure claims", () => {
    render(<ConditionsPage />);

    expect(
      screen.getByRole("heading", { name: /back and neck pain, including sciatica/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sports injuries/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/\bcure\b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/guarantee/i)).not.toBeInTheDocument();
  });

  it("conditions page clarifies scope — no CQC-adjacent services", () => {
    render(<ConditionsPage />);

    expect(
      screen.getByText(/doesn.t include injections, scans or diagnostic imaging/i)
    ).toBeInTheDocument();
  });

  it("conditions page lists the treatment approaches, including manual therapy and acupuncture", () => {
    render(<ConditionsPage />);

    expect(screen.getByRole("heading", { name: /manual therapy/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /acupuncture/i })).toBeInTheDocument();
  });

  it("first-appointment page presents the four-beat structure as an ordered list", () => {
    render(<FirstAppointmentPage />);

    const heading = screen.getByRole("heading", {
      level: 3,
      name: /a conversation and your history/i,
    });
    expect(heading.closest("ol")).not.toBeNull();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(4);
  });

  it("first-appointment page explains the self-pay vs insured fork side by side", () => {
    render(<FirstAppointmentPage />);

    expect(
      screen.getByRole("heading", { name: /if you.re paying yourself/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /if you.re claiming through insurance/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/pre-authorisation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/excess/i).length).toBeGreaterThan(0);
  });

  it("what to wear is body-area specific, not generic advice", () => {
    render(<FirstAppointmentPage />);

    expect(screen.getByText(/knee, hip or ankle/i)).toBeInTheDocument();
    expect(screen.getByText(/shorts/i)).toBeInTheDocument();
  });

  it("pricing page publishes a real table with session, duration and price columns", () => {
    render(<PricingPage />);

    const table = screen.getByRole("table");
    expect(within(table).getByText("Initial assessment")).toBeInTheDocument();
    expect(within(table).getByText("Follow-up session")).toBeInTheDocument();
    expect(within(table).getAllByText(/sample price/i).length).toBeGreaterThan(0);
  });

  it("pricing page states the course-length honesty line and the insurer cancellation detail", () => {
    render(<PricingPage />);

    expect(screen.getByText(/no wasted sessions, no pressure to keep coming back/i)).toBeInTheDocument();
    expect(screen.getAllByText(/insurers do not pay for missed/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/24 hours/i).length).toBeGreaterThan(0);
  });

  it("team page marks Chartered status per practitioner, not on the clinic", () => {
    render(<TeamPage />);

    expect(screen.getAllByText(/chartered member of the chartered society of physiotherapy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sample/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/HCPC PH\d{6}/).length).toBeGreaterThanOrEqual(2);
  });

  it("team page gives every practitioner a dated, institution-level qualification", () => {
    render(<TeamPage />);

    expect(screen.getByText(/BSc \(Hons\) Physiotherapy, University of Birmingham, 2011/)).toBeInTheDocument();
  });

  it("trust page states the protected-title and HCPC-not-CQC lines and how to verify a clinician", () => {
    render(<TrustPage />);

    expect(
      screen.getByRole("heading", { name: /physiotherapist is a protected title/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /regulated by the HCPC, not the CQC/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/hcpc-uk\.org/i).length).toBeGreaterThan(0);
  });

  it("trust page covers indemnity, DBS and data protection", () => {
    render(<TrustPage />);

    expect(
      screen.getByRole("heading", { name: /professional indemnity insurance/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /DBS checks/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /data protection/i })).toBeInTheDocument();
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

  it("inner pages show the review-date pattern", () => {
    render(<AccessibilityPage />);
    expect(screen.getByText(/page last reviewed/i)).toBeInTheDocument();
    expect(screen.getByText(/next review due/i)).toBeInTheDocument();
  });
});
