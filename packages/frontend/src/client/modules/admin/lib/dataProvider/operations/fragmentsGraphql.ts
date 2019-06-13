import gql from 'graphql-tag';

export const BOOK_FULL_ADMIN_FRAGMENT = gql`
    fragment BookFullAdmin on Book {
        id
        title
        relations {
            author {
                id
            }
        }
    }
`;

export const AUTHOR_FULL_ADMIN_FRAGMENT = gql`
    fragment AuthorFullAdmin on Author {
        id
        name
    }
`;
