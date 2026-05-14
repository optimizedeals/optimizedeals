import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "optimize.deals",
      },
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "media3.giphy.com",
      },
      {
        protocol: "https",
        hostname: "media*.giphy.com",
      },
      {
        protocol: "https",
        hostname: "*.giphy.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: true,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [{ key: "Vary", value: "Accept" }],
    },
  ],
  // `app/sitemap.ts` (the metadata-route convention) cannot emit a
  // <?xml-stylesheet?> processing instruction, which Chrome 120+ needs
  // to render XML as a tree. Serve it from a normal route handler
  // instead and rewrite the public URL to it.
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ],
    fallback: [],
  }),
};

export default withNextIntl(nextConfig);
