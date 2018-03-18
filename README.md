# devconf-18

# Demo

- Show the meme carousel
- Add a new meme
- Look at generated Lighthouse report


The things I will be doing to convert an angular app to a PWA are:
1. Create an app manifest
1. Create an app shell
1. Precache all essential assets
1. Cache any dynamic data returned from the api, including images.
1. Queue failed updates using IndexDb

# 1. App Manifest

Create a `manifest.json` file.

> _manifest1

#### src/manifest.json
```json
{
  "name": "Meme Wrangler 9000",
  "short_name": "MemeWrangler",
  "theme_color": "#3f51b5",
  "background_color": "#ffffff",
  "display": "standalone",
  "Scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "splash_pages": null
}
```

Add the manifest to the `.angular-cli.json` so that it will be included in the build output.

> _manifest2
#### .angular-cli.json
```json
"assets": [
    "assets",
    "favicon.ico",
    "manifest.json"
],
```

> _manifest3
#### src/index.html
```html
<link rel="manifest" href="/manifest.json">
```

And then you can see the manifest loaded up in Chrome.

# 2. App Shell

#### src/index.html
```html
<app-root>This will only display while the app is loading!</app-root>
```

Open the `index.html` in Chrome as a file, to show it without the application mounted.

Change the inner html from a simple string to some markup.

> _shell1
```html
    <div class="shell">
      <div class="title">loading...</div>
      <div class="meme">&nbsp;</div>
      <div class="meme">&nbsp;</div>
      <div class="meme">&nbsp;</div>
    </div>
```

Add some styling to sketch out what the page is going to look like.

> _shell2
```html
  <style>
    html,
    body {
      margin: 0;
    }

    .shell .title {
      background-color: #3f51b5;
      color: #fff;
      text-align: center;
      font: 32px sans-serif;
      line-height: 56px;
    }

    .shell .meme {
      margin: 0.5em 1em;
      background-color: #e0e0e0;
      min-height: 250px;
    }
  </style>
```

# 3.1. Precache all essential assets

```bash
>> npm install -g workbox-cli
```

We can generate a service worker using `workbox`

```bash
>> workbox wizard
? What is the root of your web app (i.e. which directory do you deploy)? dist/
? Which file types would you like to precache? txt, png, ico, html, js, json, css
? Where would you like your service worker file to be saved? dist/sw.js
? Where would you like to save these configuration options? workbox-config.js
```

Generate the service worker.

```bash
>> workbox generateSW workbox-config.js
```

Install the service worker in the `src/main.ts` file.

#### src/main.ts

Register the service worker after the angular app has booted.

> _install1
```ts
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(registerServiceWorker);
```

Check to make sure that this is a production build, and that service worker is actually available. Then, register it.
> _install2
```ts
function registerServiceWorker() {
  if (environment.production && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js');
  }
}
```

Add some (read: lots) of logging to figure out what's going on.
> _install3
```ts
.then(reg => {
        console.log(...prefix, 'Registration successful', reg);
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log(...prefix, 'New or updated content is available', installingWorker);
                } else {
                  console.log(...prefix, 'Content is now available offline', installingWorker);
                }
                break;
              case 'redundant':
                console.error(...prefix, 'The installing service worker became redundant', installingWorker);
                break;
              default:
                console.log(...prefix, installingWorker.state);
                break;
            }
          };
        };
      })
```

...and a catch, just in case.
> _install4
```ts
.catch(e => {
    console.error(...prefix, 'Error during service worker registration:', e);
})
```

Then we can build and test it.

```bash
>> ng build --prod
>> http-server dist -c-1
```

Take a look at the Application tab in Chrome dev tools, to see the service worker installed. Switching the network offline will show that the assets are served from cache.

# 3.2. Precache all essential assets (Take 2)

A more powerful way to do this is not via config alone, but a template `sw.js`.

> _sw1
#### src/sw.js
```js
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.2/workbox-sw.js");

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);
```

Change the config to respect the inject manifest.

> _config1
#### workbox-config.js
```js
  "swSrc": "src/sw.js",
```

> _config2
#### workbox-config.js
```js
"injectionPointRegexp": /(const precacheManifest = )\[\](;)/
```

```bash
>> workbox injectManifest workbox-config.js
>> http-server dist -c-1
```

We're going to do this a lot, so best to add it to the `package.json` scripts.

> _config3
#### package.json
```json
"sw": "workbox injectManifest workbox-config.js",
"start-prod": "yarn run build && yarn run sw && http-server dist -c-1"
```

```bash
>> yarn start-prod
```

And we should see the same behaviour.

# 4.1. Cache api data

**********
TODO
*******

#Script

- Before
    - Demo
        - Click around meme carousel
        - Show add new meme menu for lotr
    - Show lighthouse report for the original
        - Make 'opportunities' joke.
        - Talk about 'todos'.
            - Manifest
            - Shell
            - Precaching
            - Offline

- Manifest.json
    - Create a simple manifest.
    - Update it in the .angular-cli.json config.
    - Update link rel in the index.html

- App shell
    - Show simple trick of writing into the body
    - Show how to test it (open file directly)
    - Update markup and css to prototype
    - Show loading result in full solution.

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
        - Add the cacheresponse (and expiration plugins).
        - Show the images caching in the browser, show the size of the app-cache and storage in devtools.
        - Show the offline support, working properly.
    - TODO: Proper updating support of the service worker.
        - Show skipwaiting
        - Talk about the problem of updating serviceworker after page load
        - Double reload is awful but might be fine.
        - Prompt user to reload.
    - Offline editing + background sync.
        - The offline checkbox in DevTools only affects requests from the page. Service Worker requests will continue to go through.
        - Can debug this.
        - Show stored requests in IndexDB.
        - Handle offline gracefully.
        - Change cacheFirst to staleWhileRevalidate.
        - Merge cached requests and background sync requests, to show offline 'working'.
        TODO: When will background sync fire?

- Lighthouse
    - Show original
    - Show for new