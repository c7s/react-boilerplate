/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AuthorCreateData } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthorCreate
// ====================================================

export interface AuthorCreate_author_create_one {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorCreate_author_create {
  __typename: "AuthorCreate";
  one: AuthorCreate_author_create_one;
}

export interface AuthorCreate_author {
  __typename: "AuthorMutationModule";
  create: AuthorCreate_author_create;
}

export interface AuthorCreate {
  author: AuthorCreate_author;
}

export interface AuthorCreateVariables {
  data: AuthorCreateData;
}
