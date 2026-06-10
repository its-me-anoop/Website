import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

/* The locally-bundled Outfit variable font drives the oversized Noir
   display type; body copy stays on the system stack (zero extra payload,
   instant render). */
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
    "developer portfolio",
    "app developer UK",
    "web developer UK",
    "Next.js developer",
    "React developer",
    "SwiftUI developer",
    "Flutter developer",
    "iOS development",
    "product engineer",
    "UI engineer",
    "Reading UK developer",
    "Flutterly",
    "Anoop Jose",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
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
  themeColor: "#0b0b0e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Person / Organization / WebSite structured data for rich results. */
function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}#person`,
    name: site.name,
    jobTitle: "Developer & Designer",
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}${site.ogImage}`,
    address: { "@type": "PostalAddress", ...site.address },
    sameAs: [site.social.github, site.social.linkedin],
    worksFor: { "@id": `${site.url}#organization` },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "Flutter",
      "SwiftUI",
      "TypeScript",
      "UI/UX Design",
      "Design Systems",
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}#organization`,
    name: site.legalName,
    alternateName: site.studio,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}${site.ogImage}`,
      width: 1200,
      height: 630,
    },
    description:
      "Flutterly is a UK product studio designing and engineering fast, polished web and mobile apps.",
    address: { "@type": "PostalAddress", ...site.address },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      email: site.email,
      availableLanguage: ["English"],
    },
    founder: { "@id": `${site.url}#person` },
    sameAs: [site.social.linkedin, site.social.github],
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
    name: `${site.name} — ${site.tagline}`,
    description: site.description,
    publisher: { "@id": `${site.url}#person` },
    inLanguage: "en-GB",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
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
      <body className={`${outfit.variable} antialiased bg-canvas text-ink font-sans min-h-screen`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
