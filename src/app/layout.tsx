import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/* ── Fonts ───────────────────────────────────────────────────────────
   The locally-bundled Outfit variable font is the redesign's display +
   text face. Bundling it locally keeps the build self-contained (no
   build-time webfont fetch) and removes a render-blocking network hop.
   Mono falls back to the platform monospace stack (see globals.css). */
const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: "../fonts/Outfit-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
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
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
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
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Organisation / WebSite / ProfessionalService structured data for rich results. */
function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}${site.ogImage}`,
      width: 1200,
      height: 630,
    },
    description: site.description,
    address: { "@type": "PostalAddress", ...site.address },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      email: site.email,
      availableLanguage: ["English"],
    },
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: "Founder · Lead Engineer",
    },
    sameAs: [site.social.linkedin, site.social.github],
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
          description: "UI/UX design, design systems and product strategy.",
        },
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}#organization` },
    inLanguage: "en-GB",
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}#service`,
    name: "Flutterly — App & Web Development",
    image: `${site.url}${site.ogImage}`,
    url: site.url,
    telephone: site.phone,
    priceRange: "££££",
    address: { "@type": "PostalAddress", ...site.address },
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
      </head>
      <body
        className={cn(
          outfit.variable,
          "antialiased bg-obsidian text-ink font-sans min-h-screen"
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
