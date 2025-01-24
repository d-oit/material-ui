import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command }): UserConfig => {
  const config: UserConfig = {
    plugins: [
      react(),
      VitePWA({
        srcDir: 'src',
        filename: 'service-worker.ts',
        strategies: 'generateSW',  // Changed from injectManifest to generateSW
        registerType: 'prompt',
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: 'index.html'
        },
        workbox: {
          globPatterns: [
            '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'
          ],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\./i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /\.(js|css|png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        manifest: {
          name: 'do Links Collector',
          short_name: 'LinksCollector',
          description: 'Save and organize web links offline.',
          theme_color: '#1976d2',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: 'icons/icon-48x48.png',
              sizes: '48x48',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-72x72.png',
              sizes: '72x72',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-96x96.png',
              sizes: '96x96',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-128x128.png',
              sizes: '128x128',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-144x144.png',
              sizes: '144x144',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-152x152.png',
              sizes: '152x152',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    build: {
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
        clientPort: 5173
      },
      fs: {
        strict: false,
      },
    },
  };

  return config;
});
