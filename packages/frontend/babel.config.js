module.exports = {
    presets: [
        [
            '@babel/env',
            process.env.NODE_ENV !== 'test'
                ? {
                      modules: false,
                      targets: {
                          browsers: ['last 1 version'],
                          safari: '9',
                          ie: '11',
                          ios: '9',
                          android: '4',
                      },
                  }
                : {
                      targets: {
                          node: '8.11.1',
                      },
                  },
        ],
        '@babel/react',
        '@babel/typescript',
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-syntax-dynamic-import',
        'react-loadable/babel',
        process.env.NODE_ENV === 'development' && 'react-hot-loader/babel',
        [
            'babel-plugin-styled-components',
            {
                ssr: true,
                displayName: process.env.NODE_ENV === 'development',
            },
        ],
        process.env.NODE_ENV === 'development' && 'add-react-displayname',
        process.env.NODE_ENV === 'development' && '@babel/plugin-transform-react-jsx-source',
        process.env.NODE_ENV !== 'development' && 'lodash',
    ].filter(Boolean),
};
