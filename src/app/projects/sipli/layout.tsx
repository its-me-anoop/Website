import type { Metadata } from "next";

const siteUrl = "https://flutterly.uk";

export const metadata: Metadata = {
  title: "Sipli — Hydration Tracking App for iOS",
  description:
    "Sipli is a smart hydration tracking app for iPhone and iPad. Set personalised daily goals, track 18+ beverages, get AI coaching tips, and sync with Apple Health.",
  keywords: [
    "hydration tracker",
    "water tracking app",
    "iOS hydration app",
    "drink water reminder",
    "Apple Health water tracker",
    "hydration goals",
    "beverage tracker",
    "Sipli app",
  ],
  alternates: {
    canonical: "/projects/sipli",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects/sipli`,
    title: "Sipli — Smart Hydration Tracking for iOS",
    description:
      "Set personalised daily goals based on your weight, track 18+ beverages with accurate hydration factors, and get AI-powered coaching tips. Free on the App Store.",
    images: [
      {
        url: "/projects/sipli/iphone_and_ipad.png",
        width: 1024,
        height: 1366,
        alt: "Sipli hydration tracking app on iPhone and iPad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sipli — Smart Hydration Tracking for iOS",
    description:
      "Set personalised daily goals, track 18+ beverages, and get AI-powered coaching tips. Free on the App Store.",
    images: ["/projects/sipli/iphone_and_ipad.png"],
  },
};

function SipliJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sipli",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS 18.0+",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Smart hydration tracking app with personalised daily goals, 18+ beverage types, AI coaching, and Apple Health integration.",
    url: `${siteUrl}/projects/sipli`,
    downloadUrl: "https://apps.apple.com/us/app/sipli/id6758851574",
    screenshot: `${siteUrl}/projects/sipli/dashboard.png`,
    featureList:
      "Personalised hydration goals, 18 beverage types, AI coaching, Apple Health sync, Smart reminders, Insights & analytics, Dark mode, iPad support",
    author: {
      "@type": "Organization",
      name: "Flutterly Ltd",
      url: siteUrl,
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sipli",
        item: `${siteUrl}/projects/sipli`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}

export default function SipliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SipliJsonLd />
      {children}
    </>
  );
}
