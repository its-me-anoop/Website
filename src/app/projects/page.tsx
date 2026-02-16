import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

const title = "Projects";
const description =
  "Explore Flutterly's portfolio of web and mobile projects across healthcare, sustainability, and care services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `${title} | Flutterly Ltd`,
    description,
    url: "/projects",
    type: "website",
    images: [
      {
        url: "/logo-horizontal.png",
        width: 1200,
        height: 630,
        alt: "Flutterly projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Flutterly Ltd`,
    description,
    images: ["/logo-horizontal.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
