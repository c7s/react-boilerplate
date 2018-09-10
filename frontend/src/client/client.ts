import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observeFontFamilies } from './fonts';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';
import { isomorphicApolloClientFactory } from './modules/common/lib/apollo';

// This function must be called client-side only and immediately
observeFontFamilies();

ReactDOM.hydrate(
    React.createElement(IsomorphicApp, {
        ssrMode: false,
        client: isomorphicApolloClientFactory({ ssrMode: false }),
        store: IsomorphicStore.getStore({ ssrMode: false }),
    }),
    document.getElementById('root'),
);
