// PartyRank — minimal service worker
// Strategy:
//   - static assets (/_next/static/*, /icon-*.png, /icon.svg): cache-first
//   - navigation HTML: network-first with offline shell fallback
//   - everything else: passthrough

const CACHE = "partyrank-shell-v1";
const SHELL_URLS = ["/", "/festas", "/offline.html", "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL_URLS).catch(() => {})),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

const isStatic = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  url.pathname.startsWith("/icon") ||
  url.pathname === "/manifest.webmanifest";

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // skip cross-origin

  // Navigation HTML: network-first
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy).catch(() => {}));
          return res;
        })
        .catch(() =>
          caches.match(req).then((c) => c || caches.match("/offline.html")),
        ),
    );
    return;
  }

  // Static: cache-first
  if (isStatic(url)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy).catch(() => {}));
            return res;
          }),
      ),
    );
  }
});
