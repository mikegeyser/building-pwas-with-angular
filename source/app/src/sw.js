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

        /*
            1. Submit request
            2. Invalidate cache (if successful)
            3. Queue the change (if failed)
        */

        let response = fetch(event.request.clone())
            .then(actualResponse => invalidateCache(event.request.clone(), actualResponse))
            .catch(_ => queueChange(event.request.clone()));

        event.respondWith(response);
    }
});

function invalidateCache(request, actualResponse) {
    /*
        1. Read the request data.
        2. Open the cache.
        3. Delete anything that matches the url.
        4. Return the actual response.
     */

    return request.json()
        .then(requestData => {
            const url = `${request.url}/${requestData.category}`;
            
            return caches.open('meme-data')
                .then(cache => cache.delete(url));
        })
        .then(_ => actualResponse);
}

function queueChange(request) {
    /*
        1. Queue the change.
        2. Read the request data.
        3. Open the cache.
        4. Find the matching response.
        5. Read the cached response.
        6. Create a new response.
        7. Update the cached response.
        8. Return a fake response.
     */

    return queue.addRequest(request.clone())
        .then(_ => request.json())
        .then(requestData => {
            requestData['offline'] = true;
            const url = `${request.url}/${requestData.category}`;

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
        });
}
