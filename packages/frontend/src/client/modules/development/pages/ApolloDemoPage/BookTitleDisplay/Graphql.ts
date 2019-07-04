import gql from 'graphql-tag';

const BOOKS_TITLE_QUERY = gql`
    query BooksTitle {
        development {
            books {
                title
            }
        }
    }
`;

export { BOOKS_TITLE_QUERY };
