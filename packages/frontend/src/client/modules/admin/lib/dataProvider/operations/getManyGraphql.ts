import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const BOOK_MANY_QUERY = gql`
    query BookMany($ids: [Int!]!) {
        book {
            many(filter: { fields: { id: { list: $ids } } }) {
                items {
                    ...BookFullAdmin
                }
                pagination {
                    findCount
                }
            }
        }
    }
    ${BOOK_FULL_ADMIN_FRAGMENT}
`;

const AUTHOR_MANY_QUERY = gql`
    query AuthorMany($ids: [Int!]!) {
        author {
            many(filter: { fields: { id: { list: $ids } } }) {
                items {
                    ...AuthorFullAdmin
                }
                pagination {
                    findCount
                }
            }
        }
    }
    ${AUTHOR_FULL_ADMIN_FRAGMENT}
`;

export const getManyGraphql: EnumedDict<ResourceName, DocumentNode> = {
    book: BOOK_MANY_QUERY,
    author: AUTHOR_MANY_QUERY,
};
