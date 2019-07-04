import { ApolloError } from 'apollo-client';
import { useAppDispatch } from '../../components/AppStateProvider';
import { ServerError } from '../../graphql/ApolloTypes/globalTypes';
import { usePrevious } from './usePrevious';

interface Options {
    disabled?: boolean;
    ignore?: ServerError[];
}

/** Report apollo errors via Notificator */
export function useApolloErrorProcessor(result: { error?: ApolloError; loading: boolean }, opt: Options = {}) {
    const disabled = Boolean(opt.disabled);
    const ignore = opt.ignore || [];

    const appDispatch = useAppDispatch();
    const prevLoading = usePrevious(result.loading);

    if (
        !disabled &&
        (prevLoading !== false && !result.loading) &&
        result.error &&
        !includesOnly(result.error, ignore)
    ) {
        appDispatch({ type: 'MESSAGE/ADD', value: result.error });
    }
}

export function includesOnly(apolloError: ApolloError, codeList: ServerError[]) {
    if (!apolloError.networkError) {
        return apolloError.graphQLErrors.every(graphqlError => codeList.includes((graphqlError.extensions || {}).code));
    }

    return false;
}
