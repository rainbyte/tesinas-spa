if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.setConfig({
    debug: false,
  });

  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate(),
  );

  self.addEventListener("message", (e)=>{
    if (e.data.action=='skipWaiting') {
      self.skipWaiting()
    }
  });
} else {
  console.log(`Workbox didn't load`);
}