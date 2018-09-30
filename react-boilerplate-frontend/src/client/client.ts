import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { IsomorphicApolloClient } from './IsomorphicApolloClient';
import { IsomorphicApp } from './IsomorphicApp';
import { IsomorphicStore } from './IsomorphicStore';

const reactHydrateOrRender = global.SSR_ERROR ? ReactDOM.render : ReactDOM.hydrate;

Loadable.preloadReady().then(() => {
    reactHydrateOrRender(
        React.createElement(IsomorphicApp, {
            client: IsomorphicApolloClient.getClient(),
            store: IsomorphicStore.getStore(),
        }),
        document.getElementById('root'),
    );
});
