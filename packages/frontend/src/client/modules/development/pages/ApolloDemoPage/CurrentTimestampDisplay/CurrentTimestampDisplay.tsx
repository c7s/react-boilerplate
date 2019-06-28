import * as React from 'react';
import styled from 'styled-components';
import { Button, ButtonThemeMode } from '../../../../common/components/Button';
import { ServerError } from '../../../../common/graphql/ApolloTypes/globalTypes';
import { castError } from '../../../../common/lib/castError';
import { includesOnly } from '../../../../common/lib/react-hooks/useApolloErrorReporter';
import { useAppQuery } from '../../../../common/lib/react-hooks/useQuery';
import { CommonProps } from '../../../../common/types/CommonProps';
import { CurrentTimestamp, CurrentTimestampVariables } from './ApolloTypes/CurrentTimestamp';
import { CURRENT_TIMESTAMP_QUERY } from './Graphql';

interface Props extends CommonProps {}

const KNOWN_ERROR_LIST = [ServerError.TEST_ERROR];

const CurrentTimestampDisplay: React.FC<Props> = ({ className }) => {
    const { data, variables, refetch, loading, error } = useAppQuery<CurrentTimestamp, CurrentTimestampVariables>(
        CURRENT_TIMESTAMP_QUERY,
        {
            context: { debatch: true },
            variables: { loadingTime: 1000, returnError: ServerError.TEST_ERROR },
            reporterOptions: { ignore: KNOWN_ERROR_LIST },
        },
    );

    const onRefetchClick = React.useCallback(() => {
        refetch({ ...variables, returnError: undefined });
    }, [refetch, variables]);

    const onRefetchWithErrorClick = React.useCallback(() => {
        refetch({
            ...variables,
            returnError: ServerError.TEST_ERROR,
        });
    }, [refetch, variables]);

    const onRefetchWithUnknownErrorClick = React.useCallback(() => {
        refetch({
            ...variables,
            returnError: ServerError.INTERNAL_SERVER_ERROR,
        });
    }, [refetch, variables]);

    return (
        <Root className={className}>
            <DataDisplay>Data: {data !== undefined ? JSON.stringify(data) : String(data)}</DataDisplay>
            <LoadingDisplay>Loading: {String(loading)}</LoadingDisplay>
            <ErrorDisplay>
                Error: {/* eslint-disable-next-line no-nested-ternary */}
                {error
                    ? includesOnly(error, KNOWN_ERROR_LIST)
                        ? castError(error).userDisplayedMessage
                        : 'Unknown error'
                    : 'No error'}
            </ErrorDisplay>
            <PositionedButton theme={{ mode: ButtonThemeMode.PRIMARY }} onClick={onRefetchClick}>
                Refetch
            </PositionedButton>
            <PositionedButton theme={{ mode: ButtonThemeMode.PRIMARY }} onClick={onRefetchWithErrorClick}>
                Refetch with known error
            </PositionedButton>
            <PositionedButton theme={{ mode: ButtonThemeMode.PRIMARY }} onClick={onRefetchWithUnknownErrorClick}>
                Refetch with unknown error
            </PositionedButton>
        </Root>
    );
};

const Root = styled.div``;

const DataDisplay = styled.div``;

const LoadingDisplay = styled.div``;

const ErrorDisplay = styled.div``;

const PositionedButton = styled(Button)`
    margin-right: 20px;
`;

export { CurrentTimestampDisplay, Props };
