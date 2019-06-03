import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router';
import { GlobalFontsStyle } from '../../lib/fonts';
import { routesWithComponents } from '../../lib/routes/routesWithComponents';
import './console-enhancers';
import { AppStateProvider } from '../AppStateProvider';
import { ExternalAndGlobalStyles } from './ExternalAndGlobalStyles';
import { FontFamiliesObserver } from './FontFamiliesObserver';
import { InitialHelmet } from './InitialHelmet';
import { IsomorphicLoadableCapture } from './IsomorphicLoadableCapture';
import { IsomorphicRouter } from './IsomorphicRouter';
import { Notificator } from './Notificator';
import { RootErrorBoundary } from './RootErrorBoundary';
import { ScrollToTop } from './ScrollToTop';
import { SsrErrorReporter } from './SsrErrorReporter';

/** Import global scripts here (such as external-and-global-styles) */

export interface IsomorphicAppProps {
    client: ApolloClient<NormalizedCacheObject>;
    modules?: string[];
    location?: string;
    context?: object;
}

export const IsomorphicApp = hot(({ client, modules, location, context }: IsomorphicAppProps) => {
    return (
        <IsomorphicLoadableCapture modules={modules}>
            <ApolloProvider client={client}>
                <RootErrorBoundary>
                    <AppStateProvider>
                        <React.Fragment>
                            <GlobalFontsStyle />
                            <ExternalAndGlobalStyles />
                            <IsomorphicRouter location={location} context={context}>
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
                            <FontFamiliesObserver />
                            <SsrErrorReporter />
                            <Notificator />
                        </React.Fragment>
                    </AppStateProvider>
                </RootErrorBoundary>
            </ApolloProvider>
        </IsomorphicLoadableCapture>
    );
});
