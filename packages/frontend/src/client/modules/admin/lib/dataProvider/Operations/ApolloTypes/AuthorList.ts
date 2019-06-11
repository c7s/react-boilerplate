/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AuthorSort, PaginationParams, AuthorFilter } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL query operation: AuthorList
// ====================================================

export interface AuthorList_author_many_items {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorList_author_many_pagination {
  __typename: "Pagination";
  findCount: number;
}

export interface AuthorList_author_many {
  __typename: "AuthorListModule";
  items: AuthorList_author_many_items[];
  pagination: AuthorList_author_many_pagination;
}

export interface AuthorList_author {
  __typename: "AuthorQueryModule";
  many: AuthorList_author_many;
}

export interface AuthorList {
  author: AuthorList_author;
}

export interface AuthorListVariables {
  sort?: AuthorSort | null;
  pagination?: PaginationParams | null;
  filter?: AuthorFilter | null;
}
