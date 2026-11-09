"use client";

import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { SlabStack } from "../ui/SlabStack";
import { ButtonLink } from "../ui/primitives";

/** 404: the one thing on the site that is not where it should be. */
export function NotFoundPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Error 404"
        tone="tone-cobalt"
        art={<SlabStack order={["navy", "pink", "jade", "sun", "flame", "white"]} />}
        title={
          <>
            This page is not <em>sorted</em> yet.
          </>
        }
        copy={<p>The address may be mistyped, or the page may have moved. Everything else is where it should be.</p>}
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
