<<<<<<< ours
import type { Metadata } from "next";
import localFont from "next/font/local";
=======
import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
>>>>>>> theirs
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

<<<<<<< ours
const siteUrl = "https://flutterly.co.uk";
=======
const siteUrl = "https://flutterly.uk";
const siteName = "Flutterly Ltd";
const siteDescription =
  "Flutterly Ltd builds high-performance web and mobile products with Next.js, React, Flutter, and enterprise-grade support.";
>>>>>>> theirs

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
<<<<<<< ours
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
=======
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
>>>>>>> theirs
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
<<<<<<< ours
    title: "Flutterly Ltd | Web & Mobile App Development UK",
    description:
      "UK-based digital agency building high-performance websites, mobile apps, and enterprise solutions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
=======
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo-icon.png`,
  sameAs: ["https://www.linkedin.com/in/anoop-jose-0b308a296/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
>>>>>>> theirs
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
<<<<<<< ours
      <head>
        <JsonLd />
      </head>
      <body className={`${outfit.variable} antialiased`}>{children}</body>
=======
      <body className={`${outfit.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
>>>>>>> theirs
    </html>
  );
}
