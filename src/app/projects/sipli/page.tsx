import type { Metadata } from "next";
import { SipliLanding } from "@/components/projects/sipli/SipliLanding";
import { sipli } from "@/lib/projects/sipli";
import { site } from "@/lib/site";

const title = "Sipli — Water Tracker";
const description =
  "Sipli is a water tracker for iPhone, iPad and Apple Watch. A Home bottle shows what's left of your daily goal, Siri logs a drink by name, and it is made for iPhone Duo. Free to start, with optional Sipli Premium. No account, no ad tracking.";

const appStoreUrl = sipli.appStoreUrl;
const heroImage = sipli.hero.src;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects/sipli",
  },
  openGraph: {
    title: `${title} — ${site.studio}`,
    description,
    url: "/projects/sipli",
    type: "website",
    images: [
      {
        url: heroImage,
        width: 1320,
        height: 2868,
        alt: sipli.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.studio}`,
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
  softwareVersion: sipli.version,
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
