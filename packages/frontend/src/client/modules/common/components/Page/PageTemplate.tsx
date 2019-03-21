import * as React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle, css } from 'styled-components';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';
import { Footer } from '../Footer';
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
    bodyBackground?: string;
}

interface RootProps extends CommonInnerProps {
    hideHeader?: boolean;
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
    <Root className={className}>
        <Status code={statusCode || 200}>
            <PageGlobalStyle bodyBackground={bodyBackground} />
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
            {!hideHeader ? <Header /> : null}
            {children}
            {!hideFooter ? <Footer /> : null}
        </Status>
    </Root>
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
`;

const Root = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: ${({ hideHeader }: RootProps) => (!hideHeader ? `${HEADER_HEIGHT}px` : '0')};

    @supports (position: sticky) {
        padding-top: 0;
    }
`;

export { PageTemplate, Props };
