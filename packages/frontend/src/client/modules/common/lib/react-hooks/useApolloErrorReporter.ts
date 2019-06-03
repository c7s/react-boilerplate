import { ApolloError } from 'apollo-client';
import * as React from 'react';
import { useAppDispatch } from '../../components/AppStateProvider';
import { ServerError } from '../../graphql/ApolloTypes/globalTypes';

interface Options {
    disabled?: boolean;
    ignore?: ServerError[];
}

/** Report apollo errors via Notificator */
export function useApolloErrorReporter(result: { error?: ApolloError; loading: boolean }, opt: Options = {}) {
    const disabled = Boolean(opt.disabled);
    const ignore = opt.ignore || [];

    const prevLoadingRef = React.useRef<undefined | boolean>();

    const appDispatch = useAppDispatch();

    React.useEffect(() => {
        if (
            !disabled &&
            (Boolean(prevLoadingRef.current) && !result.loading) &&
            result.error &&
            !includesOnly(result.error, ignore)
        ) {
            appDispatch({ type: 'MESSAGE/ADD', value: result.error });
        }
    }, [appDispatch, disabled, ignore, result.error, result.loading]);

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
