# devconf-18

#Demo script

- Angular Service Worker
    - Problems with ngsw
    - Make a joke about the panic.

- Workbox
    - Talk about CLI install
        - Angular is just javascript at the end of the day.
        - Mention webpack and gulp plugins.
    - Show workbox wizard
        - Everything is better with a wizard joke
        - Generate a proper config file that caches assets
        - Talk through the options
    - Show generateSW
        - Generate a SW,
        - Install the sw in main.ts for angular
        - run http-server and show the service worker ui, as well as the app cache
        - Show the behaviour of 'offline', particularly the service of precached items from SW.
    - Inject Manifest
        - Create template sw.js with cache assets.
        - Change config to cater for template sw.
        - Rebuild and show the service worker updating and working.
    - Runtime routing
        - Add a route to cache categories, leaving the defaults.
        - Discuss different cache options.
        - Update and show the caching behavior in a separate app cache.
        - Show offline.
        - Add runtime routing for the rest of the data routes.
    - Images
        - Add the images routing naively.
        - Show the opaque response warnings, and explain what it is.
        - Add the cacheresponse and expiration plugins.
        - Show the images caching in the browser, show the size of the app-cache and storage in devtools.
        - Show the offline support, working properly.
    - Proper updating support of the service worker.
    - Offline editing + background sync.

- Lighthouse
    - Show lighthouse report for the original
    - Run for new