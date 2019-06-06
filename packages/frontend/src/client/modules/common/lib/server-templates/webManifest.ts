import androidChrome192x192 from '../../favicon/android-chrome-192x192.png';
import androidChrome512x512 from '../../favicon/android-chrome-512x512.png';

export const webManifest = JSON.stringify({
    name: APP_NAME,
    // eslint-disable-next-line @typescript-eslint/camelcase
    short_name: APP_SHORT_NAME,
    icons: [
        {
            src: androidChrome192x192,
            sizes: '192x192',
            type: 'image/png',
        },
        {
            src: androidChrome512x512,
            sizes: '512x512',
            type: 'image/png',
        },
    ],
    // eslint-disable-next-line @typescript-eslint/camelcase
    theme_color: '#ebede8',
    // eslint-disable-next-line @typescript-eslint/camelcase
    background_color: '#ebede8',
    display: 'standalone',
});
