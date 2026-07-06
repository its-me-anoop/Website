import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Artling — Privacy Policy",
  description:
    "Privacy policy for Artling, the iOS app for preserving children's artwork with family sharing, sync, and AI-assisted features.",
  alternates: {
    canonical: "/projects/artling/privacy-policy",
  },
};

const effectiveDate = "March 7, 2026";

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
    <section className="border-b border-border px-4 py-14 last:border-b-0 sm:px-6 sm:py-16 md:px-10">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          № {label}
        </p>
        <h2 className="mb-6 font-display text-2xl font-light leading-tight tracking-[-0.02em] text-foreground sm:text-3xl md:text-4xl">
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
  children?: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>
        {bold ? <strong className="text-foreground">{bold} </strong> : null}
        {children}
      </span>
    </li>
  );
}

export default function ArtlingPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-background-secondary px-4 pt-28 pb-14 sm:px-6 sm:pt-36 sm:pb-16 md:px-10 md:pt-40">
        <div className="relative mx-auto max-w-[820px]">
          <Link
            href="/projects/artling"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-secondary transition-colors hover:text-accent sm:text-[11px]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Artling
          </Link>
          <div className="mb-6 grid grid-cols-2 gap-4 border-b border-border pb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:grid-cols-3 sm:text-[11px]">
            <div className="flex flex-col gap-1">
              <span>Document</span>
              <span className="text-foreground-secondary">Privacy Policy</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Product</span>
              <span className="text-foreground-secondary">Artling · iOS</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Effective</span>
              <span className="text-foreground-secondary">{effectiveDate}</span>
            </div>
          </div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            № 00 · Legal
          </p>
          <h1 className="font-display text-4xl font-light leading-[0.98] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
            Artling —{" "}
            <span className="italic text-foreground-secondary">
              Privacy Policy
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-foreground-secondary">
            Artling stores its core library on device and uses cloud services
            only where sync, sharing, or AI features actively require them. This
            document explains what runs where — plainly.
          </p>
        </div>
      </section>

      <PolicySection label="01" title="Overview">
        <p>
          Artling is an iOS app designed to help parents and guardians archive,
          organise, revisit, and share their children&rsquo;s artwork. This
          policy explains what information Artling collects, how that
          information is used, where it is stored, and what choices you have.
        </p>
        <p>
          Artling uses a mix of on-device storage and cloud services. The app
          is not a local-only product, and the sections below describe those
          cloud services plainly.
        </p>
      </PolicySection>

      <PolicySection label="02" title="Information We Collect">
        <p>Depending on how you use the app, Artling may collect or process:</p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Child profile information —">
            Names, avatar colours, and optional avatar photos you add for each
            child profile.
          </Bullet>
          <Bullet bold="Artwork content —">
            Artwork photos, thumbnails, titles, captions, tags, dates,
            favourites, and other gallery metadata you create inside the app.
          </Bullet>
          <Bullet bold="Voice memo content —">
            Optional audio recordings attached to artwork.
          </Bullet>
          <Bullet bold="Account and authentication data —">
            A Firebase anonymous identifier created on launch, and if you choose
            to link your account, Sign in with Apple information such as your
            Apple identity token and, where provided by Apple, your name and
            email or private relay address.
          </Bullet>
          <Bullet bold="Preferences and usage state —">
            App settings such as AI caption preferences, default camera
            selection, notification choices, onboarding completion, recent
            searches, and AI usage counters.
          </Bullet>
          <Bullet bold="Sharing data —">
            Share codes, participant roles, acceptance timestamps, and related
            metadata used to manage shared child profiles.
          </Bullet>
          <Bullet bold="Purchase and entitlement status —">
            Subscription product and entitlement information supplied through
            Apple&rsquo;s StoreKit framework.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="03" title="How We Use Information">
        <p>Your information is used to operate the app and its features, including to:</p>
        <ul className="mt-2 space-y-3">
          <Bullet>Store and organise child profiles and artwork galleries.</Bullet>
          <Bullet>
            Sync supported data across devices and between permitted
            participants in shared profiles.
          </Bullet>
          <Bullet>
            Generate timeline views, milestone summaries, search results, and
            memory resurfacing features such as &ldquo;On This Day.&rdquo;
          </Bullet>
          <Bullet>Attach optional voice notes and create exportable PDFs.</Bullet>
          <Bullet>
            Authenticate accounts, support Sign in with Apple, and manage
            account deletion.
          </Bullet>
          <Bullet>
            Verify premium entitlements and process subscription-related flows
            through Apple.
          </Bullet>
          <Bullet>
            Generate AI-assisted artwork captions or artwork validation results
            when you choose to use those features.
          </Bullet>
          <Bullet>
            Schedule local notifications if you enable reminder or memory
            alerts.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="04" title="Where Data Is Stored">
        <p>
          Artling stores core library content locally on your device using
          Apple&rsquo;s on-device storage technologies. The app also uses cloud
          services for account state, syncing, and sharing workflows.
        </p>
        <p>Specifically:</p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Local device storage —">
            Artwork photos, thumbnails, voice memos, and related app state are
            stored on your device.
          </Bullet>
          <Bullet bold="Firebase Authentication —">
            Artling creates an anonymous Firebase account on launch and can link
            that account to Sign in with Apple if you choose.
          </Bullet>
          <Bullet bold="Firebase Firestore —">
            Used for cloud-backed records such as child profile information,
            preferences, sync metadata, and shared-profile management. Premium
            or shared-content workflows may also sync artwork metadata.
          </Bullet>
          <Bullet bold="Firebase Storage —">
            Used to store uploaded avatar images, artwork images, and voice memo
            files when cloud sync or sharing features require those assets to be
            available remotely.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="05" title="AI Features">
        <p>
          Artling offers optional AI-assisted artwork titles, captions, and
          artwork validation flows. When you use these features, selected
          artwork images and related text may be processed through Firebase AI
          using Google AI models.
        </p>
        <p>
          Some fallback classification and validation logic may also occur
          on-device using Apple frameworks, but AI suggestions are not
          exclusively on-device.
        </p>
        <p>
          If you do not want artwork processed for AI features, do not use the
          AI tools in the app or disable AI captions where the app provides that
          option.
        </p>
      </PolicySection>

      <PolicySection label="06" title="Sharing and Family Access">
        <p>
          If you choose to share a child profile, Artling stores and uses share
          codes and participant records so invited users can access the shared
          profile.
        </p>
        <p>
          Shared participants may be able to view or edit synced content
          associated with the shared profile, depending on the sharing workflow
          in the app. Please share only with people you trust to access your
          family&rsquo;s content.
        </p>
      </PolicySection>

      <PolicySection label="07" title="Apple Services and Purchases">
        <p>
          Subscription purchases, renewals, restorations, and entitlement checks
          are handled through Apple&rsquo;s StoreKit and the App Store. Artling
          does not directly process payment card information.
        </p>
        <p>
          If you use Sign in with Apple, Apple and Firebase Authentication are
          used to authenticate your account and maintain linked sign-in state.
        </p>
      </PolicySection>

      <PolicySection label="08" title="Notifications and Device Permissions">
        <p>Artling may request permission to access the following:</p>
        <ul className="mt-2 space-y-3">
          <Bullet bold="Camera —">
            To capture artwork or child profile photos.
          </Bullet>
          <Bullet bold="Photo Library —">
            To import existing photos into the archive.
          </Bullet>
          <Bullet bold="Microphone —">
            To record optional voice memos.
          </Bullet>
          <Bullet bold="Notifications —">
            To send local reminder and memory notifications when enabled.
          </Bullet>
        </ul>
        <p>
          You can grant or revoke these permissions at any time in iOS Settings.
        </p>
      </PolicySection>

      <PolicySection label="09" title="Data Sharing with Third Parties">
        <p>
          We do not sell your personal information. We do not use third-party ad
          networks or advertising SDKs inside Artling.
        </p>
        <p>
          We do share or process data with service providers where needed to
          operate the app, including Apple (for purchases and Sign in with
          Apple), Firebase (for authentication, data sync, storage, and shared
          profiles), and Google AI services accessed through Firebase AI when
          you use AI features.
        </p>
      </PolicySection>

      <PolicySection label="10" title="Retention and Deletion">
        <p>
          Local content remains on your device until you delete it or remove the
          app. Cloud-backed content remains in associated cloud services until
          you delete the relevant content, revoke sharing, or delete your
          account.
        </p>
        <p>
          Artling includes in-app account deletion. Deleting your account is
          intended to remove your associated cloud data, although changes may
          take time to propagate to other devices or shared participants when
          they next reconnect and sync.
        </p>
      </PolicySection>

      <PolicySection label="11" title="Your Choices">
        <ul className="space-y-3">
          <Bullet bold="Review and edit content —">
            You can update or delete child profiles, artwork, voice notes, and
            other content within the app.
          </Bullet>
          <Bullet bold="Manage permissions —">
            Camera, photo library, microphone, and notification access can be
            changed in iOS Settings.
          </Bullet>
          <Bullet bold="Manage subscriptions —">
            Apple subscription settings are managed through your Apple account.
          </Bullet>
          <Bullet bold="Delete your account —">
            Use the account deletion flow in Artling Settings if you want your
            linked cloud account removed.
          </Bullet>
        </ul>
      </PolicySection>

      <PolicySection label="12" title="Children&rsquo;s Privacy">
        <p>
          Artling is intended for use by parents and guardians, not for children
          to create independent accounts. If you upload a child&rsquo;s name,
          photo, artwork, or voice recording, you are responsible for ensuring
          you have the right to do so.
        </p>
        <p>
          We do not use children&rsquo;s content for advertising purposes, and we
          do not knowingly offer direct child accounts inside the app.
        </p>
      </PolicySection>

      <PolicySection label="13" title="Changes to This Policy">
        <p>
          We may update this privacy policy from time to time. When we do, we
          will update the effective date at the top of this page. Your continued
          use of the app after changes take effect means the updated policy will
          apply to your future use of Artling.
        </p>
      </PolicySection>

      <PolicySection label="14" title="Contact">
        <p>
          If you have questions about this privacy policy or Artling&rsquo;s data
          practices, contact{" "}
          <a
            href="mailto:anoop@flutterly.co.uk"
            className="text-accent hover:underline"
          >
            anoop@flutterly.co.uk
          </a>
          .
        </p>
        <div className="mt-6 rounded-2xl bg-background-secondary p-5">
          <p className="text-sm font-medium text-foreground">Flutterly Ltd</p>
          <p className="mt-1 text-sm text-foreground-tertiary">
            Flat 21, 3 Erleigh Road, Reading, Berkshire RG1 5LR, United Kingdom
          </p>
        </div>
      </PolicySection>

      <Footer />
    </main>
  );
}
