import gql from 'graphql-tag';

const BOOKS_AUTHOR_QUERY = gql`
    query BooksAuthor {
        development {
            books {
                author
            }
        }
    }
`;

export { BOOKS_AUTHOR_QUERY };
