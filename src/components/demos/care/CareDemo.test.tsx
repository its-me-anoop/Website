import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CareShell } from "./CareShell";
import CareDemoHome from "@/app/demo/care-home/page";
import FamiliesPage from "@/app/demo/care-home/families/page";
import CareersPage from "@/app/demo/care-home/careers/page";
import CareContactPage from "@/app/demo/care-home/contact/page";
import CareAccessibilityPage from "@/app/demo/care-home/accessibility/page";
import { loadCareContent } from "@/lib/cms";

const { home } = loadCareContent();

describe("CareShell", () => {
  it("shows the phone number and flags the site as a sample", () => {
    render(<CareShell>content</CareShell>);

    expect(
      screen.getAllByRole("link", { name: new RegExp(home.phone) }).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/fictional/i).length).toBeGreaterThan(0);
  });
});

describe("care demo pages", () => {
  const pages = [
    ["home", CareDemoHome],
    ["families", FamiliesPage],
    ["careers", CareersPage],
    ["contact", CareContactPage],
    ["accessibility", CareAccessibilityPage],
  ] as const;

  it.each(pages)("%s page renders exactly one h1", (_name, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("home renders the three care types and the labelled sample inspection", () => {
    render(<CareDemoHome />);

    ["Residential care", "Dementia care", "Respite stays"].forEach((type) => {
      expect(screen.getByRole("heading", { name: type })).toBeInTheDocument();
    });
    expect(screen.getByText(/sample rating shown for demonstration/i)).toBeInTheDocument();
  });

  it("careers lists the open roles from the CMS", () => {
    render(<CareersPage />);

    expect(screen.getByRole("heading", { name: /care assistant/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /activities coordinator/i })).toBeInTheDocument();
  });

  it("families walks through the four steps in order", () => {
    render(<FamiliesPage />);

    ["1. Call or enquire", "2. Visit the home", "3. Assessment", "4. Moving in"].forEach(
      (step) => {
        expect(screen.getByRole("heading", { name: step })).toBeInTheDocument();
      }
    );
  });
});
