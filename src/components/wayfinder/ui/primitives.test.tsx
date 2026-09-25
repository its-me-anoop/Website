import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AuditBar } from "./AuditBar";
import { ButtonLink } from "./Button";
import { FaqList } from "./Bits";
import { Heading, Kicker } from "./Type";
import { PackageCard } from "./PackageCard";
import { ScreenFrame } from "./Frames";
import { SignArrow } from "./Arrow";

describe("ButtonLink", () => {
  it("opens external links in a new tab safely", () => {
    render(<ButtonLink href="https://example.com" external>Visit</ButtonLink>);
    const link = screen.getByRole("link", { name: /^Visit\s+\(opens in a new tab\)$/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("keeps internal routes in the same tab", () => {
    render(<ButtonLink href="/book">Book a call</ButtonLink>);
    expect(screen.getByRole("link", { name: "Book a call" })).not.toHaveAttribute("target");
  });

  it("keeps the arrow out of the accessible name", () => {
    render(
      <ButtonLink href="/book" arrow="right">
        Book a call
      </ButtonLink>
    );
    const link = screen.getByRole("link", { name: "Book a call" });
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("SignArrow", () => {
  it("rotates one arrow shape to point any way", () => {
    const { container, rerender } = render(<SignArrow dir="right" />);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe("rotate(0 12 12)");
    rerender(<SignArrow dir="down" />);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe("rotate(90 12 12)");
    rerender(<SignArrow dir="up-right" />);
    expect(container.querySelector("g")?.getAttribute("transform")).toBe("rotate(-45 12 12)");
  });
});

describe("Heading and Kicker", () => {
  it("renders the requested heading level", () => {
    render(<Heading as="h1">Hello</Heading>);
    expect(screen.getByRole("heading", { level: 1, name: "Hello" })).toBeInTheDocument();
  });

  it("keeps a plain accessible name around a marked phrase", () => {
    render(
      <Heading as="h2">
        Built for <mark className="wf-mark">everyone</mark>.
      </Heading>
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Built for everyone.");
  });

  it("renders the kicker as text, with its arrow hidden", () => {
    const { container } = render(<Kicker>Sample sites</Kicker>);
    expect(screen.getByText("Sample sites")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("AuditBar", () => {
  it("is a plain GET form to /audit that works before hydration", () => {
    render(<AuditBar />);
    const input = screen.getByRole("textbox", { name: /your website address/i });
    expect(input).toHaveAttribute("name", "url");
    const form = input.closest("form");
    expect(form).toHaveAttribute("action", "/audit");
    expect(form?.getAttribute("method")?.toLowerCase()).toBe("get");
    expect(screen.getByRole("button", { name: /run the free website audit/i })).toBeInTheDocument();
  });

  it("focuses the field instead of submitting an empty address", () => {
    render(<AuditBar />);
    const input = screen.getByRole("textbox", { name: /your website address/i });
    const form = input.closest("form")!;
    const event = fireEvent.submit(form);
    expect(event).toBe(false);
    expect(input).toHaveFocus();
  });

  it("describes the field with its hint", () => {
    render(<AuditBar hint="Nothing is stored." />);
    const input = screen.getByRole("textbox", { name: /your website address/i });
    expect(input).toHaveAccessibleDescription("Nothing is stored.");
  });
});

describe("FaqList", () => {
  it("renders each question as a native disclosure", () => {
    const { container } = render(<FaqList items={[{ q: "Question one?", a: "Answer one." }]} />);
    expect(container.querySelectorAll("details")).toHaveLength(1);
    expect(screen.getByText("Question one?")).toBeInTheDocument();
    expect(screen.getByText("Answer one.")).toBeInTheDocument();
  });
});

describe("ScreenFrame", () => {
  it("shows the address and the screenshot's alt text", () => {
    render(<ScreenFrame src="/demos/gp-home.png" alt="GP homepage" url="www.flutterly.co.uk/demo/gp-practice" />);
    expect(screen.getByRole("img", { name: "GP homepage" })).toBeInTheDocument();
    expect(screen.getByText("www.flutterly.co.uk/demo/gp-practice")).toBeInTheDocument();
  });
});

describe("PackageCard", () => {
  const pkg = {
    name: "Standard",
    strap: "Build plus a care plan",
    copy: "The full build.",
    price: "£1,490",
    pricePeriod: "+ £49/month + VAT",
    cta: "Enquire about Standard",
    features: ["Everything in Essentials"],
    featured: true,
  };

  it("publishes the price and sends the action to a prefilled email by default", () => {
    render(
      <ul>
        <PackageCard pkg={pkg} />
      </ul>
    );
    expect(screen.getByRole("heading", { name: "Standard" })).toBeInTheDocument();
    expect(screen.getByText("£1,490")).toBeInTheDocument();
    expect(screen.getByText("Most popular")).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: "Enquire about Standard" });
    expect(cta.getAttribute("href")).toMatch(/^mailto:anoop@flutterly\.co\.uk\?subject=/);
  });

  it("uses a given action link and badge", () => {
    render(
      <ul>
        <PackageCard pkg={{ ...pkg, ctaHref: "/free-audit", cta: "Book a free audit" }} badge="Premium custom" />
      </ul>
    );
    expect(screen.getByRole("link", { name: "Book a free audit" })).toHaveAttribute("href", "/free-audit");
    expect(screen.getByText("Premium custom")).toBeInTheDocument();
  });
});
