import * as React from 'react';
import styled from 'styled-components';
import { Accordion } from '../../../common/components/Accordion';
import { Button, ButtonThemeMode } from '../../../common/components/Button';
import { ComponentShowcase } from '../../../common/components/ComponentShowcase';
import { Link, LinkThemeMode } from '../../../common/components/Link';
import { Modal } from '../../../common/components/Modal';
import { Page } from '../../../common/components/Page';
import { SocialShare } from '../../../common/components/SocialShare';
import { useModalOpenState } from '../../../common/lib/react-hooks/useModalOpenState';
import { Mode } from '../../../common/lib/react-hooks/useViewportSize';
import { routes } from '../../../common/lib/routes';
import { isBoolean, isCompositionOf, isNumber, isOneOf, isString } from '../../../common/lib/validators';
import { CommonProps } from '../../../common/types/CommonProps';
import { ViewportDisplay } from './ViewportDisplay';

interface Props extends CommonProps {}

const ShowcasePage: React.FC<Props> = ({ className }) => {
    const { isModalOpen, onModalClose, onModalOpen } = useModalOpenState();

    return (
        <Root className={className} documentTitle="Component Showcase">
            <Header>Component Showcase</Header>
            <BackLink to={routes.ROOT.path} theme={{ mode: LinkThemeMode.TEXT }}>
                Back to Root
            </BackLink>
            <ShowcaseGroup>
                <ComponentShowcase
                    name="useViewport"
                    linkTo="https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/lib/react-hooks/useViewportSize.ts"
                    initialComponentDataProps={
                        {
                            mode: Mode.EXACT,
                            includeVerticalScrollbar: false,
                        } as any
                    }
                    componentPropsValidators={{
                        mode: isOneOf({ items: Object.values(Mode) }),
                        includeVerticalScrollbar: isBoolean(),
                    }}
                    component={ViewportDisplay}
                />
                <ComponentShowcase
                    name="Button"
                    linkTo="https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Button"
                    initialComponentDataProps={
                        {
                            to: 'https://google.com',
                            children: 'Button with link to google',
                            disabled: false,
                            theme: { mode: ButtonThemeMode.PRIMARY },
                        } as any
                    }
                    componentPropsValidators={{
                        to: isString(),
                        disabled: isBoolean(),
                        theme: isCompositionOf({
                            items: {
                                mode: isOneOf({ items: Object.values(ButtonThemeMode) }),
                            },
                        }),
                    }}
                    component={Button}
                />
                <ComponentShowcase
                    name="Link"
                    linkTo="https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Link"
                    initialComponentDataProps={
                        {
                            to: 'https://google.com',
                            children: 'Link to google',
                            disabled: true,
                            theme: { mode: LinkThemeMode.TEXT },
                        } as any
                    }
                    componentPropsValidators={{
                        to: isString(),
                        disabled: isBoolean(),
                        theme: isCompositionOf({
                            items: {
                                mode: isOneOf({ items: Object.values(LinkThemeMode) }),
                            },
                        }),
                    }}
                    component={Link}
                />
                <ComponentShowcase
                    name="Accordion"
                    linkTo="https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Accordion"
                    initialComponentDataProps={
                        {
                            collapseThreshold: 100,
                            collapsedHeight: 50,
                        } as any
                    }
                    initialComponentFuncProps={{
                        children: <AccordionContent>Accordion Content {'\n\n\n\n'} (200 px height)</AccordionContent>,
                    }}
                    componentPropsValidators={{
                        collapseThreshold: isNumber(),
                        collapsedHeight: isNumber(),
                    }}
                    component={Accordion}
                />
                <ComponentShowcase
                    name="Modal"
                    linkTo="https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Modal"
                    initialComponentDataProps={
                        {
                            closeOnEsc: true,
                            closeOnOverlayClick: true,
                            center: true,
                            showCloseIcon: true,
                            closeIconSize: 28,
                            animationDuration: 200,
                            blockScroll: true,
                            focusTrapped: true,
                        } as any
                    }
                    initialComponentFuncProps={{
                        open: isModalOpen,
                        onClose: onModalClose,
                        children: <ModalContent>Modal Content {'\n'} height: 200vh;</ModalContent>,
                    }}
                    componentPropsValidators={{
                        closeOnEsc: isBoolean(),
                        closeOnOverlayClick: isBoolean(),
                        center: isBoolean(),
                        showCloseIcon: isBoolean(),
                        closeIconSize: isNumber(),
                        animationDuration: isNumber(),
                        blockScroll: isBoolean(),
                        focusTrapped: isBoolean(),
                    }}
                    component={Modal}
                >
                    <Button onClick={onModalOpen}>Show Modal</Button>
                </ComponentShowcase>
                <ComponentShowcase
                    name="SocialShare"
                    linkTo="https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/SocialShare"
                    initialComponentDataProps={
                        {
                            url: 'https://google.com',
                            title: 'Share showcase',
                            image: '',
                            vk: {
                                url: 'https://google.com',
                                title: 'Share showcase',
                                image: '',
                                noparse: false,
                                // eslint-disable-next-line @typescript-eslint/camelcase
                                no_vk_links: 0,
                            },
                            ok: {
                                url: 'https://google.com',
                                title: 'Share showcase',
                                imageUrl: '',
                            },
                            tw: {
                                url: 'https://google.com',
                                text: 'Share showcase',
                                hashtags: 'react,boilerplate,c7s',
                                via: 'fenok',
                            },
                            fb: {
                                u: 'https://google.com',
                            },
                            native: {
                                url: 'https://google.com',
                                title: 'Share showcase',
                                text: 'Share showcase text',
                            },
                        } as any
                    }
                    componentPropsValidators={{
                        url: isString(),
                        title: isString(),
                        image: isString(),
                        vk: isCompositionOf({
                            items: {
                                url: isString(),
                                title: isString(),
                                image: isString(),
                                noparse: isBoolean(),
                                // eslint-disable-next-line @typescript-eslint/camelcase
                                no_vk_links: isNumber(),
                            },
                        }),
                        ok: isCompositionOf({
                            items: {
                                url: isString(),
                                title: isString(),
                                imageUrl: isString(),
                            },
                        }),
                        tw: isCompositionOf({
                            items: {
                                url: isString(),
                                text: isString(),
                                hashtags: isString(),
                                via: isString(),
                            },
                        }),
                        fb: isCompositionOf({
                            items: {
                                u: isString(),
                            },
                        }),
                        native: isCompositionOf({
                            items: {
                                url: isString(),
                                title: isString(),
                                text: isString(),
                            },
                        }),
                    }}
                    component={SocialShare}
                />
            </ShowcaseGroup>
        </Root>
    );
};

const Root = styled(Page)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Header = styled.h1`
    font-weight: bold;
    margin: 20px;
`;

const BackLink = styled(Link)`
    margin: 0 20px 20px;

    /* Fix hash link overlap */
    position: relative;
`;

const ShowcaseGroup = styled.div`
    margin-top: 20px;
    align-self: stretch;

    /* NOT FOR PRODUCTION. Styled-components messes up types for ComponentShowcase (even more) */
    > :not(:first-child) {
        margin-top: 30px;
    }
`;

const ModalContent = styled.div`
    height: 200vh;
    width: 200px;
    white-space: pre-line;
`;

const AccordionContent = styled.div`
    height: 200px;
    white-space: pre-line;
`;

export { ShowcasePage, Props };
