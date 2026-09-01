import type { Metadata, Viewport } from "next";
import { RedesignShell } from "@/components/bloom/redesign/RedesignShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { studioViewport } from "@/lib/studio";
import styles from "@/components/bloom/redesign/legal.module.css";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "How Flutterly Digital Delivery uses browser storage and controls optional analytics and marketing technologies.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: `Cookie policy — ${site.studio}`,
    description:
      "How Flutterly Digital Delivery uses browser storage and controls optional analytics and marketing technologies.",
    url: `${site.url}/cookie-policy`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
  },
};

export const viewport: Viewport = studioViewport;

export default function CookiePolicyPage() {
  return (
    <RedesignShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cookie policy", path: "/cookie-policy" },
        ])}
      />
      <article className={styles.article}>
        <p className={styles.eyebrow}>Privacy</p>
        <h1 className={styles.title}>Cookie policy</h1>
        <p className={styles.lead}>
          Flutterly Limited does not currently use analytics cookies,
          advertising cookies or third-party tracking pixels on this website.
          This page explains what is stored, what the preference controls mean,
          and what must happen before optional services can be introduced.
        </p>
        <p className={styles.meta}>Last reviewed: 1 September 2026</p>

        <div className={styles.sections}>
          <section>
            <h2>What this site stores</h2>
            <p>
              When you choose Accept all, Reject non-essential or save custom
              preferences, the site records that choice in your browser&apos;s
              local storage under <code>flutterly.cookieConsent</code>. Local
              storage is not a cookie and is not sent to Flutterly with each
              page request. It stays in that browser until you clear site data
              or change the preference.
            </p>
          </section>

          <section>
            <h2>The three preference categories</h2>
            <dl className={styles.categories}>
              <div className={styles.category}>
                <dt className={styles.categoryName}>Essential</dt>
                <dd className={styles.categoryStatus}>Always active</dd>
                <dd className={styles.categoryCopy}>
                  Covers delivery of the website and remembering the privacy
                  choice. The current site does not set an essential cookie; the
                  choice itself is stored locally in the browser.
                </dd>
              </div>
              <div className={styles.category}>
                <dt className={styles.categoryName}>Analytics</dt>
                <dd className={styles.categoryStatus}>No provider active</dd>
                <dd className={styles.categoryCopy}>
                  Would cover a named measurement service used to understand
                  visits and improve pages. No analytics script or analytics
                  cookie is currently present.
                </dd>
              </div>
              <div className={styles.category}>
                <dt className={styles.categoryName}>Marketing</dt>
                <dd className={styles.categoryStatus}>No provider active</dd>
                <dd className={styles.categoryCopy}>
                  Would cover advertising pixels or campaign-attribution
                  services. No advertising or marketing tracker is currently
                  present.
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2>How optional services are controlled</h2>
            <p>
              Optional scripts must check the saved category before they load or
              write any cookie. If Flutterly adds a named analytics or marketing
              provider, the consent version will be changed so previous choices
              are not treated as permission for a service that was not described
              when the choice was made.
            </p>
          </section>

          <section>
            <h2>External websites</h2>
            <p>
              Links to LinkedIn, GitHub, client websites and other external
              services leave this site. Those organisations may set their own
              cookies under their own policies after you follow the link.
              Flutterly&apos;s preference control cannot manage another website.
            </p>
          </section>

          <section>
            <h2>Change or clear your choice</h2>
            <p>
              Use the Cookie settings control where it appears, or remove the
              saved record by clearing site data for this domain in your
              browser.
            </p>
          </section>

          <section>
            <h2>Questions</h2>
            <p>
              Email <a href={`mailto:${site.email}`}>{site.email}</a> if you
              have a question about this notice or the website&apos;s use of
              browser storage.
            </p>
          </section>
        </div>
      </article>
    </RedesignShell>
  );
}
