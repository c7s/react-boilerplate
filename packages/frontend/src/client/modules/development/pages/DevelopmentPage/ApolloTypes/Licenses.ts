/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Licenses
// ====================================================

export interface Licenses_licenses {
  __typename: "License";
  /**
   * Customary short name if applicable (e.g, GPLv3)
   */
  nickname: string | null;
  /**
   * A human-readable description of the license
   */
  description: string | null;
}

export interface Licenses {
  /**
   * Return a list of known open source licenses
   */
  licenses: (Licenses_licenses | null)[];
}
