import { OperationVariables } from 'apollo-client';
import { DocumentNode } from 'graphql';
// eslint-disable-next-line no-restricted-imports
import { MutationHookOptions, MutationTuple, useMutation as useMutationOriginal } from 'react-apollo';
import { Options, useApolloErrorProcessor } from './useApolloErrorProcessor';

function useMutation<TData, TVariables = OperationVariables>(
    mutation: DocumentNode,
    options?: MutationHookOptions<Partial<TData>, TVariables> & { context?: { debatch?: boolean } } & {
        processorOptions?: Options;
    },
): MutationTuple<Partial<TData>, TVariables> {
    const mutationTuple = useMutationOriginal(mutation, options);

    useApolloErrorProcessor(mutationTuple[1], options && options.processorOptions);

    return mutationTuple;
}

export { useMutation };
