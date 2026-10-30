import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";

vi.mock("next/navigation", () => ({ usePathname: () => "/book" }));
import domMax from "@/lib/motion-features";
import { BookPage } from "./BookPage";

const calProps = vi.fn();
vi.mock("@calcom/embed-react", () => ({
  default: (props: { config?: Record<string, string> }) => {
    calProps(props);
    return <div data-testid="cal-inline" data-notes={props.config?.notes ?? ""} />;
  },
  getCalApi: vi.fn(async () => vi.fn()),
}));

function renderAt(search: string) {
  window.history.replaceState(null, "", `/book${search}`);
  return render(
    <LazyMotion features={domMax} strict>
      <BookPage />
    </LazyMotion>
  );
}

afterEach(() => window.history.replaceState(null, "", "/"));

describe("BookPage with a brief from the homepage", () => {
  it("shows the brief above the calendar and puts it in the booking notes", async () => {
    renderAt("?needs=websites,seo&stage=improve&timing=soon");
    expect(await screen.findByRole("region", { name: /your brief/i })).toHaveTextContent(
      "I need help with a website and SEO."
    );
    await vi.waitFor(() =>
      expect(screen.getByTestId("cal-inline").dataset.notes).toContain("I need help with a website and SEO.")
    );
  });

  it("shows no brief and leaves the notes empty without one", () => {
    renderAt("");
    expect(screen.queryByRole("region", { name: /your brief/i })).toBeNull();
    expect(screen.getByTestId("cal-inline").dataset.notes).toBe("");
  });

  it("ignores a query that holds no known needs", () => {
    renderAt("?needs=<script>&stage=new");
    expect(screen.queryByRole("region", { name: /your brief/i })).toBeNull();
    expect(screen.getByTestId("cal-inline").dataset.notes).toBe("");
  });
});
