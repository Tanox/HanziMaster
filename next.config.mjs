/** @type {import('next').NextConfig} */

// next.config.mjs v5.2.7

// Security headers including Content Security Policy
// Note: script-src 'unsafe-inline' is required for Next.js App Router compatibility
// See: https://nextjs.org/docs/app/guides/content-security-policy
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // unsafe-inline required for Next.js inline scripts; eval disabled for production security
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      // Google Fonts stylesheets
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts and custom fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: local, data URIs, HTTPS, and blob URLs
      "img-src 'self' data: https: blob:",
      // API connections: self + Google Fonts + Google Analytics
      "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      // Prevent clickjacking
      "frame-ancestors 'none'",
      // Restrict base URI
      "base-uri 'self'",
      // Restrict form destinations
      "form-action 'self'",
    ].join('; '),
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig = {
  reactStrictMode: true,
  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
    ],
  },
};

export default nextConfig;
