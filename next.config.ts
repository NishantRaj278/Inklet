import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '121clicks.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
