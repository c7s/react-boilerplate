import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetData } from 'react-helmet';
import { getBundles } from 'react-loadable/webpack';
import { castError } from '../castError';

export interface HtmlProps {
    helmet?: HelmetData;
    styleTags?: string;
    spriteContent?: string;
    content?: string;
    ssrError?: Error;
    apolloState?: object;
    reduxState?: object;
    bundles?: ReturnType<typeof getBundles>;
}

export const Html: React.FC<HtmlProps> = ({
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
                            {ssrError ? <noscript>{castError(ssrError).userDisplayedMessage}</noscript> : null}
                            <div id="root" dangerouslySetInnerHTML={{ __html: content ? content : '' }} />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: Object.entries({
                                        /** Config part */
                                        GRAPHQL_ENDPOINT: JSON.stringify(global.GRAPHQL_ENDPOINT),
                                        GITHUB_TOKEN: JSON.stringify(global.GITHUB_TOKEN),
                                        PUBLIC_PATH: JSON.stringify(global.PUBLIC_PATH),
                                        CANONICAL_ROBOTS_HOST: JSON.stringify(global.CANONICAL_ROBOTS_HOST),
                                        IS_OUTPUT_APP_INFO: JSON.stringify(global.IS_OUTPUT_APP_INFO),
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
                                      <script key={bundle.id} src={`${global.PUBLIC_PATH}${bundle.file}`} />
                                  ))
                                : null}
                        </React.Fragment>,
                    )}`,
                }}
            />
        </html>
    );
};
