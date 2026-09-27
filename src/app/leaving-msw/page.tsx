import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { clearPath } from "@/lib/marketing/content";
import { LeavingMswPage } from "@/components/aurora/pages/LeavingMswPage";

const title = clearPath.metaTitle;
const description = clearPath.metaDescription;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/leaving-msw" },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: `${site.url}/leaving-msw`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function LeavingMsw() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Clear Path — Leaving My Surgery Website",
            description,
            path: "/leaving-msw",
            serviceType: "Website migration",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Leaving My Surgery Website", path: "/leaving-msw" },
          ]),
        ]}
      />
      <LeavingMswPage />
    </>
  );
}
