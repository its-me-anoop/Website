import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://flutterly.uk";
const siteName = "Flutterly";
const siteDescription =
  "A small UK product studio led by Anoop Jose. We take on one brief at a time and ship web and mobile products with care — from Reading, Berkshire.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — A small UK studio building products with care`,
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
    title: `${siteName} — A small UK studio building products with care`,
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
    title: `${siteName} — A small UK studio building products with care`,
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
  themeColor: "#050505",
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flutterly Ltd",
    url: siteUrl,
    logo: `${siteUrl}/flutterly-title.png`,
    description:
      "UK-based digital studio crafting web applications, mobile apps, and enterprise solutions.",
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
      <body className={cn(
        fraunces.variable,
        plusJakartaSans.variable,
        "antialiased bg-background text-foreground font-sans min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}
