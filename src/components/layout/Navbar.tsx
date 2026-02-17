"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = prevScroll;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setMobileMenuOpen(false);
        } else {
            setHidden(false);
        }
        setPrevScroll(latest);
    });

    const getHref = (href: string) => {
        if (pathname === "/") return href;
        return `/${href}`;
    };

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: "-120%", opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4 pointer-events-none"
            >
                <nav className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 rounded-2xl border border-white/[0.06] bg-[#0C0C0E]/80 backdrop-blur-2xl backdrop-saturate-150 pl-5 pr-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full max-w-2xl">
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/logo-horizontal.png"
                            alt="Flutterly"
                            width={100}
                            height={24}
                            className="h-5 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            priority
                        />
                    </Link>

                    <ul className="hidden md:flex items-center gap-0.5">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={getHref(item.href)}
                                    className="px-3.5 py-2 text-[13px] font-medium text-foreground-secondary hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="hidden md:inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white px-4 py-2 text-[13px] font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                        >
                            Start a Project
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-10 h-10 text-foreground-secondary hover:text-foreground transition-colors rounded-xl hover:bg-white/[0.04]"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[99] bg-[#0C0C0E]/95 backdrop-blur-2xl md:hidden"
                    >
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex flex-col items-center justify-center h-full gap-2 px-8"
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + index * 0.05 }}
                                >
                                    <Link
                                        href={getHref(item.href)}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-3xl font-display font-semibold text-foreground-secondary hover:text-foreground transition-colors py-3"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="mt-8"
                            >
                                <Link
                                    href="mailto:anoop@flutterly.co.uk"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl text-lg font-medium transition-colors min-h-[48px]"
                                >
                                    Start a Project
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
