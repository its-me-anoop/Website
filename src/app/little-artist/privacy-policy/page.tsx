import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Little Artist — Privacy Policy",
  description:
    "Privacy policy for Little Artist, the iOS app for archiving and celebrating children's artwork.",
  alternates: {
    canonical: "/little-artist/privacy-policy",
  },
};

const effectiveDate = "February 20, 2026";

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

export default function LittleArtistPrivacyPolicy() {
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
            Little Artist — Privacy Policy
          </h1>
          <p className="text-foreground-secondary text-[15px]">
            Effective: {effectiveDate}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <PolicySection label="01" title="Introduction">
        <p>
          Little Artist (&ldquo;the App&rdquo;) is designed to help parents and
          guardians archive and celebrate their children&rsquo;s artwork. Your
          family&rsquo;s privacy is important to us. This policy explains what
          data the App collects, how it is stored, and your rights regarding that
          data.
        </p>
      </PolicySection>

      {/* Data Collection */}
      <PolicySection label="02" title="What Data We Collect">
        <p>The App collects the following data, all provided directly by you:</p>
        <ul className="space-y-3 mt-2">
          <Bullet bold="Children&rsquo;s names —">
            First names you enter when creating child profiles.
          </Bullet>
          <Bullet bold="Artwork photos —">
            Images captured via camera, photo library, or document scanner.
          </Bullet>
          <Bullet bold="Voice memos —">
            Optional audio recordings you attach to artwork (up to 30 seconds
            each).
          </Bullet>
          <Bullet bold="Avatar photos —">
            Optional profile photos for child profiles.
          </Bullet>
          <Bullet bold="Artwork metadata —">
            Titles, captions, dates, and favourite status you assign to artwork.
          </Bullet>
          <Bullet bold="App preferences —">
            Settings such as AI captions toggle and default camera selection.
          </Bullet>
        </ul>
      </PolicySection>

      {/* Data Storage */}
      <PolicySection label="03" title="How Data Is Stored">
        <p>
          All data is stored <strong className="text-foreground">locally on your device</strong> using
          Apple&rsquo;s SwiftData framework. No data is transmitted to external
          servers, cloud services, or third parties.
        </p>
        <p>
          Photos and voice memos are stored using Apple&rsquo;s external storage
          mechanism, which keeps large files efficiently managed on your
          device&rsquo;s local storage.
        </p>
        <p>
          The App does <strong className="text-foreground">not</strong> use any cloud syncing, remote
          databases, or server-side storage.
        </p>
      </PolicySection>

      {/* Third-Party Sharing */}
      <PolicySection label="04" title="Third-Party Data Sharing">
        <p>
          The App does <strong className="text-foreground">not</strong> share any data with third
          parties. Specifically:
        </p>
        <ul className="space-y-3 mt-2">
          <Bullet bold="No analytics services —">
            We do not use Firebase, Mixpanel, or any other analytics SDK.
          </Bullet>
          <Bullet bold="No advertising —">
            The App contains no ads and no advertising SDKs.
          </Bullet>
          <Bullet bold="No tracking —">
            We do not track you across apps or websites.
          </Bullet>
          <Bullet bold="No server communication —">
            The App makes no network requests to external servers.
          </Bullet>
        </ul>
      </PolicySection>

      {/* AI Features */}
      <PolicySection label="05" title="On-Device AI Features">
        <p>
          The App offers optional AI-powered title and caption suggestions using
          Apple&rsquo;s on-device FoundationModels framework.
        </p>
        <p>
          This AI processing happens{" "}
          <strong className="text-foreground">entirely on your device</strong>. No artwork images,
          text, or other data is sent to Apple or any third party for AI
          processing.
        </p>
        <p>
          You can disable AI suggestions at any time in{" "}
          <em>Settings &gt; Preferences &gt; AI Captions</em>.
        </p>
      </PolicySection>

      {/* Children's Privacy */}
      <PolicySection label="06" title="Children&rsquo;s Privacy (COPPA)">
        <p>
          Little Artist is designed for use by{" "}
          <strong className="text-foreground">parents and guardians</strong>, not directly by
          children. We take children&rsquo;s privacy seriously.
        </p>
        <p>
          Because all data remains on your device and is never transmitted to any
          server or third party, the App complies with the Children&rsquo;s
          Online Privacy Protection Act (COPPA) and similar regulations.
        </p>
        <p>We do not:</p>
        <ul className="space-y-3 mt-2">
          <Bullet>
            Collect personal information from children for commercial purposes
          </Bullet>
          <Bullet>Share children&rsquo;s data with third parties</Bullet>
          <Bullet>
            Use children&rsquo;s data for advertising, marketing, or profiling
          </Bullet>
          <Bullet>
            Transmit children&rsquo;s names, photos, or voice recordings
            off-device
          </Bullet>
        </ul>
      </PolicySection>

      {/* Permissions */}
      <PolicySection label="07" title="Device Permissions">
        <p>
          The App requests the following device permissions, each solely for core
          functionality:
        </p>
        <ul className="space-y-3 mt-2">
          <Bullet bold="Camera —">
            To photograph your child&rsquo;s artwork directly within the App.
          </Bullet>
          <Bullet bold="Photo Library —">
            To select existing artwork photos from your library.
          </Bullet>
          <Bullet bold="Microphone —">
            To record optional voice memos attached to artwork.
          </Bullet>
        </ul>
        <p>
          You can grant or revoke any permission at any time through your
          device&rsquo;s Settings app. The App will continue to function with
          reduced features if permissions are denied.
        </p>
      </PolicySection>

      {/* Data Retention */}
      <PolicySection label="08" title="Data Retention &amp; Deletion">
        <p>
          Your data is retained on your device for as long as you choose to keep
          it. You have full control:
        </p>
        <ul className="space-y-3 mt-2">
          <Bullet bold="Delete individual artworks —">
            From the artwork detail view using the delete button.
          </Bullet>
          <Bullet bold="Delete child profiles —">
            From Settings, which also removes all associated artwork.
          </Bullet>
          <Bullet bold="Delete all data —">
            Uninstalling the App removes all stored data from your device.
          </Bullet>
        </ul>
        <p>
          No backups or copies of your data exist on any external server.
        </p>
      </PolicySection>

      {/* Your Rights */}
      <PolicySection label="09" title="Your Rights">
        <p>
          Since all data is stored locally on your device, you have complete
          control over your data at all times. You can view, edit, or delete any
          data directly within the App.
        </p>
        <p>
          If you have questions about this privacy policy or the App&rsquo;s
          data practices, please contact us at the address below.
        </p>
      </PolicySection>

      {/* Changes */}
      <PolicySection label="10" title="Changes to This Policy">
        <p>
          We may update this privacy policy from time to time. Any changes will
          be reflected in the App and on this page with an updated effective
          date. Continued use of the App after changes constitutes acceptance of
          the updated policy.
        </p>
      </PolicySection>

      {/* Contact */}
      <PolicySection label="11" title="Contact">
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
