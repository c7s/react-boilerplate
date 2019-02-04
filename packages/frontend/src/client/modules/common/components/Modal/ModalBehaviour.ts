import noScroll from 'no-scroll';
import * as React from 'react';
import { Props as ReactModalProps } from 'react-modal';
import { CommonProps } from '../../types/CommonProps';
import { ModalTemplate } from './ModalTemplate';

interface Props extends ReactModalProps, CommonProps {
    className?: string;
}

class ModalBehaviour extends React.Component<Props> {
    componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                noScroll.on();
            } else {
                noScroll.off();
            }
        }
    }

    render() {
        return React.createElement(ModalTemplate, this.props);
    }
}

export { ModalBehaviour, Props };
