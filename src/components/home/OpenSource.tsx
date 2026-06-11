import { Github, Star } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

type Repo = {
  index: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  hoverBorder: string;
  delay: number;
};

const REPOS: Repo[] = [
  {
    index: "R—01",
    name: "hydration-engine",
    description: "The on-device hydration model that ships inside Sipli.",
    language: "SWIFT",
    languageColor: "#3DF2C4",
    stars: 412,
    hoverBorder: "hover:border-mint/40",
    delay: 0,
  },
  {
    index: "R—02",
    name: "nextjs-seo-kit",
    description: "Structured-data helpers, used on every site built here.",
    language: "TYPESCRIPT",
    languageColor: "#8B7CFF",
    stars: 289,
    hoverBorder: "hover:border-iris/40",
    delay: 90,
  },
  {
    index: "R—03",
    name: "gesture-lab",
    description: "SwiftUI and Flutter micro-interactions, mostly for play.",
    language: "DART",
    languageColor: "#FF6FCB",
    stars: 176,
    hoverBorder: "hover:border-candy/40",
    delay: 180,
  },
  {
    index: "R—04",
    name: "friday-ship",
    description: "A tiny changelog generator that pings Slack on Fridays.",
    language: "JAVASCRIPT",
    languageColor: "#FFB45C",
    stars: 94,
    hoverBorder: "hover:border-amber/40",
    delay: 270,
  },
];

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="relative z-[1] px-6 pb-[60px] pt-[150px] md:px-12"
    >
      <div className="mx-auto grid max-w-[1320px] items-start gap-11 lg:grid-cols-[.9fr_1.1fr] lg:gap-[88px]">
        <div>
          <Reveal className="mb-5 font-jb text-[11px] uppercase tracking-[0.3em] text-mint">
            <span className="text-frost/40">05 /</span> Open source
          </Reveal>
          <Reveal delay={80}>
            <h2 className="m-0 font-syne text-[clamp(30px,4.6vw,68px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-frost">
              Some of it
              <br />
              <span className="text-outline">ships in public.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mb-0 mt-[26px] max-w-[400px] text-base leading-[1.65] text-frost/60">
              Small tools, experiments, and the bits of client work that are
              safe to open up. Pull requests welcome — so is silence.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[30px] inline-flex items-center gap-2.5 rounded-full border border-white/[.14] bg-white/5 px-6 py-[13px] font-jb text-[13px] tracking-[0.1em] text-frost shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-[14px] transition-[transform,border-color] duration-[250ms] ease-[cubic-bezier(.3,1.4,.45,.9)] hover:scale-105 hover:border-mint/50"
            >
              <Github size={16} aria-hidden />@{site.social.githubHandle}
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3.5">
          {REPOS.map((repo) => (
            <Reveal key={repo.name} kind="right" delay={repo.delay}>
              <a
                href={`${site.social.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 rounded-[22px] border border-white/10 bg-[rgba(11,14,22,.6)] px-5 py-5 text-frost shadow-[inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-[20px] transition-[transform,border-color] duration-[350ms] ease-[cubic-bezier(.22,1.1,.36,1)] hover:translate-x-2.5 sm:gap-5 sm:px-7 sm:py-6 ${repo.hoverBorder}`}
              >
                <span className="hidden font-jb text-[11px] text-frost/35 sm:inline">
                  {repo.index}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-grotesk text-[17px] font-bold">
                    {repo.name}
                  </span>
                  <span className="mt-[3px] block text-[13px] text-frost/55">
                    {repo.description}
                  </span>
                </span>
                <span
                  className="hidden shrink-0 font-jb text-[11px] tracking-[0.1em] sm:inline"
                  style={{ color: repo.languageColor }}
                >
                  {repo.language}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-jb text-[13px]">
                  <Star size={13} className="text-amber" aria-hidden />
                  {repo.stars}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
