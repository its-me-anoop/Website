import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="w-full py-12 px-6 border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Image
                        src="/logo-horizontal.png"
                        alt="Flutterly Ltd"
                        width={120}
                        height={30}
                        className="h-8 w-auto object-contain opacity-80"
                    />
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
