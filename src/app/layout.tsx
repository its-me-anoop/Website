import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://flutterly.uk";
const siteName = "Flutterly";
const siteTagline = "App & Web Development Studio";
const siteDescription =
  "Flutterly is a UK product studio that designs and engineers fast, polished web and mobile apps. Next.js, React, SwiftUI and Flutter — built with care, shipped to last.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  category: "technology",
  keywords: [
    "app development studio",
    "web development agency",
    "mobile app developers UK",
    "Next.js development",
    "React development",
    "SwiftUI development",
    "Flutter development",
    "iOS development",
    "Android development",
    "product engineering studio",
    "UK software studio",
    "Reading UK developers",
    "enterprise web applications",
  ],
  authors: [{ name: "Flutterly Ltd", url: siteUrl }],
  creator: "Flutterly Ltd",
  publisher: "Flutterly Ltd",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_GB",
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
    images: [
      {
        url: "/flutterly-title.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — ${siteTagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${siteTagline}`,
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
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070D" },
    { media: "(prefers-color-scheme: light)", color: "#06070D" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Flutterly Ltd",
    alternateName: "Flutterly",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/flutterly-title.png`,
      width: 1200,
      height: 630,
    },
    description: siteDescription,
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
      jobTitle: "Founder · Lead Engineer",
    },
    sameAs: ["https://www.linkedin.com/in/anoop-jose-0b308a296/"],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "Flutter",
      "SwiftUI",
      "TypeScript",
      "Enterprise Solutions",
      "UI/UX Design",
    ],
    areaServed: { "@type": "Country", name: "United Kingdom" },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Application Development",
          description:
            "Production-ready web apps with Next.js, React and TypeScript.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Native and cross-platform mobile apps with SwiftUI and Flutter.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Product Design & Strategy",
          description:
            "UI/UX design, design systems and product strategy.",
        },
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    publisher: { "@id": `${siteUrl}#organization` },
    inLanguage: "en-GB",
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#service`,
    name: "Flutterly — App & Web Development",
    image: `${siteUrl}/flutterly-title.png`,
    url: siteUrl,
    telephone: "+44-7780-580534",
    priceRange: "££££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Flat 21, 3 Erleigh Road",
      addressLocality: "Reading",
      addressRegion: "Berkshire",
      postalCode: "RG1 5LR",
      addressCountry: "GB",
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Product Engineering",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          "antialiased bg-background text-foreground font-sans min-h-screen"
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
