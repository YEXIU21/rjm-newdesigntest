// RJM Casino Service Worker - Enhanced for better PWA installation
const CACHE_NAME = 'rjm-casino-app-v1';
const OFFLINE_URL = "offline.html";
const OFFLINE_IMG = "logo192.png";

// Files to cache for immediate access
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/offline.html',
  '/static/js/main.js', // Main application bundle
  '/static/css/main.css' // Main CSS
];

// Additional assets to cache after installation
const ADDITIONAL_ASSETS = [
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css'
];

// Install event - cache core assets
self.addEventListener("install", (event) => {
  console.log('[ServiceWorker] Installing...');
  
  // Cache core assets immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching core app shell');
        return cache.addAll(CORE_ASSETS).catch(err => {
          console.error('[ServiceWorker] Caching core assets failed:', err);
          // Continue even if some assets fail to cache
          return Promise.resolve();
        });
      })
      .then(() => {
        console.log('[ServiceWorker] Core assets cached');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log('[ServiceWorker] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Claiming clients...');
      // Take control of all clients immediately
      return self.clients.claim();
    }).then(() => {
      // Cache additional assets after activation
      return caches.open(CACHE_NAME).then(cache => {
        console.log('[ServiceWorker] Caching additional assets');
        return cache.addAll(ADDITIONAL_ASSETS).catch(err => {
          console.error('[ServiceWorker] Caching additional assets failed:', err);
          return Promise.resolve();
        });
      });
    })
  );
});

// Helper function to determine if a request is a navigation request
const isNavigationRequest = (request) => {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept') && 
          request.headers.get('accept').includes('text/html'));
};

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle navigation requests (HTML pages)
  if (isNavigationRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // For all other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise try network
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response to cache it and return it
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => console.error('[ServiceWorker] Caching error:', err));
            
            return response;
          })
          .catch(error => {
            console.error('[ServiceWorker] Fetch error:', error);
            
            // For image requests, return offline image
            if (event.request.destination === 'image') {
              return caches.match(OFFLINE_IMG);
            }
            
            // For other assets, try to return something from cache
            return caches.match(event.request);
          });
      })
  );
});

// Send a message to all clients when the service worker is updated
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const title = 'RJM Casino';
  const options = {
    body: event.data ? event.data.text() : 'New notification from RJM Casino',
    icon: '/logo192.png',
    badge: '/logo192.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});