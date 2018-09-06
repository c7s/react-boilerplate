import * as React from 'react';
import { renderToStringWithData } from 'react-apollo';
import { renderToStaticMarkup } from 'react-dom/server';
import fetch from 'node-fetch';
import { IsomorphicApp } from './IsomorphicApp';
import { Html } from './Html';
import { isomorphicApolloClientFactory } from './modules/common/lib/apollo';

export default function serverRenderer() {
    return (req: any, res: any) => {
        const backendApolloClient = isomorphicApolloClientFactory({ ssrMode: true, fetch: fetch as any });

        const context = {};

        renderToStringWithData(
            React.createElement(IsomorphicApp, {
                context,
                ssrMode: true,
                client: backendApolloClient,
                location: req.url,
            }),
        )
            .then(content => {
                const state = backendApolloClient.extract();
                const html = React.createElement(Html, { content, state });

                res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    };
}
