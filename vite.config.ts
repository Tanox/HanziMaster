/**
 * HanziMaster v0.5.3
 */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'prompt',
        includeAssets: ['favicon.svg', 'icon.svg', 'maskable-icon.svg'],
        devOptions: {
          enabled: true
        },
        manifest: {
          id: 'hanzimaster-app',
          name: 'HanziMaster',
          short_name: 'HanziMaster',
          description: 'Master Chinese character stroke order with AI insights.',
          theme_color: '#fdfbf7',
          background_color: '#fdfbf7',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: 'icon.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: 'maskable-icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          cleanupOutdatedCaches: true,
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          runtimeCaching: [
            // 1. Local Hanzi Data (High Priority)
            {
              urlPattern: ({ url }) => url.pathname.startsWith('/hanzi-data/'),
              handler: 'CacheFirst',
              options: {
                cacheName: 'hanzi-data-local',
                expiration: {
                  maxEntries: 10000,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            // 2. CDN Hanzi Data (Fallback)
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/hanzi-writer-data@2\.0\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'hanzi-data-cdn',
                expiration: {
                  maxEntries: 2000,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            // 3. Google Fonts
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
    },
  };
});