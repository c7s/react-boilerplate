import * as React from 'react';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { renderToStaticMarkup } from 'react-dom/server';
import fetch from 'node-fetch';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { isomorphicApolloClientFactory } from './modules/common/lib/apollo';

export default function serverRenderer() {
    return (req: any, res: any) => {
        const backendApolloClient = isomorphicApolloClientFactory({ ssrMode: true, fetch: fetch as any });

        const context = {};

        const AppWithProviders = (
            <ApolloProvider client={backendApolloClient}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </ApolloProvider>
        );

        renderToStringWithData(AppWithProviders)
            .then(content => {
                const initialState = backendApolloClient.extract();
                const html = <Html content={content} state={initialState} />;

                res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    };
}

const Html = ({ content, state }: { content: string; state: object }) => {
    return (
        <html>
            <head>
                <title>App</title>
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.APOLLO_STATE=${JSON.stringify(state)};`,
                    }}
                />
                <script src="/client.bundle.js" />
            </body>
        </html>
    );
};
