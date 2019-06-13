/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthorOne
// ====================================================

export interface AuthorOne_author_one {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorOne_author {
  __typename: "AuthorQueryModule";
  one: AuthorOne_author_one;
}

export interface AuthorOne {
  author: AuthorOne_author;
}

export interface AuthorOneVariables {
  id: string;
}
