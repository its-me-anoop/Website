import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookPage } from "@/components/aurora/booking/BookPage";

const title = site.booking.label;
const description = `Book a free ${site.booking.durationMinutes}-minute discovery call with ${site.founder} at Flutterly. Talk through a website, an app, IT support, social media or search, and agree a sensible next step. No pitch, no obligation.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/book" },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: `${site.url}/book`,
    siteName: site.studio,
    locale: site.locale,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.studio}`,
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

export default function Book() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a call", path: "/book" },
        ])}
      />
      <BookPage />
    </>
  );
}
