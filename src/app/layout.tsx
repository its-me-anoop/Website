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
  fallback: ["system-ui", "sans-serif"],
});

const siteUrl = "https://flutterly.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flutterly Ltd | Expert Web & Mobile App Development in the UK",
    template: "%s | Flutterly Ltd",
  },
  description:
    "Flutterly Ltd is a UK-based digital agency specialising in high-performance web development, mobile apps, and enterprise solutions. We build with React, Next.js, Flutter, and SwiftUI.",
  keywords: [
    "web development",
    "mobile app development",
    "React",
    "Next.js",
    "Flutter",
    "SwiftUI",
    "UK web agency",
    "enterprise solutions",
    "Flutterly",
    "Reading UK",
    "digital agency",
  ],
  authors: [{ name: "Flutterly Ltd" }],
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
    title: "Flutterly Ltd | Expert Web & Mobile App Development",
    description:
      "UK-based digital agency building high-performance websites, mobile apps, and enterprise solutions with modern technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flutterly Ltd - Build Beautiful Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterly Ltd | Expert Web & Mobile App Development",
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
      postalCode: "RG1 5LR",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7780-580534",
      contactType: "customer service",
      email: "anoop@flutterly.co.uk",
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
