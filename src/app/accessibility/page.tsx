import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AccessibilityStatement } from "@/components/signal/pages/AccessibilityStatement";

const description = `Accessibility statement for ${site.domain}: the standards this website aims to meet, how it is tested, and how to report a problem.`;

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
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Accessibility statement — ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const sections = [
  {
    title: "Our commitment",
    body: (
      <p>
        Flutterly builds websites for organisations whose visitors span every
        age, ability and device, so this site is held to the same standard
        asked of client work. {site.domain} aims to meet the Web Content
        Accessibility Guidelines (WCAG) 2.2 at level AA.
      </p>
    ),
  },
  {
    title: "What that means in practice",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Semantic HTML with a logical heading structure on every page</li>
        <li>Full keyboard operability, with visible focus styles</li>
        <li>Text and interface colours that meet AA contrast ratios</li>
        <li>Text alternatives for meaningful images</li>
        <li>Animation that respects the reduced-motion preference in your operating system</li>
        <li>Layouts that reflow for zoom and small screens</li>
      </ul>
    ),
  },
  {
    title: "How this site is tested",
    body: (
      <p>
        The site is checked with automated tooling and by hand: keyboard
        navigation, screen-reader spot checks and mobile-viewport reviews, as
        part of every release rather than as an occasional exercise.
      </p>
    ),
  },
  {
    title: "Found a problem?",
    body: (
      <p>
        If any part of this website is hard to use with assistive technology,
        please say so. It will be treated as a bug, not feedback. Email{" "}
        <a
          href={`mailto:${site.supportEmail}`}
          className="font-semibold text-s-on-ink underline decoration-s-signal decoration-2 underline-offset-4"
        >
          {site.supportEmail}
        </a>{" "}
        and you will get a response within two working days.
      </p>
    ),
  },
] as const;

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Accessibility statement", path: "/accessibility" },
        ])}
      />
      <AccessibilityStatement description={description} sections={sections} reviewed="September 2026" />
    </>
  );
}
