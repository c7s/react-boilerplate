/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookOne
// ====================================================

export interface BookOne_book_one_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookOne_book_one_relations {
  __typename: "BookRelations";
  author: BookOne_book_one_relations_author;
}

export interface BookOne_book_one {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookOne_book_one_relations;
}

export interface BookOne_book {
  __typename: "BookQueryModule";
  one: BookOne_book_one;
}

export interface BookOne {
  book: BookOne_book;
}

export interface BookOneVariables {
  id: string;
}
