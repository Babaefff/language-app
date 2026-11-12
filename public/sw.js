// Offline support. The whole app (every page and all four courses, about 2 MB) is saved on install,
// so lessons and reviews work without internet. Audio clips are saved as they are played.
// The build replaces the two placeholders below (vite.config.ts), so each deploy installs afresh.
const BUILD = '__HABLO_BUILD__';
const FILES = /*__HABLO_FILES__*/ [];
const APP = 'hablo-app';
const AUDIO = 'hablo-audio';

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(APP);
    // One by one: a single failed file must not stop the rest from being saved.
    await Promise.all(['./', './index.html', ...FILES].map((f) => c.add(new Request(f, { cache: 'reload' })).catch(() => {})));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // Older cache versions, and app files no longer part of this build.
    for (const k of await caches.keys()) if (k !== APP && k !== AUDIO) await caches.delete(k);
    const keep = new Set(['./', './index.html', ...FILES].map((f) => new URL(f, self.registration.scope).href));
    const c = await caches.open(APP);
    for (const req of await c.keys()) if (!keep.has(req.url)) await c.delete(req);
    await self.clients.claim();
  })());
});

const put = (cache, req, res) => { if (res.ok) { const copy = res.clone(); caches.open(cache).then((c) => c.put(req, copy)); } return res; };

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const isAudio = url.pathname.includes('/audio/');
  // Lists of clips change whenever clips are added: network first.
  if (url.pathname.endsWith('/manifest.json')) {
    e.respondWith(fetch(req).then((res) => put(AUDIO, req, res)).catch(() => caches.match(req)));
    return;
  }
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => put(APP, './index.html', res)).catch(() => caches.match('./index.html')));
    return;
  }
  // Everything else is versioned by name (hashed assets, one clip per text): cache first.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => put(isAudio ? AUDIO : APP, req, res))));
});
