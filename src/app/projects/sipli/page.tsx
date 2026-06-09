import type { Metadata } from "next";
import { SipliLanding } from "@/components/projects/sipli/SipliLanding";
import { site } from "@/lib/site";

const title = "Sipli — Water Tracker";
const description =
  "Sipli is a free iOS hydration tracker with adaptive goals, 35+ beverages, on-device AI coaching, weather-aware reminders, HealthKit sync, and a new Apple Watch app.";

const appStoreUrl =
  "https://apps.apple.com/us/app/sipli-water-tracker/id6758851574";
const heroImage = "/images/sipli/iphone/01-hero-1320x2868.jpg";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects/sipli",
  },
  openGraph: {
    title: `${title} | Flutterly Ltd`,
    description,
    url: "/projects/sipli",
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1320,
        height: 2868,
        alt: "Sipli water tracker — home screen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Flutterly Ltd`,
    description,
    images: [heroImage],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sipli — Water Tracker",
  operatingSystem: "iOS 17.0 or later, iPadOS, watchOS",
  applicationCategory: "HealthApplication",
  description,
  url: `${site.url}/projects/sipli`,
  downloadUrl: appStoreUrl,
  image: `${site.url}${heroImage}`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
  },
};

export default function SipliPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SipliLanding />
    </>
  );
}
