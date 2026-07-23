import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { AuditPage } from "@/components/bloom/audit/AuditPage";

const description =
  "Get a free written audit of your GP practice or care home website — accessibility, speed, mobile experience, content and local search, reviewed in plain English with no obligation.";

export const metadata: Metadata = {
  title: "Free website audit",
  description,
  alternates: { canonical: "/free-audit" },
  openGraph: {
    title: `Free website audit — ${site.studio}`,
    description,
    url: `${site.url}/free-audit`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function FreeAudit() {
  return <AuditPage />;
}
