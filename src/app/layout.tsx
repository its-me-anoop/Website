import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

/* Porcelain pages render on the native SF-style system stack (see
   globals.css). The Kiln marketing pages set Zodiak (display) and
   Switzer (body); Syne and Space Grotesk stay available to the demo
   sites — all self-hosted woff2 so builds never depend on a font CDN.
   Zodiak and Switzer are from Fontshare (ITF Free Font Licence). */

const zodiak = localFont({
  src: [
    { path: "../fonts/zodiak-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/zodiak-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-zodiak-v",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const switzer = localFont({
  src: [
    { path: "../fonts/switzer-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer-v",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

/* Syne and Space Grotesk are only used by the care-home and physio demo
   display styles, and JetBrains Mono only sits behind a CSS variable, so
   none of them should be preloaded on every marketing page: the extra
   font requests compete with the hero images for bandwidth before LCP.
   The @font-face rules still ship, so the demos load them on demand. */

const syne = localFont({
  src: "../fonts/syne-latin-var.woff2",
  weight: "400 800",
  variable: "--font-syne-v",
  display: "swap",
  preload: false,
});

const grotesk = localFont({
  src: "../fonts/space-grotesk-latin-var.woff2",
  weight: "300 700",
  variable: "--font-grotesk-v",
  display: "swap",
  preload: false,
});

const jbMono = localFont({
  src: "../fonts/jetbrains-mono-latin-var.woff2",
  weight: "100 800",
  variable: "--font-jb-v",
  display: "swap",
  preload: false,
});

const siteTitle = `${site.studio} — Websites for GP practices and care homes`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: `%s — ${site.studio}`,
  },
  description: site.description,
  applicationName: site.studio,
  category: "technology",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  /* No site-wide `alternates.canonical`: a root value cascades to every
     route that does not override it, which previously gave the noindex
     demo pages a canonical pointing at the homepage. Each indexable page
     declares its own canonical instead. */
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.studio,
    locale: site.locale,
    title: siteTitle,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.studio} — websites for GP practices and care homes`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
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

  /* A ProfessionalService is a LocalBusiness, which fits a studio serving
     clients from a fixed base in Reading; Organization is kept alongside
     so `@id` references from Service and Person nodes stay valid. Only
     services visible on the site are offered here. */
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
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
    image: `${site.url}${site.ogImage}`,
    description:
      "Flutterly is an independent studio in Reading, Berkshire, designing and building accessible websites for GP practices and care homes, plus web and mobile products.",
    address: { "@type": "PostalAddress", ...site.address },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.supportEmail,
        availableLanguage: ["English"],
      },
    ],
    founder: { "@id": `${site.url}#person` },
    sameAs: [site.social.linkedin, site.social.github],
    areaServed: { "@type": "Country", name: "United Kingdom" },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GP practice website design",
          url: `${site.url}/gp-websites`,
          description:
            "Accessible, fast websites for GP practices with clear signposting, self-serve patient journeys and a WCAG 2.2 AA accessibility target.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Care home website design",
          url: `${site.url}/care-home-websites`,
          description:
            "Warm, trustworthy websites for care homes, designed for families, with CQC transparency, admissions journeys and recruitment built in.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web and mobile product development",
          description:
            "Web apps with Next.js, React and TypeScript, and iOS apps with SwiftUI, such as Sipli and Artling.",
        },
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: site.studio,
    alternateName: site.legalName,
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
      className={`${zodiak.variable} ${switzer.variable} ${syne.variable} ${grotesk.variable} ${jbMono.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="antialiased bg-canvas text-ink font-sans min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-k-fire focus:px-4 focus:py-2 focus:text-k-bone focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
