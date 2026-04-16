import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import About from "@/components/About";

const siteUrl = "https://flutterly.uk";

export const metadata: Metadata = {
  title: "A small UK studio building products people keep open",
  description:
    "Flutterly is a Reading-based design-and-engineering studio led by Anoop Jose. We take on one brief at a time, ship every week, and build web and mobile products you own end-to-end.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flutterly — A small UK studio building products people keep open",
    description:
      "A Reading-based design-and-engineering studio. One brief at a time. Weekly ships. Yours to own. Web and mobile products built with care.",
    url: siteUrl,
    type: "website",
  },
  twitter: {
    title: "Flutterly — A small UK studio building products people keep open",
    description:
      "A Reading-based design-and-engineering studio. One brief at a time. Weekly ships. Yours to own.",
  },
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#studio`,
      name: "Flutterly Ltd",
      alternateName: "Flutterly",
      url: siteUrl,
      image: `${siteUrl}/flutterly-title.png`,
      logo: `${siteUrl}/flutterly-logo.png`,
      description:
        "Reading-based design-and-engineering studio building web and mobile products with care. Led by Anoop Jose.",
      priceRange: "££-£££",
      telephone: "+44-7780-580534",
      email: "anoop@flutterly.co.uk",
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        name: "Anoop Jose",
        jobTitle: "Founder & Lead Engineer",
        worksFor: { "@id": `${siteUrl}/#studio` },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Flat 21, 3 Erleigh Road",
        addressLocality: "Reading",
        addressRegion: "Berkshire",
        postalCode: "RG1 5LR",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.4543,
        longitude: -0.9781,
      },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Worldwide (remote)" },
      ],
      knowsAbout: [
        "Product design",
        "Web development",
        "Mobile app development",
        "Next.js",
        "React",
        "TypeScript",
        "Flutter",
        "SwiftUI",
        "Design engineering",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web product engineering",
            description:
              "Design and build of modern web apps with Next.js, React, and TypeScript.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile product engineering",
            description:
              "Native and cross-platform mobile apps for iOS and Android using Swift, SwiftUI, and Flutter.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design engineering partnership",
            description:
              "Ongoing design and engineering partnership — one brief at a time, weekly ships, full ownership handover.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Flutterly",
      publisher: { "@id": `${siteUrl}/#studio` },
      inLanguage: "en-GB",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#home`,
      url: siteUrl,
      name: "Flutterly — A small UK studio building products people keep open",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#studio` },
      primaryImageOfPage: `${siteUrl}/flutterly-title.png`,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What kind of projects does Flutterly take on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We focus on early-stage products, redesigns of internal tools, and ambitious mobile apps. We take one engagement at a time so the client on the bench has our full attention.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Flutterly based?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Flutterly Ltd is a UK-registered studio based in Reading, Berkshire. We work with clients across the UK and internationally, remote-first.",
          },
        },
        {
          "@type": "Question",
          name: "Who runs Flutterly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Flutterly is led by Anoop Jose, with a small network of trusted design and engineering collaborators brought in as projects require.",
          },
        },
        {
          "@type": "Question",
          name: "What technologies do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web: Next.js, React, TypeScript, Tailwind CSS. Mobile: Swift, SwiftUI, Flutter, React Native, Kotlin. Backend: Node, Postgres, GraphQL, Supabase, AWS.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly do you reply to enquiries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Within one working day. Send a brief to anoop@flutterly.co.uk.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Script
        id="home-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
