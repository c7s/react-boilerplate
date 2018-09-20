const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const config = require('./config');

const completeConfig = config.getCompleteConfig();
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const svgIconRule = {
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
};

function commonFileLoaders(isEmit) {
    return [
        {
            test: /\.(jpg|jpeg|png|ico)$/,
            oneOf: [
                {
                    test: /Image\.(jpg|jpeg|png)$/,
                    loader: `file-loader?name=images/[name]_[hash].[ext]&context=./src/client&emitFile=${isEmit}`,
                },
                {
                    test: /\.(png|ico)$/,
                    loader: `file-loader?name=favicon/[name]_[hash].[ext]&context=./src/client&emitFile=${isEmit}`,
                },
            ],
        },
        {
            test: /\.svg$/,
            oneOf: [
                svgIconRule,
                {
                    test: /\.svg$/,
                    loader: `file-loader?name=favicon/[name]_[hash].[ext]&context=./src/client&emitFile=${isEmit}`,
                },
            ],
        },
        {
            test: /\.(eot|ttf|otf|woff|woff2)$/,
            loader: `file-loader?name=fonts/[name]_[hash].[ext]&context=./src/client&emitFile=${isEmit}`,
        },
    ];
}

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
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
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
            FONTS_LOAD_TIMEOUT_MS: completeConfig.root.fontsLoadTimeoutMs,
            CLIENT_BUNDLE_NAME: JSON.stringify(completeConfig.root.clientBundleName),
            STATIC_DIRECTORY_NAME: JSON.stringify(completeConfig.root.staticDirectoryName),
            WEB_MANIFEST_PATH: JSON.stringify(completeConfig.root.webManifestPath),
            BROWSER_CONFIG_PATH: JSON.stringify(completeConfig.root.browserConfigPath),
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
                    // Assembled graphql is for developer only
                    '*.assembled.graphql',
                    // These files are ignored due to babel usage (instead of tsc)
                    '*.d.ts',
                    // Entry points
                    'client.ts',
                    'server.ts',
                    'HotIsomorphicApp.ts',
                ],
                root: path.resolve(`./src/client`),
            }),
        // https://github.com/babel/babel/issues/8361
        new FilterWarningsPlugin({
            exclude: /export '[^']+' (\(reexported as '[^']+'\) )?was not found in '[^']+'/,
        }),
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
        completeConfig.root.env === config.ENV.DEV && 'webpack-hot-middleware/client?reload=true',
        './src/client/client.ts',
    ].filter(Boolean),
    module: {
        rules: commonFileLoaders(true),
    },
    output: {
        filename: completeConfig.root.clientBundleName,
        path: path.resolve(__dirname, 'dist', completeConfig.root.staticDirectoryName),
    },
};

const serverConfig = {
    name: 'server',
    target: 'node',
    entry: './src/client/server.ts',
    module: {
        rules: commonFileLoaders(false),
    },
    output: {
        filename: completeConfig.root.serverBundleName,
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    },
};

module.exports = [merge(clientConfig, commonConfig), merge(serverConfig, commonConfig)];
