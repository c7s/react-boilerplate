/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

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
  returnError: boolean;
}
