import type { Metadata, Viewport } from "next";
import { RedesignShell } from "@/components/bloom/redesign/RedesignShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { studioViewport } from "@/lib/studio";
import styles from "@/components/bloom/redesign/legal.module.css";

const description =
  "Accessibility statement for Flutterly Digital Delivery — the standards this website aims to meet, how it is tested, and how to report a problem.";

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

export const viewport: Viewport = studioViewport;

export default function AccessibilityPage() {
  return (
    <RedesignShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Accessibility statement", path: "/accessibility" },
        ])}
      />
      <article className={styles.article}>
        <p className={styles.eyebrow}>Accessibility</p>
        <h1 className={styles.title}>Accessibility statement</h1>
        <p className={styles.lead}>
          Flutterly Digital Delivery builds websites for organisations whose
          visitors span every age, ability and device — so this site is held to
          the same standard asked of client work.
        </p>
        <p className={styles.meta}>Last reviewed: 1 September 2026</p>

        <div className={styles.sections}>
          <section>
            <h2>Our commitment</h2>
            <p>
              {site.url.replace("https://", "")} aims to meet the Web Content
              Accessibility Guidelines (WCAG) 2.2 at level AA.
            </p>
          </section>
          <section>
            <h2>What that means in practice</h2>
            <ul>
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
            <h2>How this site is tested</h2>
            <p>
              The site is checked with automated tooling and by hand — keyboard
              navigation, screen-reader spot checks and mobile-viewport reviews
              — as part of every release, not as an occasional exercise.
            </p>
          </section>
          <section>
            <h2>Found a problem?</h2>
            <p>
              If any part of this website is hard to use with assistive
              technology, please say so — it will be treated as a bug, not
              feedback. Email <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
              and you will get a response within two working days.
            </p>
          </section>
        </div>
      </article>
    </RedesignShell>
  );
}
