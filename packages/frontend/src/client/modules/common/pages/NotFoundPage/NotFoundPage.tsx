import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkThemeMode } from '../../components/Link';
import { Page } from '../../components/Page';
import { routes } from '../../lib/routes';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {}

const NotFoundPage: React.FC<Props> = ({ className }) => (
    <Root className={className} statusCode={404} documentTitle="Страница не найдена" hideHeader hideFooter>
        <Header>404</Header>
        <Text>
            Данная страница не существует.
            {'\n'}
            Попробуйте{' '}
            <Link to={routes.ROOT.path} theme={{ mode: LinkThemeMode.TEXT }}>
                вернуться на главную
            </Link>
            .
        </Text>
    </Root>
);

const Root = styled(Page)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: pre-line;
`;

const Header = styled.h1`
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 30px;
    line-height: 30px;
`;

const Text = styled.p`
    font-size: 16px;
    line-height: 18px;
`;

export { NotFoundPage, Props };
