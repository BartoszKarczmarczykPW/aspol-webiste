import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    qualities: [75],
  },
  compress: true, // Enable gzip compression
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  poweredByHeader: false, // Security: Hide X-Powered-By header
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; base-uri 'self'; form-action 'self' https:; object-src 'none'; frame-ancestors 'self'; img-src 'self' data: https:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https:; connect-src 'self' https: wss:; upgrade-insecure-requests"
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          {
            key: 'Origin-Agent-Cluster',
            value: '?1'
          },
          {
            key: 'X-Download-Options',
            value: 'noopen'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()'
          },

          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          }
        ],
      },
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; base-uri 'self'; form-action 'self' https:; object-src 'none'; frame-ancestors 'self'; img-src 'self' data: https: blob:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss: https://*.api.sanity.io wss://*.api.sanity.io https://cdn.sanity.io; worker-src 'self' blob:;",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
          {
            key: 'Origin-Agent-Cluster',
            value: '?0',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
