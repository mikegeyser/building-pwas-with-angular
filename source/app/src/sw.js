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

        const request = () => event.request.clone();

        let response = fetch(request())
            .then(actualResponse => invalidateCache(request(), actualResponse))
            .catch(_ => queueChange(request()));

        event.respondWith(response);
    }
});

function queueChange(request) {
    return queue.addRequest(request.clone())
        .then(_ => request.json())
        .then(requestData => {
            requestData['offline'] = true;
            const url = `${request.url}/${requestData.category}`;

            return updateCache(url, requestData);
        });
}

function updateCache(url, requestData) {
    return caches.open('meme-data')
        .then(cache => {
            return cache.match(url)
                .then(cachedResponse => cachedResponse.json())
                .then(data => {
                    const updatedRequest = [requestData, ...data];

                    const fakeResponse = new Response(
                        JSON.stringify(updatedRequest),
                        { status: 200 });

                    return cache.put(url, fakeResponse.clone())
                        .then(_ => fakeResponse.clone());
                });
        });
}

function invalidateCache(request, actualResponse) {
    return request.json()
        .then(requestData => {
            const url = `${request.url}/${requestData.category}`;

            return caches.open('meme-data')
                .then(cache => cache.delete(url));;
        })
        .then(_ => actualResponse);
}