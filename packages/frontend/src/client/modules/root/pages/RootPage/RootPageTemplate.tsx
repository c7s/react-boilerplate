import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkThemeName } from '../../../common/components/Link';
import { Page } from '../../../common/components/Page';
import { routes } from '../../../common/lib/routes';
import { CommonInnerProps, CommonProps } from '../../../common/types/CommonProps';

interface Props extends CurrentCommonProps {}

type CurrentCommonProps = CommonProps;
type CurrentInnerCommonProps = CommonInnerProps;

const RootPageTemplate: React.FC<Props> = ({ className }) => (
    <Root className={className} documentTitle={APP_NAME}>
        <Header>{APP_NAME}</Header>
        <PositionedLink themeName={LinkThemeName.TEXT} to={routes.SHOWCASE.path}>
            Component Showcase
        </PositionedLink>
        <PositionedLink themeName={LinkThemeName.TEXT} to="/broken-link">
            Broken Link
        </PositionedLink>
        <PositionedLink
            themeName={LinkThemeName.TEXT}
            to={routes.DEVELOPMENT.pathWithParams({
                name: 'Sir',
                id: '1',
                query: { querySingle: 'queryValue', queryArray: ['array'] },
            })}
        >
            Development
        </PositionedLink>
    </Root>
);

const Root = styled(Page)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Header = styled.h1`
    font-weight: bold;
    margin: 20px;
`;

const PositionedLink = styled(Link)`
    margin: 20px;
`;

export { RootPageTemplate, Props, CurrentCommonProps, CurrentInnerCommonProps };
