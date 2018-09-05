const path = require('path');
const webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');
const config = require('./config');

const completeConfig = config.getCompleteConfig();
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const commonPart = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loaders: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: [nodeModulesPath],
            },
            {
                test: /Graphql\.graphql$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new TimeFixPlugin(),
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
        new webpack.DefinePlugin({
            GRAPHQL_ENDPOINT: JSON.stringify(completeConfig.api.graphqlEndpoint),
            GITHUB_TOKEN: JSON.stringify(completeConfig.api.githubToken),
        }),
    ],
    devtool: 'source-map',
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
        entry: ['webpack-hot-middleware/client?reload=true', './src/client/client.tsx'],
        output: {
            filename: 'client.bundle.js',
        },
        ...commonPart,
    },
    {
        name: 'server',
        target: 'node',
        entry: './src/client/server.tsx',
        output: {
            filename: 'server.bundle.js',
            libraryTarget: 'commonjs2',
        },
        ...commonPart,
    },
];
