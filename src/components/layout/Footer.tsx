import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A]">
      <div className="max-w-[1200px] mx-auto py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Brand + Copyright */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="Flutterly"
              width={32}
              height={32}
              className="grayscale invert opacity-80"
            />
            <span className="font-display text-foreground-tertiary text-lg">
              flutterly
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground-tertiary" />
            <p className="text-foreground-tertiary text-sm">
              &copy; 2026 Flutterly Ltd
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-6">
            <Link
              href="mailto:anoop@flutterly.co.uk"
              className="text-foreground-tertiary text-sm hover:text-[#FDFBF7] transition-colors duration-200"
            >
              anoop@flutterly.co.uk
            </Link>
            <Link
              href="https://linkedin.com/in/anoop-jose-0b308a296/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-tertiary text-sm hover:text-[#FDFBF7] transition-colors duration-200 inline-flex items-center gap-1"
            >
              LinkedIn
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
