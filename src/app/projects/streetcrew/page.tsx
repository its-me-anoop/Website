import type { Metadata } from "next";
import { StreetCrewLanding } from "@/components/projects/streetcrew/StreetCrewLanding";
import { streetcrew } from "@/lib/projects/streetcrew";
import { site } from "@/lib/site";

const title = "StreetCrew: Walk & Run Tracker";
const description =
  "StreetCrew is a free GPS tracker for runs, walks and hikes on iPhone and iPad. Your map fills in square by square as you explore, with loop planning, friends and group events. No ads, and your routes stay on your device.";

const path = "/projects/streetcrew";
const image = streetcrew.header.src;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: path,
    type: "website",
    images: [{ url: image, width: streetcrew.header.width, height: streetcrew.header.height, alt: streetcrew.header.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.studio}`,
    description,
    images: [image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: streetcrew.name,
  operatingSystem: "iOS, iPadOS",
  applicationCategory: "HealthApplication",
  description,
  url: `${site.url}${path}`,
  ...(streetcrew.appStoreUrl ? { downloadUrl: streetcrew.appStoreUrl } : {}),
  image: `${site.url}${image}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  author: { "@type": "Organization", name: site.legalName, url: site.url },
};

export default function StreetCrewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StreetCrewLanding />
    </>
  );
}
