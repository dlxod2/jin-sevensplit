const CACHE_VERSION = 'v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      )
    ).then(() => clients.claim())
  );
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {
    title: '세븐 스플릿 알람',
    body: '환율 목표가 도달!'
  };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'https://dlxod2.github.io/jin-sevensplit/favicon.ico',
      vibrate: [200, 100, 200],
      tag: 'price-alert'
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/jin-sevensplit/'));
});
