import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { DentalShell } from "./DentalShell";
import DentalDemoHome from "@/app/demo/dental-practice/page";
import FeesPage from "@/app/demo/dental-practice/fees/page";
import TreatmentsPage from "@/app/demo/dental-practice/treatments/page";
import NewPatientsPage from "@/app/demo/dental-practice/new-patients/page";
import UrgentPage from "@/app/demo/dental-practice/urgent/page";
import AboutPage from "@/app/demo/dental-practice/about/page";
import AccessibilityPage from "@/app/demo/dental-practice/accessibility/page";
import { loadDentalContent } from "@/lib/cms/dental";

/* DentalNav uses usePathname; pin it to the demo home for shell tests. */
vi.mock("next/navigation", () => ({
  usePathname: () => "/demo/dental-practice",
}));

const { practice } = loadDentalContent();

describe("DentalShell", () => {
  it("renders masthead with org name, phone number and a book CTA", () => {
    render(<DentalShell>content</DentalShell>);

    expect(screen.getAllByText(practice.name).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: new RegExp(practice.phone) }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /call to book/i })).toHaveAttribute(
      "href",
      practice.phoneHref
    );
  });

  it("marks the current page in the main navigation", () => {
    render(<DentalShell>content</DentalShell>);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Fees" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("flags the practice as fictional in the footer", () => {
    render(<DentalShell>content</DentalShell>);

    expect(screen.getAllByText(/fictional practice/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /accessibility statement/i })).toHaveAttribute(
      "href",
      "/demo/dental-practice/accessibility"
    );
  });

  it("points the sample ribbon at the packages page", () => {
    render(<DentalShell>content</DentalShell>);

    expect(
      screen.getByRole("link", { name: /get a site like this for your practice/i })
    ).toHaveAttribute("href", "/packages");
  });

  it("states Friday's actual, shorter closing time in the footer rather than labelling it Monday to Friday", () => {
    render(<DentalShell>content</DentalShell>);

    const friday = practice.openingTimes.find((entry) => entry.day === "Friday")!.hours;
    const mondayToThursday = practice.openingTimes.find((entry) => entry.day === "Monday")!.hours;

    expect(screen.queryByText(/, monday to friday/i)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Monday to Thursday: ${mondayToThursday}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Friday: ${friday}`))).toBeInTheDocument();
  });
});

describe("dental demo pages", () => {
  const pages = [
    ["home", DentalDemoHome],
    ["fees", FeesPage],
    ["treatments", TreatmentsPage],
    ["new patients", NewPatientsPage],
    ["urgent", UrgentPage],
    ["about", AboutPage],
    ["accessibility", AccessibilityPage],
  ] as const;

  it.each(pages)("%s page renders exactly one h1", (_name, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("home states the NHS and private positioning and signposts urgent care", () => {
    render(<DentalDemoHome />);

    expect(
      screen.getByRole("heading", { level: 1, name: /NHS and private dentistry by the Kennet/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/in pain today\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read our urgent care page/i })
    ).toHaveAttribute("href", "/demo/dental-practice/urgent");
  });

  it("home's 'Today' card states Friday's actual, shorter closing time rather than labelling it Monday to Thursday", () => {
    render(<DentalDemoHome />);

    const friday = practice.openingTimes.find((entry) => entry.day === "Friday")!.hours;
    const mondayToThursday = practice.openingTimes.find((entry) => entry.day === "Monday")!.hours;

    expect(screen.queryByText(new RegExp(`${mondayToThursday}, monday to thursday`, "i"))).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Monday to Thursday: ${mondayToThursday}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Friday: ${friday}`))).toBeInTheDocument();
  });

  it("home shows the NHS fee bands and an illustrative map", () => {
    render(<DentalDemoHome />);

    expect(screen.getByText("£27.90")).toBeInTheDocument();
    expect(screen.getByText("£76.60")).toBeInTheDocument();
    expect(screen.getByText("£332.10")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /illustrative map/i })
    ).toBeInTheDocument();
  });

  it("fees page publishes the NHS band table with the April uprating rules", () => {
    render(<FeesPage />);

    expect(
      screen.getByRole("table", { name: /NHS dental charge bands/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /one charge per course/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /free repeat within 2 months/i })).toBeInTheDocument();
    expect(screen.getByText(/england only/i)).toBeInTheDocument();
  });

  it("fees page publishes private from–to price ranges, not a single figure", () => {
    render(<FeesPage />);

    const table = screen.getByRole("table", { name: /private treatment price ranges/i });
    expect(within(table).getAllByText(/–/).length).toBeGreaterThan(0);
  });

  it("every treatment shows an in-line price on the page", () => {
    render(<TreatmentsPage />);

    expect(screen.getAllByText(/£\d/).length).toBeGreaterThanOrEqual(8);
  });

  it("new patients page names concrete accommodations for nervous patients", () => {
    render(<NewPatientsPage />);

    expect(
      screen.getByRole("heading", { name: /nervous about the dentist/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/first appointment slot of the day/i)).toBeInTheDocument();
    expect(screen.getByText(/agree a stop signal/i)).toBeInTheDocument();
  });

  it("urgent page's call CTAs use the practice's emergency phone number", () => {
    render(<UrgentPage />);
    const { practice: content } = loadDentalContent();

    expect(screen.getByRole("link", { name: /call to book an urgent slot/i })).toHaveAttribute(
      "href",
      content.emergencyPhoneHref
    );
    expect(
      screen.getByRole("link", { name: new RegExp(`call ${content.emergencyPhone}`, "i") })
    ).toHaveAttribute("href", content.emergencyPhoneHref);
  });

  it("urgent page self-triages: same-day, then 111, then A&E red flags", () => {
    render(<UrgentPage />);

    expect(screen.getByRole("heading", { name: /same-day slots/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /call nhs 111/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /call 999 or go to a&e now if:/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/uncontrolled bleeding/i)).toBeInTheDocument();
  });

  it("triage cards carry hidden urgency prefixes for screen readers", () => {
    render(<UrgentPage />);

    expect(
      screen.getByRole("heading", { name: /immediate action required:\s*call 999/i })
    ).toBeInTheDocument();
  });

  it("about page publishes a GDC number per clinician with a sample-demonstration note", () => {
    render(<AboutPage />);

    expect(screen.getByText(/GDC 123456/)).toBeInTheDocument();
    expect(screen.getAllByText(/sample number for demonstration/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/verify any registrant yourself on the GDC(?:'|\u2019)s public register/i)
    ).toBeInTheDocument();
  });

  it("about page states the CQC rating as text, marked as a sample", () => {
    render(<AboutPage />);

    expect(screen.getByText(/rated good by the care quality commission/i)).toBeInTheDocument();
    expect(screen.getByText(/sample rating shown for demonstration/i)).toBeInTheDocument();
  });

  it("about page's CQC copy does not promise a specific report for a fictional practice", () => {
    render(<AboutPage />);

    expect(screen.queryByText(/read the full report/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/search the cqc(?:'|’)s public register for any dental practice/i)
    ).toBeInTheDocument();
  });

  it("about page carries the dual-track complaints procedure — NHS and private routes", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { name: /if your treatment was on the nhs/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /if your treatment was private/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/dental complaints service/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/parliamentary and health service ombudsman/i)).toBeInTheDocument();
    expect(screen.getByText(/last resort for conduct concerns/i)).toBeInTheDocument();
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

  it("inner pages show the review-date freshness pattern", () => {
    for (const Page of [FeesPage, TreatmentsPage, NewPatientsPage, UrgentPage, AboutPage]) {
      const { unmount } = render(<Page />);
      expect(screen.getByText(/page last reviewed/i)).toBeInTheDocument();
      expect(screen.getByText(/next review due/i)).toBeInTheDocument();
      unmount();
    }
  });

  it.each(pages)("%s page never skips a heading level", (_name, Page) => {
    render(<Page />);
    const levels = screen
      .getAllByRole("heading")
      .map((heading) => Number(heading.tagName.slice(1)));
    let previous = 1;
    for (const level of levels) {
      expect(level).toBeLessThanOrEqual(previous + 1);
      previous = level;
    }
  });

  it("no page reproduces a real regulator logo — regulator names appear as text only", () => {
    for (const [, Page] of pages) {
      const { unmount, container } = render(<Page />);
      expect(container.querySelectorAll("img").length).toBe(0);
      unmount();
    }
  });
});
