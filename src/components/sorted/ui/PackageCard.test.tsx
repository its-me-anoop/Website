import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { PackageCard } from "./PackageCard";

vi.mock("next/navigation", () => ({ usePathname: () => "/packages" }));

const pkg = {
  name: "Standard",
  strap: "Build plus a care plan",
  copy: "Copy",
  price: "£310",
  pricePeriod: "+ £49/month",
  cta: "Enquire",
  features: ["Custom build"],
  monthly: ["Hosting", "Changes made for you on request"],
};

const renderCard = (p: Omit<typeof pkg, "monthly"> & { monthly?: string[] }) =>
  render(
    <LazyMotion features={domMax} strict>
      <ul>
        <PackageCard pkg={p} index={0} />
      </ul>
    </LazyMotion>
  );

describe("PackageCard", () => {
  it("lists what the build delivers and what the monthly fee covers, under their own labels", () => {
    renderCard(pkg);
    const build = screen.getByRole("list", { name: "The build" });
    const monthly = screen.getByRole("list", { name: "Every month" });
    expect(within(build).getByText("Custom build")).toBeInTheDocument();
    expect(within(monthly).getByText("Changes made for you on request")).toBeInTheDocument();
  });

  it("keeps a single unlabelled list for a package without a monthly fee", () => {
    renderCard({ ...pkg, monthly: undefined });
    expect(screen.queryByRole("list", { name: "Every month" })).toBeNull();
    expect(screen.getByText("Custom build")).toBeInTheDocument();
  });
});
