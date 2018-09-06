import { Dictionary } from 'lodash';
import { RouteProps } from 'react-router';
import { DevelopmentPage } from './modules/development/DevelopmentPage';
import { RootPage } from './modules/root/RootPage';

export const routes: Dictionary<RouteProps & { name: string }> = {
    ROOT: {
        path: '/',
        name: 'ROOT',
        exact: true,
        component: RootPage,
    },
    DEVELOPMENT: {
        path: '/development',
        name: 'DEVELOPMENT',
        component: DevelopmentPage,
    },
};
