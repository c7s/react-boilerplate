import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetData } from 'react-helmet';

export interface HtmlProps {
    helmet?: HelmetData;
    styleTags?: string;
    spriteContent?: string;
    content?: string;
    apolloState?: object;
    reduxState?: object;
    ssrError?: Error;
}

export const Html: React.StatelessComponent<HtmlProps> = ({
    helmet,
    styleTags,
    spriteContent,
    content,
    apolloState,
    reduxState,
    ssrError,
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
                                    __html:
                                        `window.SSR_ERROR=${
                                            ssrError
                                                ? JSON.stringify(
                                                      ssrError,
                                                      [...Object.getOwnPropertyNames(ssrError), 'name'],
                                                  )
                                                : 'undefined'
                                        };` +
                                        (apolloState ? `window.APOLLO_STATE=${JSON.stringify(apolloState)};` : '') +
                                        (reduxState ? `window.REDUX_STATE=${JSON.stringify(reduxState)};` : ''),
                                }}
                            />
                            <script src={`/${STATIC_DIRECTORY_NAME}/${CLIENT_BUNDLE_NAME}?${BUILD_TIMESTAMP}`} />
                        </React.Fragment>,
                    )}`,
                }}
            />
        </html>
    );
};
