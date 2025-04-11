import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    domains: ['vtexai.kinsta.cloud'], // 👈 Add your WordPress image domain here
  },
};

export default nextConfig;
