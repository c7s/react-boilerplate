import * as React from 'react';
import { QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { useAppState } from '../../../common/components/AppStateProvider';
import { Button, ButtonThemeMode } from '../../../common/components/Button';
import { Modal } from '../../../common/components/Modal';
import { Page } from '../../../common/components/Page';
import { displayAt, mediaWidth, Width } from '../../../common/lib/media';
import { useApolloErrorReporter } from '../../../common/lib/react-hooks/useApolloErrorReporter';
import { routes } from '../../../common/lib/routes';
import { CommonProps } from '../../../common/types/CommonProps';
import { Books } from './ApolloTypes/Books';
import C7sIcon from './C7sIcon.svg';
import c7sImage from './c7sImage.png';

/** Props to render component template. Don't forget to extend CurrentCommonProps */

interface Props extends CommonProps, RouteComponentProps<FirstArgument<typeof routes.DEVELOPMENT.pathWithParams>> {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    isModalOpen: boolean;
    booksQueryResult: QueryResult<Partial<Books>>;
    onOpenModalClick(): void;
    onModalRequestClose(): void;
}

const DevelopmentPageTemplate: React.FC<Props> = ({
    className,
    counter,
    isModalOpen,
    onClick,
    onModalRequestClose,
    onOpenModalClick,
    booksQueryResult,
    match,
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

    const { loadedFontStatus } = useAppState();

    return (
        /** It's mandatory to pass className to root element */
        <Root
            className={className}
            documentTitle={`${counter} Development page`}
            ogTitle="Development page"
            bodyBackground="#008080"
        >
            <Greeting>Greetings, {match.params.name || 'Unknown'}</Greeting>
            <LoadedFontStatusDisplay>Loaded font status: {JSON.stringify(loadedFontStatus)}</LoadedFontStatusDisplay>
            <UrlData>{JSON.stringify(match.params)}</UrlData>
            <StateCounter>State counter: {counter}</StateCounter>
            <StyledButton onClick={onClick} ref={buttonRef}>
                Drop Counter (Button)
            </StyledButton>
            <LicensesDisplay>
                Book authors:{' '}
                {booksQueryResultData.development
                    ? booksQueryResultData.development.books.map(book => `${book.author}, `)
                    : 'No data'}
                {booksQueryResult.loading ? ' - Loading' : ''}
            </LicensesDisplay>
            <Button theme={{ mode: ButtonThemeMode.PRIMARY }}>Root (Button-Link)</Button>
            <StyledButton disabled to={routes.ROOT.path} theme={{ mode: ButtonThemeMode.PRIMARY }} ref={anchorRef}>
                Disabled State (Button-Link)
            </StyledButton>
            <Button theme={{ mode: ButtonThemeMode.PRIMARY }} onClick={onOpenModalClick}>
                Modal (Button)
            </Button>
            <Image src={c7sImage} />
            <PositionedC7sIcon />
            <Modal open={isModalOpen} onClose={onModalRequestClose}>
                <ModalContent>Modal {'\n\n\n\n\n\n\n\n'} Modal</ModalContent>
            </Modal>
        </Root>
    );
};

/** Styled components */

const Root = styled(Page)``;

const LoadedFontStatusDisplay = styled.div`
    word-break: break-all;
`;

const UrlData = styled.div``;

const StateCounter = styled.div``;

const LicensesDisplay = styled.div``;

/** Responsive styling example */

const Greeting = styled.div`
    color: #ff8800;
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

export { DevelopmentPageTemplate, Props };
