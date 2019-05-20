import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { ErrorResponse, onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { onMessageAdd } from '../../store/actions';
import { IsomorphicStore } from '../IsomorphicStore';

/**
 * The idea is to replace either fetch (in case we need network to fetch on backend) or the whole link
 * {@link https://www.apollographql.com/docs/react/features/server-side-rendering.html#local-queries}
 */
interface ClientConfig {
    link?: ApolloLink;
    fetch?: GlobalFetch['fetch'];
    context?: Context;
}

interface Context {
    statusCode?: number;
}

class IsomorphicApolloClient {
    private static client: ApolloClient<NormalizedCacheObject> | null;

    private static context: Context | null;

    public static getClient(clientConfig?: ClientConfig): ApolloClient<NormalizedCacheObject> {
        const { link, fetch, context } = clientConfig || { link: undefined, fetch: undefined, context: undefined };

        if (context) {
            IsomorphicApolloClient.context = context;
        }

        if (!SSR_MODE || link || fetch) {
            if (SSR_MODE) {
                return IsomorphicApolloClient.createClient({ link, fetch });
            }

            if (IsomorphicApolloClient.client) {
                return IsomorphicApolloClient.client;
            }

            // eslint-disable-next-line no-return-assign
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
                 *
                 * In case you want to remove errorPolicy: all, bear in mind that this will break SSR in case of any
                 * graphql or network error
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
        return (
            link ||
            split(
                operation => operation.getContext().debatch,
                new HttpLink({
                    fetch,
                    uri: global.GRAPHQL_ENDPOINT,
                }),
                new BatchHttpLink({
                    fetch,
                    uri: global.GRAPHQL_ENDPOINT,
                }),
            )
        );
    }

    private static onError(error: ErrorResponse) {
        if (error.networkError) {
            IsomorphicStore.getStore().dispatch(onMessageAdd(error));
        }

        if (IsomorphicApolloClient.context) {
            IsomorphicApolloClient.context.statusCode =
                (error.networkError && (error.networkError as any).statusCode) || 500;
        }
    }
}

export { IsomorphicApolloClient, ClientConfig };
