import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages subpath configuration
  // Update this to match your repository name
  basePath: "/linktree-alternative",
  assetPrefix: "/linktree-alternative/",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Headers only apply to server deployments (Vercel, etc.)
  // For static export, these are ignored
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default nextConfig;
