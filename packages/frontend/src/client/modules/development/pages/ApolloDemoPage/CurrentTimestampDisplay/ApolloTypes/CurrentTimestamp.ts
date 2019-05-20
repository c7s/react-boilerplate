/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ServerError } from "./../../../../../common/graphql/ApolloTypes/globalTypes";

// ====================================================
// GraphQL query operation: CurrentTimestamp
// ====================================================

export interface CurrentTimestamp_development {
  __typename: "Development";
  currentTimestamp: number;
}

export interface CurrentTimestamp {
  development: CurrentTimestamp_development;
}

export interface CurrentTimestampVariables {
  loadingTime: number;
  returnError?: ServerError | null;
}
