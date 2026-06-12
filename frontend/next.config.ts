import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash photography is hot-linked per their API guidelines.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
