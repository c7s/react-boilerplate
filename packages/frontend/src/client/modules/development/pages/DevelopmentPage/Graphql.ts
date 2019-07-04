import gql from 'graphql-tag';

const BOOK_FULL_FRAGMENT = gql`
    fragment BookFull on Book {
        author
        title
    }
`;

const BOOKS_QUERY = gql`
    query Books {
        development {
            books {
                ...BookFull
            }
        }
    }
    ${BOOK_FULL_FRAGMENT}
`;

export { BOOKS_QUERY };
