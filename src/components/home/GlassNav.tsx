const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

/** Floating glass capsule nav, pinned top-centre over the aurora. */
export function GlassNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-[22px] z-50 flex -translate-x-1/2 items-center gap-5 rounded-full border border-white/[.09] bg-[rgba(9,11,18,.55)] py-2.5 pl-6 pr-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-[22px] md:gap-7 md:pl-[26px]"
    >
      <a
        href="#top"
        className="font-syne text-lg font-extrabold tracking-[-0.5px] text-frost"
      >
        Flutterly<span className="text-mint">*</span>
      </a>
      <div className="hidden items-center gap-[22px] md:flex">
        {LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="font-jb text-[11px] uppercase tracking-[0.18em] text-frost/60 transition-colors duration-[250ms] hover:text-frost"
          >
            {label}
          </a>
        ))}
      </div>
      <a
        href="#contact"
        className="rounded-full bg-frost px-[22px] py-2.5 font-grotesk text-sm font-bold text-obsidian transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(.3,1.4,.45,.9)] hover:scale-105 hover:shadow-[0_0_28px_rgba(61,242,196,.45)] active:scale-95"
      >
        Start a project
      </a>
    </nav>
  );
}
