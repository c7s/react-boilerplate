import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

/**
 * The idea is to replace either fetch (in case we need network to fetch on backend) or the whole link
 * {@link https://www.apollographql.com/docs/react/features/server-side-rendering.html#local-queries}
 */
interface ClientConfig {
    ssrMode: boolean;
    link?: ApolloLink;
    fetch?: GlobalFetch['fetch'];
}

class IsomorphicApolloClient {
    private static client: ApolloClient<NormalizedCacheObject> | null;

    public static getClient({ ssrMode, link, fetch }: ClientConfig): ApolloClient<NormalizedCacheObject> {
        if (!ssrMode || link || fetch) {
            if (ssrMode) {
                return IsomorphicApolloClient.createClient({ ssrMode, link, fetch });
            }

            if (IsomorphicApolloClient.client) {
                return IsomorphicApolloClient.client;
            }

            return (IsomorphicApolloClient.client = IsomorphicApolloClient.createClient({ ssrMode, link, fetch }));
        }

        throw new Error('In SSR mode either link or fetch is required');
    }

    private static createClient({ ssrMode, link, fetch }: ClientConfig) {
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
}

export { IsomorphicApolloClient, ClientConfig };
