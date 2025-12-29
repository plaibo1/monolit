import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://dev.monolit.network/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
