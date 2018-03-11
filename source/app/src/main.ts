import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(registerServiceWorker);

function registerServiceWorker() {
  const prefix = ['%cAngular', `background: red; color: white; padding: 2px 0.5em; ` + `border-radius: 0.5em;`];

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
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
      .catch(e => {
        console.error(prefix, 'Error during service worker registration:', e);
      });
  } else {
    console.warn(prefix, 'Service Worker is not supported');
  }
}
