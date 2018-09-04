const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('../../webpack.config');

const app = express();

const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        serverSideRender: true,
        noInfo: true,
    })
);
app.use(webpackHotMiddleware(compiler.compilers.find(compilerInner => compilerInner.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(6060);
