import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const AUTHOR_DELETE_MANY_MUTATION = gql`
    mutation AuthorDeleteMany($ids: [ID!]!) {
        author {
            delete {
                many(ids: $ids) {
                    ...AuthorFullAdmin
                }
            }
        }
    }
    ${AUTHOR_FULL_ADMIN_FRAGMENT}
`;

const BOOK_DELETE_MANY_MUTATION = gql`
    mutation BookDeleteMany($ids: [ID!]!) {
        book {
            delete {
                many(ids: $ids) {
                    ...BookFullAdmin
                }
            }
        }
    }
    ${BOOK_FULL_ADMIN_FRAGMENT}
`;

export const deleteManyResourceGraphql: EnumedDict<ResourceName, DocumentNode> = {
    author: AUTHOR_DELETE_MANY_MUTATION,
    book: BOOK_DELETE_MANY_MUTATION,
};
