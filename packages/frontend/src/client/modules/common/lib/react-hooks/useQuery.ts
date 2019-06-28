import { OperationVariables, QueryResult } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import * as React from 'react';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { Options, useApolloErrorReporter } from './useApolloErrorReporter';

function useAppQuery<TData, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: QueryHookOptions<Partial<TData>, TVariables> & { reporterOptions?: Options },
): QueryResult<Partial<TData>, TVariables> & { data: Partial<TData> } {
    const queryResultOriginal = useQuery(query, options);

    const queryResult = React.useMemo(() => ({ ...queryResultOriginal, data: queryResultOriginal.data || {} }), [
        queryResultOriginal,
    ]);

    useApolloErrorReporter(queryResult, options && options.reporterOptions);

    return queryResult;
}

export { useAppQuery };
