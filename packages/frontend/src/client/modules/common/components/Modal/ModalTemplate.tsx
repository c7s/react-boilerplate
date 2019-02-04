import * as React from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import styled, { createGlobalStyle } from 'styled-components';
import { CommonProps } from '../../types/CommonProps';

if (!SSR_MODE) {
    // Hide app from screen readers when modal is open
    const rootElement = document.getElementById('root');
    ReactModal.setAppElement(rootElement ? rootElement : document.body);
}

interface Props extends ReactModalProps, CommonProps {
    className?: string;
}

const ModalTemplate: React.FC<Props> = props => (
    <React.Fragment>
        <GlobalModalKeyframes />
        <Root
            closeTimeoutMS={350}
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    animation: `${props.isOpen ? 'fadeIn' : 'fadeOut'} 0.2s ease-in-out 1 forwards`,
                },
            }}
            {...props}
        />
    </React.Fragment>
);

// Local keyframes for react-modal cause error in styled-components v4
const GlobalModalKeyframes = createGlobalStyle`
    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }
`;

const Root = styled(ReactModal)`
    animation: ${({ isOpen }: ReactModalProps) => (isOpen ? 'fadeIn' : 'fadeOut')} 0.2s ease-in-out 1;
    animation-fill-mode: forwards;
    outline: none;
`;

export { ModalTemplate, Props };
