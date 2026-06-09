import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern, far-smaller image formats. AVIF first (best ratio),
  // WebP as the widely-supported fallback before the original source.
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimised variants for a year — sources are content-addressed
    // by path, so a long TTL is safe and saves repeat optimisation work.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
