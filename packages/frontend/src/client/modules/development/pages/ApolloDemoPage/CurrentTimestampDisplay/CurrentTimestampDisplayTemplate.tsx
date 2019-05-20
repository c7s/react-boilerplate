import * as React from 'react';
import { QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { Button } from '../../../../common/components/Button';
import { useApolloErrorReporter } from '../../../../common/lib/react-hooks/useApolloErrorReporter';
import { CommonProps } from '../../../../common/types/CommonProps';
import { CurrentTimestamp, CurrentTimestampVariables } from './ApolloTypes/CurrentTimestamp';

interface Props extends CommonProps {
    currentTimestampQueryResult: QueryResult<Partial<CurrentTimestamp>, CurrentTimestampVariables>;
}

const CurrentTimestampDisplayTemplate: React.FC<Props> = ({ className, currentTimestampQueryResult }) => {
    useApolloErrorReporter(currentTimestampQueryResult);

    const { data: currentTimestampData = {} } = currentTimestampQueryResult;

    const onRefetchClick = React.useCallback(() => {
        currentTimestampQueryResult.refetch({ ...currentTimestampQueryResult.variables, returnError: false });
    }, [currentTimestampQueryResult]);

    const onRefetchWithErrorClick = React.useCallback(() => {
        currentTimestampQueryResult.refetch({ ...currentTimestampQueryResult.variables, returnError: true });
    }, [currentTimestampQueryResult]);

    return (
        <Root className={className}>
            {currentTimestampData.development ? currentTimestampData.development.currentTimestamp : 'No data'}
            {currentTimestampQueryResult.loading ? ' - Loading' : ''}
            {currentTimestampQueryResult.error ? ' - Error' : ''}
            <Button onClick={onRefetchClick}>Refetch</Button>
            <Button onClick={onRefetchWithErrorClick}>Refetch with error</Button>
        </Root>
    );
};

const Root = styled.div``;

export { CurrentTimestampDisplayTemplate, Props };
