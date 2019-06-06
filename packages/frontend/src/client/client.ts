import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './isomorphic-globals-init';
import { IsomorphicApp } from './modules/common/components/IsomorphicApp';
import { IsomorphicApolloClient } from './modules/common/lib/IsomorphicApolloClient';

const rootElement = document.getElementById('root');

if (rootElement) {
    const reactHydrateOrRender = rootElement.innerHTML === '' ? ReactDOM.render : ReactDOM.hydrate;

    Loadable.preloadReady().then(() => {
        reactHydrateOrRender(
            React.createElement(IsomorphicApp, {
                client: IsomorphicApolloClient.getClient(),
            }),
            rootElement,
        );
    });
} else {
    throw new Error('No element to render');
}
