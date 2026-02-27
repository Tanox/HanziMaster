/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

export default nextConfig;
