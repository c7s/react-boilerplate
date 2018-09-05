import * as React from 'react';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { renderToStaticMarkup } from 'react-dom/server';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { App } from './App';

export default function serverRenderer() {
    return (req: any, res: any) => {
        const client = new ApolloClient({
            ssrMode: true,
            link: createHttpLink({
                fetch: fetch as any /* node-fetch is the only option either way */,
                uri: GRAPHQL_ENDPOINT,
                headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
            }),
            cache: new InMemoryCache(),
        });

        const AppWithProvider = (
            <ApolloProvider client={client}>
                <App name={'Name2'} />
            </ApolloProvider>
        );

        renderToStringWithData(AppWithProvider)
            .then(content => {
                const initialState = client.extract();
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
                        __html: `window.APOLLO_STATE=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
                    }}
                />
                <script src="/client.bundle.js" />
            </body>
        </html>
    );
};
