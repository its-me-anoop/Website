"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#products" },
    { name: "About", href: "#about" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = prevScroll;

        // Hide on scroll down, show on scroll up
        if (latest > previous && latest > 150) {
            setHidden(true);
            setMobileMenuOpen(false);
        } else {
            setHidden(false);
        }

        // Glass background when scrolled
        setScrolled(latest > 20);

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
                transition={{ duration: 0.4, ease }}
                className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-0 flex justify-center pointer-events-none"
            >
                <div
                    className={`pointer-events-auto flex items-center justify-between py-3 px-6 rounded-2xl transition-all duration-300 ${
                        scrolled
                            ? "bg-surface/80 backdrop-blur-xl border border-border/50 shadow-2xl w-[90%] md:w-[600px]"
                            : "bg-transparent w-full max-w-[1200px]"
                    }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg bg-surface-elevated border border-border group-hover:border-accent/50 transition-colors">
                             <span className="font-display font-bold text-accent text-lg">f</span>
                        </div>
                        <span className={`font-display font-semibold text-lg tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-foreground"}`}>
                            flutterly
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        <ul className="flex items-center gap-1 bg-surface-elevated/50 p-1 rounded-full border border-border/50">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={getHref(item.href)}
                                        className="relative px-4 py-1.5 text-xs font-medium text-foreground-secondary hover:text-foreground transition-colors duration-200 block"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="hidden md:flex">
                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-black px-5 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:scale-105"
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground bg-surface-elevated border border-border transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile full-screen overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
                    >
                        <motion.nav
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease }}
                            className="w-full px-8 space-y-6 text-center"
                        >
                             {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 + index * 0.05,
                                        ease,
                                    }}
                                >
                                    <Link
                                        href={getHref(item.href)}
                                        onClick={() =>
                                            setMobileMenuOpen(false)
                                        }
                                        className="block text-4xl font-display font-medium text-foreground hover:text-accent transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, ease }}
                                className="pt-8"
                            >
                                <Link
                                    href="mailto:anoop@flutterly.co.uk"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-black px-12 py-5 text-lg font-bold uppercase tracking-wider transition-colors duration-200"
                                >
                                    Let&apos;s Talk
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
