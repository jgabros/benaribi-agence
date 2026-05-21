import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  output: 'export',
  // next/image requires unoptimized in static export (no server to resize images)
  images: {
    unoptimized: true,
  },
  // Trailing slash so /en/ generates out/en/index.html (CDN-friendly)
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
