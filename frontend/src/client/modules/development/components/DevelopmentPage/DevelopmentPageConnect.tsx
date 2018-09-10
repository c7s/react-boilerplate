import * as React from 'react';
import { Query } from 'react-apollo';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { Licenses } from './DevelopmentPageGraphql';
import { DevelopmentPageConnectProps } from './DevelopmentPageTypes';

const DevelopmentPageConnect = ({  }: DevelopmentPageConnectProps) => (
    <Query query={Licenses}>{result => <DevelopmentPageBehaviour licenses={result.data.licenses || []} />}</Query>
);

export { DevelopmentPageConnect };
