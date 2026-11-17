import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { ReportPage } from "@/components/sorted/audit/ReportPage";

/**
 * The instant audit report. Each report is specific to the address in
 * the query string, so the route is kept out of the index and the
 * sitemap; /free-audit is the indexable landing page for the tool.
 */
export const metadata: Metadata = {
  title: "Instant website audit",
  description:
    "Score any website on accessibility, speed, search, content, mobile, security and local presence, with plain-English fixes.",
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#10162f" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function Audit() {
  return (
    <Suspense fallback={null}>
      <ReportPage />
    </Suspense>
  );
}
