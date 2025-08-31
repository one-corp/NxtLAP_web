import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://r2.thesportsdb.com/**')],
  },
};

export default nextConfig;
