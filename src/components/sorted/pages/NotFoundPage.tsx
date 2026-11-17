"use client";

import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { ButtonLink } from "../ui/primitives";

/** 404: the one thing on the site that is not where it should be. */
export function NotFoundPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Error 404"
        title={
          <>
            Page <em>not found.</em>
          </>
        }
        copy={<p>Check the address, or use one of these links to find your way back.</p>}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/" size="lg" arrow="right">
            Back to the home page
          </ButtonLink>
          <ButtonLink href="/services" tone="plain" size="lg">
            See the services
          </ButtonLink>
        </div>
      </PageHero>
    </Shell>
  );
}
