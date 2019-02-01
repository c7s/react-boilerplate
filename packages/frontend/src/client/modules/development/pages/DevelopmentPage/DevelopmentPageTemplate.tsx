import * as React from 'react';
import { QueryResult } from 'react-apollo';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from '../../../common/components/Link';
import { displayAt, mediaWidth, Width } from '../../../common/lib/media';
import { routes } from '../../../common/lib/routes';
import { withTheme } from '../../../common/lib/withTheme';
import { LoadedFontStatus, Message } from '../../../common/store/types';
import { CommonInnerProps, CommonProps } from '../../../common/types/CommonProps';
import { Licenses } from './ApolloTypes/Licenses';
import C7sIcon from './C7sIcon.svg';
import c7sImage from './c7sImage.png';

/** Props to render component template. Don't forget to extend CurrentCommonProps */

interface Props extends CurrentCommonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    licenses: QueryResult<Partial<Licenses>>;
    loadedFontStatus: LoadedFontStatus;
    name?: string;
    id: string;
    querySingle?: string;
    queryArray?: string[];
    onMessageAdd(message: Message): void;
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

const THEME_DICT: EnumedDict<ThemeName, Theme> = {
    [ThemeName.DEFAULT]: {
        greetingColor: '#aaff00',
    },
    [ThemeName.ALTER]: {
        greetingColor: '#ffaa00',
    },
};

/** In case of theme, withTheme is added, ensuring that outer 'themeName' converts to inner 'theme' (types included) */

const DevelopmentPageTemplate: React.FC<Props> = withTheme<ThemeName, Theme, Props>(THEME_DICT)(
    ({
        className,
        counter,
        onClick,
        licenses,
        loadedFontStatus,
        id,
        querySingle,
        queryArray,
        name,
        theme /** can't get 'themeName' here*/,
    }) => (
        /** It's mandatory to pass className to root element */
        <Root className={className}>
            <Helmet>
                <title>{`${counter} Development page`}</title>
            </Helmet>
            <Greeting>Greetings, {name ? name : 'Unknown'}</Greeting>
            <ThemeDisplay>Theme: {JSON.stringify(theme)}</ThemeDisplay>
            <LoadedFontStatusDisplay>Loaded font status: {JSON.stringify(loadedFontStatus)}</LoadedFontStatusDisplay>
            <UrlData>Page id: {id}</UrlData>
            <UrlData>QuerySingle: {querySingle}</UrlData>
            <UrlData>QueryArray: {JSON.stringify(queryArray)}</UrlData>
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
            <PositionedC7sIcon />
        </Root>
    ),
);

/** Styled components */

const Root = styled.div`
    min-height: 100%;
`;

const ThemeDisplay = styled.div``;

const LoadedFontStatusDisplay = styled.div`
    word-break: break-all;
`;

const UrlData = styled.div``;

const StateCounter = styled.div``;

const LicensesDisplay = styled.div``;

/** Responsive styling example */

const Greeting = styled.div`
    color: ${({ theme }: GreetingProps) => theme!.greetingColor};
    font-weight: bold;

    ${mediaWidth.m} {
        font-weight: normal;
        font-style: italic;
    }
`;

const Image = styled.img`
    display: block;
    ${displayAt(Width.S, Width.M)};
`;

const PositionedC7sIcon = styled(C7sIcon)`
    ${displayAt(Width.M)};
`;

/** Single export is mandatory */

export { DevelopmentPageTemplate, Props, CurrentCommonProps, CurrentInnerCommonProps, ThemeName };
