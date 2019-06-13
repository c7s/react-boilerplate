/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BookFullAdmin
// ====================================================

export interface BookFullAdmin_relations_author {
  __typename: "Author";
  id: string;
}

export interface BookFullAdmin_relations {
  __typename: "BookRelations";
  author: BookFullAdmin_relations_author;
}

export interface BookFullAdmin {
  __typename: "Book";
  id: string;
  title: string;
  relations: BookFullAdmin_relations;
}
