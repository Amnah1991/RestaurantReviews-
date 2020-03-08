let staticCacheName = 'rest-static-v1';
self.addEventListener('instal', function (event) {
    event.waitUntil(
        Chaches.open(staticCacheName).then(function (cach) {
            return cache.addAll([
                './',
                './index.html',
                './restaurant.html',
                './css/styles.css',
                './data/restaurants.json',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './js/sw_register.js',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg'
            ]);
        })
    )
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.filter(function (cacheName) {
                        return cacheName.startWith('rest-') &&
                            cacheName != staticCacheName;
                    }).map(function (cacheName) {
                        return caches.delete('cacheName')
                    })
                )
            })
    )
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    )
});