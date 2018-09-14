import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledComponentsProps } from '../../../common/lib/BaseProps';

export const RootPage: React.StatelessComponent<StyledComponentsProps> = ({ className }) => (
    <Root className={className}>
        <Header>React-boilerplate</Header>
        <Link to={'/development/3'}>Development</Link>
    </Root>
);

const Root = styled.div``;

const Header = styled.h1``;
