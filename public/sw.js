// Minimal service worker — prevents 404, no functionality
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
