import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GpShell } from "./GpShell";
import GpDemoHome from "@/app/demo/gp-practice/page";
import AppointmentsPage from "@/app/demo/gp-practice/appointments/page";
import PrescriptionsPage from "@/app/demo/gp-practice/prescriptions/page";
import ServicesPage from "@/app/demo/gp-practice/services/page";
import TeamPage from "@/app/demo/gp-practice/team/page";
import ContactPage from "@/app/demo/gp-practice/contact/page";
import OnlineConsultationPage from "@/app/demo/gp-practice/online-consultation/page";
import PracticeInformationPage from "@/app/demo/gp-practice/practice-information/page";
import { GpTriageDemo } from "./GpTriageDemo";
import { GP_THEMES } from "./GpThemeSwitcher";
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
      screen.getAllByRole("link", { name: /get help online/i })[0]
    ).toHaveAttribute("href", "/demo/gp-practice/online-consultation");
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
    ["online consultation", OnlineConsultationPage],
    ["appointments", AppointmentsPage],
    ["prescriptions", PrescriptionsPage],
    ["services", ServicesPage],
    ["team", TeamPage],
    ["contact", ContactPage],
    ["practice information", PracticeInformationPage],
  ] as const;

  it.each(pages)("%s page renders exactly one h1", (_name, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("home leads with the three ways in, all weighted the same", () => {
    render(<GpDemoHome />);

    ["Ask online", "Call us", "Come in"].forEach((way) => {
      expect(
        screen.getByRole("heading", { level: 3, name: way })
      ).toBeInTheDocument();
    });
    /* The promise that makes triage work: no route jumps the queue. */
    expect(
      screen.getByText(/nobody is seen sooner for choosing one over another/i)
    ).toBeInTheDocument();
  });

  it("home publishes the CQC rating, which practices are required to show", () => {
    render(<GpDemoHome />);
    expect(screen.getAllByText(/CQC: Good/).length).toBeGreaterThan(0);
  });

  it("home surfaces the everyday patient tasks", () => {
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

describe("Online consultation", () => {
  it("puts urgent problems on a route away from the form", () => {
    render(<OnlineConsultationPage />);

    expect(
      screen.getByRole("heading", { name: /do not use this form if it is urgent/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/signs of a stroke — call 999/i)).toBeInTheDocument();
  });

  it("explains triage as an ordered sequence, not a shuffle", () => {
    render(<OnlineConsultationPage />);

    const step = screen.getByRole("heading", { level: 3, name: /a gp reads it/i });
    expect(step.closest("ol")).not.toBeNull();
  });

  it("offers a non-digital route that is explicitly not slower", () => {
    render(<OnlineConsultationPage />);

    expect(
      screen.getByRole("heading", { name: /if you would rather not do this online/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/will not wait longer and you will not be sent to the back/i)
    ).toBeInTheDocument();
  });

  it("names the tools a patient will see in a text from the surgery", () => {
    render(<OnlineConsultationPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Accurx Patient Triage/ })
    ).toBeInTheDocument();
  });
});

describe("GpTriageDemo", () => {
  it("walks through the request and summarises it back", async () => {
    const user = userEvent.setup();
    render(<GpTriageDemo />);

    expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();

    await user.click(
      screen.getByRole("radio", { name: /a new or ongoing health problem/i })
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByText("Question 2 of 3")).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: /^My child/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await user.type(
      screen.getByRole("textbox"),
      "A cough that will not settle"
    );
    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(
      screen.getByRole("heading", { name: /that is everything we need/i })
    ).toBeInTheDocument();
    /* The answers come back to the patient, which is what makes the
       journey feel accountable rather than a black hole. */
    expect(
      screen.getByText(/a new or ongoing health problem/i)
    ).toBeInTheDocument();
    expect(screen.getByText("My child")).toBeInTheDocument();
  });

  it("refuses to advance without an answer, and says why", async () => {
    const user = userEvent.setup();
    render(<GpTriageDemo />);

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /select what you need help with/i
    );
    expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
  });

  it("keeps an answer when you step back", async () => {
    const user = userEvent.setup();
    render(<GpTriageDemo />);

    await user.click(screen.getByRole("radio", { name: /a sick \(fit\) note/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /back/i }));

    expect(
      screen.getByRole("radio", { name: /a sick \(fit\) note/i })
    ).toBeChecked();
  });

  it("never claims the request was really sent", async () => {
    const user = userEvent.setup();
    render(<GpTriageDemo />);

    await user.click(screen.getByRole("radio", { name: /a test result/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("radio", { name: /^Me/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.type(screen.getByRole("textbox"), "Blood test from last week");
    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(
      screen.getByText(/Nothing you typed was sent or saved/i)
    ).toBeInTheDocument();
  });
});

describe("Colour variations", () => {
  it("offers three schemes and defaults to the NHS one", () => {
    expect(GP_THEMES).toHaveLength(3);
    expect(GP_THEMES[0].id).toBe("nhs");
  });

  it("gives every scheme a swatch and a plain-English note", () => {
    for (const theme of GP_THEMES) {
      expect(theme.swatch).toHaveLength(3);
      expect(theme.note.length).toBeGreaterThan(10);
    }
  });
});

describe("Practice information", () => {
  it("carries the publications a practice is contractually required to show", () => {
    render(<PracticeInformationPage />);

    [
      /your named GP/i,
      /GP net earnings/i,
      /Friends and Family Test/i,
      /safeguarding/i,
      /non-NHS services and fees/i,
    ].forEach((name) => {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    });
  });

  it("explains the Accessible Information Standard in patient language", () => {
    render(<PracticeInformationPage />);

    expect(
      screen.getByRole("heading", { name: /tell us how you need us to communicate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/British Sign Language interpreter — we book one, free/i)
    ).toBeInTheDocument();
  });
});
