/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AuthorUpdateData } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthorUpdate
// ====================================================

export interface AuthorUpdate_author_update_one {
  __typename: "Author";
  id: string;
  name: string;
}

export interface AuthorUpdate_author_update {
  __typename: "AuthorUpdate";
  one: AuthorUpdate_author_update_one;
}

export interface AuthorUpdate_author {
  __typename: "AuthorMutationModule";
  update: AuthorUpdate_author_update;
}

export interface AuthorUpdate {
  author: AuthorUpdate_author;
}

export interface AuthorUpdateVariables {
  id: string;
  data: AuthorUpdateData;
}
