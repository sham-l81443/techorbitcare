import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // PWA configuration is handled by the manifest.json and service worker
  // The next-pwa package has compatibility issues with Next.js 15
  // We'll use a custom service worker approach instead
};

export default nextConfig;
