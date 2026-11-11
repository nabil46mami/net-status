// Service worker: keeps the app itself available offline.
// IMPORTANT: it only touches files from this app. The connectivity tests
// (requests to Google, Microsoft, etc.) are never intercepted or cached,
// otherwise the page could report "online" from saved data.

const CACHE = "online-status-v3";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore everything that is not a GET for this app's own files
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  // Show the saved copy immediately, refresh it in the background
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const fresh = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || fresh;
    })
  );
});
