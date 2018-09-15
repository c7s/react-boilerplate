import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetData } from 'react-helmet';

export interface HtmlProps {
    helmet: HelmetData;
    styleTags: string;
    spriteContent: string;
    content: string;
    apolloState: object;
    reduxState: object;
}

export const Html: React.StatelessComponent<HtmlProps> = ({
    helmet,
    styleTags,
    spriteContent,
    content,
    apolloState,
    reduxState,
}) => {
    return (
        <html {...helmet.htmlAttributes.toComponent()}>
            <head
                dangerouslySetInnerHTML={{
                    __html:
                        helmet.base.toString() +
                        helmet.link.toString() +
                        helmet.meta.toString() +
                        helmet.noscript.toString() +
                        helmet.script.toString() +
                        helmet.style.toString() +
                        helmet.title.toString() +
                        styleTags,
                }}
            />
            <body
                {...helmet.bodyAttributes.toComponent()}
                dangerouslySetInnerHTML={{
                    __html: `${spriteContent}${renderToString(
                        <React.Fragment>
                            <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `window.APOLLO_STATE=${JSON.stringify(
                                        apolloState,
                                    )};window.REDUX_STATE=${JSON.stringify(reduxState)};`,
                                }}
                            />
                            <script src={`/${STATIC_DIRECTORY_NAME}/${CLIENT_BUNDLE_NAME}`} />
                        </React.Fragment>,
                    )}`,
                }}
            />
        </html>
    );
};
