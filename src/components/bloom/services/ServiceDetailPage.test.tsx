import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { businessEmailService, socialMediaService, type BusinessService } from "../data";
import { ServiceDetailPage } from "./ServiceDetailPage";

function renderService(service: BusinessService) {
  return render(
    <LazyMotion features={domMax} strict>
      <ServiceDetailPage service={service} />
    </LazyMotion>
  );
}

describe("ServiceDetailPage", () => {
  it("explains the business email platforms and setup scope", () => {
    renderService(businessEmailService);

    expect(
      screen.getByRole("heading", { level: 1, name: businessEmailService.headline })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Microsoft 365").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/multi-factor authentication/i).length).toBeGreaterThan(0);
  });

  it("frames social support around campaigns and responsible communication", () => {
    renderService(socialMediaService);

    expect(
      screen.getByRole("heading", { level: 1, name: socialMediaService.headline })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/campaign planning/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/does not promise follower counts/i)).toBeInTheDocument();
  });
});
