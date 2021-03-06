const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const getWebpackConfig = require('../../webpack.config');
const { config } = require('../../config/dev-server');

const webpackConfig = getWebpackConfig({ build: config.isBuild });

const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(path.resolve(__dirname, '..', 'client', 'public')));

app.use(
    webpackDevMiddleware(compiler, {
        serverSideRender: true,
        stats: webpackConfig[0].stats,
    })
);
app.use(webpackHotMiddleware(compiler.compilers.find(compilerInner => compilerInner.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(config.port);

// eslint-disable-next-line no-console
console.log(`Dev server is up at http://localhost:${config.port}`);
