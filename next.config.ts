import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "kuracms.com", pathname: "/media/**" },
    ],
  },
};

// Required so `next dev` works with OpenNext's Cloudflare bindings.
initOpenNextCloudflareForDev();

export default nextConfig;
