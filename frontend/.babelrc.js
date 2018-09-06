const env = process.env.NODE_ENV;

module.exports = {
    presets: [
        [
            '@babel/env',
            {
                modules: false,
                targets: {
                    browsers: ['last 1 version'],
                    safari: '9',
                    ie: '11',
                    ios: '9',
                    android: '4',
                },
            },
        ],
        '@babel/react',
        '@babel/typescript',
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        env === 'development' && 'react-hot-loader/babel',
        [
            'babel-plugin-styled-components',
            {
                ssr: true,
                displayName: env === 'development',
            },
        ],
        env === 'development' && 'add-react-displayname',
    ].filter(Boolean),
};
