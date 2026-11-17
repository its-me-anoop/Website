"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredWork } from "@/lib/marketing/content";
import "../portfolio.css";

type Project = (typeof featuredWork)[number];
type Filter = "All" | "Websites" | "Apps";

function projectImage(project: Project) {
  if ("image" in project) {
    const desktop = project.key === "rotaowl" ? { width: 2880, height: 1920 } : { width: 1920, height: 1200 };
    return { ...project.image, ...desktop };
  }
  switch (project.key) {
    case "sipli": return { src: "/images/sipli/duo/inner-home.webp", width: 1100, height: 1564, alt: "Sipli’s hydration dashboard on the open inner display" };
    case "lifeline": return { src: "/projects/little-lifeline/app-icon.png", width: 512, height: 512, alt: "Little Lifeline’s illustrated clinic" };
    case "streetcrew": return { src: "/projects/streetcrew/app-icon.png", width: 512, height: 512, alt: "The StreetCrew route icon" };
    case "bible": return { src: "/projects/catholic-bible/cover.svg", width: 600, height: 800, alt: "The Catholic Public Domain Version cover" };
    case "artling": return { src: "/projects/artling/fox-painter.png", width: 600, height: 840, alt: "Little Artist’s fox painter" };
  }
}

function Artwork({ project, large }: { project: Project; large: boolean }) {
  const image = projectImage(project);
  return (
    <div className={`folio-art folio-art--${project.key}`}>
      <div className="folio-piece">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
          sizes={large ? "(min-width: 760px) 47vw, 92vw" : "72px"} unoptimized={image.src.endsWith(".svg")} />
        {large && project.key === "sipli" && <Image className="folio-companion" src="/images/sipli/duo/outer-today.webp" alt="Sipli’s cover-screen view" width={800} height={1164} sizes="(min-width: 760px) 10vw, 20vw" />}
      </div>
    </div>
  );
}

function WorkItem({ project, large }: { project: Project; large: boolean }) {
  const external = project.href.startsWith("https:");
  return (
    <article data-project-card className={large ? "folio-feature" : "folio-entry"}>
      <Link href={project.href} aria-labelledby={`folio-title-${project.key}`}
        aria-describedby={external ? `folio-tab-${project.key}` : undefined}
        target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        <Artwork project={project} large={large} />
        <div className="folio-description">
          <div className="folio-caption">
            <div>
              <p className="folio-medium">{project.eyebrow}</p>
              <h3 id={`folio-title-${project.key}`}>{project.title}</h3>
            </div>
            <ArrowUpRight aria-hidden size={22} strokeWidth={1.6} />
          </div>
          {large && <p className="folio-summary">{project.copy}</p>}
          {external && <span className="sr-only" id={`folio-tab-${project.key}`}>Opens in a new tab</span>}
        </div>
      </Link>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const projects = featuredWork.filter((project) => filter === "All" || (filter === "Websites" ? project.kind === "Website" : project.kind !== "Website"));
  return (
    <section id="work" aria-labelledby="work-title" className="folio-work">
      <div className="folio-wrap">
        <header className="folio-heading">
          <div>
            <p className="folio-kicker">Portfolio</p>
            <h2 id="work-title">Selected work<span>.</span></h2>
          </div>
          <div className="folio-tabs" role="group" aria-label="Filter projects">
            {(["All", "Websites", "Apps"] as const).map((name) => (
              <button type="button" key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>
            ))}
          </div>
        </header>
        <p className="sr-only" aria-live="polite">{projects.length} projects shown</p>
        <div className="folio-leads">
          {projects.slice(0, 2).map((project) => <WorkItem key={project.key} project={project} large />)}
        </div>
        <div className="folio-index">
          {projects.slice(2).map((project) => <WorkItem key={project.key} project={project} large={false} />)}
        </div>
      </div>
    </section>
  );
}
