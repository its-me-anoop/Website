import type { Metadata, Viewport } from "next";
import { BloomShell } from "@/components/bloom/BloomShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "How Flutterly Limited uses browser storage and controls optional analytics and marketing technologies.",
  alternates: { canonical: "/cookie-policy" },
};

export const viewport: Viewport = {
  themeColor: "#f7faf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function CookiePolicyPage() {
  return (
    <BloomShell>
      <article className="mx-auto w-full max-w-[860px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bl-teal">
          Privacy
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-bl-ink">
          Cookie policy
        </h1>
        <p className="mt-5 max-w-[680px] text-[17px] leading-[1.65] text-bl-ink-soft">
          Flutterly Limited does not currently use analytics cookies,
          advertising cookies or third-party tracking pixels on this website.
          This page explains what is stored, what the preference controls mean,
          and what must happen before optional services can be introduced.
        </p>
        <p className="mt-4 text-[13px] font-medium text-bl-muted">
          Last reviewed: 2 August 2026
        </p>

        <div className="mt-14 space-y-12 border-t border-bl-line pt-10">
          <PolicySection title="What this site stores">
            <p>
              When you choose Accept all, Reject non-essential or save custom
              preferences, the site records that choice in your browser’s local
              storage under <code>flutterly.cookieConsent</code>. Local storage
              is not a cookie and is not sent to Flutterly with each page request.
              It stays in that browser until you clear site data or change the
              preference.
            </p>
          </PolicySection>

          <PolicySection title="The three preference categories">
            <dl className="divide-y divide-bl-line border-y border-bl-line">
              <Category
                name="Essential"
                status="Always active"
                copy="Covers delivery of the website and remembering the privacy choice. The current site does not set an essential cookie; the choice itself is stored locally in the browser."
              />
              <Category
                name="Analytics"
                status="No provider active"
                copy="Would cover a named measurement service used to understand visits and improve pages. No analytics script or analytics cookie is currently present."
              />
              <Category
                name="Marketing"
                status="No provider active"
                copy="Would cover advertising pixels or campaign-attribution services. No advertising or marketing tracker is currently present."
              />
            </dl>
          </PolicySection>

          <PolicySection title="How optional services are controlled">
            <p>
              Optional scripts must check the saved category before they load or
              write any cookie. If Flutterly adds a named analytics or marketing
              provider, the consent version will be changed so previous choices
              are not treated as permission for a service that was not described
              when the choice was made.
            </p>
          </PolicySection>

          <PolicySection title="External websites">
            <p>
              Links to LinkedIn, GitHub, client websites and other external
              services leave flutterly.uk. Those organisations may set their own
              cookies under their own policies after you follow the link.
              Flutterly’s preference control cannot manage another website.
            </p>
          </PolicySection>

          <PolicySection title="Change or clear your choice">
            <p>
              Use the Cookie settings control at the bottom of any page to reopen
              the preference panel. You can also remove the saved record by
              clearing site data for flutterly.uk in your browser.
            </p>
          </PolicySection>

          <PolicySection title="Questions">
            <p>
              Email <a className="font-semibold text-bl-teal underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a> if you have a question about this notice or the website’s use of browser storage.
            </p>
          </PolicySection>
        </div>
      </article>
    </BloomShell>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-bl-ink">{title}</h2>
      <div className="mt-3 max-w-[720px] text-[15.5px] leading-[1.7] text-bl-ink-soft">{children}</div>
    </section>
  );
}

function Category({ name, status, copy }: { name: string; status: string; copy: string }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[150px_150px_1fr] sm:gap-5">
      <dt className="font-semibold text-bl-ink">{name}</dt>
      <dd className="text-[13px] font-semibold text-bl-teal">{status}</dd>
      <dd className="text-[14px] leading-[1.65]">{copy}</dd>
    </div>
  );
}
