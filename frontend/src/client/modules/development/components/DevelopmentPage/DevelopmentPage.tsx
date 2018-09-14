import { Dictionary } from 'lodash';
import * as React from 'react';
import { QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontFamily, fontFamily, withLoadedFontStatus } from '../../../../fonts';
import { StyledComponentsInnerProps, StyledComponentsProps } from '../../../common/lib/BaseProps';
import { withTheme } from '../../../common/lib/withTheme';
import { LoadedFontStatus } from '../../../common/store/types';
import { size } from '../../../common/styles';
import { Licenses } from './ApolloTypes/Licenses';
import C7sIcon from './C7sIcon';
import c7sImage from './c7sImage';

export interface Props extends StyledComponentsProps<ThemeName>, StyledComponentsInnerProps<Theme> {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    licenses: QueryResult<Licenses>;
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
    ({ counter, onClick, licenses, loadedFontStatus, id }) => (
        <div>
            <div>
                Loaded font status:
                {JSON.stringify(loadedFontStatus)}
            </div>
            <div>id: {id}</div>
            <Greeting>Greetings:</Greeting>
            {counter}
            <button onClick={onClick}>Droppy</button>
            {licenses.data
                ? licenses.data.licenses.map(license => (license ? license.nickname : 'No nickname'))
                : 'No data'}
            <Link to="/development/3">Root</Link>
            <Image src={c7sImage} />
            <C7sIcon />
        </div>
    ),
);

const GreetingMediumCss = css`
    color: #aaff00;
`;

const Greeting = withLoadedFontStatus(styled.div`
    color: ${({ theme }: StyledComponentsInnerProps<Theme>) => theme!.greetingColor};
    font-weight: bold;
    ${fontFamily(FontFamily.BITTER)};
    ${size.medium`${GreetingMediumCss};`};
`);

const Image = styled.img``;

export { DevelopmentPage };
