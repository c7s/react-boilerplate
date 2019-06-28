import gql from 'graphql-tag';

const CURRENT_TIMESTAMP_QUERY = gql`
    query CurrentTimestamp($loadingTime: Int!, $returnError: ServerError) {
        development {
            currentTimestamp(loadingTime: $loadingTime, returnError: $returnError)
        }
    }
`;

export { CURRENT_TIMESTAMP_QUERY };
