import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { essentialsPackage, quotePaths, standardPackage } from "@/lib/marketing/quote";
import { QuoteDesk } from "./QuoteDesk";

function renderDesk() {
  return render(<QuoteDesk />);
}

describe("QuoteDesk", () => {
  it("opens on a GP practice at the published Standard price", () => {
    renderDesk();
    expect(screen.getByRole("radio", { name: "A GP practice" })).toBeChecked();
    expect(document.getElementById("figure-price")).toHaveTextContent(standardPackage.price);
    expect(screen.getByRole("link", { name: "Book a call about a GP website" })).toHaveAttribute("href", "/book?for=gp");
    expect(screen.getByRole("link", { name: "Leaving My Surgery Website" })).toHaveAttribute("href", "/leaving-msw");
    expect(screen.getByText(new RegExp(`Essentials is ${essentialsPackage.price}`))).toBeInTheDocument();
  });

  it("switches the figure, the booking link and the sample without leaving the page", () => {
    renderDesk();

    fireEvent.click(screen.getByRole("radio", { name: "A care home" }));
    expect(screen.getByRole("radio", { name: "A care home" })).toBeChecked();
    expect(document.getElementById("figure-price")).toHaveTextContent(standardPackage.price);
    expect(screen.getByRole("link", { name: "Book a call about a care home website" })).toHaveAttribute(
      "href",
      "/book?for=care"
    );
    expect(screen.getByRole("link", { name: "Oakfield House sample" })).toHaveAttribute("href", "/demo/care-home");
    expect(screen.queryByRole("link", { name: "Leaving My Surgery Website" })).toBeNull();

    fireEvent.click(screen.getByRole("radio", { name: "A clinic or pharmacy" }));
    expect(screen.getByRole("link", { name: "Dental sample" })).toHaveAttribute("href", "/demo/dental-practice");
    expect(screen.getByRole("link", { name: "Pharmacy sample" })).toHaveAttribute("href", "/demo/pharmacy");
    expect(screen.getByRole("link", { name: "Physio sample" })).toHaveAttribute("href", "/demo/physio-clinic");

    fireEvent.click(screen.getByRole("radio", { name: "Another organisation" }));
    expect(document.getElementById("figure-price")).toHaveTextContent(essentialsPackage.price);
    expect(screen.getByRole("link", { name: /^Book a call$/ })).toHaveAttribute("href", "/book?for=other");
    expect(screen.getByText(new RegExp(`Standard is ${standardPackage.price}`))).toBeInTheDocument();
  });

  it("offers every path as a real radio with a 44px target", () => {
    renderDesk();
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.getAttribute("value"))).toEqual(quotePaths.map((path) => path.id));
    radios.forEach((radio) => {
      const label = radio.closest("label");
      expect(label?.className).toMatch(/min-h-11/);
    });
  });
});
