const path = require('path');
const webpack = require('webpack');

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
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};

module.exports = [
    {
        name: 'client',
        target: 'web',
        entry: ['webpack-hot-middleware/client?reload=true', './src/client/client.ts'],
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
