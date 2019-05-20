import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { CommonProps } from '../../../../common/types/CommonProps';
import { CurrentTimestamp, CurrentTimestampVariables } from './ApolloTypes/CurrentTimestamp';
import { CurrentTimestampDisplayTemplate } from './CurrentTimestampDisplayTemplate';

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
        variables={{ loadingTime: 1000 }}
    >
        {currentTimestampQueryResult => (
            <CurrentTimestampDisplayTemplate currentTimestampQueryResult={currentTimestampQueryResult} {...props} />
        )}
    </Query>
);

export { CurrentTimestampDisplayConnect, Props };
