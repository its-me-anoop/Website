import type { Metadata } from "next";
import { LittleLifelineLanding } from "@/components/projects/little-lifeline/LittleLifelineLanding";
import { site } from "@/lib/site";

const title = "Little Lifeline — Idle Clinic Game";
const description =
  "Little Lifeline is a miniature 3D clinic management game for iPhone and iPad. Grow one reception desk into a busy doctors clinic, with twenty pieces of equipment per room, daily goals and offline earnings. Free, no advertisements, no account.";

const appStoreUrl = "https://apps.apple.com/us/app/little-lifeline/id6786840477";
const image = "/projects/little-lifeline/app-icon.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects/little-lifeline" },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: "/projects/little-lifeline",
    type: "website",
    images: [{ url: image, width: 512, height: 512, alt: "Little Lifeline app icon" }],
  },
  twitter: {
    card: "summary",
    title: `${title} — ${site.studio}`,
    description,
    images: [image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Little Lifeline",
  operatingSystem: "iOS 18.0 or later, iPadOS",
  applicationCategory: "GameApplication",
  description,
  url: `${site.url}/projects/little-lifeline`,
  downloadUrl: appStoreUrl,
  image: `${site.url}${image}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: site.legalName, url: site.url },
};

export default function LittleLifelinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LittleLifelineLanding />
    </>
  );
}
