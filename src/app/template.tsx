"use client";

import { usePathname } from "next/navigation";
import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/demo")) return children;

  return <LazyMotion features={loadFeatures} strict>{children}</LazyMotion>;
}
