import type { Metadata } from "next";
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

const siteUrl = "https://flutterly.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flutterly Ltd | Web & Mobile App Development UK",
    template: "%s | Flutterly Ltd",
  },
  description:
    "UK-based digital agency specialising in high-performance web development, cross-platform mobile apps, and enterprise solutions. Expert developers building with React, Next.js, Flutter, and SwiftUI.",
  keywords: [
    "web development UK",
    "mobile app development",
    "React development agency",
    "Next.js developer UK",
    "Flutter app development",
    "SwiftUI development",
    "UK digital agency",
    "enterprise software solutions",
    "Flutterly",
    "Reading UK developer",
    "custom web applications",
    "cross-platform mobile apps",
    "React Native development",
    "progressive web apps",
    "e-commerce development UK",
  ],
  authors: [{ name: "Flutterly Ltd", url: siteUrl }],
  creator: "Flutterly Ltd",
  publisher: "Flutterly Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Flutterly Ltd",
    title: "Flutterly Ltd | Web & Mobile App Development UK",
    description:
      "UK-based digital agency building high-performance websites, cross-platform mobile apps, and enterprise solutions with modern technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flutterly Ltd - Web & Mobile App Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterly Ltd | Web & Mobile App Development UK",
    description:
      "UK-based digital agency building high-performance websites, mobile apps, and enterprise solutions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
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
