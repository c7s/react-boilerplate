/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BookDeleteMany
// ====================================================

export interface BookDeleteMany_book_delete_many_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookDeleteMany_book_delete_many_relations {
  __typename: "BookRelations";
  author: BookDeleteMany_book_delete_many_relations_author;
}

export interface BookDeleteMany_book_delete_many {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookDeleteMany_book_delete_many_relations;
}

export interface BookDeleteMany_book_delete {
  __typename: "BookDelete";
  many: BookDeleteMany_book_delete_many[];
}

export interface BookDeleteMany_book {
  __typename: "BookMutationModule";
  delete: BookDeleteMany_book_delete;
}

export interface BookDeleteMany {
  book: BookDeleteMany_book;
}

export interface BookDeleteManyVariables {
  ids: string[];
}
