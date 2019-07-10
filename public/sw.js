const CACHE_NAME = 'cache-token';
const staticUrlsToCache = ['/style.css', '/script.js', '/logo.png'];
const baseUrls = ['/'];
const urlsToCache = [
    ...staticUrlsToCache,
    baseUrls.map(url => `${url}?shell`),
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    let request = event.request;

    const baseUrl = baseUrls.find(url => request.url.endsWith(url));
    if (baseUrl) {
        request = new Request(`${baseUrl}?shell`);
    }

    event.respondWith(
        caches.match(request).then(response => response || fetch(request))
    );
});
