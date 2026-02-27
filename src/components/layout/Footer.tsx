import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/20 py-20 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">

        {/* Brand */}
        <div>
            <div className="flex items-center gap-2 mb-6">
                <span className="font-display font-bold text-2xl text-foreground tracking-tight">flutterly</span>
            </div>
            <p className="text-foreground-secondary text-sm max-w-xs leading-relaxed">
                A digital craft studio based in the UK. Building the future of web and mobile interactions.
            </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
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
       <div className="max-w-[1200px] mx-auto mt-20 pt-10 border-t border-border/10 flex justify-between items-center">
            <p className="text-[10px] text-foreground-tertiary uppercase tracking-widest">Designed & Developed by Anoop Jose</p>
            <p className="text-[10px] text-foreground-tertiary uppercase tracking-widest">London, UK</p>
       </div>
    </footer>
  );
}
