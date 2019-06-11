import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const BOOK_ONE_QUERY = gql`
    query BookOne($id: ID!) {
        book {
            one(id: $id) {
                ...BookFullAdmin
            }
        }
    }
    ${BOOK_FULL_ADMIN_FRAGMENT}
`;

const AUTHOR_ONE_QUERY = gql`
    query AuthorOne($id: ID!) {
        author {
            one(id: $id) {
                ...AuthorFullAdmin
            }
        }
    }
    ${AUTHOR_FULL_ADMIN_FRAGMENT}
`;

export const getOneResourceGraphql: EnumedDict<ResourceName, DocumentNode> = {
    book: BOOK_ONE_QUERY,
    author: AUTHOR_ONE_QUERY,
};
