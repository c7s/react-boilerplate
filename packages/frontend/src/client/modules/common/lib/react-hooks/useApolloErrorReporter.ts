import { ApolloError } from 'apollo-client';
import * as React from 'react';
import { ServerError } from '../../graphql/ApolloTypes/globalTypes';
import { onMessageAdd } from '../../store/actions';
import { IsomorphicStore } from '../IsomorphicStore';

interface Options {
    disabled?: boolean;
    ignore?: ServerError[];
}

/** Report non-network errors via Notificator (network errors are handled automatically) */
export function useApolloErrorReporter(result: { error?: ApolloError; loading: boolean }, opt: Options = {}) {
    const disabled = Boolean(opt.disabled);
    const ignore = opt.ignore || [];

    const prevLoadingRef = React.useRef<undefined | boolean>();

    React.useEffect(() => {
        if (
            !disabled &&
            (Boolean(prevLoadingRef.current) && !result.loading) &&
            result.error &&
            !result.error.networkError &&
            !includesOnly(result.error, ignore)
        ) {
            IsomorphicStore.getStore().dispatch(onMessageAdd(result.error));
        }
    }, [disabled, ignore, result.error, result.loading]);

    React.useEffect(() => {
        prevLoadingRef.current = result.loading;
    });
}

export function includesOnly(apolloError: ApolloError, codeList: ServerError[]) {
    if (!apolloError.networkError) {
        return apolloError.graphQLErrors.every(graphqlError => codeList.includes((graphqlError.extensions || {}).code));
    }

    return false;
}
