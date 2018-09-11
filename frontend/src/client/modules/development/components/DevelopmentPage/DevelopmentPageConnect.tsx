import * as React from 'react';
import { Query } from 'react-apollo';
import { Licenses } from './ApolloTypes/Licenses';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { LicensesQuery } from './DevelopmentPageGraphql';
import { DevelopmentPageConnectProps } from './DevelopmentPageTypes';

const DevelopmentPageConnect = ({  }: DevelopmentPageConnectProps) => (
    <Query<Licenses> query={LicensesQuery}>
        {result => <DevelopmentPageBehaviour licenses={(result.data && result.data.licenses) || []} />}
    </Query>
);

export { DevelopmentPageConnect };
