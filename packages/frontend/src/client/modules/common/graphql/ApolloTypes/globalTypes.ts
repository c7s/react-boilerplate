/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AuthorSortField {
  id = "id",
  name = "name",
}

export enum BookSortField {
  id = "id",
  title = "title",
}

/**
 * All known server errors
 */
export enum ServerError {
  AUTHOR_NOT_FOUND = "AUTHOR_NOT_FOUND",
  BOOK_NOT_FOUND = "BOOK_NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  TEST_ERROR = "TEST_ERROR",
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export interface AuthorFieldSort {
  type?: SortType | null;
  field: AuthorSortField;
}

export interface AuthorFieldsFilter {
  id?: IntegerFilter | null;
}

export interface AuthorFilter {
  fields?: AuthorFieldsFilter | null;
}

export interface AuthorSort {
  fields?: AuthorFieldSort[] | null;
}

export interface BookFieldSort {
  type?: SortType | null;
  field: BookSortField;
}

export interface BookFieldsFilter {
  id?: IntegerFilter | null;
}

export interface BookFilter {
  fields?: BookFieldsFilter | null;
}

export interface BookSort {
  fields?: BookFieldSort[] | null;
}

export interface IntegerFilter {
  list?: number[] | null;
}

export interface PaginationParams {
  offset?: number | null;
  limit?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
