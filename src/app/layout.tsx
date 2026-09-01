import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@fontsource-variable/archivo/wght.css";
import "@fontsource-variable/atkinson-hyperlegible-next/wght.css";
import "./globals.css";
import { site } from "@/lib/site";
import { CookieConsent } from "@/components/privacy/CookieConsent";

/* Marketing pages use self-hosted Archivo and Atkinson Hyperlegible Next.
   Porcelain case studies and the two demo systems keep their own scoped
   typography. All font assets ship with the application. */

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
    default: `${site.studio}: Digital delivery for organisations people rely on`,
    template: `%s: ${site.studio}`,
  },
  description: site.description,
  applicationName: site.studio,
  category: "technology",
  keywords: [
    "GP practice websites",
    "care home websites",
    "accessible website design",
    "digital delivery UK",
    "Flutterly",
    "Anoop Jose",
    "Reading UK",
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
    title: `${site.studio}: Digital delivery for organisations people rely on`,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.studio}: websites, digital projects and business technology`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.studio}: Digital delivery for organisations people rely on`,
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: site.studio,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  // Studio marketing is near-black; a white theme-color leaves a white
  // iOS Safari status-bar strip over the dark header.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050505" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Person / Organization / WebSite structured data for rich results. */
function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}#person`,
    name: site.name,
    jobTitle: "Founder and Digital Delivery Lead",
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
      "Flutterly Limited is a UK digital delivery company providing accessible websites, web and mobile products, business email setup and social media campaign support.",
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
            "Warm, trustworthy websites for care homes: designed for families, with CQC transparency, admissions journeys and recruitment built in.",
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
          name: "Business Email and Collaboration Setup",
          description:
            "Microsoft 365, Outlook, Google Workspace and Zoho setup, including domains, migration, security and staff handover.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Social Media Marketing",
          description:
            "Campaign planning, content support and performance review for healthcare, care and other organisations.",
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
    name: `${site.studio}: Digital delivery for organisations people rely on`,
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
      data-scroll-behavior="smooth"
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
        <CookieConsent />
      </body>
    </html>
  );
}
