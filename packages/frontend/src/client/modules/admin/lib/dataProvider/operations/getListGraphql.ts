import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ResourceName } from '../ResourceName';
import { AUTHOR_FULL_ADMIN_FRAGMENT, BOOK_FULL_ADMIN_FRAGMENT } from './fragmentsGraphql';

const BOOK_LIST_QUERY = gql`
    query BookList($sort: BookSort, $pagination: PaginationParams, $filter: BookFilter) {
        book {
            many(sort: $sort, pagination: $pagination, filter: $filter) {
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

const AUTHOR_LIST_QUERY = gql`
    query AuthorList($sort: AuthorSort, $pagination: PaginationParams, $filter: AuthorFilter) {
        author {
            many(sort: $sort, pagination: $pagination, filter: $filter) {
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

export const getListGraphql: EnumedDict<ResourceName, DocumentNode> = {
    book: BOOK_LIST_QUERY,
    author: AUTHOR_LIST_QUERY,
};
