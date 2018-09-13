import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontFamily, fontFamily, withLoadedFontStatus } from '../../../../fonts';
import { size } from '../../../common/styles';
import C7sIcon from './C7sIcon';
import c7sImage from './c7sImage';
import { ComponentOuterProps } from './DevelopmentPageTypes';
/** Assume this file includes theme HOC that uses ThemeOuterProps */
const DevelopmentPage: React.StatelessComponent<ComponentOuterProps> = ({
    counter,
    onClick,
    licenses,
    loadedFontStatus,
    id,
}) => (
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
