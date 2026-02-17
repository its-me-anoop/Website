import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full py-16 px-6 border-t border-white/[0.06] bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Image
                            src="/logo-horizontal.png"
                            alt="Flutterly Ltd"
                            width={100}
                            height={24}
                            className="h-5 w-auto object-contain opacity-60"
                        />
                        <p className="text-sm text-foreground-tertiary">
                            &copy; {new Date().getFullYear()} Flutterly Ltd. All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="text-sm text-foreground-tertiary hover:text-foreground transition-colors"
                        >
                            Email
                        </Link>
                        <Link
                            href="https://linkedin.com/in/anoop-jose-0b308a296/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground-tertiary hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                            LinkedIn
                            <ArrowUpRight size={12} className="opacity-50" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
