/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BooksAuthor
// ====================================================

export interface BooksAuthor_development_books {
  __typename: "Book";
  author: string;
}

export interface BooksAuthor_development {
  __typename: "Development";
  books: BooksAuthor_development_books[];
}

export interface BooksAuthor {
  development: BooksAuthor_development;
}
