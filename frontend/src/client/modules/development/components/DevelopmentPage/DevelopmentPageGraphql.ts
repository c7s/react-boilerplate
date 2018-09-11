import gql from 'graphql-tag';

const LicenseFragment = gql`
    fragment License on License {
        nickname
        description
    }
`;

const LicensesQuery = gql`
    query Licenses {
        licenses {
            ...License
        }
    }
    ${LicenseFragment}
`;

export { LicenseFragment, LicensesQuery };
