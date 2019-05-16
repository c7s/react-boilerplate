import androidChrome192x192 from '../../favicon/android-chrome-192x192.png';
import androidChrome256x256 from '../../favicon/android-chrome-256x256.png';

export const webManifest = {
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
            src: androidChrome256x256,
            sizes: '256x256',
            type: 'image/png',
        },
    ],
    // eslint-disable-next-line @typescript-eslint/camelcase
    theme_color: '#ffffff',
    // eslint-disable-next-line @typescript-eslint/camelcase
    background_color: '#ffffff',
    display: 'standalone',
};
