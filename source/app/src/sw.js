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

workbox.routing.registerRoute(/.*categories/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/.*templates/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/.*memes\/.\w+/, workbox.strategies.cacheFirst(), 'GET');
