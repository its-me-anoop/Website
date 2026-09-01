import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { studioViewport } from "@/lib/studio";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookScreen } from "@/components/bloom/redesign/BookScreen";

const description =
  "Book a free intro call, consultation or project scoping session with Flutterly directly: pick a time, get an instant confirmation and a calendar invite.";

export const metadata: Metadata = {
  title: "Book a call",
  description,
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Book a call — ${site.studio}`,
    description,
    url: `${site.url}/book`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Book a call — ${site.studio}`,
    description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = studioViewport;

export default function Book() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book a call", path: "/book" },
          ]),
        ]}
      />
      <BookScreen />
    </>
  );
}
