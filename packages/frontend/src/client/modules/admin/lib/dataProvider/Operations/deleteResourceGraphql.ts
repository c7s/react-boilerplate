import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const AUTHOR_DELETE_MUTATION = gql`
    mutation AuthorDelete($id: ID!) {
        author {
            delete {
                one(id: $id) {
                    ...AuthorFullAdmin
                }
            }
        }
    }
    ${AUTHOR_FULL_ADMIN_FRAGMENT}
`;

const BOOK_DELETE_MUTATION = gql`
    mutation BookDelete($id: ID!) {
        book {
            delete {
                one(id: $id) {
                    ...BookFullAdmin
                }
            }
        }
    }
    ${BOOK_FULL_ADMIN_FRAGMENT}
`;

export const deleteResourceGraphql: EnumedDict<ResourceName, DocumentNode> = {
    author: AUTHOR_DELETE_MUTATION,
    book: BOOK_DELETE_MUTATION,
};
