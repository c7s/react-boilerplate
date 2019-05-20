import * as React from 'react';
import { QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { Button, ButtonThemeName } from '../../../common/components/Button';
import { Modal } from '../../../common/components/Modal';
import { Page } from '../../../common/components/Page';
import { displayAt, mediaWidth, Width } from '../../../common/lib/media';
import { useApolloErrorReporter } from '../../../common/lib/react-hooks/useApolloErrorReporter';
import { routes } from '../../../common/lib/routes';
import { withTheme } from '../../../common/lib/withTheme';
import { LoadedFontStatus, Message } from '../../../common/store/types';
import { CommonInnerProps, CommonProps } from '../../../common/types/CommonProps';
import { Books } from './ApolloTypes/Books';
import C7sIcon from './C7sIcon.svg';
import c7sImage from './c7sImage.png';

/** Props to render component template. Don't forget to extend CurrentCommonProps */

interface Props extends CurrentCommonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    isModalOpen: boolean;
    booksQueryResult: QueryResult<Partial<Books>>;
    loadedFontStatus: LoadedFontStatus;
    name?: string;
    id: string;
    querySingle?: string;
    queryArray?: string[];
    onMessageAdd(message: Message): void;
    onOpenModalClick(): void;
    onModalRequestClose(): void;
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

const DevelopmentPageTemplate: React.FC<Props> = withTheme<ThemeName, Theme, HTMLElement, Props>(THEME_DICT)(
    ({
        className,
        counter,
        isModalOpen,
        onClick,
        onModalRequestClose,
        onOpenModalClick,
        booksQueryResult,
        loadedFontStatus,
        id,
        querySingle,
        queryArray,
        name,
        theme /** Can't get 'themeName' here */,
    }) => {
        /** Universal graphql error handler */
        useApolloErrorReporter(booksQueryResult);

        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const anchorRef = React.useRef<HTMLAnchorElement>(null);

        React.useEffect(() => {
            // eslint-disable-next-line no-console
            console.log(buttonRef.current);
            // eslint-disable-next-line no-console
            console.log(anchorRef.current);
        }, []);

        const { data: booksQueryResultData = {} } = booksQueryResult;

        return (
            /** It's mandatory to pass className to root element */
            <Root
                className={className}
                documentTitle={`${counter} Development page`}
                ogTitle="Development page"
                bodyBackground="#008080"
            >
                <Greeting>Greetings, {name || 'Unknown'}</Greeting>
                <ThemeDisplay>Theme: {JSON.stringify(theme)}</ThemeDisplay>
                <LoadedFontStatusDisplay>
                    Loaded font status: {JSON.stringify(loadedFontStatus)}
                </LoadedFontStatusDisplay>
                <UrlData>Page id: {id}</UrlData>
                <UrlData>QuerySingle: {querySingle}</UrlData>
                <UrlData>QueryArray: {JSON.stringify(queryArray)}</UrlData>
                <StateCounter>State counter: {counter}</StateCounter>
                <StyledButton themeName={ButtonThemeName.PRIMARY} onClick={onClick} ref={buttonRef}>
                    Drop Counter (Button)
                </StyledButton>
                <LicensesDisplay>
                    Book authors:{' '}
                    {booksQueryResultData.books
                        ? booksQueryResultData.books.map(book => `${book.author}, `)
                        : 'No data'}
                    {booksQueryResult.loading ? ' - Loading' : ''}
                </LicensesDisplay>
                <Button themeName={ButtonThemeName.PRIMARY} to={routes.ROOT.path}>
                    Root (Button-Link)
                </Button>
                <StyledButton disabled to={routes.ROOT.path} themeName={ButtonThemeName.SEAMLESS} ref={anchorRef}>
                    Disabled State (Button-Link)
                </StyledButton>
                <Button onClick={onOpenModalClick}>Modal (Button)</Button>
                <Image src={c7sImage} />
                <PositionedC7sIcon />
                <Modal open={isModalOpen} onClose={onModalRequestClose}>
                    <ModalContent>Modal {'\n\n\n\n\n\n\n\n'} Modal</ModalContent>
                </Modal>
            </Root>
        );
    },
);

/** Styled components */

const Root = styled(Page)``;

const ThemeDisplay = styled.div``;

const LoadedFontStatusDisplay = styled.div`
    word-break: break-all;
`;

const UrlData = styled.div`
    margin-top: 300px;
`;

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

const ModalContent = styled.div`
    background-color: #ffffff;
    width: 100px;
    height: 100px;
    white-space: pre;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;

const StyledButton = styled(Button)`
    color: #ff00ff;
`;

/** Single export is mandatory */

export { DevelopmentPageTemplate, Props, CurrentCommonProps, CurrentInnerCommonProps, ThemeName };
