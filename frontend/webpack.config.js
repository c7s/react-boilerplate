const path = require('path');
const webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');
const config = require('./config');

const completeConfig = config.getCompleteConfig();
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const commonPart = {
    mode: completeConfig.root.env === config.ENV.DEV ? 'development' : 'production',
    devtool: completeConfig.root.env === config.ENV.DEV && 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loader: 'babel-loader',
                exclude: [nodeModulesPath],
            },
            {
                test: /Graphql\.graphql$/,
                loader: 'graphql-tag/loader',
                exclude: [nodeModulesPath],
            },
        ],
    },
    plugins: [
        completeConfig.root.env === config.ENV.DEV && new webpack.HotModuleReplacementPlugin(),
        new TimeFixPlugin(),
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
        new webpack.DefinePlugin({
            GRAPHQL_ENDPOINT: JSON.stringify(completeConfig.api.graphqlEndpoint),
            GITHUB_TOKEN: JSON.stringify(completeConfig.api.githubToken),
        }),
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.graphql'],
        alias: {
            'node-fetch$': 'node-fetch/lib/index.js',
        },
    },
};

module.exports = [
    {
        name: 'client',
        target: 'web',
        entry: [
            completeConfig.root.env === config.ENV.DEV && 'webpack-hot-middleware/client?reload=true',
            './src/client/client.ts',
        ].filter(Boolean),
        output: {
            filename: 'client.bundle.js',
        },
        ...commonPart,
    },
    {
        name: 'server',
        target: 'node',
        entry: './src/client/server.ts',
        output: {
            filename: 'server.bundle.js',
            libraryTarget: 'commonjs2',
        },
        ...commonPart,
    },
];
