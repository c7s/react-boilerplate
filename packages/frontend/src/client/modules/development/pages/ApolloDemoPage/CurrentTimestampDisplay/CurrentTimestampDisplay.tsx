import * as React from 'react';
import { QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { Button, ButtonThemeMode } from '../../../../common/components/Button';
import { ServerError } from '../../../../common/graphql/ApolloTypes/globalTypes';
import { castError } from '../../../../common/lib/castError';
import { includesOnly, useApolloErrorProcessor } from '../../../../common/lib/react-hooks/useApolloErrorProcessor';
import { CommonProps } from '../../../../common/types/CommonProps';
import { CurrentTimestamp, CurrentTimestampVariables } from './ApolloTypes/CurrentTimestamp';

interface Props extends CommonProps {
    currentTimestampQueryResult: QueryResult<Partial<CurrentTimestamp>, CurrentTimestampVariables>;
}

const KNOWN_ERROR_LIST = [ServerError.TEST_ERROR];

const CurrentTimestampDisplay: React.FC<Props> = ({ className, currentTimestampQueryResult }) => {
    useApolloErrorProcessor(currentTimestampQueryResult, { ignore: KNOWN_ERROR_LIST });

    const onRefetchClick = React.useCallback(() => {
        currentTimestampQueryResult.refetch({ ...currentTimestampQueryResult.variables, returnError: undefined });
    }, [currentTimestampQueryResult]);

    const onRefetchWithErrorClick = React.useCallback(() => {
        currentTimestampQueryResult.refetch({
            ...currentTimestampQueryResult.variables,
            returnError: ServerError.TEST_ERROR,
        });
    }, [currentTimestampQueryResult]);

    const onRefetchWithUnknownErrorClick = React.useCallback(() => {
        currentTimestampQueryResult.refetch({
            ...currentTimestampQueryResult.variables,
            returnError: ServerError.INTERNAL_SERVER_ERROR,
        });
    }, [currentTimestampQueryResult]);

    return (
        <Root className={className}>
            <DataDisplay>
                Data:{' '}
                {currentTimestampQueryResult.data !== undefined
                    ? JSON.stringify(currentTimestampQueryResult.data)
                    : String(currentTimestampQueryResult.data)}
            </DataDisplay>
            <LoadingDisplay>Loading: {String(currentTimestampQueryResult.loading)}</LoadingDisplay>
            <ErrorDisplay>
                Error: {/* eslint-disable-next-line no-nested-ternary */}
                {currentTimestampQueryResult.error
                    ? includesOnly(currentTimestampQueryResult.error, KNOWN_ERROR_LIST)
                        ? castError(currentTimestampQueryResult.error).userDisplayedMessage
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
