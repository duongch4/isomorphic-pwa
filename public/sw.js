const CACHE_NAME = 'cache-token';
const urlsToCache = ['/', '/style.css', '/script.js', '/logo.png'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    )
});

// Cache, falling back to network
self.addEventListener('fetch', event => {
    event.respondWith(async () => {
        const response = await caches.match(event.request);
        return response || fetch(event.request);
    });
});
