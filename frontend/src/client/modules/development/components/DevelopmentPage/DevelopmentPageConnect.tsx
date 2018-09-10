import * as React from 'react';
import { Query } from 'react-apollo';
import { toClass } from 'recompose';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { Licenses } from './DevelopmentPageGraphql';
import { DevelopmentPageConnectProps } from './DevelopmentPageTypes';

const DevelopmentPageConnect = toClass(({  }: DevelopmentPageConnectProps) => (
    <Query query={Licenses}>{result => <DevelopmentPageBehaviour licenses={result.data.licenses || []} />}</Query>
));

export { DevelopmentPageConnect };
