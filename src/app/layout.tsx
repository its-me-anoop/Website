import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const outfit = localFont({
  src: [
    {
      path: "../fonts/Outfit-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const siteUrl = "https://flutterly.uk";
const siteName = "Flutterly Ltd";
const siteDescription =
  "UK-based digital agency specialising in high-performance web development, cross-platform mobile apps, and enterprise solutions. Expert developers building with React, Next.js, Flutter, and SwiftUI.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Web & Mobile Development`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "web development",
    "mobile app development",
    "next.js agency",
    "flutter development",
    "react development",
    "enterprise support",
    "uk software agency",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Web & Mobile Development`,
    description: siteDescription,
    images: [
      {
        url: "/logo-horizontal.png",
        width: 1200,
        height: 630,
        alt: "Flutterly Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Web & Mobile Development`,
    description: siteDescription,
    images: ["/logo-horizontal.png"],
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
  themeColor: "#000000",
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flutterly Ltd",
    url: siteUrl,
    logo: `${siteUrl}/logo-horizontal.png`,
    description:
      "UK-based digital agency specialising in web development, mobile apps, and enterprise solutions.",
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
      jobTitle: "Lead Developer & Founder",
    },
    sameAs: ["https://www.linkedin.com/in/anoop-jose-0b308a296/"],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "Flutter",
      "SwiftUI",
      "Enterprise Solutions",
    ],
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Enterprise Solutions",
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
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
