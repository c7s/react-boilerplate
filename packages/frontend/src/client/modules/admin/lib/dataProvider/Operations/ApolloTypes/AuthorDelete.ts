/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AuthorDelete
// ====================================================

export interface AuthorDelete_author_delete_one {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorDelete_author_delete {
  __typename: "AuthorDelete";
  one: AuthorDelete_author_delete_one;
}

export interface AuthorDelete_author {
  __typename: "AuthorMutationModule";
  delete: AuthorDelete_author_delete;
}

export interface AuthorDelete {
  author: AuthorDelete_author;
}

export interface AuthorDeleteVariables {
  id: string;
}
