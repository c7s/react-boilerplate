import { OperationVariables, QueryResult } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import * as React from 'react';
// eslint-disable-next-line no-restricted-imports
import { QueryHookOptions, useQuery as useQueryOriginal } from 'react-apollo';
import { Options, useApolloErrorProcessor } from './useApolloErrorProcessor';

function useQuery<TData, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: QueryHookOptions<Partial<TData>, TVariables> & { context?: { debatch?: boolean } } & {
        processorOptions?: Options;
    },
): QueryResult<Partial<TData>, TVariables> & { data: Partial<TData> } {
    const queryResultOriginal = useQueryOriginal(query, options);

    const queryResult = React.useMemo(() => ({ ...queryResultOriginal, data: queryResultOriginal.data || {} }), [
        queryResultOriginal,
    ]);

    useApolloErrorProcessor(queryResult, options && options.processorOptions);

    return queryResult;
}

export { useQuery };
