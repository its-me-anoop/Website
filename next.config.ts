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
  async redirects() {
    return [
      // Artling shipped as "Little Artist"; the App Store still links the
      // old policy URL. A 308 (not a rendered 307) so search engines pass
      // the equity on and drop the legacy URL.
      {
        source: "/little-artist/privacy-policy",
        destination: "/projects/artling/privacy-policy",
        permanent: true,
      },
      // Campaign alt slug from the Clear Path brief; canonical is /leaving-msw.
      {
        source: "/clear-path",
        destination: "/leaving-msw",
        permanent: true,
      },
    ];
  },
  // Baseline hardening only. A Content-Security-Policy is deferred: Cal.com
  // embeds and third-party scripts would break under a strict policy. HSTS
  // is left to the Vercel/edge host for the production domain.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
