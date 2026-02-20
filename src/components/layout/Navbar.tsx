"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
                className={`fixed top-0 left-0 right-0 z-[100] px-5 md:px-10 transition-colors duration-300 ${
                    scrolled
                        ? "bg-background/80 backdrop-blur-xl shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <nav className="flex items-center justify-between py-5 max-w-[1200px] mx-auto">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src="/logo-icon.png"
                            alt="Flutterly"
                            width={32}
                            height={32}
                            className="grayscale brightness-[0.3]"
                        />
                        <span className="font-display font-semibold text-xl text-foreground tracking-tight">
                            flutterly
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={getHref(item.href)}
                                        className="text-sm font-sans text-foreground-secondary hover:text-foreground transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-white px-7 py-3 text-sm font-medium transition-colors duration-200"
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-foreground-secondary hover:text-foreground hover:bg-stone/50 transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </nav>
            </motion.header>

            {/* Mobile full-screen overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl md:hidden"
                    >
                        <motion.nav
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, delay: 0.1, ease }}
                            className="flex flex-col items-center justify-center h-full gap-3 px-8"
                        >
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.15 + index * 0.06,
                                        ease,
                                    }}
                                >
                                    <Link
                                        href={getHref(item.href)}
                                        onClick={() =>
                                            setMobileMenuOpen(false)
                                        }
                                        className="block text-3xl font-display font-semibold text-foreground-secondary hover:text-foreground transition-colors duration-200 py-3"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38, ease }}
                                className="mt-10"
                            >
                                <Link
                                    href="mailto:anoop@flutterly.co.uk"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-hover text-white px-10 py-4 text-lg font-medium transition-colors duration-200"
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
