import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Licenses } from './ApolloTypes/Licenses';
import { OuterPropsApollo, PropsApollo } from './TestType';

const LICENSE_FRAGMENT = gql`
    fragment License on License {
        nickname
        description
    }
`;

const LICENSES_QUERY = gql`
    query Licenses {
        licenses {
            ...License
        }
    }
    ${LICENSE_FRAGMENT}
`;

/** Здесь может быть несколько вложенных Query/Mutation */

const TestApollo = (
    Component: React.ComponentClass<OuterPropsApollo & PropsApollo>,
): React.ComponentType<OuterPropsApollo> => (props: OuterPropsApollo) => (
    <Query<Licenses> query={LICENSES_QUERY}>{licenses => <Component {...props} licenses={licenses} />}</Query>
);

export { TestApollo };
