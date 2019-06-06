import * as React from 'react';
import Loadable from 'react-loadable';

const RootPage = Loadable({
    loader: () => import('./RootPage'),
    loading: () => React.createElement('div', {}, 'Loading'),
    render(loaded) {
        return React.createElement(loaded.RootPage);
    },
});

export { RootPage };
