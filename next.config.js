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
  experimental: {
    serverComponentsExternalPackages: ['muhammara'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  // P0-03: Indexing Fix: 301 permanent redirects
  // /index was serving 200 duplicate of / — caused "Duplicate without user-selected canonical"
  // Ghost 404s collected from GSC Coverage report — redirect to nearest live page
  async redirects() {
    return [
      // Apex and Vercel subdomains → https://www.welovepdf.best
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'welovepdf.best' }],
        destination: 'https://www.welovepdf.best/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'welovepdf.vercel.app' }],
        destination: 'https://www.welovepdf.best/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'we-love-pdf.vercel.app' }],
        destination: 'https://www.welovepdf.best/:path*',
        permanent: true,
      },

      // Duplicate homepage fix
      { source: '/index', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },

      // Ghost 404s → nearest live page
      { source: '/tools', destination: '/#workspace', permanent: true },
      { source: '/pdf-tools', destination: '/#workspace', permanent: true },
      { source: '/tool', destination: '/', permanent: true },
      { source: '/merge', destination: '/merge-pdf', permanent: true },
      { source: '/pdf-merge', destination: '/merge-pdf', permanent: true },
      { source: '/compress', destination: '/compress-pdf', permanent: true },
      { source: '/split', destination: '/split-pdf', permanent: true },
      // Common typos / old slugs
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.google.com https://*.doubleclick.net; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com; worker-src 'self' blob: cdn.jsdelivr.net; frame-src 'self' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com",
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
