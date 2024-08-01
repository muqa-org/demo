/** @type {import('next').NextConfig} */
import path from 'path';
import NextBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://dev-api.harborapps-nonprod.link" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
         ]
      },
    ];
  },
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
        hostname: '*..picsum.photos',
      }
    ],
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// module.exports = withBundleAnalyzer(nextConfig)

export default withBundleAnalyzer(nextConfig);
