import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.resolve.symlinks = true;
    // Uncomment and adjust these lines if you need to resolve specific modules
    // config.resolve.modules = [
    //   path.resolve('./src'),
    //   path.resolve('../../node_modules'),
    //   path.resolve('../../packages/kit/node_modules')
    // ];
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
};

export default withNextIntl(nextConfig);
