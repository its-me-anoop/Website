import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-12 px-6 border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-lg font-semibold text-white tracking-tight">Flutterly Ltd</span>
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} Flutterly Ltd. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                        Terms
                    </Link>
                    <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                        Privacy
                    </Link>
                    <Link href="https://linkedin.com/in/anoop-jose-0b308a296/" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    );
}
