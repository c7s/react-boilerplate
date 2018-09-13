import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontFamily, fontFamily, withLoadedFontStatus } from '../../../../fonts';
import { LoadedFontStatus } from '../../../common/store/types';
import { size } from '../../../common/styles';
import { Licenses } from '../Test/ApolloTypes/Licenses';
import C7sIcon from './C7sIcon';
import c7sImage from './c7sImage';
import { SCInnerProps, SCOuterProps } from './DevelopmentPageTypes';

export interface Props extends SCOuterProps, SCInnerProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    licenses: Licenses['licenses'];
    loadedFontStatus: LoadedFontStatus;
    rootVisit(): void;
    name?: string;
    id: string;

    children?: React.ReactNode;
}

/** Assume this file includes theme HOC that uses ThemeOuterProps */
const DevelopmentPage: React.StatelessComponent<Props> = ({ counter, onClick, licenses, loadedFontStatus, id }) => (
    <div>
        <div>
            Loaded font status:
            {JSON.stringify(loadedFontStatus)}
        </div>
        <div>
            id:
            {id}
        </div>
        <Greeting>Greetings:</Greeting>
        {counter}
        <button onClick={onClick}>Droppy</button>
        {licenses.length ? licenses.map(license => (license ? license.nickname : 'N/A')) : 'Loading'}
        <Link to="/development/3">Root</Link>
        <Image src={c7sImage} />
        <C7sIcon />
    </div>
);

const GreetingMediumCss = css`
    color: #aaff00;
`;

const Greeting = withLoadedFontStatus(styled.div`
    color: #ffaa00;
    font-weight: bold;
    ${fontFamily(FontFamily.BITTER)};
    ${size.medium`${GreetingMediumCss};`};
`);

const Image = styled.img``;

export { DevelopmentPage };
