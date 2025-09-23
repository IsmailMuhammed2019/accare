import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
};

export default nextConfig;
