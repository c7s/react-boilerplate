import androidChrome192x192 from '../favicon/android-chrome-192x192.png';
import androidChrome256x256 from '../favicon/android-chrome-256x256.png';

export const webManifest = {
    name: 'React Boilerplate',
    short_name: 'React Boilerplate',
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
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
};
