/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthorMany
// ====================================================

export interface AuthorMany_author_many_items {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorMany_author_many_pagination {
  __typename: "Pagination";
  findCount: number;
}

export interface AuthorMany_author_many {
  __typename: "AuthorListModule";
  items: AuthorMany_author_many_items[];
  pagination: AuthorMany_author_many_pagination;
}

export interface AuthorMany_author {
  __typename: "AuthorQueryModule";
  many: AuthorMany_author_many;
}

export interface AuthorMany {
  author: AuthorMany_author;
}

export interface AuthorManyVariables {
  ids: number[];
}
