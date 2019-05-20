/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BooksTitle
// ====================================================

export interface BooksTitle_development_books {
  __typename: "Book";
  title: string;
}

export interface BooksTitle_development {
  __typename: "Development";
  books: BooksTitle_development_books[];
}

export interface BooksTitle {
  development: BooksTitle_development;
}
