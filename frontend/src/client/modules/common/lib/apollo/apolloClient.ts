import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const authLink: any = setContext((_, { headers }) => {
    return {
        headers: { ...headers, Authorization: `bearer ${GITHUB_TOKEN}` },
    };
});

const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink) as any,
    cache: new InMemoryCache().restore(APOLLO_STATE),
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

export { apolloClient };
