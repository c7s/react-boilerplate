import * as React from 'react';
import { NotFoundPage } from '../modules/common/pages/NotFoundPage';
import { DevelopmentPage, DevelopmentPageThemeName } from '../modules/development/components/DevelopmentPage';
import { RootPage } from '../modules/root/components/RootPage';
import { route } from './route';

export const routes = {
    ROOT: route({
        path: '/',
        name: 'ROOT',
        exact: true,
        component: RootPage,
    }),
    DEVELOPMENT: route<'name' | 'id', 'queryFirst' | 'querySecond'>({
        path: '/development/:name/:id',
        name: 'DEVELOPMENT',
        render: () => React.createElement(DevelopmentPage, { name: 'User', themeName: DevelopmentPageThemeName.ALTER }),
    }),
    NOT_FOUND: route({
        path: '/',
        name: 'NOT_FOUND',
        component: NotFoundPage,
    }),
};
