import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

/* Porcelain pages render on the native SF-style system stack (see
   globals.css). The Atelier homepage sets Space Grotesk; Syne and
   JetBrains Mono stay available to sub-pages — all self-hosted as
   latin variable woff2 subsets (~97KB total) so builds never depend
   on the Google Fonts CDN. */

const syne = localFont({
  src: "../fonts/syne-latin-var.woff2",
  weight: "400 800",
  variable: "--font-syne-v",
  display: "swap",
});

const grotesk = localFont({
  src: "../fonts/space-grotesk-latin-var.woff2",
  weight: "300 700",
  variable: "--font-grotesk-v",
  display: "swap",
});

const jbMono = localFont({
  src: "../fonts/jetbrains-mono-latin-var.woff2",
  weight: "100 800",
  variable: "--font-jb-v",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.studio} — Websites for GP practices, care homes & ambitious products`,
    template: `%s — ${site.studio}`,
  },
  description: site.description,
  applicationName: site.studio,
  category: "technology",
  keywords: [
    "GP practice websites",
    "GP surgery website design",
    "care home websites",
    "care home web design UK",
    "healthcare website design",
    "accessible website design",
    "NHS website standards",
    "web developer UK",
    "Next.js developer",
    "SwiftUI developer",
    "Flutter developer",
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
    siteName: site.studio,
    locale: site.locale,
    title: `${site.studio} — Websites for GP practices, care homes & ambitious products`,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.studio} — websites for GP practices, care homes and ambitious products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.studio} — Websites for GP practices, care homes & ambitious products`,
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
  themeColor: "#ffffff",
  colorScheme: "light",
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
    image: `${site.url}/anoop-jose.jpg`,
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
      url: `${site.url}${site.logo}`,
      width: 900,
      height: 900,
    },
    description:
      "Flutterly is a UK product studio designing and engineering accessible websites for GP practices and care homes, plus fast, polished web and mobile apps.",
    address: { "@type": "PostalAddress", ...site.address },
    contactPoint: {
      "@type": "ContactPoint",
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
          name: "GP Practice Website Design",
          description:
            "Accessible, fast websites for GP practices with NHS signposting, self-serve patient journeys and a WCAG 2.2 AA accessibility target.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Care Home Website Design",
          description:
            "Warm, trustworthy websites for care homes — designed for families, with CQC transparency, admissions journeys and recruitment built in.",
        },
      },
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
    name: `${site.studio} — Websites for GP practices, care homes & ambitious products`,
    description: site.description,
    publisher: { "@id": `${site.url}#organization` },
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
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${syne.variable} ${grotesk.variable} ${jbMono.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="antialiased bg-canvas text-ink font-sans min-h-screen">
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
