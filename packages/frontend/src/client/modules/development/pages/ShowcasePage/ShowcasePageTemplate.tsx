import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Button, ButtonThemeName } from '../../../common/components/Button';
import { ComponentShowcase } from '../../../common/components/ComponentShowcase';
import { Link, LinkThemeName } from '../../../common/components/Link';
import { Modal } from '../../../common/components/Modal';
import { routes } from '../../../common/lib/routes';
import { isBoolean, isNumber, isOneOf, isString } from '../../../common/lib/validators';
import { CommonProps } from '../../../common/types/CommonProps';

interface Props extends CommonProps {
    isModalOpen: boolean;
    onModalOpen(): void;
    onModalClose(): void;
}

const ShowcasePageTemplate: React.FC<Props> = ({ className, isModalOpen, onModalClose, onModalOpen }) => (
    <Root className={className}>
        <Helmet>
            <title>Component Showcase</title>
        </Helmet>
        <Header>Component Showcase</Header>
        <BackLink to={routes.ROOT.path} themeName={LinkThemeName.TEXT}>
            Back to Root
        </BackLink>
        <ShowcaseGroup>
            <ComponentShowcase
                name={'Button'}
                linkTo={
                    'https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Button'
                }
                initialComponentDataProps={
                    {
                        to: 'https://google.com',
                        children: 'Button with link to google',
                        disabled: false,
                        themeName: ButtonThemeName.PRIMARY,
                    } as any
                }
                componentPropsValidators={{
                    to: isString(),
                    disabled: isBoolean(),
                    themeName: isOneOf({ items: Object.values(ButtonThemeName) }),
                }}
                component={Button}
            />
            <ComponentShowcase
                name={'Link'}
                linkTo={
                    'https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Link'
                }
                initialComponentDataProps={
                    {
                        to: 'https://google.com',
                        children: 'Link to google',
                        disabled: true,
                        themeName: LinkThemeName.TEXT,
                    } as any
                }
                componentPropsValidators={{
                    to: isString(),
                    disabled: isBoolean(),
                    themeName: isOneOf({ items: Object.values(LinkThemeName) }),
                }}
                component={Link}
            />
            <ComponentShowcase
                name={'Modal'}
                linkTo={
                    'https://github.com/c7s/react-boilerplate/blob/master/packages/frontend/src/client/modules/common/components/Modal'
                }
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
        </ShowcaseGroup>
    </Root>
);

const Root = styled.div`
    min-height: 100%;
`;

const Header = styled.h1`
    font-weight: bold;
    margin: 20px;
`;

const BackLink = styled(Link)`
    margin: 20px;
`;

const ShowcaseGroup = styled.div`
    margin-top: 20px;

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

export { ShowcasePageTemplate, Props };
