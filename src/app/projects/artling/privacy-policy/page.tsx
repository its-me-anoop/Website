import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Artling — Privacy Policy",
  description:
    "Privacy policy for Artling, the iOS app for preserving children's artwork. No accounts, no developer servers — everything stays on your device and in your private iCloud.",
  alternates: {
    canonical: "/projects/artling/privacy-policy",
  },
};

const effectiveDate = "July 13, 2026";

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

export default function ArtlingPrivacyPolicyPage() {
  return (
    <main id="main" className="artling-theme min-h-screen bg-background text-ink">
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
            Artling — Privacy Policy
          </h1>
          <p className="mt-5 text-[15px] text-ink-3">
            Effective: {effectiveDate} (replaces the policy dated March 7, 2026)
          </p>
        </div>
      </header>

      <PolicySection label="01" title="Overview">
        <p>
          Artling (also shown on the App Store as &ldquo;Little Artist&rdquo;)
          is an iOS app that helps parents and guardians archive, organise, and
          celebrate their children&rsquo;s artwork. This policy explains what
          information the app handles, where it is stored, and the choices you
          have.
        </p>
        <p>
          The short version: <strong className="text-ink">Artling has no
          accounts, no sign-in, and no servers of ours. We — the developer —
          never receive, see, or have access to any of your data.</strong>{" "}
          Everything you create in Artling lives on your device and, if you use
          iCloud, in your own private iCloud database that only you control.
        </p>
      </PolicySection>

      <PolicySection label="02" title="Information the App Handles">
        <p>Depending on how you use the app, Artling stores:</p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Child profile information —">
            Names, avatar colours, and optional avatar photos you add for each
            child profile.
          </Bullet>
          <Bullet bold="Artwork content —">
            Artwork photos, thumbnails, titles, captions, tags, comments,
            dates, favourites, and other gallery metadata you create inside the
            app.
          </Bullet>
          <Bullet bold="Voice memos —">
            Optional short audio recordings (up to 30 seconds) that you can
            attach to an artwork — for example, your child describing their
            creation.
          </Bullet>
          <Bullet bold="Preferences and app state —">
            Settings such as onboarding completion, milestone progress, and
            premium entitlement status supplied through Apple&rsquo;s StoreKit
            framework.
          </Bullet>
        </ul>
        <p>
          Artling collects <strong className="text-ink">no</strong> analytics,{" "}
          <strong className="text-ink">no</strong> advertising identifiers, and{" "}
          <strong className="text-ink">no</strong> account or authentication
          data. There is nothing to sign up for.
        </p>
      </PolicySection>

      <PolicySection label="03" title="Where Data Is Stored">
        <ul className="space-y-3">
          <Bullet bold="On your device.">
            All content is stored locally using Apple&rsquo;s on-device storage
            technologies.
          </Bullet>
          <Bullet bold="In your private iCloud.">
            If your device is signed in to iCloud, Artling syncs your library
            through Apple&rsquo;s CloudKit private database so it is backed up
            and available on your other devices. This database belongs to your
            Apple Account. We cannot read it, access it, or recover it —
            Apple&rsquo;s CloudKit private database is accessible only to you.
          </Bullet>
          <Bullet bold="Nowhere else.">
            Artling does not operate its own servers and does not use any
            third-party cloud, analytics, or storage service. No third-party
            SDKs are embedded in the app.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="04" title="Voice Memos (Children's Voice Recordings)">
        <p>
          Voice memos deserve special mention because they may capture a
          child&rsquo;s voice:
        </p>
        <ul className="mt-2 space-y-3">
          <Bullet>
            Recordings are made only when you press record, using the
            microphone with your explicit permission.
          </Bullet>
          <Bullet>
            They are stored only on your device and — if iCloud sync is on — in
            your own private iCloud database. They are never uploaded to us or
            to any third party.
          </Bullet>
          <Bullet>
            They are never processed by AI features, transcribed, or analysed.
          </Bullet>
          <Bullet>
            You can delete a voice memo at any time by removing it from the
            artwork or deleting the artwork; deletion removes it from your
            device and your iCloud.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="05" title="AI Features">
        <p>
          Artling&rsquo;s optional AI features (suggested artwork titles and
          captions) run exclusively on Apple frameworks:
        </p>
        <ul className="mt-2 space-y-3">
          <Bullet>
            On supported devices, suggestions are generated by Apple
            Intelligence on-device foundation models. Some Apple Intelligence
            requests may use Apple&rsquo;s Private Cloud Compute, which is
            designed by Apple so that data is never stored, never accessible to
            Apple, and never used to train models.
          </Bullet>
          <Bullet>
            Artwork classification used as a fallback runs entirely on-device
            using Apple&rsquo;s Vision framework.
          </Bullet>
          <Bullet bold="No third-party AI service is used.">
            Your artwork, photos, text, and voice memos are never sent to the
            developer or to any third-party AI provider.
          </Bullet>
          <Bullet>
            AI features are optional — suggestions are only generated when you
            tap the AI button.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="06" title="Purchases">
        <p>
          Premium subscriptions and the lifetime purchase are processed
          entirely by Apple through the App Store (StoreKit). We receive no
          personal or payment information. Manage or cancel subscriptions in
          Settings &rarr; Apple Account &rarr; Subscriptions.
        </p>
      </PolicySection>

      <PolicySection label="07" title="Children's Privacy">
        <p>
          Artling is designed for use by parents and guardians. We do not
          knowingly collect personal information from anyone — adults or
          children. Because all data stays on your device and in your private
          iCloud, no personal information about your children is ever
          transmitted to us or to any third party.
        </p>
      </PolicySection>

      <PolicySection label="08" title="Device Permissions">
        <p>
          Artling asks for the following permissions, each only when you first
          use the related feature:
        </p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Camera —">To photograph or scan artwork.</Bullet>
          <Bullet bold="Photo library —">
            To import existing photos of artwork.
          </Bullet>
          <Bullet bold="Microphone —">To record optional voice memos.</Bullet>
          <Bullet bold="Notifications —">
            For optional reminders and memory alerts, scheduled locally on your
            device.
          </Bullet>
        </ul>
        <p>You can change any of these at any time in iOS Settings.</p>
      </PolicySection>

      <PolicySection label="09" title="Data Deletion">
        <p>
          Deleting artwork, profiles, or voice memos in the app removes them
          from your device and from your private iCloud database. Deleting the
          app removes all local data; your iCloud copy can be removed by
          deleting the app&rsquo;s data in iOS Settings &rarr; Apple Account
          &rarr; iCloud &rarr; Manage Account Storage.
        </p>
      </PolicySection>

      <PolicySection label="10" title="Changes to This Policy">
        <p>
          If Artling&rsquo;s data practices ever change, we will update this
          policy and its effective date before the change takes effect.
        </p>
      </PolicySection>

      <PolicySection label="11" title="Contact">
        <p>
          If you have questions about this privacy policy or Artling&rsquo;s
          data practices, contact{" "}
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
