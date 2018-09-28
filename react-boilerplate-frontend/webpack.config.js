const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const config = require('./config');

const completeConfig = config.getCompleteConfig();
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

// https://github.com/webpack/webpack/issues/2121
process.env.NODE_ENV = completeConfig.root.env === config.ENV.DEV ? 'development' : 'production';

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
        ].filter(Boolean),
    };
}

function commonLoaders(ssrMode) {
    return [
        {
            test: /\.[tj]sx?$/,
            loader: 'babel-loader',
            options: getBabelOptions(ssrMode),
            exclude: [nodeModulesPath],
        },
        {
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader'],
        },
        {
            test: /\.(jpg|jpeg|png|ico)$/,
            oneOf: [
                {
                    test: /Image\.(jpg|jpeg|png)$/,
                    loader: `file-loader?name=images/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
                },
                {
                    test: /\.(png|ico)$/,
                    loader: `file-loader?name=favicon/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
                },
            ],
        },
        {
            test: /\.svg$/,
            oneOf: [
                {
                    test: /Icon\.svg$/,
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
                    test: /\.svg$/,
                    loader: `file-loader?name=favicon/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
                },
            ],
        },
        {
            test: /\.(eot|ttf|otf|woff|woff2)$/,
            loader: `file-loader?name=fonts/[name]_[hash].[ext]&context=./src/client&emitFile=${!ssrMode}`,
        },
    ];
}

const commonConfig = {
    mode: completeConfig.root.env === config.ENV.DEV ? 'development' : 'production',
    devtool: completeConfig.root.env === config.ENV.DEV && 'cheap-module-source-map',
    plugins: [
        completeConfig.root.env === config.ENV.DEV && new webpack.HotModuleReplacementPlugin(),
        new TimeFixPlugin(),
        // TODO: sort out issue with iconv-loader
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
        new webpack.DefinePlugin({
            GRAPHQL_ENDPOINT: JSON.stringify(completeConfig.api.graphqlEndpoint),
            GITHUB_TOKEN: JSON.stringify(completeConfig.api.githubToken),
            CLIENT_BUNDLE_NAME: JSON.stringify(completeConfig.root.clientBundleName),
            STATIC_DIRECTORY_NAME: JSON.stringify(completeConfig.root.staticDirectoryName),
            WEB_MANIFEST_PATH: JSON.stringify(completeConfig.root.webManifestPath),
            BROWSER_CONFIG_PATH: JSON.stringify(completeConfig.root.browserConfigPath),
            BUILD_TIMESTAMP: Date.now(),
        }),
        new CleanWebpackPlugin(['dist'], {
            dry: false,
            verbose: false,
        }),
        completeConfig.root.env === config.ENV.DEV &&
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
        // https://github.com/babel/babel/issues/8361
        new FilterWarningsPlugin({
            exclude: /export '[^']+' (\(reexported as '[^']+'\) )?was not found in '[^']+'/,
        }),
        completeConfig.root.env === config.ENV.DEV && new CleanTerminalPlugin(),
    ].filter(Boolean),
    resolve: {
        modules: ['node_modules', path.resolve(`./src/client`)],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'node-fetch$': 'node-fetch/lib/index.js',
        },
    },
    output: {
        publicPath: `/${completeConfig.root.staticDirectoryName}/`,
    },
    stats: {
        all: false,
        colors: true,
        timings: true,
    },
};

const clientConfig = {
    name: 'client',
    target: 'web',
    entry: [
        '@babel/polyfill',
        completeConfig.root.env === config.ENV.DEV && 'webpack-hot-middleware/client?reload=true',
        './src/client/client.ts',
    ].filter(Boolean),
    module: {
        rules: commonLoaders(false),
    },
    plugins: [new webpack.DefinePlugin({ SSR_MODE: false })],
    output: {
        filename: completeConfig.root.clientBundleName,
        path: path.resolve(__dirname, 'dist', completeConfig.root.staticDirectoryName),
    },
};

const serverConfig = {
    name: 'server',
    target: 'node',
    entry: ['@babel/polyfill/noConflict', './src/client/server.ts'],
    module: {
        rules: commonLoaders(true),
    },
    plugins: [new webpack.DefinePlugin({ SSR_MODE: true })],
    output: {
        filename: completeConfig.root.serverBundleName,
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    },
};

module.exports = [merge(clientConfig, commonConfig), merge(serverConfig, commonConfig)];
