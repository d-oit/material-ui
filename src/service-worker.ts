/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

declare const self: ServiceWorkerGlobalScope;

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API requests
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache assets (images, stylesheets, scripts)
registerRoute(
  ({ request }) => request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Handle offline fallback
self.addEventListener('install', (event: ExtendableEvent) => {
  const offlinePage = new Response(
    'You are offline. Please check your internet connection.',
    {
      headers: { 'Content-Type': 'text/html' },
    }
  );

  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.put('/offline.html', offlinePage);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match('/offline.html').then((response) => {
        return response || new Response('You are offline');
      })
    );
  }
});
