"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
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
                transition={{ duration: 0.4, ease }}
                className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-14"
            >
                <nav className="flex items-center justify-between py-5 max-w-[1340px] mx-auto">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/logo-icon.png"
                                alt="Flutterly"
                                width={120}
                                height={32}
                                className="h-7 w-auto object-contain"
                                priority
                            />
                        </Link>

                        <ul className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={getHref(item.href)}
                                        className="text-[13px] font-medium text-foreground-secondary hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="hidden md:inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-background px-6 py-2.5 text-[12px] font-semibold tracking-wide transition-colors min-h-[44px]"
                        >
                            Start a Project
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-11 h-11 text-foreground-secondary hover:text-foreground transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                        className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl md:hidden"
                    >
                        <motion.nav
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: 0.1, ease }}
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
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-background text-lg font-semibold transition-colors min-h-[48px]"
                                >
                                    Start a Project
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
