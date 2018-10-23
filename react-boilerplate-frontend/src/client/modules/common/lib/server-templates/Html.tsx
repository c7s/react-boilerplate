import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetData } from 'react-helmet';
import { getBundles } from 'react-loadable/webpack';
import { Config } from '../../../../../../config';

export interface HtmlProps {
    config: Config;
    helmet?: HelmetData;
    styleTags?: string;
    spriteContent?: string;
    content?: string;
    ssrError?: Error;
    apolloState?: object;
    reduxState?: object;
    bundles?: ReturnType<typeof getBundles>;
}

export const Html: React.StatelessComponent<HtmlProps> = ({
    config,
    helmet,
    styleTags,
    spriteContent,
    content,
    ssrError,
    apolloState,
    reduxState,
    bundles,
}) => {
    return (
        <html {...(helmet ? helmet.htmlAttributes.toComponent() : {})}>
            <head
                dangerouslySetInnerHTML={{
                    __html:
                        (helmet
                            ? helmet.base.toString() +
                              helmet.link.toString() +
                              helmet.meta.toString() +
                              helmet.noscript.toString() +
                              helmet.script.toString() +
                              helmet.style.toString() +
                              helmet.title.toString()
                            : '') + (styleTags ? styleTags : ''),
                }}
            />
            <body
                {...(helmet ? helmet.bodyAttributes.toComponent() : {})}
                dangerouslySetInnerHTML={{
                    __html: `${spriteContent ? spriteContent : ''}${renderToString(
                        <React.Fragment>
                            <div id="root" dangerouslySetInnerHTML={{ __html: content ? content : '' }} />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: Object.entries({
                                        /** Config part */
                                        GRAPHQL_ENDPOINT: JSON.stringify(config.api.graphqlEndpoint),
                                        GITHUB_TOKEN: JSON.stringify(config.api.githubToken),
                                        PUBLIC_PATH: JSON.stringify(config.root.publicPath),
                                        /** Dynamic server data part */
                                        APOLLO_STATE: JSON.stringify(apolloState),
                                        REDUX_STATE: JSON.stringify(reduxState),
                                        SSR_ERROR: JSON.stringify(ssrError, [
                                            ...Object.getOwnPropertyNames(ssrError || {}),
                                            'name',
                                        ]),
                                    })
                                        .map(([key, value]) => `window.${key}=${value};`)
                                        .join(''),
                                }}
                            />
                            {bundles
                                ? bundles.map(bundle => (
                                      <script
                                          key={bundle.id}
                                          src={`${global.PUBLIC_PATH}${bundle.file}?${BUILD_TIMESTAMP}`}
                                      />
                                  ))
                                : null}
                            <script src={`${global.PUBLIC_PATH}${CLIENT_BUNDLE_NAME}?${BUILD_TIMESTAMP}`} />
                        </React.Fragment>,
                    )}`,
                }}
            />
        </html>
    );
};
