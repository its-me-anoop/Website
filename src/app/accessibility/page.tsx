import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { KilnShell } from "@/components/kiln/KilnShell";

const description =
  "Accessibility statement for flutterly.uk: the standards this website aims to meet, how it is tested, and how to report a problem.";

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
  themeColor: "#f3f0ea",
  colorScheme: "light",
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
        asked of client work. flutterly.uk aims to meet the Web Content
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
          href={`mailto:${site.email}`}
          className="font-medium text-k-fire underline-offset-4 hover:underline"
        >
          {site.email}
        </a>{" "}
        and you will get a response within two working days.
      </p>
    ),
  },
] as const;

export default function AccessibilityPage() {
  return (
    <KilnShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Accessibility statement", path: "/accessibility" },
        ])}
      />
      <article id="top" className="mx-auto w-full max-w-[1280px] px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
        <header className="max-w-[760px]">
          <p className="k-eyebrow text-k-muted">Accessibility</p>
          <h1 className="k-display mt-6 text-[clamp(2.25rem,5vw,4rem)] text-k-ink">
            Accessibility <em>statement</em>
          </h1>
          <p className="mt-6 max-w-[600px] text-[17.5px] leading-[1.6] text-k-ink-soft">
            {description}
          </p>
        </header>

        <div className="mt-16 max-w-[880px] divide-y divide-k-line border-y border-k-line">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-4 py-9 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12"
            >
              <h2 className="k-display text-[24px] text-k-ink">{section.title}</h2>
              <div className="max-w-[62ch] text-[16px] leading-[1.65] text-k-ink-soft">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-8 text-[13.5px] text-k-muted">
          This statement was last reviewed in September 2026.
        </p>
      </article>
    </KilnShell>
  );
}
