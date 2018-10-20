import { ApolloLink } from 'apollo-link';
import { Request, Response } from 'express';
import { filter, uniq } from 'lodash';
import fetch from 'node-fetch';
import * as React from 'react';
import { getDataFromTree } from 'react-apollo';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import * as url from 'url';
import { IsomorphicApp } from './modules/common/components/IsomorphicApp';
import { IsomorphicApolloClient } from './modules/common/lib/IsomorphicApolloClient';
import { IsomorphicStore } from './modules/common/lib/IsomorphicStore';
import { browserConfig, Html, webManifest } from './modules/common/lib/server-templates';

/** Incomplete */
interface WebpackHotServerMiddlewareStats {
    clientStats: {
        publicPath: string | null;
        chunks: {
            files: string[];
            modules: {
                id: number;
                name: string;
                reasons: {
                    userRequest: string;
                }[];
            }[];
        }[];
    };
}

interface FrontendServerStats {
    reactLoadableStats: ReactLoadableStats;
}

interface RouterContext {
    url?: string;
}

export default function serverRenderer(
    stats: WebpackHotServerMiddlewareStats | FrontendServerStats,
    link?: ApolloLink,
) {
    return (req: Request, res: Response) => {
        if (req.path === WEB_MANIFEST_PATH) {
            sendWebManifest(res);
        } else if (req.path === BROWSER_CONFIG_PATH) {
            sendBrowserConfig(res);
        } else {
            sendHtmlOrRedirect(req, res, getReactLoadableStats(stats), link);
        }
    };
}

function sendHtmlOrRedirect(req: Request, res: Response, reactLoadableStats: ReactLoadableStats, link?: ApolloLink) {
    const client = IsomorphicApolloClient.getClient({ fetch, link });
    const store = IsomorphicStore.getStore();
    const context: RouterContext = {};
    const sheet = new ServerStyleSheet();
    const modules: string[] = [];

    const App = React.createElement(IsomorphicApp, { client, store, modules, context, location: req.url });

    getDataFromTree(App)
        .then(() => {
            const content = renderToString(sheet.collectStyles(App));

            if (context.url) {
                sendRedirect(res, context);
            } else {
                const html = React.createElement(Html, {
                    content,
                    helmet: Helmet.renderStatic(),
                    styleTags: sheet.getStyleTags(),
                    spriteContent: sprite.stringify(),
                    apolloState: client.extract(),
                    reduxState: store.getState(),
                    bundles: getNormalizedBundles(reactLoadableStats, modules),
                });

                sendHtml(res, html);
            }
        })
        .catch((error: Error) => {
            const html = React.createElement(Html, {
                ssrError: error,
            });

            sendHtml(res, html);
        });
}

function sendHtml(res: Response, html: React.ReactElement<{}>) {
    res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
}

function sendWebManifest(res: Response) {
    res.status(200)
        .header('Content-Type', 'application/manifest+json')
        .send(JSON.stringify(webManifest));
}

function sendBrowserConfig(res: Response) {
    res.status(200)
        .header('Content-Type', 'application/xml')
        .send(browserConfig);
}

function sendRedirect(res: Response, context: RouterContext) {
    res.status(301)
        .header('Location', context.url)
        .send();
}

function getNormalizedBundles(reactLoadableStats: ReactLoadableStats, modules: string[]): ReactLoadableBundle[] {
    return filter(
        getBundles(reactLoadableStats, uniq(modules)),
        bundle => !bundle.file.includes('.js.map'),
    ) as ReactLoadableBundle[]; // Official type definition error
}

function getReactLoadableStats(stats: WebpackHotServerMiddlewareStats | FrontendServerStats): ReactLoadableStats {
    let reactLoadableStats: ReactLoadableStats;
    if (!isWebpackHotServerMiddlewareStats(stats)) {
        reactLoadableStats = stats.reactLoadableStats;
    } else {
        reactLoadableStats = convertWebpackHotServerMiddlewareStatsToReactLoadableStats(stats);
    }

    return reactLoadableStats;
}

function isWebpackHotServerMiddlewareStats(
    stats: WebpackHotServerMiddlewareStats | FrontendServerStats,
): stats is WebpackHotServerMiddlewareStats {
    return (stats as WebpackHotServerMiddlewareStats).clientStats !== undefined;
}

function convertWebpackHotServerMiddlewareStatsToReactLoadableStats(
    stats: WebpackHotServerMiddlewareStats,
): ReactLoadableStats {
    const manifest: ReactLoadableStats = {};

    if (stats.clientStats.publicPath) {
        stats.clientStats.chunks.forEach(chunk => {
            chunk.files.forEach(file => {
                chunk.modules.forEach(module => {
                    const request = module.reasons[0].userRequest;
                    if (!manifest[request]) {
                        manifest[request] = [];
                    }

                    manifest[request].push({
                        file,
                        id: module.id,
                        name: module.name,
                        publicPath: url.resolve(stats.clientStats.publicPath!, file),
                    });
                });
            });
        });

        return manifest;
    }

    throw new Error('publicPath is required (specify in webpack.config.js)');
}
