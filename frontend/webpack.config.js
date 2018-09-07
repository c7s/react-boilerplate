const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');
const config = require('./config');

const completeConfig = config.getCompleteConfig();
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const commonConfig = {
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
            {
                test: /Icon\.svg$/,
                loaders: [
                    'babel-loader',
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            runtimeGenerator: require.resolve('./generators/svg-to-icon-component'),
                            symbolId: '[name]_[hash]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        completeConfig.root.env === config.ENV.DEV && new webpack.HotModuleReplacementPlugin(),
        new TimeFixPlugin(),
        // TODO: sort out issue with iconv-loader
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
        new webpack.DefinePlugin({
            GRAPHQL_ENDPOINT: JSON.stringify(completeConfig.api.graphqlEndpoint),
            GITHUB_TOKEN: JSON.stringify(completeConfig.api.githubToken),
        }),
    ].filter(Boolean),
    resolve: {
        modules: ['node_modules', path.resolve(`./src/client`)],
        extensions: ['.js', '.ts', '.tsx', '.graphql', '.jpg', '.jpeg', '.png', '.svg'],
        alias: {
            'node-fetch$': 'node-fetch/lib/index.js',
        },
    },
    output: {
        publicPath: '/static/',
    },
};

const clientConfig = {
    name: 'client',
    target: 'web',
    entry: [
        completeConfig.root.env === config.ENV.DEV && 'webpack-hot-middleware/client?reload=true',
        './src/client/client.ts',
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /Image\.(jpg|jpeg|png)$/,
                loader: `file-loader?name=images/[name]_[hash].[ext]&context=./src/client`,
            },
        ],
    },
    output: {
        filename: 'client.bundle.js',
        path: path.resolve(__dirname, 'dist', 'static'),
    },
};

const serverConfig = {
    name: 'server',
    target: 'node',
    entry: './src/client/server.ts',
    module: {
        rules: [
            {
                test: /Image\.(jpg|jpeg|png)$/,
                loader: `file-loader?name=images/[name]_[hash].[ext]&context=./src/client&emitFile=false`,
            },
        ],
    },
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    },
};

module.exports = [merge(clientConfig, commonConfig), merge(serverConfig, commonConfig)];
