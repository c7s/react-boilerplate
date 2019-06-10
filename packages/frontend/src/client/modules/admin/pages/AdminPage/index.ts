import * as React from 'react';
import Loadable from 'react-loadable';

const AdminPage = Loadable({
    loader: () => import(/* webpackChunkName: "admin" */ './AdminPage'),
    loading: () => React.createElement('div', {}, 'Loading'),
    render(loaded) {
        return React.createElement(loaded.AdminPage);
    },
});

export { AdminPage };
