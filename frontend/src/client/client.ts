import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observeFontFamilies } from './fonts';
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';

// This function must be called client-side only and immediately
observeFontFamilies();

ReactDOM.hydrate(
    React.createElement(IsomorphicApp, {
        client: IsomorphicApolloClient.getClient(),
        store: IsomorphicStore.getStore(),
    }),
    document.getElementById('root'),
);
