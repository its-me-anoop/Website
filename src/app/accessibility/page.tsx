import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { BloomShell } from "@/components/bloom/BloomShell";

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
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function AccessibilityPage() {
  return (
    <BloomShell>
      <article className="mx-auto w-full max-w-[720px] px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-teal">
          Accessibility
        </p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-bl-ink">
          Accessibility statement
        </h1>
        <div className="mt-8 space-y-8 text-[15.5px] leading-relaxed text-bl-ink-soft">
          <section>
            <h2 className="text-[19px] font-medium tracking-tight text-bl-ink">
              Our commitment
            </h2>
            <p className="mt-2.5">
              Flutterly builds websites for organisations whose visitors span
              every age, ability and device — so this site is held to the same
              standard asked of client work. flutterly.uk aims to meet the Web
              Content Accessibility Guidelines (WCAG) 2.2 at level AA.
            </p>
          </section>
          <section>
            <h2 className="text-[19px] font-medium tracking-tight text-bl-ink">
              What that means in practice
            </h2>
            <ul className="mt-2.5 list-disc space-y-1.5 pl-5">
              <li>Semantic HTML with a logical heading structure on every page</li>
              <li>Full keyboard operability, with visible focus styles</li>
              <li>Text and interface colours that meet AA contrast ratios</li>
              <li>Text alternatives for meaningful images</li>
              <li>
                Animation that respects the reduced-motion preference in your
                operating system
              </li>
              <li>Layouts that reflow for zoom and small screens</li>
            </ul>
          </section>
          <section>
            <h2 className="text-[19px] font-medium tracking-tight text-bl-ink">
              How this site is tested
            </h2>
            <p className="mt-2.5">
              The site is checked with automated tooling and by hand — keyboard
              navigation, screen-reader spot checks and mobile-viewport reviews
              — as part of every release, not as an occasional exercise.
            </p>
          </section>
          <section>
            <h2 className="text-[19px] font-medium tracking-tight text-bl-ink">
              Found a problem?
            </h2>
            <p className="mt-2.5">
              If any part of this website is hard to use with assistive
              technology, please say so — it will be treated as a bug, not
              feedback. Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-bl-teal underline-offset-2 hover:underline"
              >
                {site.email}
              </a>{" "}
              or call {site.phoneDisplay}, and you will get a response within
              two working days.
            </p>
          </section>
          <p className="border-t border-bl-line pt-6 text-[13.5px] text-bl-muted">
            This statement was last reviewed in July 2026.
          </p>
        </div>
      </article>
    </BloomShell>
  );
}
