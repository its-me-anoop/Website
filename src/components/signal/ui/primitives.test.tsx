import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { AuditBar, ButtonLink, Display, FaqList } from "./primitives";

function wrap(ui: React.ReactElement) {
  return render(
    <LazyMotion features={domMax} strict>
      {ui}
    </LazyMotion>
  );
}

describe("ButtonLink", () => {
  it("opens external links in a new tab safely", () => {
    wrap(<ButtonLink href="https://example.com" external>Visit</ButtonLink>);
    const link = screen.getByRole("link", { name: "Visit" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("keeps internal routes in the same tab", () => {
    wrap(<ButtonLink href="/book">Book a call</ButtonLink>);
    expect(screen.getByRole("link", { name: "Book a call" })).not.toHaveAttribute("target");
  });
});

describe("Display", () => {
  it("renders the requested heading level", () => {
    wrap(<Display as="h1">Hello</Display>);
    expect(screen.getByRole("heading", { level: 1, name: "Hello" })).toBeInTheDocument();
  });

  it("keeps a single accessible name when the title rises in", () => {
    wrap(
      <Display as="h2" rise>
        Built for <em>everyone</em>.
      </Display>
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Built for everyone.");
  });
});

describe("AuditBar", () => {
  it("is a plain GET form to /audit that works before hydration", () => {
    wrap(<AuditBar />);
    const input = screen.getByRole("textbox", { name: /your website address/i });
    expect(input).toHaveAttribute("name", "url");
    const form = input.closest("form");
    expect(form).toHaveAttribute("action", "/audit");
    expect(form?.getAttribute("method")?.toLowerCase()).toBe("get");
    expect(screen.getByRole("button", { name: /run the free website audit/i })).toBeInTheDocument();
  });

  it("focuses the field instead of submitting an empty address", () => {
    wrap(<AuditBar />);
    const input = screen.getByRole("textbox", { name: /your website address/i });
    const form = input.closest("form")!;
    const event = fireEvent.submit(form);
    expect(event).toBe(false);
    expect(input).toHaveFocus();
  });
});

describe("FaqList", () => {
  it("renders each question as a native disclosure", () => {
    const { container } = wrap(<FaqList items={[{ q: "Question one?", a: "Answer one." }]} />);
    expect(container.querySelectorAll("details")).toHaveLength(1);
    expect(screen.getByText("Question one?")).toBeInTheDocument();
    expect(screen.getByText("Answer one.")).toBeInTheDocument();
  });
});
