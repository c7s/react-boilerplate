import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Store } from 'redux';
import { GlobalFontsStyle, observeFontFamilies } from '../../lib/fonts';
import { StoreState } from '../../lib/IsomorphicStore';
import { routesWithComponents } from '../../lib/routes/routesWithComponents';
import { onMessageAdd } from '../../store/actions';
import './console-enhancers';
import { ExternalAndGlobalStyles } from './ExternalAndGlobalStyles';
import { InitialHelmet } from './InitialHelmet';
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

@hot
export class IsomorphicApp extends React.Component<IsomorphicAppProps> {
    public componentDidMount() {
        // This function must be called client-side only and immediately
        observeFontFamilies();

        if (global.SSR_ERROR) {
            this.props.store.dispatch(onMessageAdd(global.SSR_ERROR));
        }
    }

    public render() {
        return (
            <IsomorphicLoadableCapture modules={this.props.modules}>
                <ApolloProvider client={this.props.client}>
                    <Provider store={this.props.store}>
                        <RootErrorBoundary>
                            <React.Fragment>
                                <GlobalFontsStyle />
                                <ExternalAndGlobalStyles />
                                <IsomorphicRouter location={this.props.location} context={this.props.context}>
                                    <InitialHelmet>
                                        <ScrollToTop>
                                            <Switch>
                                                {Object.entries(routesWithComponents).map(([name, route]) =>
                                                    global.IS_SHOW_DEV_PAGES || !(route as { isDev: boolean }).isDev ? (
                                                        <Route key={name} {...route} />
                                                    ) : null,
                                                )}
                                            </Switch>
                                        </ScrollToTop>
                                    </InitialHelmet>
                                </IsomorphicRouter>
                                <Notificator />
                            </React.Fragment>
                        </RootErrorBoundary>
                    </Provider>
                </ApolloProvider>
            </IsomorphicLoadableCapture>
        );
    }
}
