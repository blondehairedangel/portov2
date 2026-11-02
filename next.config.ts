import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  // No Node.js runtime is needed in production (see DEPLOYMENT.md).
  output: "export",
  // /about/ → out/about/index.html, served by OpenLiteSpeed's directory index.
  trailingSlash: true,
  // No image optimisation server in a static export; assets are pre-sized.
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
