// next.config.mjs v2.1.1
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.API_KEY,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Origin-Trial',
            value: 'YOUR_ORIGIN_TRIAL_TOKEN_HERE',
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
