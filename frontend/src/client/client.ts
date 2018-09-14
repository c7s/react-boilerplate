import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observeFontFamilies } from './fonts';
import { HotIsomorphicApp } from './HotIsomorphicApp';
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicStore } from './IsomorphicStore';

// This function must be called client-side only and immediately
observeFontFamilies();

ReactDOM.hydrate(
    React.createElement(HotIsomorphicApp, {
        ssrMode: false,
        client: IsomorphicApolloClient.getClient({ ssrMode: false }),
        store: IsomorphicStore.getStore({ ssrMode: false }),
    }),
    document.getElementById('root'),
);
