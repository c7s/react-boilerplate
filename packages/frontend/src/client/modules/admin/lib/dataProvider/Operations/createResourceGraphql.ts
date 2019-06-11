import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const AUTHOR_CREATE_MUTATION = gql`
    mutation AuthorCreate($data: AuthorCreateData!) {
        author {
            create {
                one(data: $data) {
                    ...AuthorFullAdmin
                }
            }
        }
    }
    ${AUTHOR_FULL_ADMIN_FRAGMENT}
`;

const BOOK_CREATE_MUTATION = gql`
    mutation BookCreate($data: BookCreateData!) {
        book {
            create {
                one(data: $data) {
                    ...BookFullAdmin
                }
            }
        }
    }
    ${BOOK_FULL_ADMIN_FRAGMENT}
`;

export const createResourceGraphql: EnumedDict<ResourceName, DocumentNode> = {
    author: AUTHOR_CREATE_MUTATION,
    book: BOOK_CREATE_MUTATION,
};
