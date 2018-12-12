import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Store } from 'redux';
import { GlobalFontsStyle, observeFontFamilies } from '../../lib/fonts';
import { StoreState } from '../../lib/IsomorphicStore';
import { routesWithComponents } from '../../lib/routes';
/** Log application information */
import './app-info-logger.ts';
import { ExternalAndGlobalStyles } from './ExternalAndGlobalStyles';
import { InitialHelmet } from './InitialHelmet';
import { isomorphicHot } from './isomorphicHot';
import { IsomorphicLoadableCapture } from './IsomorphicLoadableCapture';
import { IsomorphicRouter } from './IsomorphicRouter';
import { Notificator } from './Notificator';
import { RootErrorBoundary } from './RootErrorBoundary';
import { ScrollToTop } from './ScrollToTop';

/** Import global scripts here (such as external-and-global-styles) */

export interface IsomorphicAppProps {
    client: ApolloClient<NormalizedCacheObject>;
    store: Store<StoreState>;
    modules?: string[];
    location?: string;
    context?: object;
}

@isomorphicHot(module)
export class IsomorphicApp extends React.Component<IsomorphicAppProps> {
    componentDidMount() {
        // This function must be called client-side only and immediately
        observeFontFamilies();
    }

    render() {
        return (
            <IsomorphicLoadableCapture modules={this.props.modules}>
                <ApolloProvider client={this.props.client}>
                    <Provider store={this.props.store}>
                        <RootErrorBoundary>
                            <React.Fragment>
                                <GlobalFontsStyle />
                                <ExternalAndGlobalStyles />
                                <InitialHelmet />
                                <Notificator />
                                <IsomorphicRouter location={this.props.location} context={this.props.context}>
                                    <ScrollToTop>
                                        <Switch>
                                            {Object.values(routesWithComponents).map(route => (
                                                <Route key={(route as { name: string }).name} {...route} />
                                            ))}
                                        </Switch>
                                    </ScrollToTop>
                                </IsomorphicRouter>
                            </React.Fragment>
                        </RootErrorBoundary>
                    </Provider>
                </ApolloProvider>
            </IsomorphicLoadableCapture>
        );
    }
}
