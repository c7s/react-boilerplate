import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { IsomorphicApp } from './modules/common/components/IsomorphicApp';
import { IsomorphicApolloClient } from './modules/common/lib/IsomorphicApolloClient';
import { IsomorphicStore } from './modules/common/lib/IsomorphicStore';

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
