let counter = 0;
self.oninstall = (event) => {
  console.log('service worker install');
};
self.onactivate = (event) => {
  console.log('service worker activate');
  event.waitUntil(self.clients.claim());
};
self.onfetch = (event) => {
  console.log('fetch', event.request.url);
  if (event.request.url.endsWith('/data.json')) {
    counter++;
    event.respondWith(
      new Response(JSON.stringify({counter}), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
    return;
  }
  event.respondWith(fetch(event.request));
}
