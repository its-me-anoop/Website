import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://flutterly.uk";
const siteName = "Flutterly";
const siteDescription =
  "Flutterly is a Reading-based product studio designing and building polished web and mobile apps with a native, considered feel.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Apps that feel instantly familiar`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "product studio UK",
    "design engineering",
    "Next.js studio",
    "Flutter app development",
    "iOS app studio",
    "SwiftUI developer UK",
    "React development Reading",
    "small agency UK",
    "founder-led studio",
    "Anoop Jose",
  ],
  authors: [{ name: "Flutterly Ltd" }],
  creator: "Flutterly Ltd",
  publisher: "Flutterly Ltd",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_GB",
    title: `${siteName} — Apps that feel instantly familiar`,
    description: siteDescription,
    images: [
      {
        url: "/flutterly-title.png",
        width: 1200,
        height: 630,
        alt: "Flutterly — product studio, Reading, UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Apps that feel instantly familiar`,
    description: siteDescription,
    images: ["/flutterly-title.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f7",
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flutterly Ltd",
    url: siteUrl,
    logo: `${siteUrl}/flutterly-title.png`,
    description:
      "Reading-based product studio designing and building polished web and mobile apps with a native, considered feel.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Flat 21, 3 Erleigh Road",
      addressLocality: "Reading",
      addressRegion: "Berkshire",
      postalCode: "RG1 5LR",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7780-580534",
      contactType: "customer service",
      email: "anoop@flutterly.co.uk",
      availableLanguage: ["English"],
    },
    founder: {
      "@type": "Person",
      name: "Anoop Jose",
      jobTitle: "Founder and Lead Engineer",
    },
    sameAs: ["https://www.linkedin.com/in/anoop-jose-0b308a296/"],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "Flutter",
      "SwiftUI",
      "Product Design",
    ],
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Product Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
