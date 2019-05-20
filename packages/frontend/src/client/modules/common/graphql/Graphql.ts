import gql from 'graphql-tag';

/** Unused, just to get ServerError enum */
const SERVER_ERROR_DUMMY_QUERY = gql`
    query ServerErrorDummy {
        serverError
    }
`;

export { SERVER_ERROR_DUMMY_QUERY };
