import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/20 px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:items-end md:justify-between">

        {/* Brand */}
        <div>
            <div className="mb-4 sm:mb-6 flex items-center gap-2">
                <span className="font-display font-bold text-2xl text-foreground tracking-tight">flutterly</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-foreground-secondary">
                A digital craft studio based in the UK. Building the future of web and mobile interactions.
            </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:gap-20">
             <div className="flex flex-col gap-4">
                <span className="text-xs font-mono text-foreground-tertiary uppercase tracking-widest">Socials</span>
                 <Link href="https://linkedin.com/in/anoop-jose-0b308a296/" target="_blank" className="text-foreground hover:text-accent transition-colors">LinkedIn</Link>
                 <Link href="https://github.com" target="_blank" className="text-foreground hover:text-accent transition-colors">GitHub</Link>
                 <Link href="https://twitter.com" target="_blank" className="text-foreground hover:text-accent transition-colors">Twitter</Link>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-xs font-mono text-foreground-tertiary uppercase tracking-widest">Legal</span>
                 <span className="text-foreground-secondary text-sm">© 2026 Flutterly Ltd</span>
                 <span className="text-foreground-secondary text-sm">All Rights Reserved.</span>
            </div>
        </div>

      </div>
       <div className="mx-auto mt-10 sm:mt-14 md:mt-20 flex max-w-[1200px] flex-col gap-3 border-t border-border/10 pt-6 sm:pt-8 md:flex-row md:items-center md:justify-between md:pt-10">
            <p className="text-[10px] text-foreground-tertiary uppercase tracking-widest">Designed & Developed by Anoop Jose</p>
            <p className="text-[10px] text-foreground-tertiary uppercase tracking-widest">London, UK</p>
       </div>
    </footer>
  );
}
