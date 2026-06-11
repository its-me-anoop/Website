import { site } from "@/lib/site";

export function HomeFooter() {
  return (
    <footer className="relative z-[1] border-t border-white/[.09] bg-[rgba(7,8,13,.6)] px-6 py-10 backdrop-blur-[16px] md:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-[18px]">
          <span className="font-syne text-[17px] font-extrabold text-frost">
            Flutterly<span className="text-mint">*</span>
          </span>
          <span className="font-jb text-[10px] uppercase tracking-[0.18em] text-frost/[.38]">
            © {new Date().getFullYear()} {site.legalName} — Reading, UK
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-[26px]">
          <a
            href="#work"
            className="font-jb text-[10px] uppercase tracking-[0.18em] text-frost/50 transition-colors duration-[250ms] hover:text-frost"
          >
            Work
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-jb text-[10px] uppercase tracking-[0.18em] text-frost/50 transition-colors duration-[250ms] hover:text-frost"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-jb text-[10px] uppercase tracking-[0.18em] text-frost/50 transition-colors duration-[250ms] hover:text-frost"
          >
            LinkedIn
          </a>
          <span className="font-jb text-[10px] uppercase tracking-[0.18em] text-frost/[.38]">
            Designed &amp; built by {site.founder}
          </span>
        </div>
      </div>
    </footer>
  );
}
