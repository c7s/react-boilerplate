import { Dictionary } from 'lodash';
import * as React from 'react';
import { QueryResult } from 'react-apollo';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontFamily, fontFamily, withLoadedFontStatus } from '../../../../fonts';
import { routes } from '../../../../routes';
import { CommonInnerProps, CommonProps } from '../../../common/lib/CommonProps';
import { size } from '../../../common/lib/styles';
import { withTheme } from '../../../common/lib/withTheme';
import { LoadedFontStatus } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';
import C7sIcon from './C7sIcon.svg';
import c7sImage from './c7sImage.png';

/** Props to render component template. Don't forget to extend CurrentCommonProps */

interface Props extends CurrentCommonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    licenses: QueryResult<Partial<Licenses>>;
    loadedFontStatus: LoadedFontStatus;
    onRootVisit(): void;
    name?: string;
    id: string;
}

/** Shortcuts for current common (inner) props (could also be just Common(Inner)Props without generic part) */

type CurrentCommonProps = CommonProps<ThemeName>;
type CurrentInnerCommonProps = CommonInnerProps<Theme>;

/** Interfaces for inner styled components. Inner styled components could be moved to separate file */

interface GreetingProps extends CurrentInnerCommonProps {}

/** In case of theme */

enum ThemeName {
    DEFAULT = 'default',
    ALTER = 'alter',
}

/** In case of theme, theme object type */

interface Theme {
    greetingColor: string;
}

/** In case of theme, mapping between theme name and theme object */

const THEME_DICT: Dictionary<Theme> = {
    [ThemeName.DEFAULT]: {
        greetingColor: '#aaff00',
    },
    [ThemeName.ALTER]: {
        greetingColor: '#ffaa00',
    },
};

/** In case of theme, withTheme is added, ensuring that outer 'themeName' converts to inner 'theme' (types included) */

const DevelopmentPageTemplate: React.StatelessComponent<Props> = withTheme<ThemeName, Theme, Props>(THEME_DICT)(
    ({ className, counter, onClick, licenses, loadedFontStatus, id, name, theme /** can't get 'themeName' here*/ }) => (
        /** It's mandatory to pass className to root element */
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
            <Link to={routes.ROOT.path}>Root</Link>
            <Image src={c7sImage} />
            <C7sIcon />
        </Root>
    ),
);

/** Styled components */

const Root = styled.div``;

const ThemeDisplay = styled.div``;

const LoadedFontStatusDisplay = styled.div``;

const PageId = styled.div``;

const StateCounter = styled.div``;

const LicensesDisplay = styled.div``;

/** Responsive styling example */

const GreetingMediumCss = css`
    font-weight: normal;
    font-style: italic;
`;

/** It's mandatory to wrap component with fontFamily to withLoadedFontStatus */

const Greeting = withLoadedFontStatus(styled.div`
    color: ${({ theme }: GreetingProps) => theme!.greetingColor};
    font-weight: bold;
    ${fontFamily(FontFamily.BITTER)};
    ${size.medium`${GreetingMediumCss};`};
`);

const Image = styled.img`
    display: block;
`;

/** Single export is mandatory */

export { DevelopmentPageTemplate, Props, CurrentCommonProps, CurrentInnerCommonProps, ThemeName };
