import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const AUTHOR_UPDATE_MUTATION = gql`
    mutation AuthorUpdate($id: ID!, $data: AuthorUpdateData!) {
        author {
            update {
                one(id: $id, data: $data) {
                    ...AuthorFullAdmin
                }
            }
        }
    }
    ${AUTHOR_FULL_ADMIN_FRAGMENT}
`;

const BOOK_UPDATE_MUTATION = gql`
    mutation BookUpdate($id: ID!, $data: BookUpdateData!) {
        book {
            update {
                one(id: $id, data: $data) {
                    ...BookFullAdmin
                }
            }
        }
    }
    ${BOOK_FULL_ADMIN_FRAGMENT}
`;

export const updateGraphql: EnumedDict<ResourceName, DocumentNode> = {
    author: AUTHOR_UPDATE_MUTATION,
    book: BOOK_UPDATE_MUTATION,
};
