module.exports = {
    pwa: {
        name: 'SOFTBOOKING',
        themeColor: '#1999a6',
        msTileColor: '#ffffff',
        manifestOptions: {
            short_name: 'SOFTBOOKING',
            start_url: '/',
            display: 'standalone',
            background_color: '#ffffff',
            icons: [
                {
                    "src": "/logo/png/app.png",
                    "sizes": "192x192",
                    "type": "image/svg"
                },
                {
                    "src": "/logo/png/app.png",
                    "sizes": "192x192",
                    "type": "image/svg"
                }
            ]
        },
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('^https://softbooking.uz/'),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'softbooking-cache-2.0',
                        expiration: {
                            maxEntries: 200,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 kun
                        }
                    }
                }
            ]
        }
    }
}