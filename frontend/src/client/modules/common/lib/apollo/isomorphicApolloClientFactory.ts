import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

/**
 * The idea is to replace either fetch (in case we need network to fetch on backend) or the whole link
 * {@link https://www.apollographql.com/docs/react/features/server-side-rendering.html#local-queries}
 */
export function isomorphicApolloClientFactory({
    ssrMode,
    link,
    fetch,
}: {
    ssrMode: boolean;
    link?: ApolloLink;
    fetch?: GlobalFetch['fetch'];
}) {
    if (!ssrMode || link || fetch) {
        return new ApolloClient({
            ssrMode,
            link: link
                ? link
                : createHttpLink({
                      fetch,
                      uri: GRAPHQL_ENDPOINT,
                      headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
                  }),
            cache: ssrMode ? new InMemoryCache() : new InMemoryCache().restore(APOLLO_STATE),
            defaultOptions: {
                watchQuery: {
                    errorPolicy: 'all',
                    notifyOnNetworkStatusChange: true,
                },
                query: {
                    errorPolicy: 'all',
                },
                mutate: {
                    errorPolicy: 'all',
                },
            },
        });
    }

    throw new Error('In SSR mode either link or fetch is required');
}
