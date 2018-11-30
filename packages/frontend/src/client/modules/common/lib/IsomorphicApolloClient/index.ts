import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { onMessageAdd } from '../../store/actions';
import { IsomorphicStore } from '../IsomorphicStore';

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

    private static createClient(config: ClientConfig) {
        return new ApolloClient({
            link: onError(IsomorphicApolloClient.onError).concat(IsomorphicApolloClient.createLink(config)),
            cache:
                !SSR_MODE && global.APOLLO_STATE
                    ? new InMemoryCache().restore(global.APOLLO_STATE)
                    : new InMemoryCache(),
            defaultOptions: {
                /**
                 * In case you want to set errorPolicy: all for mutations, see:
                 * https://github.com/c7s/react-boilerplate/issues/62
                 */
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'all',
                    notifyOnNetworkStatusChange: true,
                },
                query: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'all',
                },
            },
        });
    }

    private static createLink({ link, fetch }: ClientConfig): ApolloLink {
        return link
            ? link
            : createHttpLink({
                  fetch,
                  uri: global.GRAPHQL_ENDPOINT,
                  headers: { Authorization: `bearer ${global.GITHUB_TOKEN}` },
              });
    }

    private static onError(error: ErrorResponse) {
        if (error.networkError) {
            IsomorphicStore.getStore().dispatch(onMessageAdd(error));
        }
    }
}

export { IsomorphicApolloClient, ClientConfig };
