import * as React from 'react';
import { DevelopmentPage, DevelopmentPageThemeName } from '../modules/development/components/DevelopmentPage';
import { RootPage } from '../modules/root/components/RootPage';
import { constructUrl } from './constructUrl';

/**
 * These are basically RouteProps with variadic 'url' instead of 'path' and mandatory 'name'.
 * No idea how to write types for it ¯\_(ツ)_/¯
 */
export const routes = {
    ROOT: {
        url: constructUrl('/'),
        name: 'ROOT',
        exact: true,
        component: RootPage,
    },
    DEVELOPMENT: {
        url: constructUrl<'name' | 'id', 'queryFirst' | 'querySecond'>('/development/:name/:id'),
        name: 'DEVELOPMENT',
        render: () => React.createElement(DevelopmentPage, { name: 'User', themeName: DevelopmentPageThemeName.ALTER }),
    },
};
