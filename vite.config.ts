import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'do Links Collector',
        short_name: 'LinksCollector',
        description: 'Save and organize web links offline.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        icons: [
          {
            src: 'icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'style' ||
              request.destination === 'script' ||
              request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
        ],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [/^(?!\/__).*/],
        skipWaiting: true,
        clientsClaim: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
});
