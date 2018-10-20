import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../lib/routes';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {}

const NotFoundPageTemplate: React.StatelessComponent<Props> = ({ className }) => (
    <Root className={className}>
        <Header>404</Header>
        <Text>
            Данная страница не существует.
            {'\n'}
            Попробуйте <Link to={routes.ROOT.path}>вернуться на главную.</Link>
        </Text>
    </Root>
);

const Root = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    text-align: center;
    white-space: pre-line;
`;

const Header = styled.h1``;

const Text = styled.p``;

export { NotFoundPageTemplate, Props };
