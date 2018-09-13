import { Dictionary } from 'lodash';
import { RouteProps } from 'react-router';
import { Test } from './modules/development/components/Test';
import { RootPage } from './modules/root/components/RootPage';

export const routes: Dictionary<RouteProps & { name: string } & { path: string }> = {
    ROOT: {
        path: '/',
        name: 'ROOT',
        exact: true,
        component: RootPage,
    },
    GENERATOR: {
        path: '/gen',
        name: 'GENERATOR',
        component: Test,
    },
};
