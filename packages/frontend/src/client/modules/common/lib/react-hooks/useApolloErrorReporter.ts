import { ApolloError } from 'apollo-client';
import * as React from 'react';
import { onMessageAdd } from '../../store/actions';
import { IsomorphicStore } from '../IsomorphicStore';

interface Options {
    disabled?: boolean;
    ignore?: string[]; // TODO: ServerError enum
}

/** Report non-network errors via Notificator (network errors are handled automatically) */
export function useApolloErrorReporter(result: { error?: ApolloError; loading: boolean }, opt: Options = {}) {
    const disabled = Boolean(opt.disabled);
    const ignore = opt.ignore || [];

    const [wasShownFromLastLoading, setWasShownFromLastLoading] = React.useState(false);

    React.useEffect(
        () => {
            if (
                !disabled &&
                !wasShownFromLastLoading &&
                result.error &&
                !result.error.networkError &&
                !includesOnly(result.error, ignore)
            ) {
                IsomorphicStore.getStore().dispatch(onMessageAdd(result.error));
                setWasShownFromLastLoading(true);
            }

            if (result.loading) {
                setWasShownFromLastLoading(false);
            }
        },
        [result, wasShownFromLastLoading, opt, disabled, ignore],
    );
}

export function includesOnly(apolloError: ApolloError, codeList: string[] /* TODO: ServerError enum */) {
    if (!apolloError.networkError) {
        return apolloError.graphQLErrors.every(graphqlError => codeList.includes(graphqlError.message));
    }

    return false;
}
