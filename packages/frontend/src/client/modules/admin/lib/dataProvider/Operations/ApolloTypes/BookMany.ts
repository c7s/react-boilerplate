/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookMany
// ====================================================

export interface BookMany_book_many_items_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookMany_book_many_items_relations {
  __typename: "BookRelations";
  author: BookMany_book_many_items_relations_author;
}

export interface BookMany_book_many_items {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookMany_book_many_items_relations;
}

export interface BookMany_book_many_pagination {
  __typename: "Pagination";
  findCount: number;
}

export interface BookMany_book_many {
  __typename: "BookListModule";
  items: BookMany_book_many_items[];
  pagination: BookMany_book_many_pagination;
}

export interface BookMany_book {
  __typename: "BookQueryModule";
  many: BookMany_book_many;
}

export interface BookMany {
  book: BookMany_book;
}

export interface BookManyVariables {
  ids: number[];
}
