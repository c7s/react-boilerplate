import { Dictionary } from 'lodash';
import { RouteProps } from 'react-router';
import { DevelopmentPage } from './modules/development/components/DevelopmentPage';
import { RootPage } from './modules/root/components/RootPage';

export const routes: Dictionary<RouteProps & { name: string } & { path: string }> = {
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
