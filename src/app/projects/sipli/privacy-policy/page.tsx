import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sipli — Privacy Policy",
  description:
    "Privacy policy for Sipli, the iOS hydration tracking app with on-device AI.",
  alternates: {
    canonical: "/projects/sipli/privacy-policy",
  },
};

const effectiveDate = "February 6, 2026";

function PolicySection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line px-[var(--gutter)] py-14 last:border-b-0 md:py-20">
      <div className="mx-auto grid max-w-[920px] gap-x-14 gap-y-4 md:grid-cols-[64px_1fr] md:items-start">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-accent md:pt-1.5">
          {label}
        </p>
        <div>
          <h2 className="mb-5 font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            {title}
          </h2>
          <div className="max-w-[640px] space-y-4 text-[15.5px] leading-[1.75] text-ink-2">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ bold, children }: { bold?: string; children?: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <span>
        {bold ? <strong className="text-ink">{bold} </strong> : null}
        {children}
      </span>
    </li>
  );
}

export default function SipliPrivacyPolicy() {
  return (
    <main id="main" className="sipli-theme min-h-screen bg-background text-ink">
      <Navbar />

      <header className="relative overflow-hidden border-b border-line px-[var(--gutter)] pb-20 pt-36 md:pt-48">
        <div
          className="pointer-events-none absolute right-[-10%] top-[-20%] h-[420px] w-[620px] rounded-full"
          style={{ background: "var(--accent-soft)", filter: "blur(110px)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[920px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Legal
          </span>
          <h1 className="mt-6 text-[clamp(36px,5.5vw,64px)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Sipli — Privacy Policy
          </h1>
          <p className="mt-5 text-[15px] text-ink-3">
            Effective: {effectiveDate}
          </p>
        </div>
      </header>

      <PolicySection label="01" title="Summary">
        <p>
          Sipli is designed to assist users with hydration tracking and,
          optionally, to utilise device data for personalised goal setting. The
          app limits data collection to essentials, and users can manage
          permissions at any time via Settings.
        </p>
      </PolicySection>

      <PolicySection label="02" title="Information We Collect">
        <p>The App collects the following data:</p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Account &amp; subscription details —">
            Managed through Apple&rsquo;s StoreKit framework.
          </Bullet>
          <Bullet bold="Application usage data —">
            Stored locally on your device, including hydration entries, goals,
            and preferences.
          </Bullet>
          <Bullet bold="HealthKit data (optional) —">
            Workouts and water intake, accessed only with your explicit
            permission.
          </Bullet>
          <Bullet bold="Location data (optional) —">
            Used solely for weather-based hydration adjustments.
          </Bullet>
          <Bullet bold="Notification preferences —">
            Scheduling data for hydration reminders.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="03" title="How We Use Your Information">
        <p>Your data is used to:</p>
        <ul className="mt-2 space-y-3">
          <Bullet>Track and display your hydration progress.</Bullet>
          <Bullet>Schedule personalised reminders.</Bullet>
          <Bullet>Generate insights based on your hydration history.</Bullet>
          <Bullet>
            Calculate adaptive goals based on weather and activity levels.
          </Bullet>
          <Bullet>Synchronise data via iCloud (optional).</Bullet>
          <Bullet>Improve app performance and user experience.</Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="04" title="Health Data">
        <p>
          Health data is accessed solely with your explicit authorisation and is
          used exclusively for adjusting hydration goals and optionally for
          syncing water intake.
        </p>
        <p>
          Your health data is{" "}
          <strong className="text-ink">never sold</strong> or used for
          advertising purposes.
        </p>
      </PolicySection>

      <PolicySection label="05" title="Location Data">
        <p>
          Location data is employed strictly to retrieve local weather
          information for the purpose of adaptive hydration goal calculation.
        </p>
        <p>
          The App does <strong className="text-ink">not</strong> maintain
          location history.
        </p>
      </PolicySection>

      <PolicySection label="06" title="Data Storage &amp; Sync">
        <p>
          Core hydration data remains{" "}
          <strong className="text-ink">local on your device</strong>. Optional
          iCloud synchronisation stores data in private containers accessible
          only to you.
        </p>
      </PolicySection>

      <PolicySection label="07" title="Sharing of Data">
        <p>
          We do{" "}
          <strong className="text-ink">not sell your personal data</strong>.
          Data sharing with third parties occurs only when essential for core
          functionality:
        </p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Apple —">
            For in-app purchases and subscription management via StoreKit.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="08" title="Security">
        <p>
          Your information is safeguarded by platform-specific protections
          including iOS Secure Enclave and app sandboxing. We follow industry
          best practices to protect your data from unauthorised access.
        </p>
      </PolicySection>

      <PolicySection label="09" title="Your Choices">
        <p>You have full control over your data and permissions:</p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="HealthKit —">
            Revoke access at any time in your device Settings.
          </Bullet>
          <Bullet bold="Location —">
            Revoke access at any time in your device Settings.
          </Bullet>
          <Bullet bold="Notifications —">
            Disable at any time in your device Settings.
          </Bullet>
          <Bullet bold="Data deletion —">
            Deleting the App removes all local data. iCloud data can be managed
            through iOS Settings.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="10" title="Children&rsquo;s Privacy">
        <p>
          Sipli is{" "}
          <strong className="text-ink">
            not intended for use by individuals under the age of 13
          </strong>
          . We do not knowingly collect personal information from children under
          13.
        </p>
      </PolicySection>

      <PolicySection label="11" title="Changes to This Policy">
        <p>
          We may update this privacy policy from time to time. Material
          revisions will be reflected with an updated effective date at the top
          of this page. Continued use of the App after changes constitutes
          acceptance of the updated policy.
        </p>
      </PolicySection>

      <PolicySection label="12" title="Contact">
        <p>
          If you have questions or concerns about this privacy policy, please
          contact us at{" "}
          <a
            href="mailto:anoop@flutterly.co.uk"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            anoop@flutterly.co.uk
          </a>
          .
        </p>
        <div className="mt-6 rounded-[var(--r-md)] border border-line bg-surface p-5 shadow-[var(--shadow-sm)]">
          <p className="text-sm font-medium text-ink">Flutterly Ltd</p>
          <p className="mt-1 text-sm text-ink-3">
            Flat 21, 3 Erleigh Road, Reading, Berkshire RG1 5LR, United Kingdom
          </p>
        </div>
      </PolicySection>

      <Footer />
    </main>
  );
}
