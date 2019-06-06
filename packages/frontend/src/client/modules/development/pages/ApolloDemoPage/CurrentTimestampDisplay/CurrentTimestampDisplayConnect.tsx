import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { ServerError } from '../../../../common/graphql/ApolloTypes/globalTypes';
import { CommonProps } from '../../../../common/types/CommonProps';
import { CurrentTimestamp, CurrentTimestampVariables } from './ApolloTypes/CurrentTimestamp';
import { CurrentTimestampDisplay } from './CurrentTimestampDisplay';

interface Props extends CommonProps {}

const CURRENT_TIMESTAMP_QUERY = gql`
    query CurrentTimestamp($loadingTime: Int!, $returnError: ServerError) {
        development {
            currentTimestamp(loadingTime: $loadingTime, returnError: $returnError)
        }
    }
`;

const CurrentTimestampDisplayConnect = (props: Props) => (
    <Query<Partial<CurrentTimestamp>, CurrentTimestampVariables>
        query={CURRENT_TIMESTAMP_QUERY}
        context={{ debatch: true }}
        variables={{ loadingTime: 1000, returnError: ServerError.TEST_ERROR }}
    >
        {currentTimestampQueryResult => (
            <CurrentTimestampDisplay currentTimestampQueryResult={currentTimestampQueryResult} {...props} />
        )}
    </Query>
);

export { CurrentTimestampDisplayConnect, Props };
