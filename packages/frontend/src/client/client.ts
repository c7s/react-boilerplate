import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './isomorphic-globals-init';
import { IsomorphicApp } from './modules/common/components/IsomorphicApp';
import { IsomorphicApolloClient } from './modules/common/lib/IsomorphicApolloClient';

const reactHydrateOrRender = global.SSR_ERROR ? ReactDOM.render : ReactDOM.hydrate;

Loadable.preloadReady().then(() => {
    reactHydrateOrRender(
        React.createElement(IsomorphicApp, {
            client: IsomorphicApolloClient.getClient(),
        }),
        document.getElementById('root'),
    );
});
