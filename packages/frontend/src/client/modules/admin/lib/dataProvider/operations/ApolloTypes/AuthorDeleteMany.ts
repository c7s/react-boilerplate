/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AuthorDeleteMany
// ====================================================

export interface AuthorDeleteMany_author_delete_many {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorDeleteMany_author_delete {
  __typename: "AuthorDelete";
  many: AuthorDeleteMany_author_delete_many;
}

export interface AuthorDeleteMany_author {
  __typename: "AuthorMutationModule";
  delete: AuthorDeleteMany_author_delete;
}

export interface AuthorDeleteMany {
  author: AuthorDeleteMany_author;
}

export interface AuthorDeleteManyVariables {
  ids: string[];
}
