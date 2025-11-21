// Service Worker script: Caching disabled.
// The service worker remains registered to handle PWA scope, but all caching logic is removed.
// The constant CACHE_NAME is retained solely for the cleanup step below.
const CACHE_NAME = 'global-fund-connect-v1-no-cache'; 

// Activation event: Clears old caches from previous PWA versions (v1).
// This step is important for cleanup when removing caching functionality.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        // Clear all caches found, forcing all future requests to the network.
        if (key) {
          console.log('[Service Worker] Deleting cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Takes control of clients immediately after activation
  return self.clients.claim();
});

// INSTALL and FETCH event listeners are removed:
// - Removing 'install' ensures no new files are cached.
// - Removing 'fetch' ensures all requests go directly to the network,
//   effectively disabling the service worker's caching behavior and offline capabilities.
