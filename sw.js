self.addEventListener('install', (p) => {
  self.skipWaiting();
});

self.addEventListener('push', (e) => {
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: 'https://dlxod2.github.io/jin-sevensplit/favicon.ico',
    vibrate: [200, 100, 200]
  };
  e.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/jin-sevensplit/'));
});
