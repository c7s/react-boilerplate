import * as React from 'react';
import { StaticRouter, StaticRouterProps } from 'react-router';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';

export class IsomorphicRouter extends React.Component<StaticRouterProps | BrowserRouterProps> {
    render() {
        return SSR_MODE ? <StaticRouter {...this.props} /> : <BrowserRouter {...this.props} />;
    }
}
