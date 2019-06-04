import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';
import * as React from 'react';
import { renderHook } from 'react-hooks-testing-library';
import { AppDispatchContext } from '../../../components/AppStateProvider/AppStateProvider';
import { ServerError } from '../../../graphql/ApolloTypes/globalTypes';
import { useApolloErrorReporter } from '../useApolloErrorReporter';

enum ServerErrorMock {
    KNOWN_ERROR = 'KNOWN_ERROR',
    ANOTHER_ERROR = 'ANOTHER_ERROR',
}

const NETWORK_ERROR = new ApolloError({ networkError: new Error('Network error') });

const GRAPHQL_KNOWN_ERROR = new ApolloError({
    graphQLErrors: [
        new GraphQLError('Known error', undefined, undefined, undefined, undefined, undefined, {
            code: ServerErrorMock.KNOWN_ERROR,
        }),
    ],
});

const GRAPHQL_UNKNOWN_ERROR = new ApolloError({
    graphQLErrors: [new GraphQLError('Unknown error')],
});

const GRAPHQL_KNOWN_GROUP_ERROR = new ApolloError({
    graphQLErrors: [
        new GraphQLError('Known error', undefined, undefined, undefined, undefined, undefined, {
            code: ServerErrorMock.KNOWN_ERROR,
        }),
        new GraphQLError('Known error', undefined, undefined, undefined, undefined, undefined, {
            code: ServerErrorMock.ANOTHER_ERROR,
        }),
    ],
});

const GRAPHQL_KNOWN_AND_UNKNOWN_GROUP_ERROR = new ApolloError({
    graphQLErrors: [
        new GraphQLError('Known error', undefined, undefined, undefined, undefined, undefined, {
            code: ServerErrorMock.KNOWN_ERROR,
        }),
        new GraphQLError('Known error', undefined, undefined, undefined, undefined, undefined, {
            code: ServerErrorMock.ANOTHER_ERROR,
        }),
        new GraphQLError('Unknown error'),
    ],
});

it("doesn't dispatch on success", async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(() => useApolloErrorReporter({ loading: false }), { wrapper });

    expect(dispatchMock).not.toBeCalled();
});

it('dispatches on network error', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(() => useApolloErrorReporter({ loading: false, error: NETWORK_ERROR }), { wrapper });

    expect(dispatchMock).toBeCalled();
});

it('dispatches on known graphql error', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(() => useApolloErrorReporter({ loading: false, error: GRAPHQL_KNOWN_ERROR }), { wrapper });

    expect(dispatchMock).toBeCalled();
});

it('dispatches on unknown graphql error', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(() => useApolloErrorReporter({ loading: false, error: GRAPHQL_UNKNOWN_ERROR }), { wrapper });

    expect(dispatchMock).toBeCalled();
});

it("doesn't dispatch if all errors are ignored", async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(
        () =>
            useApolloErrorReporter(
                { loading: false, error: GRAPHQL_KNOWN_GROUP_ERROR },
                { ignore: ([ServerErrorMock.KNOWN_ERROR, ServerErrorMock.ANOTHER_ERROR] as unknown) as ServerError[] },
            ),
        { wrapper },
    );

    expect(dispatchMock).not.toBeCalled();
});

it('dispatches if not all errors are ignored', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(
        () =>
            useApolloErrorReporter(
                { loading: false, error: GRAPHQL_KNOWN_GROUP_ERROR },
                { ignore: ([ServerErrorMock.KNOWN_ERROR] as unknown) as ServerError[] },
            ),
        { wrapper },
    );

    expect(dispatchMock).toBeCalled();
});

it('dispatches on unknown error in any case', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(
        () =>
            useApolloErrorReporter(
                { loading: false, error: GRAPHQL_KNOWN_AND_UNKNOWN_GROUP_ERROR },
                { ignore: ([ServerErrorMock.KNOWN_ERROR, ServerErrorMock.ANOTHER_ERROR] as unknown) as ServerError[] },
            ),
        { wrapper },
    );

    expect(dispatchMock).toBeCalled();
});

it('can be disabled', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    renderHook(
        () =>
            useApolloErrorReporter(
                { loading: false, error: GRAPHQL_KNOWN_AND_UNKNOWN_GROUP_ERROR },
                { disabled: true },
            ),
        { wrapper },
    );

    expect(dispatchMock).not.toBeCalled();
});

it('behaves correctly on rerenders', async () => {
    const dispatchMock = jest.fn(() => {});

    const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <AppDispatchContext.Provider value={dispatchMock}>{children}</AppDispatchContext.Provider>
    );

    const { rerender } = renderHook(({ result }) => useApolloErrorReporter(result), {
        wrapper,
        initialProps: {
            result: { loading: true, error: new ApolloError({ networkError: new Error('Network error') }) },
        },
    });

    rerender({ result: { loading: true, error: new ApolloError({ networkError: new Error('Network error') }) } });

    // First call
    rerender({ result: { loading: false, error: new ApolloError({ networkError: new Error('Network error') }) } });
    rerender({ result: { loading: false, error: new ApolloError({ networkError: new Error('Network error') }) } });
    rerender({ result: { loading: true, error: new ApolloError({ networkError: new Error('Network error') }) } });

    // Second call
    rerender({ result: { loading: false, error: new ApolloError({ networkError: new Error('Network error') }) } });

    expect(dispatchMock).toHaveBeenCalledTimes(2);
});
