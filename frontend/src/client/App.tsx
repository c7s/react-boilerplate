import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { DevelopmentPage } from './modules/development/DevelopmentPage';
import { RootPage } from './modules/root/RootPage';

// Import assets here (such as external css, html, fonts, etc)

class RoutesGroup extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={RootPage} />
                <Route path={'/development'} component={DevelopmentPage} />
            </Switch>
        );
    }
}

export const App = hot(module)(RoutesGroup);
