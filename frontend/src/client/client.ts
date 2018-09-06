import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IsomorphicApp } from './IsomorphicApp';
import { isomorphicApolloClientFactory } from './modules/common/lib/apollo';

ReactDOM.hydrate(
    React.createElement(IsomorphicApp, { ssrMode: false, client: isomorphicApolloClientFactory({ ssrMode: false }) }),
    document.getElementById('root'),
);
