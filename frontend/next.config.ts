import type { NextConfig } from "next";
import { NextConfigComplete } from "next/dist/server/config-shared";

const securityHeaders: NextConfigComplete["headers"] = async () => {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Cache-Control",
          value: "public, max-age=86400",
        },
      ],
    },
  ];
};

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["vtexai.kinsta.cloud"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_USER_API_URL}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/old-page", // user accesses this URL
        destination: "/new-page", // they will be redirected to this
        permanent: true, // 308 redirect (cached by browsers)
      },
    ];
  },
  headers: securityHeaders,
};

export default nextConfig;
