import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../../../routes';
import { StyledComponentsProps } from '../../../common/lib/BaseProps';

export const RootPage: React.StatelessComponent<StyledComponentsProps> = ({ className }) => (
    <Root className={className}>
        <Header>React-boilerplate</Header>
        <Link
            to={routes.DEVELOPMENT.url.withParams({
                path: { id: '1', name: 'Sir' },
                query: { queryFirst: '2', querySecond: '3' },
            })}
        >
            Development
        </Link>
    </Root>
);

const Root = styled.div``;

const Header = styled.h1``;
