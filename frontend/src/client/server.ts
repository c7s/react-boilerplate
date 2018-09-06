import * as React from 'react';
import { getDataFromTree } from 'react-apollo';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import fetch from 'node-fetch';
import { ServerStyleSheet } from 'styled-components';
import { IsomorphicApp } from './IsomorphicApp';
import { Html } from './Html';
import { isomorphicApolloClientFactory } from './modules/common/lib/apollo';

export default function serverRenderer() {
    return (req: any, res: any) => {
        const backendApolloClient = isomorphicApolloClientFactory({ ssrMode: true, fetch: fetch as any });
        const context: { url?: string } = {};
        const sheet = new ServerStyleSheet();

        const App = React.createElement(IsomorphicApp, {
            context,
            ssrMode: true,
            client: backendApolloClient,
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
                    const styleTags = sheet.getStyleTags();
                    const state = backendApolloClient.extract();
                    const html = React.createElement(Html, { styleTags, content, state });

                    res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
                }
            })
            .catch(error => {
                res.status(500).send(error);
            });
    };
}
