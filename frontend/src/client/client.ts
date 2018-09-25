import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';

const reactHydrateOrRender = global.SSR_ERROR ? ReactDOM.render : ReactDOM.hydrate;

reactHydrateOrRender(
    React.createElement(IsomorphicApp, {
        client: IsomorphicApolloClient.getClient(),
        store: IsomorphicStore.getStore(),
    }),
    document.getElementById('root'),
);
