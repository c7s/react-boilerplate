import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Licenses } from './ApolloTypes/Licenses';
import { PropsApollo, PropsExternal, PropsStore } from './TestType';

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

export function TestApollo(Component: React.ComponentClass<OuterProps & PropsApollo>): React.ComponentType<OuterProps> {
    return (props: OuterProps) => (
        <Query<Licenses> query={LICENSES_QUERY}>{licenses => <Component {...props} licenses={licenses} />}</Query>
    );
}

type OuterProps = PropsExternal & PropsStore;
