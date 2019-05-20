/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Books
// ====================================================

export interface Books_development_books {
  __typename: "Book";
  author: string;
  title: string;
}

export interface Books_development {
  __typename: "Development";
  books: Books_development_books[];
}

export interface Books {
  development: Books_development;
}
