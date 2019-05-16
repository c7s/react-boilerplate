import * as React from 'react';
import Loadable from 'react-loadable';

const RootPage = Loadable({
    loader: () => import('./RootPageTemplate'),
    loading: () => React.createElement('div', {}, 'Loading'),
    render(loaded) {
        return React.createElement(loaded.RootPageTemplate);
    },
});

export { RootPage };
