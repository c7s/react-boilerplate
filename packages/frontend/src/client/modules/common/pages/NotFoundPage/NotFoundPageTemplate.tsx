import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkThemeName } from '../../components/Link';
import { Page } from '../../components/Page';
import { routes } from '../../lib/routes';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {}

const NotFoundPageTemplate: React.FC<Props> = ({ className }) => (
    <StyledPage className={className} statusCode={404} documentTitle={'Страница не найдена'}>
        <Header>404</Header>
        <Text>
            Данная страница не существует.
            {'\n'}
            Попробуйте{' '}
            <Link to={routes.ROOT.path} themeName={LinkThemeName.TEXT}>
                вернуться на главную.
            </Link>
        </Text>
    </StyledPage>
);

const StyledPage = styled(Page)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    text-align: center;
    white-space: pre-line;
`;

const Header = styled.h1`
    font-weight: bold;
`;

const Text = styled.p``;

export { NotFoundPageTemplate, Props };
