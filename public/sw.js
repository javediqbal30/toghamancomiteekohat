/**
 * Togh Aman Committee - Offline Emergency Service Worker
 * Designed for rural connectivity resiliency (Togh Bala & Payan, Kohat).
 * Ensures instant offline access to Emergency Hotlines and the Constitution.
 */

const CACHE_NAME = 'togh-aman-v1';
const CRITICAL_OFFLINE_URLS = [
  '/',
  '/emergency',
  '/transparency/constitution',
  '/assets/brand/togh-aman-committee-emblem.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CRITICAL_OFFLINE_URLS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Avoid caching portal API or authenticated areas
  if (url.pathname.startsWith('/portal') || url.pathname.startsWith('/api')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached and fetch in background for update
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {
          // Network offline; cachedResponse served cleanly
        });
        return cachedResponse;
      }

      // Not in cache: fetch from network
      return fetch(event.request).catch(() => {
        // If navigating to an HTML page and network fails, fallback to cached emergency page
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/emergency');
        }
      });
    })
  );
});
