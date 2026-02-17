import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#0C0C0E",
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
      <body className={cn(
        inter.variable,
        jetbrainsMono.variable,
        instrumentSans.variable,
        "antialiased bg-background text-foreground font-sans min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}
