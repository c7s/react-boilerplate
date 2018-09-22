import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

/**
 * The idea is to replace either fetch (in case we need network to fetch on backend) or the whole link
 * {@link https://www.apollographql.com/docs/react/features/server-side-rendering.html#local-queries}
 */
interface ClientConfig {
    link?: ApolloLink;
    fetch?: GlobalFetch['fetch'];
}

class IsomorphicApolloClient {
    private static client: ApolloClient<NormalizedCacheObject> | null;

    public static getClient(clientConfig?: ClientConfig): ApolloClient<NormalizedCacheObject> {
        const { link, fetch } = clientConfig || { link: undefined, fetch: undefined };

        if (!SSR_MODE || link || fetch) {
            if (SSR_MODE) {
                return IsomorphicApolloClient.createClient({ link, fetch });
            }

            if (IsomorphicApolloClient.client) {
                return IsomorphicApolloClient.client;
            }

            return (IsomorphicApolloClient.client = IsomorphicApolloClient.createClient({ link, fetch }));
        }

        throw new Error('In SSR mode either link or fetch is required');
    }

    private static createClient({ link, fetch }: ClientConfig) {
        return new ApolloClient({
            link: link
                ? link
                : createHttpLink({
                      fetch,
                      uri: GRAPHQL_ENDPOINT,
                      headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
                  }),
            cache: SSR_MODE ? new InMemoryCache() : new InMemoryCache().restore(APOLLO_STATE),
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
