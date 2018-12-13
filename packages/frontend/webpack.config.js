const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const SERVER_BUNDLE_NAME = 'server.bundle.js';
const CLIENT_BUNDLE_NAME = 'client.bundle.js';

/** These paths are handled by frontend server, so they must be relative */
const WEB_MANIFEST_PATH = '/manifest.json';
const BROWSER_CONFIG_PATH = '/browserconfig.xml';
const ROBOTS_PATH = '/robots.txt';

/** Name the project here */
const APP_NAME = 'React Boilerplate';
const APP_SHORT_NAME = 'R.B.';

function getBabelOptions(ssrMode) {
    return {
        cacheDirectory: true,
        babelrc: false,
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
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            'react-loadable/babel',
            process.env.NODE_ENV === 'development' && !ssrMode && 'react-hot-loader/babel',
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
}

function commonLoaders(ssrMode, env) {
    return [
        {
            test: /\.[tj]sx?$/,
            loader: 'babel-loader',
            options: getBabelOptions(ssrMode),
            exclude: /node_modules[\\/](?!(query-string|strict-uri-encode))/,
        },
        {
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader'],
        },
        {
            test: /favicon[\\/][^\\/]+\.(png|ico|svg)$/,
            loader: `file-loader?name=favicon/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
        },
        {
            test: /[a-z][A-Za-z0-9]*Image\.(jpg|jpeg|png)$/,
            loaders: [
                `file-loader?name=images/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
                {
                    loader: 'image-webpack-loader',
                    options: {
                        disable: !env.build,
                    },
                },
            ],
        },
        {
            test: /[A-Z][A-Za-z0-9]*Icon\.svg$/,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: getBabelOptions(ssrMode),
                },
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        runtimeGenerator: require.resolve('./tools/svg-to-icon-component'),
                        symbolId: '[name]_[hash]',
                    },
                },
            ],
        },
        {
            test: /\.(eot|ttf|otf|woff|woff2)$/,
            loader: `file-loader?name=fonts/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
        },
    ];
}

const commonConfig = env => ({
    mode: !env.build ? 'development' : 'production',
    devtool: !env.build && 'cheap-module-source-map',
    plugins: [
        !env.build && new webpack.HotModuleReplacementPlugin(),
        // https://github.com/webpack/webpack-dev-middleware#multiple-successive-builds
        new TimeFixPlugin(),
        // TODO: sort out issue with iconv-loader
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(APP_NAME),
            APP_SHORT_NAME: JSON.stringify(APP_SHORT_NAME),
            CLIENT_BUNDLE_NAME: JSON.stringify(CLIENT_BUNDLE_NAME),
            WEB_MANIFEST_PATH: JSON.stringify(WEB_MANIFEST_PATH),
            BROWSER_CONFIG_PATH: JSON.stringify(BROWSER_CONFIG_PATH),
            ROBOTS_PATH: JSON.stringify(ROBOTS_PATH),
            BUILD_TIMESTAMP: Date.now(),
        }),
        new CleanWebpackPlugin(['dist'], {
            dry: false,
            verbose: false,
        }),
        // https://github.com/babel/babel/issues/8361
        new FilterWarningsPlugin({
            exclude: /export '[^']+' (\(reexported as '[^']+'\) )?was not found in '[^']+'/,
        }),
        env.build && new LodashModuleReplacementPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['ru'],
        }),
    ].filter(Boolean),
    resolve: {
        modules: ['node_modules', path.resolve(`./src/client`)],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'node-fetch$': 'node-fetch/lib/index.js',
            'unfetch/polyfill$': 'unfetch/polyfill/index.js',
        },
    },
    stats: {
        all: false,
        colors: true,
        timings: true,
        errors: true,
    },
});

const clientConfig = env => ({
    name: 'client',
    target: 'web',
    entry: [
        '@babel/polyfill',
        'unfetch/polyfill',
        !env.build && 'webpack-hot-middleware/client?reload=true',
        './src/client/client.ts',
    ].filter(Boolean),
    module: {
        rules: commonLoaders(false, env),
    },
    plugins: [
        new webpack.DefinePlugin({ SSR_MODE: false }),
        new CopyWebpackPlugin([{ from: './src/client/public', to: '../public' }]),
        env.build &&
            new ReactLoadablePlugin({
                filename: './dist/react-loadable.json',
            }),
        env.analyze && new BundleAnalyzerPlugin(),
        !env.build &&
            new UnusedWebpackPlugin({
                directories: [path.resolve(`./src/client`)],
                exclude: [
                    // Readme files are fine
                    'README.md',
                    // Apollo types are generated
                    'ApolloTypes',
                    // These files are ignored due to babel usage (instead of tsc)
                    '*.d.ts',
                    // Entry points
                    'client.ts',
                    'server.ts',
                ],
                root: path.resolve(`./src/client`),
            }),
    ].filter(Boolean),
    output: {
        filename: CLIENT_BUNDLE_NAME,
        path: path.resolve(__dirname, 'dist', 'static'),
    },
});

const serverConfig = env => ({
    name: 'server',
    target: 'node',
    entry: ['@babel/polyfill/noConflict', './src/client/server.ts'],
    module: {
        rules: commonLoaders(true, env),
    },
    plugins: [
        new webpack.DefinePlugin({ SSR_MODE: true }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    output: {
        filename: SERVER_BUNDLE_NAME,
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    },
});

module.exports = env => {
    // https://github.com/webpack/webpack/issues/2121
    process.env.NODE_ENV = !env.build ? 'development' : 'production';

    return [merge(clientConfig(env), commonConfig(env)), merge(serverConfig(env), commonConfig(env))];
};
