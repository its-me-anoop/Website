import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Bullet, LegalPage, PolicySection } from "@/components/aurora/LegalPage";

const description =
  "Accessibility statement for flutterly.uk — the standards this website aims to meet, how it is tested, and how to report a problem.";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description,
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: `Accessibility statement — ${site.studio}`,
    description,
    url: `${site.url}/accessibility`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060d11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility statement"
      meta="Last reviewed July 2026"
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Accessibility statement", path: "/accessibility" },
        ])}
      />

      <PolicySection label="01" title="Our commitment">
        <p>
          Flutterly builds websites for organisations whose visitors span every
          age, ability and device — so this site is held to the same standard
          asked of client work. flutterly.uk aims to meet the Web Content
          Accessibility Guidelines (WCAG) 2.2 at level AA.
        </p>
      </PolicySection>

      <PolicySection label="02" title="What that means in practice">
        <ul className="space-y-3">
          <Bullet bold="Structure —">
            semantic HTML with a logical heading order on every page, and a skip
            link to the main content.
          </Bullet>
          <Bullet bold="Keyboard —">
            every control is reachable and operable without a mouse, with a
            visible focus indicator that meets contrast requirements.
          </Bullet>
          <Bullet bold="Contrast —">
            text and interface colours meet AA ratios on both the dark canvas
            and the light panels.
          </Bullet>
          <Bullet bold="Images —">
            meaningful images carry text alternatives; decorative graphics,
            including every background effect on this site, are hidden from
            assistive technology.
          </Bullet>
          <Bullet bold="Motion —">
            animation respects the reduced-motion setting in your operating
            system. With it on, entrances, parallax and the particle field are
            switched off and content renders immediately.
          </Bullet>
          <Bullet bold="Transparency —">
            frosted surfaces fall back to solid panels when your system asks for
            reduced transparency.
          </Bullet>
          <Bullet bold="Reflow —">
            layouts reflow for zoom and small screens without horizontal
            scrolling.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="03" title="How this site is tested">
        <p>
          The site is checked with automated tooling and by hand — keyboard
          navigation, screen-reader spot checks and mobile-viewport reviews — as
          part of every release, not as an occasional exercise. A headless
          browser audit runs every route at phone and desktop sizes on each
          change, and fails the build on broken links, missing landmarks,
          horizontal overflow or console errors.
        </p>
      </PolicySection>

      <PolicySection label="04" title="Found a problem?">
        <p>
          If any part of this website is hard to use with assistive technology,
          please say so — it will be treated as a bug, not feedback. Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-au-teal underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          and you will get a response within two working days.
        </p>
      </PolicySection>
    </LegalPage>
  );
}
