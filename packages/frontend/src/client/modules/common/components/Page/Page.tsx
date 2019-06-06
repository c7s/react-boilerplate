import * as React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle, css } from 'styled-components';
import { ie11 } from '../../lib/styles/ie11';
import { CommonProps } from '../../types/CommonProps';
import { Footer, FOOTER_HEIGHT } from '../Footer';
import { Header, HEADER_HEIGHT } from '../Header';
import { OpenGraph } from '../OpenGraph';
import { Status } from '../Status';

interface Props extends CommonProps {
    hideHeader?: boolean;
    hideFooter?: boolean;
    statusCode?: number;
    documentTitle?: string;
    documentDescription?: string;
    bodyBackground?: string;
    ogTitle?: string;
    ogType?: string;
    ogImage?: string;
    ogUrl?: string;
    ogDescription?: string;
    ogLocale?: string;
}

interface PageGlobalStyleProps {
    hideHeader?: boolean;
    hideFooter?: boolean;
    bodyBackground?: string;
}

interface MainProps {
    hideHeader?: boolean;
    hideFooter?: boolean;
}

const Page: React.FC<Props> = ({
    className,
    hideHeader,
    hideFooter,
    statusCode,
    children,
    documentTitle,
    documentDescription,
    bodyBackground,
    ogTitle,
    ogType,
    ogImage,
    ogUrl,
    ogDescription,
    ogLocale,
}) => (
    <React.Fragment>
        <Status code={statusCode || 200}>
            <PageGlobalStyle hideHeader={hideHeader} hideFooter={hideFooter} bodyBackground={bodyBackground} />
            <Helmet>
                <title>{documentTitle || APP_NAME}</title>
                <meta name="description" content={documentDescription || APP_DESCRIPTION} />
            </Helmet>
            <OpenGraph
                title={ogTitle || documentTitle || APP_NAME}
                type={ogType}
                image={ogImage}
                url={ogUrl}
                description={ogDescription || documentDescription || APP_DESCRIPTION}
                locale={ogLocale}
            />
            <Main className={className} hideHeader={hideHeader} hideFooter={hideFooter}>
                {children}
            </Main>
            {!hideHeader ? <Header /> : null}
            {!hideFooter ? <Footer /> : null}
        </Status>
    </React.Fragment>
);

const PageGlobalStyle = createGlobalStyle`
    ${({ bodyBackground }: PageGlobalStyleProps) =>
        bodyBackground
            ? css`
                  html body {
                      background: ${bodyBackground};
                  }
              `
            : ''};

    #root {
        padding-top: ${({ hideHeader }) => (!hideHeader ? `${HEADER_HEIGHT}px` : '0')};
        padding-bottom: ${({ hideFooter }) => (!hideFooter ? `${FOOTER_HEIGHT}px` : '0')};
    }
`;

const Main = styled.main`
    flex-grow: 1;

    ${ie11} {
        /* Won't grow due to IE11 bug, but 100vh can't be used on iOS */
        min-height: ${({ hideFooter, hideHeader }: MainProps) =>
            `calc(100vh - ${!hideHeader ? HEADER_HEIGHT : 0}px - ${!hideFooter ? FOOTER_HEIGHT : 0}px)`};
    }
`;

export { Page, Props };
