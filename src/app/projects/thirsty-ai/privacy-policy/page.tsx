import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WaterQuest — Privacy Policy",
  description:
    "Privacy policy for WaterQuest (Thirsty.ai), the iOS hydration tracking app with on-device AI.",
  alternates: {
    canonical: "/projects/thirsty-ai/privacy-policy",
  },
};

const effectiveDate = "February 6, 2026";

interface SectionProps {
  label: string;
  title: string;
  children: React.ReactNode;
}

function PolicySection({ label, title, children }: SectionProps) {
  return (
    <section className="py-16 md:py-20 px-6 md:px-14 border-b border-border last:border-b-0">
      <div className="max-w-[820px] mx-auto">
        <p className="text-[10px] font-medium text-foreground-tertiary uppercase tracking-[0.15em] mb-3">
          {label}
        </p>
        <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-6">
          {title}
        </h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-foreground-secondary">
          {children}
        </div>
      </div>
    </section>
  );
}

function Bullet({
  bold,
  children,
}: {
  bold?: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
      <span>
        {bold && <strong className="text-foreground">{bold} </strong>}
        {children}
      </span>
    </li>
  );
}

export default function ThirstyAiPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-14 bg-background-secondary">
        <div className="max-w-[820px] mx-auto">
          <p className="text-[10px] font-medium text-foreground-tertiary uppercase tracking-[0.15em] mb-4">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            WaterQuest — Privacy Policy
          </h1>
          <p className="text-foreground-secondary text-[15px]">
            Effective: {effectiveDate}
          </p>
        </div>
      </section>

      {/* Summary */}
      <PolicySection label="01" title="Summary">
        <p>
          WaterQuest is designed to assist users with hydration tracking and,
          optionally, to utilise device data for personalised goal setting. The
          app limits data collection to essentials, and users can manage
          permissions at any time via Settings.
        </p>
      </PolicySection>

      {/* Information Collected */}
      <PolicySection label="02" title="Information We Collect">
        <p>The App collects the following data:</p>
        <ul className="space-y-3 mt-2">
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

      {/* Use of Information */}
      <PolicySection label="03" title="How We Use Your Information">
        <p>Your data is used to:</p>
        <ul className="space-y-3 mt-2">
          <Bullet>Track and display your hydration progress.</Bullet>
          <Bullet>Schedule personalised reminders.</Bullet>
          <Bullet>
            Generate insights based on your hydration history.
          </Bullet>
          <Bullet>
            Calculate adaptive goals based on weather and activity levels.
          </Bullet>
          <Bullet>Synchronise data via iCloud (optional).</Bullet>
          <Bullet>Improve app performance and user experience.</Bullet>
        </ul>
      </PolicySection>

      {/* Health Data */}
      <PolicySection label="04" title="Health Data">
        <p>
          Health data is accessed solely with your explicit authorisation and is
          used exclusively for adjusting hydration goals and optionally for
          syncing water intake.
        </p>
        <p>
          Your health data is{" "}
          <strong className="text-foreground">never sold</strong> or used for
          advertising purposes.
        </p>
      </PolicySection>

      {/* Location Data */}
      <PolicySection label="05" title="Location Data">
        <p>
          Location data is employed strictly to retrieve local weather
          information for the purpose of adaptive hydration goal calculation.
        </p>
        <p>
          The App does{" "}
          <strong className="text-foreground">not</strong> maintain location
          history.
        </p>
      </PolicySection>

      {/* Data Storage & Sync */}
      <PolicySection label="06" title="Data Storage &amp; Sync">
        <p>
          Core hydration data remains{" "}
          <strong className="text-foreground">local on your device</strong>.
          Optional iCloud synchronisation stores data in private containers
          accessible only to you.
        </p>
      </PolicySection>

      {/* Sharing */}
      <PolicySection label="07" title="Sharing of Data">
        <p>
          We do{" "}
          <strong className="text-foreground">
            not sell your personal data
          </strong>
          . Data sharing with third parties occurs only when essential for core
          functionality:
        </p>
        <ul className="space-y-3 mt-2">
          <Bullet bold="Apple —">
            For in-app purchases and subscription management via StoreKit.
          </Bullet>
        </ul>
      </PolicySection>

      {/* Security */}
      <PolicySection label="08" title="Security">
        <p>
          Your information is safeguarded by platform-specific protections
          including iOS Secure Enclave and app sandboxing. We follow industry
          best practices to protect your data from unauthorised access.
        </p>
      </PolicySection>

      {/* User Choices */}
      <PolicySection label="09" title="Your Choices">
        <p>
          You have full control over your data and permissions:
        </p>
        <ul className="space-y-3 mt-2">
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

      {/* Children's Privacy */}
      <PolicySection label="10" title="Children&rsquo;s Privacy">
        <p>
          WaterQuest is{" "}
          <strong className="text-foreground">
            not intended for use by individuals under the age of 13
          </strong>
          . We do not knowingly collect personal information from children under
          13.
        </p>
      </PolicySection>

      {/* Changes */}
      <PolicySection label="11" title="Changes to This Policy">
        <p>
          We may update this privacy policy from time to time. Material
          revisions will be reflected with an updated effective date at the top
          of this page. Continued use of the App after changes constitutes
          acceptance of the updated policy.
        </p>
      </PolicySection>

      {/* Contact */}
      <PolicySection label="12" title="Contact">
        <p>
          If you have questions or concerns about this privacy policy, please
          contact us at{" "}
          <a
            href="mailto:anoop@flutterly.co.uk"
            className="text-accent hover:underline"
          >
            anoop@flutterly.co.uk
          </a>
          .
        </p>
        <div className="mt-6 p-5 bg-background-secondary rounded-2xl">
          <p className="text-foreground text-sm font-medium">Flutterly Ltd</p>
          <p className="text-foreground-tertiary text-sm mt-1">
            Flat 21, 3 Erleigh Road, Reading, Berkshire RG1 5LR, United Kingdom
          </p>
        </div>
      </PolicySection>

      <Footer />
    </main>
  );
}
