import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd, defaultOgImage } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuditLanding } from "@/components/aurora/pages/AuditLanding";

const description =
  "Get a free website review from Flutterly: accessibility, speed, search, content, mobile experience, security and local presence, with clear fixes to consider.";

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
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free website audit — ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0907",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function FreeAudit() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Free Website Audit",
            description,
            path: "/free-audit",
            serviceType: "Website audit",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Free website audit", path: "/free-audit" },
          ]),
        ]}
      />
      <AuditLanding />
    </>
  );
}
