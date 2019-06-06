import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkThemeMode } from '../../../common/components/Link';
import { Page } from '../../../common/components/Page';
import { routes } from '../../../common/lib/routes';
import { CommonProps } from '../../../common/types/CommonProps';

interface Props extends CommonProps {}

const RootPage: React.FC<Props> = ({ className }) => (
    <Root className={className} documentTitle={APP_NAME}>
        <Header>{APP_NAME}</Header>
        <PositionedLink theme={{ mode: LinkThemeMode.TEXT }} to={routes.SHOWCASE.pathWithParams({})}>
            Component Showcase
        </PositionedLink>
        <PositionedLink theme={{ mode: LinkThemeMode.TEXT }} to={routes.APOLLO_DEMO.path}>
            Apollo Demo
        </PositionedLink>
        <PositionedLink theme={{ mode: LinkThemeMode.TEXT }} to="/broken-link">
            Broken Link
        </PositionedLink>
        <PositionedLink
            theme={{ mode: LinkThemeMode.TEXT }}
            to={routes.DEVELOPMENT.pathWithParams({
                name: 'Sir',
                id: '1',
                query: { querySingle: { absolutely: 'anything' }, queryArray: [true, false] },
                hash: 'hashValue',
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

export { RootPage, Props };
