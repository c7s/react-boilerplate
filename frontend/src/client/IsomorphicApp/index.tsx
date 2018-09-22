import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Store } from 'redux';
/** Start client-side fonts observing */
import '../fonts';
import { StoreState } from '../IsomorphicStore';
import { routes } from '../routes';
/** Generate files for manifest favicon */
import '../server-templates';
/** Inject external and global styles */
import './external-and-global-styles';
import { InitialHelmet } from './InitialHelmet';
import { isomorphicHot } from './isomorphicHot';
import { IsomorphicRouter } from './IsomorphicRouter';

/** Import global scripts here (such as external-and-global-styles) */

export interface IsomorphicAppProps {
    client: ApolloClient<NormalizedCacheObject>;
    store: Store<StoreState>;
    location?: string;
    context?: object;
}

@isomorphicHot(module)
export class IsomorphicApp extends React.Component<IsomorphicAppProps> {
    render() {
        return (
            <ApolloProvider client={this.props.client}>
                <Provider store={this.props.store}>
                    <React.Fragment>
                        <InitialHelmet />
                        <IsomorphicRouter location={this.props.location} context={this.props.context}>
                            <Switch>
                                {Object.values(routes).map(route => (
                                    <Route key={route.name} {...route} />
                                ))}
                            </Switch>
                        </IsomorphicRouter>
                    </React.Fragment>
                </Provider>
            </ApolloProvider>
        );
    }
}
