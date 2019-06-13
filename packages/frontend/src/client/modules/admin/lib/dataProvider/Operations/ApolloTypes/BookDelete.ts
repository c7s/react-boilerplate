/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BookDelete
// ====================================================

export interface BookDelete_book_delete_one_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookDelete_book_delete_one_relations {
  __typename: "BookRelations";
  author: BookDelete_book_delete_one_relations_author;
}

export interface BookDelete_book_delete_one {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookDelete_book_delete_one_relations;
}

export interface BookDelete_book_delete {
  __typename: "BookDelete";
  one: BookDelete_book_delete_one;
}

export interface BookDelete_book {
  __typename: "BookMutationModule";
  delete: BookDelete_book_delete;
}

export interface BookDelete {
  book: BookDelete_book;
}

export interface BookDeleteVariables {
  id: string;
}
