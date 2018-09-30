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
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';
import { browserConfig, Html, webManifest } from './server-templates';

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
    link?: ApolloLink;
}

export default function serverRenderer(stats: WebpackHotServerMiddlewareStats | FrontendServerStats) {
    let reactLoadableStats: ReactLoadableStats;
    if (!isWebpackHotServerMiddlewareStats(stats)) {
        reactLoadableStats = stats.reactLoadableStats;
    } else {
        reactLoadableStats = convertWebpackHotServerMiddlewareStatsToReactLoadableStats(stats);
    }

    return (req: Request, res: Response) => {
        if (req.path === WEB_MANIFEST_PATH) {
            res.status(200)
                .header('Content-Type', 'application/manifest+json')
                .send(JSON.stringify(webManifest));
        } else if (req.path === BROWSER_CONFIG_PATH) {
            res.status(200)
                .header('Content-Type', 'application/xml')
                .send(browserConfig);
        } else {
            const client = !isWebpackHotServerMiddlewareStats(stats)
                ? IsomorphicApolloClient.getClient({ fetch, link: stats.link })
                : IsomorphicApolloClient.getClient({ fetch });
            const store = IsomorphicStore.getStore();
            const context: { url?: string } = {};
            const sheet = new ServerStyleSheet();
            const modules: string[] = [];

            const App = React.createElement(IsomorphicApp, {
                client,
                store,
                modules,
                context,
                location: req.url,
            });

            getDataFromTree(App)
                .then(() => {
                    const content = renderToString(sheet.collectStyles(App));

                    if (context.url) {
                        res.status(301)
                            .header('Location', context.url)
                            .send();
                    } else {
                        const helmet = Helmet.renderStatic();
                        const styleTags = sheet.getStyleTags();
                        const spriteContent = sprite.stringify();
                        const apolloState = client.extract();
                        const reduxState = store.getState();
                        const bundles = getNormalizedBundles(reactLoadableStats, modules);
                        const html = React.createElement(Html, {
                            helmet,
                            styleTags,
                            spriteContent,
                            content,
                            apolloState,
                            reduxState,
                            bundles,
                        });

                        res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
                    }
                })
                .catch((error: Error) => {
                    const html = React.createElement(Html, {
                        ssrError: error,
                    });

                    res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
                });
        }
    };
}

function getNormalizedBundles(reactLoadableStats: ReactLoadableStats, modules: string[]): ReactLoadableBundle[] {
    return filter(
        getBundles(reactLoadableStats, uniq(modules)),
        bundle => !bundle.file.includes('.js.map'),
    ) as ReactLoadableBundle[]; // Official type definition error
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
                    const id = module.id;
                    const name = module.name;
                    const publicPath = url.resolve(stats.clientStats.publicPath!, file);
                    const request = module.reasons[0].userRequest;

                    if (!manifest[request]) {
                        manifest[request] = [];
                    }

                    manifest[request].push({ id, name, file, publicPath });
                });
            });
        });

        return manifest;
    }

    throw new Error('publicPath is required (specify in webpack.config.js)');
}
