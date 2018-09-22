import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';

ReactDOM.hydrate(
    React.createElement(IsomorphicApp, {
        client: IsomorphicApolloClient.getClient(),
        store: IsomorphicStore.getStore(),
    }),
    document.getElementById('root'),
);
