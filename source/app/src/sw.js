importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.2/workbox-sw.js");

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);

workbox.routing.registerRoute(
    /.*.(?:png|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'meme-images',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            })
        ]
    }), 'GET');

const dataCacheConfig = {
    cacheName: 'meme-data'
};

workbox.routing.registerRoute(/.*categories/, workbox.strategies.cacheFirst(dataCacheConfig), 'GET');
workbox.routing.registerRoute(/.*templates/, workbox.strategies.cacheFirst(dataCacheConfig), 'GET');
workbox.routing.registerRoute(/.*memes\/.\w+/, workbox.strategies.staleWhileRevalidate(dataCacheConfig), 'GET');

self.addEventListener('install', function (event) {
    self.skipWaiting();
});

const queue = new workbox.backgroundSync.Queue('memes-to-be-saved');

self.addEventListener('fetch', (event) => {
    if (event.request.url.match(/.*memes/) && event.request.method === 'POST') {

        let response = fetch(event.request.clone())
            .catch((err) => {
                return queue.addRequest(event.request)
                    .then(_ => event.request.json())
                    .then(requestData => {
                        requestData['offline'] = true;
                        return caches.open('meme-data')
                            .then(cache => {
                                const url = `${event.request.url}/${requestData.category}`;
                                return cache.match(url)
                                    .then(cachedResponse => cachedResponse.json())
                                    .then(data => {
                                        const updatedRequest = [requestData, ...data];
                                        const wat = new Response(JSON.stringify(updatedRequest), {
                                            status: 200,
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        });
                                        return cache.put(url, wat);
                                    });
                            })
                    });
            });

        event.respondWith(response);
    }
});
