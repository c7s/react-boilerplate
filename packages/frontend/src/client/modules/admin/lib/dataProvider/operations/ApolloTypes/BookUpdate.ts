/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BookUpdateData } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: BookUpdate
// ====================================================

export interface BookUpdate_book_update_one_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookUpdate_book_update_one_relations {
  __typename: "BookRelations";
  author: BookUpdate_book_update_one_relations_author;
}

export interface BookUpdate_book_update_one {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookUpdate_book_update_one_relations;
}

export interface BookUpdate_book_update {
  __typename: "BookUpdate";
  one: BookUpdate_book_update_one;
}

export interface BookUpdate_book {
  __typename: "BookMutationModule";
  update: BookUpdate_book_update;
}

export interface BookUpdate {
  book: BookUpdate_book;
}

export interface BookUpdateVariables {
  id: string;
  data: BookUpdateData;
}
