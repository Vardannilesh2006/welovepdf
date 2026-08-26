/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  // P0/P1/P2/P3 — Indexing Fix: 301 permanent redirects
  // Evidence: /index returned HTTP 200 as duplicate of homepage (GSC "Duplicate without canonical")
  // Ghost 404s collected from GSC Coverage report — redirect to nearest live page
  async redirects() {
    return [
      // ── Duplicate homepage fix (P1) ──────────────────────────────
      // /index was serving a 200 duplicate of / — caused "Duplicate without user-selected canonical"
      { source: '/index', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },

      // ── Ghost 404 → nearest live page (P3) ───────────────────────
      // These URLs appear in GSC "Not found" or were linked by external sites
      { source: '/tools', destination: '/#workspace', permanent: true },
      { source: '/pdf-tools', destination: '/#workspace', permanent: true },
      { source: '/tool', destination: '/', permanent: true },
      { source: '/merge', destination: '/merge-pdf', permanent: true },
      { source: '/pdf-merge', destination: '/merge-pdf', permanent: true },
      { source: '/compress', destination: '/compress-pdf', permanent: true },
      { source: '/split', destination: '/split-pdf', permanent: true },
      // Common typos / old slug patterns
      { source: '/merge-pdfs', destination: '/merge-pdf', permanent: true },
      { source: '/split-pdfs', destination: '/split-pdf', permanent: true },
      { source: '/compress-pdfs', destination: '/compress-pdf', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://www.googletagmanager.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com; worker-src 'self' blob: cdn.jsdelivr.net; frame-src 'self' https://www.googletagmanager.com",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          }
        ],
      },
    ];
  }
}

export default nextConfig;
