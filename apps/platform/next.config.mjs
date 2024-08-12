/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.resolve.symlinks = true;
    // config.resolve.modules = [
    // path.resolve('./src'),
    // path.resolve('../../node_modules'),
    // path.resolve('../../packages/kit/node_modules')
    // ];
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
};

export default nextConfig;
