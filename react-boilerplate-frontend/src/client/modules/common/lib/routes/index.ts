import * as React from 'react';
import { DevelopmentPage, DevelopmentPageThemeName } from '../../../development/components/DevelopmentPage/index';
import { RootPage } from '../../../root/components/RootPage';
import { NotFoundPage } from '../../pages/NotFoundPage/index';
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
