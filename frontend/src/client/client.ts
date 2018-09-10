import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observeFontFamilies } from './fonts';
import { HotIsomorphicApp } from './HotIsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';
import { IsomorphicApolloClient } from './modules/common/lib/apollo';

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
