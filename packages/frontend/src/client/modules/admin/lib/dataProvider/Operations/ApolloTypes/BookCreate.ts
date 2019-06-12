/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BookCreateData } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: BookCreate
// ====================================================

export interface BookCreate_book_create_one_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookCreate_book_create_one_relations {
  __typename: "BookRelations";
  author: BookCreate_book_create_one_relations_author;
}

export interface BookCreate_book_create_one {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookCreate_book_create_one_relations;
}

export interface BookCreate_book_create {
  __typename: "BookCreate";
  one: BookCreate_book_create_one;
}

export interface BookCreate_book {
  __typename: "BookMutationModule";
  create: BookCreate_book_create;
}

export interface BookCreate {
  book: BookCreate_book;
}

export interface BookCreateVariables {
  data: BookCreateData;
}
