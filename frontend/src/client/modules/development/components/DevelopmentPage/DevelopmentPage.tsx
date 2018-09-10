import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontFamily, fontFamily, withLoadedFontStatus } from '../../../../fonts';
import { routes } from '../../../../routes';
import { size } from '../../../common/styles';
import C7sIcon from './C7sIcon';
import c7sImage from './c7sImage';
import { DevelopmentPageProps } from './DevelopmentPageTypes';

const DevelopmentPage = ({ counter, onClick, licenses }: DevelopmentPageProps) => (
    <div>
        <Greeting>Greetings:</Greeting>
        {counter}
        <button onClick={onClick}>Droppy</button>
        {licenses.length ? licenses.map(license => license.nickname) : 'Loading'}
        <Link to={routes.ROOT.path}>Root</Link>
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
