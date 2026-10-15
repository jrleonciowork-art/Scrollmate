import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/ScrollmateAdmin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
