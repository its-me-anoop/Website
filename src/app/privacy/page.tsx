import type { Metadata, Viewport } from "next";
import { RedesignShell } from "@/components/bloom/redesign/RedesignShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { studioViewport } from "@/lib/studio";
import styles from "@/components/bloom/redesign/legal.module.css";

const description =
  "Privacy notice for Flutterly Digital Delivery: who we are, what personal information the marketing site handles, and how to contact us.";

const postalAddress = [
  site.address.streetAddress,
  site.address.addressLocality,
  site.address.addressRegion,
  site.address.postalCode,
  "United Kingdom",
].join(", ");

export const metadata: Metadata = {
  title: "Privacy notice",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy notice — ${site.studio}`,
    description,
    url: `${site.url}/privacy`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
  },
};

export const viewport: Viewport = studioViewport;

/**
 * Site-wide privacy notice built only from facts already published on
 * this marketing site (site.ts + cookie policy). No company number is
 * stated here because none is published in the existing source files.
 */
export default function PrivacyPage() {
  return (
    <RedesignShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy notice", path: "/privacy" },
        ])}
      />
      <article className={styles.article}>
        <p className={styles.eyebrow}>Privacy</p>
        <h1 className={styles.title}>Privacy notice</h1>
        <p className={styles.lead}>
          This notice explains how {site.legalName} handles personal
          information when you use the Flutterly Digital Delivery marketing
          website or email {site.email}.
        </p>
        <p className={styles.meta}>Last reviewed: 1 September 2026</p>

        <div className={styles.sections}>
          <section>
            <h2>Who we are</h2>
            <p>
              The controller for this website is {site.legalName}, trading as{" "}
              {site.studio} Digital Delivery. We are based in{" "}
              {site.address.addressLocality}, UK.
            </p>
            <p>
              Postal address: {postalAddress}. Email:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>

          <section>
            <h2>What this website collects</h2>
            <p>
              The marketing site does not currently run analytics or advertising
              trackers. Browser preference choices may be stored locally in your
              browser as described in the{" "}
              <a href="/cookie-policy">cookie policy</a>.
            </p>
            <p>
              If you email us, or book a call through Cal.com, we receive the
              contact details and message content you choose to send so we can
              reply and arrange the conversation. Cal.com processes booking
              details under its own terms when you use that service.
            </p>
          </section>

          <section>
            <h2>Why we use that information</h2>
            <ul>
              <li>To respond to enquiries and schedule calls</li>
              <li>To deliver and improve the website</li>
              <li>To meet legal obligations that apply to the business</li>
            </ul>
          </section>

          <section>
            <h2>Sharing</h2>
            <p>
              We do not sell personal information. Service providers needed to
              run the website or booking flow (for example hosting or Cal.com)
              may process information on our behalf. Project apps such as Sipli
              and Artling have their own privacy notices.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              Under UK GDPR you can ask for access to personal information we
              hold about you, ask us to correct it, delete it where appropriate,
              or restrict how it is used. Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> to make a
              request. You can also complain to the Information Commissioner&apos;s
              Office (ICO).
            </p>
          </section>

          <section>
            <h2>Related notices</h2>
            <ul>
              <li>
                <a href="/cookie-policy">Cookie policy</a>
              </li>
              <li>
                <a href="/projects/sipli/privacy-policy">Sipli privacy policy</a>
              </li>
              <li>
                <a href="/projects/artling/privacy-policy">
                  Artling privacy policy
                </a>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </RedesignShell>
  );
}
