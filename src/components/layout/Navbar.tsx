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
import Image from "next/image";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const navItems = [
    { name: "Work", href: "#work" },
    { name: "Practice", href: "#practice" },
    { name: "Studio", href: "#about" },
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
                className="fixed top-3 left-0 right-0 z-[100] px-3 sm:top-4 sm:px-4 md:top-6 md:px-0 flex justify-center pointer-events-none"
            >
                <div
                    className={`pointer-events-auto flex min-w-0 items-center justify-between py-2.5 px-3 sm:px-4 md:px-6 rounded-2xl transition-all duration-300 ${
                        scrolled
                            ? "bg-surface/80 backdrop-blur-xl border border-border/50 shadow-2xl w-full max-w-[92vw] sm:max-w-[90vw] md:w-[600px]"
                            : "bg-transparent w-full max-w-[1200px]"
                    }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex min-w-0 items-center gap-2 group">
                        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden">
                            <Image
                                src="/flutterly-logo.png"
                                alt="Flutterly"
                                width={32}
                                height={32}
                                className="w-full h-full object-contain brightness-0 invert"
                                priority
                            />
                        </div>
                        <span className={`truncate font-display font-semibold text-base sm:text-lg tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-foreground"}`}>
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
                            href={pathname === "/" ? "#brief" : "/#brief"}
                            className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-background px-5 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:scale-105"
                        >
                            Send a brief
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden ml-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-foreground bg-surface-elevated border border-border transition-colors duration-200"
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
                        className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center px-4"
                    >
                        <motion.nav
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease }}
                            className="w-full max-w-sm px-4 space-y-5 text-center"
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
                                        className="block text-3xl sm:text-4xl font-display font-medium text-foreground hover:text-accent transition-colors duration-200"
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
                                    href={pathname === "/" ? "#brief" : "/#brief"}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-background px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                                >
                                    Send a brief
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
