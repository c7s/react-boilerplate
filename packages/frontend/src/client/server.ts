import { ApolloLink } from 'apollo-link';
import { Request, Response } from 'express';
import { filter, flatten, uniq, uniqBy } from 'lodash';
import fetch from 'node-fetch';
import * as React from 'react';
import { getDataFromTree } from 'react-apollo';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import './isomorphic-globals-init';
import { IsomorphicApp } from './modules/common/components/IsomorphicApp';
import { IsomorphicApolloClient } from './modules/common/lib/IsomorphicApolloClient';
import { IsomorphicStore } from './modules/common/lib/IsomorphicStore';
import { browserConfig, Html, HtmlProps, robots, webManifest } from './modules/common/lib/server-templates';

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

type ReactLoadableStats = FirstArgument<typeof getBundles>;

interface FrontendServerStats {
    reactLoadableStats: ReactLoadableStats;
}

interface RouterContext {
    url?: string;
    statusCode?: number;
}

// eslint-disable-next-line import/no-default-export
export default function serverRenderer(
    stats: WebpackHotServerMiddlewareStats | FrontendServerStats,
    link?: ApolloLink,
) {
    return (req: Request, res: Response) => {
        if (req.path === WEB_MANIFEST_PATH) {
            sendWebManifest(res);
        } else if (req.path === BROWSER_CONFIG_PATH) {
            sendBrowserConfig(res);
        } else if (req.path === ROBOTS_PATH) {
            sendRobots(res);
        } else {
            sendHtmlOrRedirect(req, res, getReactLoadableStats(stats), link);
        }
    };
}

async function sendHtmlOrRedirect(
    req: Request,
    res: Response,
    reactLoadableStats: ReactLoadableStats,
    link?: ApolloLink,
) {
    const context: RouterContext = {};
    const client = IsomorphicApolloClient.getClient({ fetch, link, context });
    const store = IsomorphicStore.getStore();
    const sheet = new ServerStyleSheet();
    const modules: string[] = [];

    const App = React.createElement(IsomorphicApp, { client, store, modules, context, location: req.url });

    try {
        // eslint-disable-next-line no-underscore-dangle
        if (req.query.__FAIL_SSR__ === undefined) {
            await Loadable.preloadAll();
            await getDataFromTree(App);

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
                    bundles: getUsedBundles(reactLoadableStats, modules),
                });

                sendHtml(res, html, context.statusCode);
            }
        } else {
            throw new Error('SSR was disabled by query parameter');
        }
    } catch (error) {
        const html = React.createElement(Html, {
            ssrError: error,
            bundles: getAllBundles(reactLoadableStats),
        });

        sendHtml(res, html, context.statusCode, true);
    }
}

function sendHtml(res: Response, html: React.ReactElement<HtmlProps>, appStatus?: number, isSsrError?: boolean) {
    let statusCode = appStatus;

    if (statusCode === undefined) {
        // No status provided by app, using fallback error or success
        statusCode = isSsrError ? 500 : 200;
    } else if (statusCode === 0 || (statusCode === 200 && isSsrError)) {
        // Sending HTML with status 0 makes no sense, using fallback error
        // Sending HTML with status 200 after SSR error makes no sense, using fallback error
        statusCode = 500;
    }

    res.status(statusCode).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
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

function sendRobots(res: Response) {
    res.status(200)
        .header('Content-Type', 'text/plain')
        .send(robots);
}

function sendRedirect(res: Response, context: RouterContext) {
    res.status(context.statusCode || 301)
        .header('Location', context.url)
        .send();
}

function getUsedBundles(reactLoadableStats: ReactLoadableStats, modules: string[]) {
    return stripSourceMaps(
        stripHotUpdateBundles([
            ...getBundles(reactLoadableStats, uniq(modules)),
            ...stripReactLoadableBundles(getDirtyBundles(reactLoadableStats)),
        ]),
    );
}

function getAllBundles(reactLoadableStats: ReactLoadableStats) {
    return stripSourceMaps(stripHotUpdateBundles(getDirtyBundles(reactLoadableStats)));
}

/**
 * Returns unique array of all bundles.
 * Includes all possible bundles:
 *     * regular bundles like 'main' and 'vendors'
 *     * source maps
 *     * react-loadable
 *     * HMR results
 */
function getDirtyBundles(reactLoadableStats: ReactLoadableStats) {
    return uniqBy(flatten(Object.values(reactLoadableStats)), bundle => bundle.file);
}

function stripReactLoadableBundles(bundles: ReturnType<typeof getBundles>) {
    return filter(bundles, bundle => !/^\d+\./.test(bundle.file));
}

function stripHotUpdateBundles(bundles: ReturnType<typeof getBundles>) {
    return filter(bundles, bundle => !bundle.file.includes('.hot-update.js'));
}

function stripSourceMaps(bundles: ReturnType<typeof getBundles>) {
    return filter(bundles, bundle => !bundle.file.includes('.js.map'));
}

function getReactLoadableStats(stats: WebpackHotServerMiddlewareStats | FrontendServerStats): ReactLoadableStats {
    let reactLoadableStats: ReactLoadableStats;
    if (!isWebpackHotServerMiddlewareStats(stats)) {
        ({ reactLoadableStats } = stats);
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
                    publicPath: `${global.PUBLIC_PATH}${file}`,
                });
            });
        });
    });

    return manifest;
}
