import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      // {
      //   source: "/api/v1/auth/:path*",
      //   destination: "http://5.39.222.41:8602/api/v1/auth/:path*",
      // },
      // {
      //   source: "/api/v1/:path*",
      //   destination: "http://5.39.222.41:8600/api/v1/:path*",
      // },
      // {
      //   source: "/api/v1/auth/:path*",
      //   destination: "https://dev.monolit.network/api/v1/auth/:path*",
      // },
      {
        source: "/api/v1/:path*",
        destination: "https://dev.monolit.network/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
