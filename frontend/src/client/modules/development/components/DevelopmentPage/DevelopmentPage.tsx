import { Dictionary } from 'lodash';
import * as React from 'react';
import { QueryResult } from 'react-apollo';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontFamily, fontFamily, withLoadedFontStatus } from '../../../../fonts';
import { routes } from '../../../../routes';
import { StyledComponentsInnerProps, StyledComponentsProps } from '../../../common/lib/BaseProps';
import { size } from '../../../common/lib/styles';
import { withTheme } from '../../../common/lib/withTheme';
import { LoadedFontStatus } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';
import C7sIcon from './C7sIcon';
import c7sImage from './c7sImage';

export interface Props extends StyledComponentsProps<ThemeName>, StyledComponentsInnerProps<Theme> {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    licenses: QueryResult<Partial<Licenses>>;
    loadedFontStatus: LoadedFontStatus;
    onRootVisit(): void;
    name?: string;
    id: string;
}

export interface Theme {
    greetingColor: string;
}

export enum ThemeName {
    DEFAULT = 'default',
    ALTER = 'alter',
}

export const THEME_DICT: Dictionary<Theme> = {
    [ThemeName.DEFAULT]: {
        greetingColor: '#aaff00',
    },
    [ThemeName.ALTER]: {
        greetingColor: '#ffaa00',
    },
};

const DevelopmentPage = withTheme<ThemeName, Props, Theme>(THEME_DICT)(
    ({ className, counter, onClick, licenses, loadedFontStatus, id, name, theme }) => (
        <Root className={className}>
            <Helmet>
                <title>{`${counter} Development page`}</title>
            </Helmet>
            <Greeting>Greetings, {name ? name : 'Unknown'}</Greeting>
            <ThemeDisplay>Theme: {JSON.stringify(theme)}</ThemeDisplay>
            <LoadedFontStatusDisplay>Loaded font status: {JSON.stringify(loadedFontStatus)}</LoadedFontStatusDisplay>
            <PageId>Page id: {id}</PageId>
            <StateCounter>State counter: {counter}</StateCounter>
            <button onClick={onClick}>Droppy</button>
            <LicensesDisplay>
                Licenses:{' '}
                {licenses.data && licenses.data.licenses
                    ? licenses.data.licenses.map(license => (license ? license.nickname : 'No nickname'))
                    : 'No data'}
            </LicensesDisplay>
            <Link to={routes.ROOT.url.raw()}>Root</Link>
            <Image src={c7sImage} />
            <C7sIcon />
        </Root>
    ),
);

const Root = styled.div``;

const ThemeDisplay = styled.div``;

const LoadedFontStatusDisplay = styled.div``;

const PageId = styled.div``;

const StateCounter = styled.div``;

const LicensesDisplay = styled.div``;

const GreetingMediumCss = css`
    font-weight: normal;
    font-style: italic;
`;

const Greeting = withLoadedFontStatus(styled.div`
    color: ${({ theme }: StyledComponentsInnerProps<Theme>) => theme!.greetingColor};
    font-weight: bold;
    ${fontFamily(FontFamily.BITTER)};
    ${size.medium`${GreetingMediumCss};`};
`);

const Image = styled.img`
    display: block;
`;

export { DevelopmentPage };
