import * as React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle, css } from 'styled-components';
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

const PageTemplate: React.FC<Props> = ({
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
            <Main className={className}>{children}</Main>
            {!hideHeader ? <Header /> : null}
            {!hideFooter ? <Footer /> : null}
        </Status>
    </React.Fragment>
);

const PageGlobalStyle = createGlobalStyle`
    ${({ bodyBackground }: PageGlobalStyleProps) =>
        bodyBackground
            ? css`
                  body {
                      background: ${bodyBackground};
                  }
              `
            : ''};

    #root {
        padding-top: ${({ hideHeader }) => (!hideHeader ? `${HEADER_HEIGHT}px` : '0')};
        padding-bottom: ${({ hideFooter }) => (!hideFooter ? `${FOOTER_HEIGHT}px` : '0')};
    }
`;

const Main = styled.main``;

export { PageTemplate, Props };
