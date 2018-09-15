import { ApolloLink } from 'apollo-link';
import fetch from 'node-fetch';
import * as React from 'react';
import { getDataFromTree } from 'react-apollo';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';
import { browserConfig, Html, webManifest } from './server-templates';

export default function serverRenderer(stats?: { link?: ApolloLink }) {
    return (req: any, res: any) => {
        if (req.path === WEB_MANIFEST_PATH) {
            res.status(200)
                .header('Content-Type', 'application/manifest+json')
                .send(JSON.stringify(webManifest));
        } else if (req.path === BROWSER_CONFIG_PATH) {
            res.status(200)
                .header('Content-Type', 'application/xml')
                .send(browserConfig);
        } else {
            const backendApolloClient =
                stats && stats.link
                    ? IsomorphicApolloClient.getClient({ ssrMode: true, link: stats.link })
                    : IsomorphicApolloClient.getClient({ ssrMode: true, fetch: fetch as any });
            const backendStore = IsomorphicStore.getStore({ ssrMode: true });
            const context: { url?: string } = {};
            const sheet = new ServerStyleSheet();

            const App = React.createElement(IsomorphicApp, {
                context,
                ssrMode: true,
                client: backendApolloClient,
                store: backendStore,
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
                        const apolloState = backendApolloClient.extract();
                        const reduxState = backendStore.getState();
                        const html = React.createElement(Html, {
                            helmet,
                            styleTags,
                            spriteContent,
                            content,
                            apolloState,
                            reduxState,
                        });

                        res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
                    }
                })
                .catch(error => {
                    res.status(500).send(error);
                });
        }
    };
}
