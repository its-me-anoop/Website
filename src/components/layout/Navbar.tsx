"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = prevScroll;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setPrevScroll(latest);
    });

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                <nav className="pointer-events-auto flex items-center justify-between gap-6 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl pl-6 pr-2 py-2 shadow-lg ring-1 ring-white/5">
                    <Link href="/" className="text-sm font-medium tracking-tight text-white hover:text-white/80 transition-colors mr-4">
                        Flutterly
                    </Link>

                    <ul className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Link
                            href="mailto:anoop@flutterly.co.uk"
                            className="hidden md:inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-sm font-medium transition-colors"
                        >
                            Start Project
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <nav className="flex flex-col items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-zinc-400 hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="mailto:anoop@flutterly.co.uk"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-lg font-medium"
                            >
                                Start Project
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
