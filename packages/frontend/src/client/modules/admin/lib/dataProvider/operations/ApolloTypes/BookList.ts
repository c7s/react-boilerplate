/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BookSort, PaginationParams, BookFilter } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL query operation: BookList
// ====================================================

export interface BookList_book_many_items_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookList_book_many_items_relations {
  __typename: "BookRelations";
  author: BookList_book_many_items_relations_author;
}

export interface BookList_book_many_items {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookList_book_many_items_relations;
}

export interface BookList_book_many_pagination {
  __typename: "Pagination";
  findCount: number;
}

export interface BookList_book_many {
  __typename: "BookListModule";
  items: BookList_book_many_items[];
  pagination: BookList_book_many_pagination;
}

export interface BookList_book {
  __typename: "BookQueryModule";
  many: BookList_book_many;
}

export interface BookList {
  book: BookList_book;
}

export interface BookListVariables {
  sort?: BookSort | null;
  pagination?: PaginationParams | null;
  filter?: BookFilter | null;
}
